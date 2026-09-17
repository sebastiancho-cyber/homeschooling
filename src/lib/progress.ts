"use client";

/* Progreso del estudiante.

   Vive en el navegador (localStorage), no en la base. Es una decisión con un
   costo que conviene tener presente: el avance NO viaja entre dispositivos y se
   pierde si se borran los datos del navegador. A cambio, un niño de 6 años
   empieza a jugar sin crear una cuenta ni escribir una contraseña, que es la
   barrera que mata estos productos.

   Todo lo que toca localStorage va en try/catch: en modo incógnito o con el
   almacenamiento bloqueado, leerlo LANZA en vez de devolver vacío. Un fallo ahí
   no puede tumbar la pantalla — como mucho, se pierde el progreso.

   Para mudarlo al servidor más adelante solo cambia este archivo: el resto de
   la app habla con estas cuatro funciones y no sabe dónde se guarda. */

export type ProgresoLeccion = { estrellas: number; aciertos: number; total: number };
export type Progreso = Record<string, ProgresoLeccion>;

/* La versión va en la clave a propósito. Las estrellas guardadas se calcularon
   con una escala concreta; si la escala cambia, los registros viejos dejan de
   significar lo mismo y hay que empezar de cero. Subir el número aquí es la
   forma de decirlo. v2 = escala 100/90/70, con reprobación por debajo de 70. */
const CLAVE = "aprende-en-casa:progreso:v2";

export function claveLeccion(grade: number, tema: number): string {
  return `matematicas-${grade}-${tema}`;
}

/* Cotas de calificación:
     10/10 → 3 estrellas
      9/10 → 2 estrellas
    8 y 7  → 1 estrella
   menos de 7 → no aprueba, y la estación NO abre la siguiente.

   Toda lección tiene 10 ejercicios (la migración lo comprueba y se revierte si
   no), así que estas cotas equivalen a contar errores: ninguno son 3 estrellas,
   uno son 2, dos o tres es 1, y cuatro reprueba. Van escritas en porcentaje
   para que sigan valiendo si algún día una lección mide distinto. */
export const PORCENTAJE_APROBACION = 70;

export function estrellasPara(aciertos: number, total: number): number {
  if (total === 0) return 0;
  const pct = (aciertos / total) * 100;
  if (pct >= 100) return 3;
  if (pct >= 90) return 2;
  if (pct >= PORCENTAJE_APROBACION) return 1;
  return 0;
}

/** Sin estrellas no hay aprobación: la lección queda pendiente. */
export function aprobo(aciertos: number, total: number): boolean {
  return estrellasPara(aciertos, total) > 0;
}

export function leerProgreso(): Progreso {
  try {
    const crudo = localStorage.getItem(CLAVE);
    if (!crudo) return {};
    const datos = JSON.parse(crudo);
    return datos && typeof datos === "object" ? (datos as Progreso) : {};
  } catch {
    return {};
  }
}

/** Guarda solo si mejora: repetir una lección y hacerlo peor no baja la nota. */
export function guardarLeccion(clave: string, resultado: ProgresoLeccion): void {
  try {
    const progreso = leerProgreso();
    const previo = progreso[clave];
    progreso[clave] = {
      estrellas: Math.max(previo?.estrellas ?? 0, resultado.estrellas),
      aciertos: Math.max(previo?.aciertos ?? 0, resultado.aciertos),
      total: resultado.total,
    };
    localStorage.setItem(CLAVE, JSON.stringify(progreso));
  } catch {
    // Sin almacenamiento el juego sigue funcionando; solo no recuerda.
  }
}
