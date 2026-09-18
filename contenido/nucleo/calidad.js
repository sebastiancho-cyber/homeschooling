/* El control de calidad, ANTES de tocar la base.

   Esto es lo que más importa que esté compartido. Cada chequeo de aquí nació de
   un error real que se coló hasta la aplicación, y varios los descubrió un
   revisor externo, no nosotros. Un grado que se copie el archivo y después
   arregle un detector en su copia deja los otros grados con el detector viejo,
   y el error vuelve por donde ya había entrado una vez.

   Si un chequeo se queja, se corrige el CONTENIDO, nunca el chequeo. Cuando
   después de mirarlo resulta ser un falso positivo, se anota en el
   `excepciones.js` del grado con el motivo escrito. */

const { DETECTORES, palabras, mismaRaiz } = require("../fugas.js");

/* Las formas de operación que la app SÍ sabe explicar sola. Es un espejo de
   `ayudaPara()` en src/lib/ayuda.ts: si allá se agrega una forma, aquí también.
   Existe porque una operación que la app no reconoce deja el ejercicio mudo
   igual que si no tuviera ninguna —y eso no se ve hasta que un niño falla. */
const DERIVABLES = [
  /^\d+ \+ \d+ = \?$/,
  /^\d+ [−-] \d+ = \?$/,
  /^\d+ \+ \? = \d+$/,
  /^\? \+ \d+ = \d+$/,
  /^\d+ = \d+ \+ \?$/,
  /^\d+ = \? \+ \d+$/,
  /^\d+ [+−-] \d+ = \d+ \+ \?$/,
  /^\d+ [+−-] \d+ = \? \+ \d+$/,
  /^\d+(?:, \d+)+, \?$/,
  /^(\d+)(?: \+ \1)+ = \?$/,
  /^\d+ \+ \d+ \+ \d+ = \?$/,
  // Grado 2: multiplicación y reparto. Espejo de las ramas nuevas de ayudaPara().
  /^\d+ × \d+ = \?$/,
  /^\d+ ÷ \d+ = \?$/,
  /^\d+ × \? = \d+$/,
  /^\? × \d+ = \d+$/,
  // La cadena numérica del ejemplo oficial del DBA 8, en sus dos sentidos.
  /^cadena \d+( \| [+−-] ?\d+)+ \| \?$/,
  /^cadena \?( \| [+−-] ?\d+)+ \| \d+$/,
];

/* Los topes. Son del núcleo porque salen de la PANTALLA, no de la materia: un
   enunciado de 90 caracteres no cabe en un teléfono ni en primero ni en once.
   Un grado los puede subir si su materia lo exige, pero entonces tiene que
   mirar la pantalla y comprobar que sigue cabiendo. */
const LIMITES = {
  maxEnunciado: 70,
  maxOpcion: 36,
  minRanuras: 10,
  minRanurasPorEvidencia: 2,
  maxRanurasPorEvidencia: 4,
  versiones: 3,
  /* Solo el grado 1: ahí contar los objetos de un dibujo ES la materia. De
     segundo en adelante, un ejercicio que se contesta contando el dibujo está
     midiendo lo que ya se sabía. */
  contarEsLaMateria: false,
};

/** La ayuda escrita se busca por el ENUNCIADO de la primera versión, no por la
 *  posición: repartir las ranuras las mueve de sitio, y una ayuda que se queda
 *  en la posición vieja no falla, MIENTE. */
const claveAyuda = (dba, slot) => `${dba}|${slot.v[0].p}`;

