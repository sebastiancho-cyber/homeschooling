"use client";

/* Qué ejercicios ya le salieron a este niño.

   Existe por algo concreto: cada ranura tiene tres versiones, y tanto al
   repetir una lección como al entrar a un repaso la app sorteaba cuál mostrar.
   Una de cada tres veces salía exactamente la misma que acababa de ver, y eso
   no se siente como un repaso sino como un error de la aplicación. Lo reportó
   el director jugando el repaso del grado 2.

   Guardando lo visto, el sorteo puede PREFERIR las versiones que no han
   salido. No las garantiza —cuando ya se vieron las tres, vuelve a sortear
   entre todas, que es lo correcto: repasar es volver a pasar por lo mismo— pero
   deja de repetir mientras haya algo nuevo que mostrar.

   Vive en el navegador igual que el progreso, y por los mismos motivos. Ver
   lib/progress.ts: lo que se dice ahí sobre no tener cuentas, sobre que esto no
   viaja entre dispositivos y sobre el try/catch vale aquí igual. */

const CLAVE = "aprende-en-casa:vistos:v1";

/* Un tope, para que la lista no crezca sin final. Con 1.200 caben los dos
   grados completos y sobra; al pasarse se olvidan los más antiguos, que son
   justamente los que ya conviene volver a mostrar. */
const TOPE = 1200;

function leerLista(): string[] {
  try {
    const crudo = localStorage.getItem(CLAVE);
    if (!crudo) return [];
    const datos = JSON.parse(crudo);
    return Array.isArray(datos) ? datos.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export function leerVistos(): Set<string> {
  return new Set(leerLista());
}

/** Anota varios de una vez. Se llama al RESPONDER, no al mostrar: una pregunta
 *  que el niño no alcanzó a contestar no la ha visto de verdad. */
export function marcarVistos(ids: string[]): void {
  if (!ids.length) return;
  try {
    // Los nuevos van al final: la lista está ordenada de lo más viejo a lo más
    // reciente, así que recortar por el principio olvida lo más antiguo.
    const lista = leerLista().filter((id) => !ids.includes(id));
    lista.push(...ids);
    localStorage.setItem(CLAVE, JSON.stringify(lista.slice(-TOPE)));
  } catch {
    // Sin almacenamiento el juego sigue: solo vuelve a sortear a ciegas.
  }
}

/** Borra la memoria de lo visto. Va junto a borrar el progreso: si alguien
 *  reinicia el avance, empezar con media ruta marcada como vista sería raro. */
export function borrarVistos(): void {
  try {
    localStorage.removeItem(CLAVE);
  } catch {
    // Si no se puede escribir, tampoco había nada guardado.
  }
}
