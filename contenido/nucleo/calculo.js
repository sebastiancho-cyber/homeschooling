/* Las cuatro opciones de un ejercicio de cálculo.

   Esto es compartido por todos los grados y por todas las áreas, y por un
   motivo que costó caro aprender: la fuga más grave que hemos tenido no se veía
   en ningún ejercicio, solo en el conjunto. Los distractores eran el resultado
   ±1 más el error típico, así que al ordenar las cuatro opciones la correcta
   quedaba SIEMPRE en el medio de tres números seguidos, con el error típico
   lejos. Una sola regla —descarto el raro, marco el del medio— resolvía los 94
   ejercicios de cálculo del grado sin sumar una vez.

   Un grado que escriba sus propias opciones a mano vuelve a caer ahí. Por eso
   los moldes viven en el núcleo y no se copian. */

/* Cada molde da los TRES distractores. Dos cosas se cuidan a la vez:

     · Que la correcta no caiga siempre en el mismo sitio al ordenar.
     · Que no quede un solo número suelto y tres pegados. Con esa firma, el
       niño descarta el suelto y le quedan tres, o hasta uno. El error típico
       casi siempre cae lejos, así que los otros dos no pueden ser r+1 y r−1.

   `e` es el error típico: el distractor que diagnostica —sumó en vez de
   restar, se le corrió el conteo— y por eso vale la pena conservarlo. Pero no
   en todos: en varios moldes no aparece, y ahí no hay ningún número suelto que
   descartar. */
const MOLDES = [
  (r, e) => [e, r + 1, r + 2],
  (r, e) => [e, r - 1, r - 2],
  (r, e) => [e, r + 2, r - 2],
  (r, e) => [e, r + 3, r - 1],
  (r, e) => [e, r - 3, r + 1],
  (r) => [r + 1, r - 1, r + 3],
  (r) => [r + 2, r - 1, r - 3],
  (r) => [r - 1, r + 2, r + 4],
  // De un solo lado: así la correcta también cae a veces en un extremo y no
  // se puede descartar el número más grande y el más chico sin pensar.
  (r) => [r + 1, r + 2, r + 4],
  (r) => [r - 1, r - 2, r - 4],
  (r, e) => [e, r + 1, r + 4],
  (r, e) => [e, r - 1, r - 4],
  (r) => [r + 1, r + 3, r + 5],
  (r) => [r - 1, r - 3, r - 5],
  (r) => [r + 2, r + 3, r + 6],
  // Hacia arriba hay más moldes a propósito: con resultados pequeños los que
  // restan se salen de cero y no se pueden usar, así que sin estos la correcta
  // casi nunca sería la opción más chica.
  (r) => [r + 1, r + 4, r + 6],
  (r) => [r + 2, r + 4, r + 5],
  (r) => [r + 1, r + 2, r + 3],
  (r, e) => [e + r + 1, r + 1, r + 3],
  (r) => [r - 2, r - 3, r - 6],
];

/** Cuatro opciones distintas y no negativas, con la correcta de primera. */
/*  Se sortea entre los moldes VÁLIDOS, no recorriéndolos en cadena desde uno.
    Con resultados pequeños —casi todos, en primero— los moldes que restan dan
    negativos y se descartan; recorriendo en cadena, todos esos ejercicios
    caían en los mismos dos o tres moldes y el patrón volvía a aparecer. */
function opciones(r, error, semilla) {
  const validos = MOLDES.map((m) => [r, ...m(r, error)]).filter(
    (cuatro) => cuatro.every((n) => n >= 0) && new Set(cuatro).size === 4,
  );
  // La semilla se mezcla antes de usarla: sale de sumas pequeñas de los propios
  // operandos, y sin mezclar los ejercicios parecidos caen todos en el mismo
  // molde. Mezclada, el reparto queda parejo y sigue siendo reproducible.
  const mezclada = Math.imul(semilla + 0x9e3779b9, 0x85ebca6b) >>> 8;
  if (validos.length) return validos[mezclada % validos.length].map(String);
  // Salida de emergencia: si ningún molde sirve, se avisa en vez de emitir
  // un ejercicio con opciones repetidas.
  throw new Error(`no hay 4 opciones distintas para r=${r}, error=${error}`);
}

/* Las formas aditivas, que son las mismas en todos los grados que las usan.
   El segundo argumento de `opciones` es el ERROR TÍPICO: el distractor que
   diagnostica qué entendió mal el niño, no un número cualquiera. Un grado que
   invente una forma nueva la escribe igual: resultado, error típico, y una
   semilla hecha con sus propios operandos para que no se repita el molde. */
const suma = (a, b, p = "¿Cuánto es?") => ({
  p, op: `${a} + ${b} = ?`,
  o: opciones(a + b, Math.abs(a - b), a + 2 * b), c: 0,
});
const resta = (a, b, p = "¿Cuánto es?") => ({
  p, op: `${a} − ${b} = ?`,
  o: opciones(a - b, a + b, a + 3 * b), c: 0,
});
const falta = (a, c, p = "¿Qué número falta?") => ({
  p, op: `${a} + ? = ${c}`,
  o: opciones(c - a, c + a, a + 5 * c), c: 0,
});
const faltaIzq = (b, c, p = "¿Qué número falta?") => ({
  p, op: `? + ${b} = ${c}`,
  o: opciones(c - b, c + b, b + 7 * c), c: 0,
});
/* La secuencia no pasa por los moldes: sus distractores son los errores de
   conteo propios del patrón —seguir de uno en uno, saltarse un paso— y esos
   los sabe el que escribe la serie, no una fórmula. */
const secuencia = (nums, resp, malos, p) => ({
  p, op: `${nums.join(", ")}, ?`, o: [`${resp}`, ...malos.map(String)], c: 0,
});

module.exports = { MOLDES, opciones, suma, resta, falta, faltaIzq, secuencia };
