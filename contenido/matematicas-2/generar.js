/* Matemáticas, grado 2: la siembra.

   Este archivo solo junta las piezas. El contenido está en `dbas.js`, las
   explicaciones en `ayudas.js`, los falsos positivos revisados en
   `excepciones.js`, y la maquinaria entera en `../nucleo/`.

     node contenido/matematicas-2/generar.js 0026_lo_que_sea
*/

const { sembrar } = require("../nucleo/sembrar.js");
const { ilustrador } = require("../nucleo/ilustraciones.js");

const DBAS = require("./dbas.js");
const AYUDAS = require("./ayudas.js");
const EXCEPCIONES = require("./excepciones.js");

/* El vocabulario propio del grado. Lo único que un grado le añade al
   ilustrador: sus objetos. Van de primeras, así que ganan sobre los del
   núcleo cuando coinciden. */
const { visualPara, figurasDeOpciones } = ilustrador([
  [/silla|puesto/i, "🪑"], [/huevo/i, "🥚"], [/flor/i, "🌸"], [/libro/i, "📗"],
  [/ladrillo/i, "🧱"], [/fruta/i, "🍎"], [/moneda/i, "🪙"], [/niñ[oa]/i, "🧒"],
  [/voto/i, "🟦"], [/perro/i, "🐶"], [/gato/i, "🐱"], [/pez|peces/i, "🐟"],
  [/tornillo/i, "🔩"], [/semilla/i, "🌱"], [/canica/i, "🔴"], [/punto/i, "🔵"],
  [/mariposa/i, "🦋"], [/árbol|arbol/i, "🌳"], [/pelota|balón|balon/i, "⚽"],
  [/paso/i, "👣"], [/clip/i, "📎"], [/cuaderno/i, "📓"],
]);

sembrar({
  area: "matematicas",
  grado: 2,
  DBAS,
  AYUDAS,
  EXCEPCIONES,
  visualPara,
  figurasDeOpciones,
  migracion: process.argv[2] ?? "0026_matematicas_grado2",
  dir: __dirname,
  encabezado: `-- Matemáticas, grado 2.
-- Los once DBA del MEN, con las evidencias literales del documento oficial.
-- Trae lo que el grado 1 no tenía: multiplicación y reparto, suma y resta en
-- columna hasta 999, pictogramas con escala, relojes de manecillas y las
-- cadenas numéricas del ejemplo del DBA 8.
`,
});
