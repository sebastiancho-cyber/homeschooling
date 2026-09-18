/* El control de calidad, ANTES de tocar la base.

   Esto es lo que más importa que esté compartido. Cada chequeo de aquí nació de
   un error real que se coló hasta la aplicación, y varios los descubrió un
   revisor externo, no nosotros. Un grado que se copie el archivo y después
   arregle un detector en su copia deja los otros grados con el detector viejo,
   y el error vuelve por donde ya había entrado una vez.

   Si un chequeo se queja, se corrige el CONTENIDO, nunca el chequeo. Cuando
   después de mirarlo resulta ser un falso positivo, se anota en el
   `excepciones.js` del grado con el motivo escrito. */

const { DETECTORES } = require("../fugas.js");

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
};

/** La ayuda escrita se busca por el ENUNCIADO de la primera versión, no por la
 *  posición: repartir las ranuras las mueve de sitio, y una ayuda que se queda
 *  en la posición vieja no falla, MIENTE. */
const claveAyuda = (dba, slot) => `${dba}|${slot.v[0].p}`;

function revisar({ DBAS, AYUDAS, EXCEPCIONES, visualPara, derivables = DERIVABLES, limites = {} }) {
  const L = { ...LIMITES, ...limites };
  const errores = [];
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
    d.evidencias.forEach((texto, k) => {
      const n = porEvidencia[k + 1] ?? 0;
      if (n < L.minRanurasPorEvidencia) errores.push(`DBA ${dba} ev${k + 1}: ${n} ranuras (mínimo ${L.minRanurasPorEvidencia}) — «${texto.slice(0, 52)}…»`);
      if (n > L.maxRanurasPorEvidencia) errores.push(`DBA ${dba} ev${k + 1}: ${n} ranuras (máximo ${L.maxRanurasPorEvidencia}) — acapara la lección`);
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
        const ilus = visualPara(v);
        if (ilus && ilus.quitarOp) return false; // el dibujo se comió la línea
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

  return { errores, totalEv, totalSlots, totalEx, maxP, maxO, medida };
}

module.exports = { revisar, claveAyuda, DERIVABLES, LIMITES };