function revisar({ DBAS, AYUDAS, EXCEPCIONES, visualPara, derivables = DERIVABLES, limites = {} }) {
  const L = { ...LIMITES, ...limites };
  const errores = [];
  /* Lo que hay que MIRAR, no lo que impide generar. Se imprime siempre. */
  const avisos = [];
  let totalEv = 0, totalSlots = 0, totalEx = 0, maxP = 0, maxO = 0;

  for (const [dba, d] of Object.entries(DBAS)) {
    totalEv += d.evidencias.length;
    /* El reparto. Antes la única regla era "diez ranuras", y eso dejaba dos
       evidencias del MEN sin una sola pregunta mientras otra acaparaba siete.
       Ahora manda la cobertura: cada evidencia entre 2 y 4 ranuras.

       Menos de 2 no mide, roza. Más de 4 convierte la lección en una plana de
       la misma pregunta. Y el largo de la lección sale de ahí: 10 casi siempre,
       más cuando el DBA trae tantas evidencias que con 10 alguna se quedaría
       corta. */
    if (d.slots.length < L.minRanuras) errores.push(`DBA ${dba}: ${d.slots.length} ranuras, mínimo ${L.minRanuras}`);
    const porEvidencia = {};
    d.slots.forEach((slot) => (porEvidencia[slot.e] = (porEvidencia[slot.e] ?? 0) + 1));
    /* El techo de 4 no puede ser fijo. El DBA 2 y el DBA 8 del grado 2 traen
       SOLO DOS evidencias cada uno: con 4 como tope, la lección más larga
       posible sería de 8 ranuras y el mínimo de 10 nunca se alcanzaría. El
       chequeo se contradecía a sí mismo y no se vio hasta que un DBA real lo
       pisó.

       El techo sube lo justo para que 10 sea alcanzable, y ni una más. Con 3
       evidencias o más no cambia nada, que es como estaba el grado 1. */
    const techo = Math.max(L.maxRanurasPorEvidencia, Math.ceil(L.minRanuras / d.evidencias.length));
    d.evidencias.forEach((texto, k) => {
      const n = porEvidencia[k + 1] ?? 0;
      if (n < L.minRanurasPorEvidencia) errores.push(`DBA ${dba} ev${k + 1}: ${n} ranuras (mínimo ${L.minRanurasPorEvidencia}) — «${texto.slice(0, 52)}…»`);
      if (n > techo) errores.push(`DBA ${dba} ev${k + 1}: ${n} ranuras (máximo ${techo} con ${d.evidencias.length} evidencias) — acapara la lección`);
    });
    d.slots.forEach((slot, i) => {
      totalSlots++;
      if (slot.v.length !== L.versiones) errores.push(`DBA ${dba} ranura ${i + 1}: ${slot.v.length} versiones, deben ser ${L.versiones}`);
      if (slot.e > d.evidencias.length) errores.push(`DBA ${dba} ranura ${i + 1}: evidencia ${slot.e} no existe`);
      slot.v.forEach((v, j) => {
        totalEx++;
        maxP = Math.max(maxP, v.p.length);
        v.o.forEach((o) => (maxO = Math.max(maxO, o.length)));
        if (v.o.length !== 4) errores.push(`DBA ${dba}.${i + 1}.v${j + 1}: ${v.o.length} opciones`);
        if (new Set(v.o).size !== 4) errores.push(`DBA ${dba}.${i + 1}.v${j + 1}: opciones repetidas -> ${v.o.join(" | ")}`);
        if (v.c !== 0) errores.push(`DBA ${dba}.${i + 1}.v${j + 1}: la correcta no está de primera`);
        // Una opción muy larga no cabe en media pantalla de teléfono: se parte
        // en cuatro renglones y el botón deja de leerse de un vistazo.
        v.o.forEach((o) => { if (o.length > L.maxOpcion) errores.push(`DBA ${dba}.${i + 1}.v${j + 1}: opción de ${o.length} caracteres — «${o}»`); });
        if (v.p.length > L.maxEnunciado) errores.push(`DBA ${dba}.${i + 1}.v${j + 1}: enunciado de ${v.p.length} caracteres`);
        if (v.o.some((o) => o.includes("-") && /^-\d/.test(o))) errores.push(`DBA ${dba}.${i + 1}.v${j + 1}: opción negativa`);
      });
      // Las tres versiones tienen que ser DISTINTAS, o no sirven de nada.
      const firmas = slot.v.map((v) => v.p + "|" + (v.op ?? "") + "|" + v.o.join(","));
      if (new Set(firmas).size !== L.versiones) errores.push(`DBA ${dba} ranura ${i + 1}: versiones repetidas`);
      // Y tienen que tener respuestas distintas. Si las tres se contestan con la
      // misma palabra, repetir la lección enseña la palabra, no la matemática:
      // exactamente el problema que las tres versiones existen para evitar.
      const correctas = slot.v.map((v) => v.o[v.c]);
      if (new Set(correctas).size === 1) {
        errores.push(`DBA ${dba} ranura ${i + 1}: las ${L.versiones} versiones se contestan "${correctas[0]}"`);
      }
      // La aritmética que declara la línea de operación tiene que dar lo que dice
      // la opción marcada. Es el chequeo que atrapa un dedazo al escribir.
      slot.v.forEach((v, j) => {
        const m = (v.op ?? "").replace(/\s/g, "").match(/^(\d+)([+−])(\d+)=\?$/);
        if (!m) return;
        const esperado = m[2] === "+" ? +m[1] + +m[3] : +m[1] - +m[3];
        if (Number(v.o[v.c]) !== esperado) {
          errores.push(`DBA ${dba}.${i + 1}.v${j + 1}: ${v.op} da ${esperado}, pero marca ${v.o[v.c]}`);
        }
      });
    });
  }

  /* El orden de las ranuras tiene que ser una RAMPA DE DIFICULTAD, y la señal
     más clara de que no lo es: que las evidencias salgan en el orden en que las
     lista el MEN.

     El documento las CLASIFICA, no las secuencia. Ordenando por evidencia, el
     tema 1 del grado 2 quedó con cuatro dibujos fáciles seguidos y después, de
     golpe, 146 + 235: arrancaba en kínder y aterrizaba en tercero. Lo encontró
     un niño jugando —bueno, su papá—, no un chequeo, y por eso existe este.

     Lo que se acusa es la firma exacta de haber copiado el documento: las
     ranuras en BLOQUES y los bloques en ORDEN ASCENDENTE. Las dos cosas a la
     vez, porque una sola no dice nada. El tema 10 del grado 1 va en bloques
     —3322114444— pero empieza por la tercera evidencia: alguien lo reordenó
     pensando, y acusarlo sería ruido. Probado contra los dos grados antes de
     creerle. */
  for (const [dba, d] of Object.entries(DBAS)) {
    if (d.evidencias.length < 2) continue;
    const ev = d.slots.map((s) => s.e);
    const enBloques = ev.filter((x, i) => i > 0 && x !== ev[i - 1]).length === d.evidencias.length - 1;
    const ascendente = ev.every((x, i) => i === 0 || x >= ev[i - 1]);
    if (enBloques && ascendente) {
      errores.push(
        `DBA ${dba}: las ranuras salen en el orden en que el MEN lista las evidencias (${ev.join("")}). Eso es la clasificación del documento; el orden tiene que ser una rampa de dificultad`,
      );
    }
  }

  /* Un ejercicio que se contesta CONTANDO el dibujo mide contar.

     "¿Cuántas galletas hay?" sobre un montón dibujado entero se responde de una
     en una, por grande que sea el montón: agrandarlo no lo vuelve una
     multiplicación, solo lo vuelve más molesto. Si el dibujo enseña todos los
     objetos y la respuesta es cuántos hay, el ejercicio es de kínder aunque el
     tema hable de relaciones multiplicativas.

     En el grado 1 contar ES la materia, así que ahí se permite. De segundo en
     adelante, no. */
  if (!L.contarEsLaMateria) {
    for (const [dba, d] of Object.entries(DBAS)) {
      d.slots.forEach((slot, i) => {
        slot.v.forEach((v, j) => {
          const ilus = visualPara(v);
          if (!ilus) return;
          const vis = ilus.vis;
          const dibujados =
            vis.tipo === "arreglo" ? vis.filas * vis.columnas
            : vis.tipo === "contar" ? vis.cantidad
            : vis.tipo === "grupos" ? vis.grupos * vis.porGrupo
            : null;
          if (dibujados === null) return;
          if (Number(v.o[v.c]) === dibujados) {
            errores.push(
              `DBA ${dba}.${i + 1}.v${j + 1}: el dibujo enseña ${dibujados} objetos y la respuesta es ${dibujados} — se contesta contando, no con la materia del grado`,
            );
          }
        });
      });
    }
  }

  /* Ninguna ranura repite otra de OTRO tema.

     Es la §3 al pie de la letra. «¿Cuál pesa MÁS?» salía con esas mismas
     palabras en el tema 4 y en el tema 5 del grado 1: dos lecciones distintas
     se sentían como la misma, y el niño que llega a la segunda cree que se
     equivocó de pantalla.

     Dentro de una misma ranura el enunciado SÍ se repite, y debe: sus tres
     versiones preguntan lo mismo con datos distintos. Lo que no puede es
     saltar de un tema a otro.

     Lo encontró el director, que reconoció una pregunta de otra lección. */
  const enunciadoDe = new Map();
  for (const [dba, d] of Object.entries(DBAS)) {
    d.slots.forEach((slot, i) => {
      // Uno por RANURA: las tres versiones comparten enunciado a propósito.
      const p = slot.v[0].p.trim();
      const antes = enunciadoDe.get(p);
      if (antes && antes.dba !== dba) {
        errores.push(
          `DBA ${dba} ranura ${i + 1}: «${p}» es el mismo enunciado del DBA ${antes.dba} ranura ${antes.ranura}. Dos temas distintos tienen que sentirse como dos cosas distintas`,
        );
      }
      if (!antes) enunciadoDe.set(p, { dba, ranura: i + 1 });
    });
  }

  /* Un cálculo pelado no enseña nada: hace falta la situación.

     «¿Cuánto es? 368 + 214» es una cuenta sin mundo. La evidencia del DBA 2 del
     grado 2 pide que el niño «describa y justifique» lo que hizo, y de un
     número suelto no hay nada que describir. El director lo dijo mejor: «yo
     apoyo al MEN, situaciones reales más que abstractas».

     Ojo con la línea: esto acusa el CÁLCULO sin situación, no la expresión. En
     «2 + 3 = 1 + ?» la expresión ES el tema —el grado 1 tiene una lección
     entera sobre lo que significa el signo igual— y meterle una historia
     taparía justo lo que se quiere enseñar. Por eso «¿Qué número falta?» no se
     acusa y «¿Cuánto es?» sí. */
  for (const [dba, d] of Object.entries(DBAS)) {
    d.slots.forEach((slot, i) => {
      slot.v.forEach((v, j) => {
        if (/^¿Cu[aá]nto es\?$/.test(v.p.trim())) {
          errores.push(
            `DBA ${dba}.${i + 1}.v${j + 1}: «${v.p}» es un cálculo sin situación. La operación es la herramienta; la situación es lo que le da sentido`,
          );
        }
      });
    });
  }

  /* Una comparación necesita sus DOS términos nombrados.

     «Mira el dibujo. ¿Cuántos votos menos tiene el pez?» sobre un gráfico con
     perro 12, gato 8 y pez 5 tiene dos respuestas defendibles: menos que el
     perro son 7 y menos que el gato son 3. El niño que sabe restar puede fallar
     igual, que es lo contrario de lo que queremos.

     Con dos series no hay ambigüedad —la otra es la otra—, pero desde tres hay
     que decir contra cuál se compara. */
  const COMPARA = /cu[aá]nt[oa]s?\b.*(\bm[aá]s\b|\bmenos\b|separan|diferencia)/i;
  for (const [dba, d] of Object.entries(DBAS)) {
    d.slots.forEach((slot, i) => {
      slot.v.forEach((v, j) => {
        const ilus = visualPara(v);
        if (!ilus) return;
        const vis = ilus.vis;
        const series =
          vis.tipo === "barras" || vis.tipo === "pictograma" ? vis.datos.map((x) => x.etiqueta)
          : vis.tipo === "comparar" ? vis.lados.map((x) => x.etiqueta)
          : null;
        if (!series || series.length < 3) return;
        if (!COMPARA.test(v.p)) return;
        const nombradas = series.filter((e) => new RegExp(e, "i").test(v.p)).length;
        if (nombradas < 2) {
          errores.push(
            `DBA ${dba}.${i + 1}.v${j + 1}: compara sobre ${series.length} series y solo nombra ${nombradas} — no se sabe contra cuál se compara`,
          );
        }
      });
    });
  }

  /* Una ranura queda MUDA si a la app no le llega ni una ayuda escrita ni una
     operación que sepa explicar. */
  const conAyudaEsperada = new Set();
  for (const [dba, d] of Object.entries(DBAS)) {
    const vistas = new Set();
    d.slots.forEach((slot, i) => {
      // Se explica sola solo si TODAS sus versiones traen una operación que la
      // app reconoce. Con que una no, la ranura necesita ayuda escrita.
      const seExplicaSola = slot.v.every((v) => {
        if (!v.op) return false;
        // Que el dibujo se haya comido la línea ya no condena la ranura: si la
        // línea es de una forma que la app sabe explicar, se le pasa aparte
        // (config.ayudaOp) y la explicación sale derivada igual.
        return derivables.some((re) => re.test(v.op));
      });
      if (seExplicaSola) return;
      // La clave solo tiene que ser única entre las que LLEVAN ayuda escrita.
      // Varias ranuras de cálculo empiezan por "¿Cuánto es?" y da igual, porque
      // su explicación no se busca por el enunciado sino que sale de la operación.
      const k = claveAyuda(dba, slot);
      if (vistas.has(k)) {
        errores.push(`DBA ${dba} ranura ${i + 1}: otra ranura con ayuda escrita empieza igual ("${slot.v[0].p}")`);
      }
      vistas.add(k);
      conAyudaEsperada.add(k);
    });
  }
  for (const k of conAyudaEsperada) {
    if (!AYUDAS[k]) errores.push(`ranura «${k}»: la app no la sabe explicar y no tiene ayuda escrita`);
  }
  for (const k of Object.keys(AYUDAS)) {
    if (!conAyudaEsperada.has(k)) errores.push(`ayuda «${k}»: no corresponde a ninguna ranura que la necesite`);
    const a = AYUDAS[k];
    if (!a.pista) errores.push(`ayuda ${k}: sin pista`);
    if (!Array.isArray(a.pasos) || a.pasos.length < 2) errores.push(`ayuda ${k}: menos de 2 pasos`);
  }

  /* La ayuda escrita que solo le sirve a UNA de sus versiones.

     Una ayuda es de la RANURA y la comparten sus tres versiones. Cuando la
     ranura mezcla cosas distintas —un largo medido con pasos, un peso con
     balanza, una duración con reloj— y la ayuda habla solo de la primera, a
     dos de cada tres niños se les explica algo que no tiene nada que ver con
     lo que acaban de fallar. No es que no ayude: MIENTE.

     Ha pasado dos veces y las dos las encontró el director jugando: una ayuda
     que decía «si cada una tiene 4» con el dibujo mostrando filas de 5, y otra
     que hablaba de pasos largos y cortos en una pregunta sobre un reloj.

     Lo que se acusa: que las palabras propias de la ayuda salgan TODAS de una
     sola versión. Si la ayuda enumera los tres casos —que es como se arregla—
     sus palabras se reparten entre las tres y no se acusa nada. */
  for (const [dba, d] of Object.entries(DBAS)) {
    d.slots.forEach((slot, i) => {
      const ayuda = AYUDAS[claveAyuda(dba, slot)];
      if (!ayuda || slot.v.length < 3) return;
      // DISTINTAS: la misma palabra repetida en la ayuda no son dos señales, es
      // una dicha dos veces. Sin esto el chequeo acusaba «mismo, mismo».
      const deLaAyuda = [...new Set(palabras([ayuda.pista, ...ayuda.pasos, ayuda.ojo ?? ""].join(" ")))];
      const textos = slot.v.map((v) => palabras(v.p + " " + v.o.join(" ")));
      // Una palabra es EXCLUSIVA de una versión si sale ahí y en ninguna otra.
      const exclusivas = textos.map((_, k) =>
        deLaAyuda.filter(
          (w) =>
            textos[k].some((x) => mismaRaiz(x, w)) &&
            textos.every((t, m) => m === k || !t.some((x) => mismaRaiz(x, w))),
        ),
      );
      /* Se compara por PESO y no exigiendo cero en las otras: una palabra común
         puede caer en otra versión por casualidad —«misma» lo hizo— y eso no
         quiere decir que la ayuda le hable. Se acusa cuando una versión se
         queda con más palabras propias que todas las demás juntas. */
      const cuantas = exclusivas.map((e) => e.length);
      const mayor = Math.max(...cuantas);
      const soloDeUna = cuantas.indexOf(mayor);
      const lasOtras = cuantas.reduce((t, n, k) => t + (k === soloDeUna ? 0 : n), 0);
      /* Tres palabras propias, y más que todas las demás juntas. Con dos
         saltaban ayudas que solo estaban poniendo un ejemplo —«por ejemplo, el
         teléfono»—, que es legítimo y está en las reglas. Tres ya no es un
         ejemplo: es que la ayuda se quedó viviendo en una sola versión. */
      if (mayor >= 3 && mayor >= 2 + lasOtras) {
        /* Se AVISA, no se bloquea, y el motivo es honesto: de los 19 que
           encuentra hoy, unos son de verdad —una ayuda sobre paralelas en una
           ranura que también pregunta por perpendiculares— y otros son una
           ayuda correcta que ilustra con un caso. Distinguirlos es leerlos, y
           bloquear sin haberlos leído sería fingir rigor.

           Va en la lista de avisos, que el generador imprime entera en cada
           corrida: un aviso que hay que ir a buscar no lo lee nadie. */
        avisos.push(
          `DBA ${dba} ranura ${i + 1}: la ayuda parece hablar solo de la versión ${soloDeUna + 1} (${exclusivas[soloDeUna].join(", ")})`,
        );
      }
    });
  }

  /* FUGAS: pistas que dejan acertar sin saber la materia.

     Un enunciado que repite su propia respuesta, una correcta que es la única con
     artículo, un "una:" que descarta media lista por el género. Son las que
     convierten una prueba de matemáticas en una prueba de leer el molde de la
     pregunta, y las que un niño aprovecha sin darse cuenta de que lo hace.

     Los falsos positivos se anotan en excepciones.js con su motivo; el detector
     no se apaga. La lista de excepciones se lee en un minuto y cualquier fuga
     nueva sigue tumbando la generación. */
  const perdonada = (v) => EXCEPCIONES.some((e) => e.p === v.p && e.r === v.o[v.c]);
  for (const [dba, d] of Object.entries(DBAS)) {
    d.slots.forEach((slot, i) => {
      slot.v.forEach((v, j) => {
        if (perdonada(v)) return;
        for (const det of DETECTORES) {
          const hallazgo = det(v);
          if (hallazgo) errores.push(`DBA ${dba}.${i + 1}.v${j + 1}: ${hallazgo}`);
        }
      });
    });
  }

  /* Las opciones que nunca son la respuesta.

     Si una opción aparece muchas veces y JAMÁS es la correcta, el niño aprende a
     descartarla sin leerla. Se mide sobre el banco entero, como el patrón
     numérico: ejercicio por ejercicio no se ve nada raro.

     Solo se miran las que llevan palabras. Que un número se repita entre los
     distractores y no toque nunca ser la respuesta es casualidad, no un patrón
     que alguien pueda aprender. */
  const vecesOpcion = {};
  const vecesCorrecta = {};
  for (const d of Object.values(DBAS)) {
    for (const slot of d.slots) {
      for (const v of slot.v) {
        v.o.forEach((o, i) => {
          vecesOpcion[o] = (vecesOpcion[o] ?? 0) + 1;
          if (i === v.c) vecesCorrecta[o] = (vecesCorrecta[o] ?? 0) + 1;
        });
      }
    }
  }
  for (const [texto, n] of Object.entries(vecesOpcion)) {
    if (n < 4) continue;
    if (/^[\d\s+\-−=?]+$/.test(texto)) continue; // los números se repiten solos
    if (!vecesCorrecta[texto]) {
      errores.push(
        `«${texto}» aparece ${n} veces y nunca es la respuesta: el niño aprende a descartarla sin leerla`,
      );
    }
  }

  /* El patrón numérico: la fuga de mayor alcance que hemos tenido.

     Si en los ejercicios de cálculo la correcta cae casi siempre en el mismo
     lugar al ordenar las cuatro opciones, o si casi siempre hay un número
     suelto que se puede descartar de un vistazo, existe una regla mecánica que
     resuelve el banco entero sin hacer una sola cuenta. Se mide sobre TODO el
     grado porque es un defecto del conjunto: ejercicio por ejercicio no se ve. */
  const numericos = [];
  for (const d of Object.values(DBAS))
    for (const slot of d.slots)
      for (const v of slot.v)
        if (v.o.every((o) => /^[0-9]+$/.test(o))) numericos.push(v);
  let medida = null;
  if (numericos.length >= 20) {
    const rango = [0, 0, 0, 0];
    let conSuelto = 0;
    for (const v of numericos) {
      const nums = v.o.map(Number);
      const ord = [...nums].sort((x, y) => x - y);
      rango[ord.indexOf(nums[v.c])]++;
      const sueltos = nums.filter((x) => nums.filter((y) => y !== x).every((y) => Math.abs(x - y) > 3));
      if (sueltos.length === 1) conSuelto++;
    }
    const peor = Math.max(...rango) / numericos.length;
    const pct = (x) => Math.round((x / numericos.length) * 100);
    medida = { n: numericos.length, peor, conSuelto: conSuelto / numericos.length };
    if (peor > 0.55) {
      errores.push(
        `patrón numérico: la correcta cae en la misma posición en el ${Math.round(peor * 100)} % de los ${numericos.length} ejercicios de cálculo (tope 55 %)`,
      );
    }
    if (conSuelto / numericos.length > 0.5) {
      errores.push(
        `patrón numérico: el ${pct(conSuelto)} % de los de cálculo tiene un número suelto que se descarta de un vistazo (tope 50 %)`,
      );
    }
  }

  return { errores, avisos, totalEv, totalSlots, totalEx, maxP, maxO, medida };
}

module.exports = { revisar, claveAyuda, DERIVABLES, LIMITES };
