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

/* Se guarda el PUNTAJE, no la estrella. La estrella es una interpretación del
   puntaje según una escala, y las escalas cambian; el puntaje es un hecho y no
   caduca. Guardando el hecho, ajustar la escala recalifica a todo el mundo solo
   —sin borrar el progreso de nadie, que es lo que tocaba hacer antes. */
export type ProgresoLeccion = { aciertos: number; total: number };
export type Progreso = Record<string, ProgresoLeccion>;

const CLAVE = "aprende-en-casa:progreso:v2";

export function claveLeccion(grade: number, tema: number): string {
  return `matematicas-${grade}-${tema}`;
}

/* Cotas de calificación:
     10/10  → 3 estrellas
    9 y 8   → 2 estrellas
    7 y 6   → 1 estrella
   menos de 6 → no aprueba, y la estación NO abre la siguiente.

   Toda lección tiene 10 ejercicios (la migración lo comprueba y se revierte si
   no), así que equivale a contar errores: ninguno son 3 estrellas, uno o dos
   son 2, tres o cuatro es 1, y cinco reprueba. Van en porcentaje para que
   sigan valiendo si algún día una lección mide distinto. */
export const PORCENTAJE_APROBACION = 60;

export function estrellasPara(aciertos: number, total: number): number {
  if (total === 0) return 0;
  const pct = (aciertos / total) * 100;
  if (pct >= 100) return 3;
  if (pct >= 80) return 2;
  if (pct >= PORCENTAJE_APROBACION) return 1;
  return 0;
}

/** Estrellas de un intento guardado, según la escala de HOY. */
export function estrellasDe(leccion: ProgresoLeccion | undefined): number {
  return leccion ? estrellasPara(leccion.aciertos, leccion.total) : 0;
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

/** Guarda solo si mejora: repetir una lección y hacerlo peor no baja la nota.
 *  Se compara la PROPORCIÓN, no el número de aciertos, por si el intento
 *  anterior fue sobre una lección de otro tamaño. */
export function guardarLeccion(clave: string, resultado: ProgresoLeccion): void {
  try {
    const progreso = leerProgreso();
    const previo = progreso[clave];
    const mejor =
      previo && previo.total > 0 && previo.aciertos / previo.total >= resultado.aciertos / resultado.total
        ? previo
        : resultado;
    progreso[clave] = { aciertos: mejor.aciertos, total: mejor.total };
    localStorage.setItem(CLAVE, JSON.stringify(progreso));
  } catch {
    // Sin almacenamiento el juego sigue funcionando; solo no recuerda.
  }
}
