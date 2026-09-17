/* Detector de FUGAS: pistas que dejan acertar sin saber la materia.

   Son las que un niño de seis años aprovecha sin darse cuenta, y las que
   convierten una prueba de matemáticas en una prueba de leer el molde de la
   pregunta. Cada detector nació de un caso real de este grado. */

const SIN_TILDE = (s) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

// Palabras que no dicen nada del contenido: repetirlas no delata nada.
const VACIAS = new Set(
  ("de del la las los el un una unos unas que qué cual cuál cuáles como cómo para por con sin " +
   "en es son era eran esta este esto estas estos ese esa eso hay tiene tienen y o a al " +
   "se le les lo su sus mas más menos muy tan todo toda todos todas nada nadie algo " +
   "cuando donde dónde entonces porque pero si no ni ya solo sólo también tambien " +
   "hacer haces hace haz saber sabes sirve sirven puede pueden queda quedan va van " +
   "dice dicen decir eso aqui aquí alli allí ahi ahí").split(/\s+/).map(SIN_TILDE),
);

const palabras = (t) =>
  SIN_TILDE(t)
    .replace(/[¿?¡!.,:;()«»"']/g, " ")
    .split(/\s+/)
    .filter((w) => w.length >= 4 && !VACIAS.has(w) && !/^\d+$/.test(w));

/** Dos palabras cuentan como la misma si son iguales o comparten 5 letras. */
const mismaRaiz = (a, b) => a === b || (a.length >= 5 && b.length >= 5 && a.slice(0, 5) === b.slice(0, 5));

/* --- 1. Eco léxico ------------------------------------------------------
   Una palabra con contenido del enunciado aparece en la correcta y en NINGÚN
   distractor. El niño empareja palabras y acierta. */
function ecoLexico(v) {
  /* Solo el ENUNCIADO, nunca la línea de datos. Cuando la línea dice
     "Rojo 3 · Azul 5 · Verde 2" y las opciones son esos mismos colores, que la
     correcta se llame igual que su barra no es una fuga: es el ejercicio. */
  const delEnunciado = palabras(v.p);
  const correcta = palabras(v.o[v.c]);
  const distractores = v.o.filter((_, i) => i !== v.c).map(palabras);
  /* Si DOS o más distractores recogen alguna palabra del enunciado, emparejar
     palabras ya no decide nada: es el caso de "¿cuál pesa más?" sobre una lista
     de tres materiales, donde cada opción se llama como uno de ellos. Ahí que la
     correcta lleve su nombre no es una fuga, es el ejercicio. */
  const distractoresQueRecogen = distractores.filter((d) =>
    d.some((x) => delEnunciado.some((w) => mismaRaiz(x, w))),
  ).length;
  if (distractoresQueRecogen >= 2) return null;

  const ecos = [];
  for (const w of delEnunciado) {
    const enCorrecta = correcta.some((c) => mismaRaiz(c, w));
    if (!enCorrecta) continue;
    const enAlgunDistractor = distractores.some((d) => d.some((x) => mismaRaiz(x, w)));
    if (!enAlgunDistractor) ecos.push(w);
  }
  return ecos.length ? `eco léxico: «${ecos.join(", ")}» está en el enunciado y solo en la correcta` : null;
}

/* --- 2. Concordancia ----------------------------------------------------
   El enunciado termina pidiendo un género o número concreto y las opciones no
   concuerdan todas: las que no concuerdan se descartan sin saber nada. */
const FEM = /^(esfera|piramide|caja|bola|tira|cinta|cuerda|regla|mesa|silla|pelota|rueda|luna|moneda|hoja|maleta|jarra|olla|balanza)/;
const MASC = /^(cubo|cono|cilindro|prisma|circulo|cuadrado|rectangulo|triangulo|balde|vaso|libro|plato|clip|metro|reloj|calendario|pocillo)/;
function concordancia(v) {
  const m = SIN_TILDE(v.p.trim()).match(/\b(un|una|unos|unas|el|la|los|las)\s*:?\s*$/);
  if (!m) return null;
  const pideFem = /^(una|unas|la|las)$/.test(m[1]);
  const genero = (o) => {
    const w = SIN_TILDE(o.trim()).split(/\s+/)[0];
    if (FEM.test(w)) return "f";
    if (MASC.test(w)) return "m";
    return null;
  };
  const generos = v.o.map(genero);
  if (generos.some((g) => g === null)) return null; // no sabemos: no se acusa
  const concuerdan = generos.filter((g) => (pideFem ? g === "f" : g === "m")).length;
  if (concuerdan === v.o.length) return null;
  return `concordancia: el enunciado termina en «${m[1]}» y solo ${concuerdan} de 4 opciones concuerdan`;
}

/* --- 3. Longitud delatora ----------------------------------------------- */
function longitud(v) {
  const larg = v.o.map((o) => o.length);
  const c = larg[v.c];
  const otros = larg.filter((_, i) => i !== v.c);
  const maxOtros = Math.max(...otros);
  const minOtros = Math.min(...otros);
  if (c > maxOtros * 1.6 && c - maxOtros >= 8) return `longitud: la correcta (${c}) es mucho más larga que la más larga de las otras (${maxOtros})`;
  if (c * 1.6 < minOtros && minOtros - c >= 8) return `longitud: la correcta (${c}) es mucho más corta que la más corta de las otras (${minOtros})`;
  return null;
}

/* --- 4. Forma distinta --------------------------------------------------
   Las tres incorrectas comparten un molde y la correcta tiene otro. */
const molde = (o) => {
  const t = SIN_TILDE(o.trim());
  return [
    /^\d/.test(t) ? "empieza-numero" : "empieza-letra",
    /\d/.test(t) ? "lleva-numero" : "sin-numero",
    /^(el|la|los|las|un|una|unos|unas)\s/.test(t) ? "con-articulo" : "sin-articulo",
  ].join("/");
};
function formaDistinta(v) {
  const moldes = v.o.map(molde);
  const otros = moldes.filter((_, i) => i !== v.c);
  if (otros[0] === otros[1] && otros[1] === otros[2] && otros[0] !== moldes[v.c]) {
    return `forma: las 3 incorrectas son «${otros[0]}» y la correcta es «${moldes[v.c]}»`;
  }
  return null;
}

/* --- 5. Símbolo exclusivo ----------------------------------------------- */
function simboloExclusivo(v) {
  /* Solo delata el símbolo que TAMBIÉN está en el enunciado: ahí el niño
     empareja. Que cada opción traiga su propio signo —«El signo +», «El signo
     −»— no delata nada, y acusarlo sería ruido. */
  const simbolos = ["º", "$", "%", "+", "−", "="];
  const enunciado = v.p + " " + (v.op ?? "");
  const hallados = simbolos.filter((s) => {
    if (!enunciado.includes(s)) return false;
    const enCorrecta = v.o[v.c].includes(s);
    const enOtros = v.o.some((o, i) => i !== v.c && o.includes(s));
    return enCorrecta && !enOtros;
  });
  return hallados.length ? `símbolo: «${hallados.join(" ")}» aparece solo en la correcta` : null;
}

/* --- 6. Opciones que dicen lo mismo -------------------------------------
   Si dos opciones significan lo mismo, ninguna puede ser la correcta —no puede
   haber dos— así que caen juntas. Con un absurdo más, la pregunta se contesta
   con una sola opción viva y cero materia. Dos formas se pueden ver a máquina:

     · Las MISMAS PALABRAS en otro orden. "4 decenas y 3 unidades" contra
       "3 unidades y 4 decenas" es la misma frase dada vuelta.
     · Una es la NEGACIÓN de la otra. Si una dice "X" y otra "No X", el niño
       sabe que la respuesta es una de esas dos y se le van las otras.

   Las que dicen lo mismo con OTRAS palabras —"Resto" y "Cuento hacia atrás"—
   no las ve ninguna máquina: esas hay que leerlas. */
function equivalentes(v) {
  const hallazgos = [];

  /* La prueba de "la misma lista en otro orden" SOLO vale para enumeraciones
     del tipo "4 decenas y 3 unidades": ahí el orden de los sumandos no cambia
     nada y darle la vuelta es escribir lo mismo.

     En una frase corriente el orden sí manda. "Baja en la jarra y sube en el
     vaso" y "Sube en la jarra y baja en el vaso" llevan exactamente las mismas
     palabras y dicen cosas contrarias; tratarlas como iguales sería peor que
     no mirar nada. Por eso la prueba se limita a la forma que la admite. */
  const ES_LISTA = /^\d+\s+[a-zñ]+(\s*(y|,)\s*\d+\s+[a-zñ]+)+$/;
  const lista = (o) => {
    const t = SIN_TILDE(o).trim();
    if (!ES_LISTA.test(t)) return null;
    // Cada número pegado a su palabra: es lo que le da el sentido.
    return t
      .split(/\s*(?:y|,)\s*/)
      .filter(Boolean)
      .map((p) => p.replace(/\s+/g, ":"))
      .sort()
      .join(" ");
  };

  for (let i = 0; i < v.o.length; i++) {
    for (let j = i + 1; j < v.o.length; j++) {
      const a = SIN_TILDE(v.o[i]).trim();
      const b = SIN_TILDE(v.o[j]).trim();
      const par = "\u00ab" + v.o[i] + "\u00bb y \u00ab" + v.o[j] + "\u00bb";
      const la = lista(v.o[i]);
      const lb = lista(v.o[j]);
      if (la && lb && la === lb) {
        hallazgos.push("equivalentes: " + par + " son la misma lista en otro orden");
      } else if (a === "no " + b || b === "no " + a) {
        hallazgos.push("equivalentes: " + par + " son una la negación de la otra");
      }
    }
  }
  return hallazgos.length ? hallazgos.join(" \u00b7 ") : null;
}
const DETECTORES = [ecoLexico, concordancia, longitud, formaDistinta, simboloExclusivo, equivalentes];

module.exports = { DETECTORES, ecoLexico, concordancia, longitud, formaDistinta, simboloExclusivo, equivalentes };
