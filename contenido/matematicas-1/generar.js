/* Matemáticas, grado 1: la siembra.

   Este archivo solo junta las piezas. El contenido está en `dbas.js`, las
   explicaciones en `ayudas.js`, los falsos positivos revisados en
   `excepciones.js`, y la maquinaria entera en `../nucleo/`.

     node contenido/matematicas-1/generar.js 0025_lo_que_sea
*/

const { sembrar } = require("../nucleo/sembrar.js");
const { ilustrador } = require("../nucleo/ilustraciones.js");

const DBAS = require("./dbas.js");
const AYUDAS = require("./ayudas.js");
const EXCEPCIONES = require("./excepciones.js");

// El grado 1 no necesita vocabulario propio: su mundo —medias, manzanas,
// globos— ya está en el núcleo.
const { visualPara, figurasDeOpciones } = ilustrador();

sembrar({
  area: "matematicas",
  grado: 1,
  DBAS,
  AYUDAS,
  EXCEPCIONES,
  visualPara,
  figurasDeOpciones,
  // Las migraciones son historia y no se reescriben: cada siembra lleva nombre
  // nuevo. El que está por defecto es la última que se aplicó.
  migracion: process.argv[2] ?? "0024_distractores_creibles",
  dir: __dirname,
  /* En PRIMERO contar los objetos de un dibujo ES la materia: el DBA 2 se llama
     «Contar y calcular de varias maneras» y el 10 pide contar para responder.
     De segundo en adelante ya no, y el chequeo lo bloquea. */
  limites: { contarEsLaMateria: true },
  encabezado: `-- Tres versiones de cada pregunta.
-- Una lección se repite, y con una sola versión el niño acaba recordando "la
-- segunda de la derecha" en vez de sumar. Cada ranura tiene ahora 3 versiones
-- y la app sortea una. Las 10 ranuras por lección y las 39 evidencias del MEN
-- no cambian: lo que crece es la profundidad de cada ranura.
`,
});
