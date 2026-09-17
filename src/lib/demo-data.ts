import type { Exercise } from "@/lib/exercises";

/* ==========================================================================
   CONTENIDO DE MUESTRA — no es currículo oficial.

   Sirve para dos cosas y nada más:
   1. Que la app no se caiga con una pantalla en blanco cuando la base no
      responde (un niño no tiene por qué ver un error 500).
   2. Poder trabajar la interfaz sin conexión.

   Todo lo que se sirva desde aquí va marcado en pantalla como "contenido de
   muestra": los títulos de abajo son etiquetas de tema escritas a mano, NO los
   enunciados de los DBA del MEN. El currículo real vive en la base de datos.
   ========================================================================== */

export const DEMO_GRADE_COUNTS: { grade: number; count: number }[] = [
  { grade: 1, count: 12 },
  { grade: 2, count: 11 },
  { grade: 3, count: 11 },
  { grade: 4, count: 11 },
  { grade: 5, count: 11 },
  { grade: 6, count: 11 },
  { grade: 7, count: 10 },
  { grade: 8, count: 10 },
  { grade: 9, count: 10 },
  { grade: 10, count: 11 },
  { grade: 11, count: 11 },
];

export function demoDbas(grade: number): { id: string; num: number; enunciado: string }[] {
  const temas = [
    "Contar y comparar cantidades",
    "Leer y escribir números",
    "Sumar y restar en situaciones cotidianas",
    "Reconocer figuras y sus formas",
    "Medir y comparar longitudes",
    "Ubicarse en el espacio",
    "Agrupar en decenas y unidades",
    "Encontrar el número que falta",
    "Ordenar de mayor a menor",
    "Repartir en partes iguales",
    "Leer datos en dibujos y tablas",
    "Descubrir patrones y secuencias",
  ];
  const cuantos = DEMO_GRADE_COUNTS.find((g) => g.grade === grade)?.count ?? 10;
  return temas.slice(0, cuantos).map((t, i) => ({
    id: `demo-${grade}-${i + 1}`,
    num: i + 1,
    enunciado: t,
  }));
}

export const DEMO_EXERCISES: Exercise[] = [
  {
    id: "demo-ex-1",
    type: "multiple_choice",
    prompt: "¿Cuál de estos números indica una CANTIDAD?",
    config: {
      options: [
        "5 manzanas en la mesa",
        "El número 10 en una camiseta",
        "El piso 3 de un edificio",
        "Un número de teléfono",
      ],
      correctIndex: 0,
    },
  },
  {
    id: "demo-ex-2",
    type: "multiple_choice",
    prompt: "Tienes 4 manzanas y regalas 1. ¿Cuántas te quedan?",
    config: { options: ["3", "5", "2", "4"], correctIndex: 0, operation: "4 − 1 = ?" },
  },
  {
    id: "demo-ex-3",
    type: "multiple_choice",
    prompt: "Cuenta de 2 en 2. ¿Qué número sigue?",
    config: { options: ["10", "9", "12", "7"], correctIndex: 0, operation: "4, 6, 8, ?" },
  },
  {
    id: "demo-ex-4",
    type: "multiple_choice",
    prompt: "¿Cuál es el número que falta?",
    config: { options: ["4", "3", "5", "10"], correctIndex: 0, operation: "3 + ? = 7" },
  },
  {
    id: "demo-ex-5",
    type: "multiple_choice",
    prompt: "¿Cuál de estos pesa MÁS?",
    config: {
      options: ["Un balde lleno de agua", "Una gota de agua", "Una pluma", "Un grano de arroz"],
      correctIndex: 0,
    },
  },
  {
    id: "demo-ex-6",
    type: "multiple_choice",
    prompt: "¿Cuánto es?",
    config: { options: ["35", "30", "26", "15"], correctIndex: 0, operation: "25 + 10 = ?" },
  },
  {
    id: "demo-ex-7",
    type: "multiple_choice",
    prompt: "Un lápiz mide 3 clips y otro mide 5 clips. ¿Cuántos clips más largo es el segundo?",
    config: { options: ["2", "3", "8", "5"], correctIndex: 0, operation: "5 − 3 = ?" },
  },
  {
    id: "demo-ex-8",
    type: "multiple_choice",
    prompt: "¿Qué figura tiene 3 lados?",
    config: { options: ["Triángulo", "Cuadrado", "Círculo", "Rectángulo"], correctIndex: 0 },
  },
];
