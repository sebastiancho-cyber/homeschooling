/* La explicación de un ejercicio, paso a paso.

   Un niño que juega sin un profesor al lado necesita que la app le diga POR QUÉ,
   no solo que falló. Esta es esa explicación.

   Se DERIVA de la operación, como las ilustraciones y por el mismo motivo: son
   cientos de ejercicios, y una explicación escrita a mano para cada uno termina
   tarde o temprano contradiciendo al ejercicio que explica. Derivándola, cambiar
   los números cambia la explicación sola.

   Y se explica como se le enseña a un niño de seis años —contando hacia adelante
   y hacia atrás, en voz alta— no como se le demuestra a un adulto. "7 − 2 = 5"
   no le enseña nada a quien no supo hacerlo; "empieza en 7 y cuenta 2 hacia
   atrás: 6, 5" sí.

   Por eso hay DOS niveles. Antes de responder solo se ve la `pista`, que dice
   cómo se hace y nunca cuánto da; los `pasos`, con los números resueltos, solo
   aparecen después. No es para que el niño no haga trampa: es que una respuesta
   regalada no enseña nada, y una pista sí. */

export type Ayuda = {
  /** El MÉTODO, en una línea y sin el resultado. Lo único visible antes de
   *  responder. */
  pista: string;
  /** Cómo se hace, con los números resueltos. Solo después de responder. */
  pasos: string[];
  /** El error que la pregunta está buscando, cuando hay uno claro. */
  ojo?: string;
};

const listar = (nums: number[]) => nums.join(", ");

/** Cuenta hacia adelante desde `desde`, `cuantos` pasos. */
const haciaAdelante = (desde: number, cuantos: number) =>
  Array.from({ length: cuantos }, (_, i) => desde + i + 1);

/** Cuenta hacia atrás desde `desde`, `cuantos` pasos. */
const haciaAtras = (desde: number, cuantos: number) =>
  Array.from({ length: cuantos }, (_, i) => desde - i - 1);

/* Contar de uno en uno deja de ser una ayuda y pasa a ser una lista ilegible
   cuando hay muchos pasos. Pasado ese punto se explica la estrategia —el paso
   por el diez, o contar al revés— que es justamente lo que el DBA quiere que el
   niño acabe usando. */
const MAX_PASOS = 6;

export function ayudaPara(operation: string | undefined): Ayuda | null {
  if (!operation) return null;
  const op = operation.replace(/\s+/g, " ").trim();

  /* ---------------------------------------------------------------- suma */
  const suma = op.match(/^(\d+) \+ (\d+) = \?$/);
  if (suma) {
    const a = Number(suma[1]);
    const b = Number(suma[2]);
    // Se cuenta desde el mayor: contar 2 pasos es más fácil que contar 7, y
    // descubrir que da lo mismo es parte de lo que el tema enseña.
    const mayor = Math.max(a, b);
    const menor = Math.min(a, b);

    if (a + b > 10 && menor > 1) {
      const alDiez = 10 - mayor;
      return {
        pista: "Cuando la suma se pasa de 10, llega primero al 10 y sigue contando desde ahí.",
        pasos: [
          `Sumar es juntar: tienes ${a} y le agregas ${b}.`,
          `Pasa primero por el 10: a ${mayor} le faltan ${alDiez} para llegar a 10.`,
          `Te sobran ${menor - alDiez} de los ${menor}, y 10 + ${menor - alDiez} = ${a + b}.`,
        ],
        ojo: "Llegar al 10 y seguir desde ahí es más rápido que contar de uno en uno.",
      };
    }

    return {
      pista: "Empieza en el número más grande y cuenta el otro hacia adelante.",
      pasos: [
        `Sumar es juntar: tienes ${a} y le agregas ${b}.`,
        `Empieza en ${mayor} y cuenta ${menor} más: ${listar(haciaAdelante(mayor, menor))}.`,
        `Son ${a + b}.`,
      ],
      ojo: menor <= 2 ? "Contar desde el número más grande te ahorra pasos." : undefined,
    };
  }

  /* --------------------------------------------------------------- resta */
  const resta = op.match(/^(\d+) [−-] (\d+) = \?$/);
  if (resta) {
    const a = Number(resta[1]);
    const b = Number(resta[2]);

    if (b > MAX_PASOS) {
      // Con un número grande que quitar, contar hacia atrás se enreda. Se cuenta
      // al revés: cuánto hay que subir desde el pequeño hasta el grande. Da lo
      // mismo, y a esta edad se falla mucho menos.
      return {
        pista: "Si lo que se va es mucho, cuenta al revés: desde el número pequeño hasta el grande.",
        pasos: [
          `Restar es quitar: tenías ${a} y se van ${b}.`,
          `Contar ${b} hacia atrás se enreda. Hazlo al revés: ¿cuánto le falta a ${b} para llegar a ${a}?`,
          `Le faltan ${a - b}, así que quedan ${a - b}.`,
        ],
        ojo: "Restar y ver cuánto falta son la misma pregunta hecha de dos maneras.",
      };
    }

    return {
      pista: "Empieza en el primer número y cuenta hacia atrás tantos pasos como se van.",
      pasos: [
        `Restar es quitar: tenías ${a} y se van ${b}.`,
        `Empieza en ${a} y cuenta ${b} hacia atrás: ${listar(haciaAtras(a, b))}.`,
        `Quedan ${a - b}.`,
      ],
      ojo: "Si sumas en vez de restar te da más de lo que tenías, y eso no puede ser.",
    };
  }

  /* ----------------------------------------------------------- completar */
  const falta = op.match(/^(\d+) \+ \? = (\d+)$/);
  if (falta) {
    const a = Number(falta[1]);
    const c = Number(falta[2]);
    const d = c - a;
    return {
      pista: "Cuenta desde el número que tienes hasta el número al que quieres llegar.",
      pasos: [
        `Aquí no sobra nada: falta. Tienes ${a} y quieres llegar a ${c}.`,
        d <= MAX_PASOS
          ? `Cuenta desde ${a} hasta ${c}: ${listar(haciaAdelante(a, d))}. Contaste ${d}.`
          : `De ${a} a ${c} hay ${d}, porque ${c} − ${a} = ${d}.`,
        `Falta ${d}.`,
      ],
      ojo: `Sumar ${a} y ${c} da ${a + c}, que es más de lo que querías llegar. Para saber cuánto FALTA se resta.`,
    };
  }

  const faltaIzq = op.match(/^\? \+ (\d+) = (\d+)$/);
  if (faltaIzq) {
    const b = Number(faltaIzq[1]);
    const c = Number(faltaIzq[2]);
    return {
      pista: "Da igual que el hueco esté al principio: cuenta desde el número que ves hasta el resultado.",
      pasos: [
        `El número que falta, más ${b}, tiene que dar ${c}.`,
        `Empieza en ${b} y cuenta hasta ${c}: te faltan ${c - b}.`,
        `El número que falta es ${c - b}.`,
      ],
      ojo: "El hueco al principio o al final se resuelve igual.",
    };
  }

  /* ---------------------------------------- la igualdad al revés (tema 9) */
  const igualdadDer = op.match(/^(\d+) = (\d+) \+ \?$/);
  const igualdadIzq = op.match(/^(\d+) = \? \+ (\d+)$/);
  if (igualdadDer || igualdadIzq) {
    const m = (igualdadDer ?? igualdadIzq)!;
    const c = Number(m[1]);
    const a = Number(m[2]);
    return {
      pista: "El signo = dice que los dos lados valen lo mismo. Mira cuánto vale el lado que está completo.",
      pasos: [
        `El signo = dice que los dos lados valen lo mismo.`,
        `El lado izquierdo vale ${c}, así que el derecho también tiene que valer ${c}.`,
        `Ya hay ${a}, entonces falta ${c - a}.`,
      ],
      ojo: "Que el número solo esté a la izquierda no cambia nada: = no significa “aquí va la respuesta”.",
    };
  }

  /* --------------------------------- equivalencia entre las dos mitades */
  const equivDer = op.match(/^(\d+) ([+−-]) (\d+) = (\d+) \+ \?$/);
  if (equivDer) {
    const a = Number(equivDer[1]);
    const signo = equivDer[2] === "+" ? "+" : "−";
    const b = Number(equivDer[3]);
    const c = Number(equivDer[4]);
    const total = signo === "+" ? a + b : a - b;
    return {
      pista: "Resuelve primero el lado que está completo. El otro lado tiene que valer lo mismo.",
      pasos: [
        `Resuelve el lado completo: ${a} ${signo} ${b} = ${total}.`,
        `Los dos lados valen lo mismo, así que el otro también vale ${total}.`,
        `Ya hay ${c}, entonces falta ${total - c}.`,
      ],
      ojo: `${total} es la respuesta del primer lado, no del ejercicio.`,
    };
  }

  const equivIzq = op.match(/^(\d+) ([+−-]) (\d+) = \? \+ (\d+)$/);
  if (equivIzq) {
    const a = Number(equivIzq[1]);
    const signo = equivIzq[2] === "+" ? "+" : "−";
    const b = Number(equivIzq[3]);
    const d = Number(equivIzq[4]);
    const total = signo === "+" ? a + b : a - b;
    return {
      pista: "Resuelve primero el lado que está completo. El otro lado tiene que valer lo mismo.",
      pasos: [
        `Resuelve el lado completo: ${a} ${signo} ${b} = ${total}.`,
        `El otro lado también tiene que valer ${total}.`,
        `Como ya hay ${d}, el número que falta es ${total - d}.`,
      ],
      ojo: `${total} es la respuesta del primer lado, no del ejercicio.`,
    };
  }

  /* ---------------------------------------------------------- secuencias */
  const secuencia = op.match(/^(\d+(?:, \d+)+), \?$/);
  if (secuencia) {
    const nums = secuencia[1].split(", ").map(Number);
    const paso = nums[1] - nums[0];
    const constante = nums.every((n, i) => i === 0 || n - nums[i - 1] === paso);
    if (constante) {
      const ultimo = nums[nums.length - 1];
      return {
        pista: "Averigua de cuánto en cuánto salta la secuencia, y dale ese mismo salto al último número.",
        pasos: [
          `Mira de cuánto en cuánto va: de ${nums[0]} a ${nums[1]} hay ${paso}.`,
          `Y sigue saltando igual hasta ${ultimo}.`,
          `Entonces el que sigue es ${ultimo} + ${paso} = ${ultimo + paso}.`,
        ],
        ojo: "Lo primero siempre es averiguar de cuánto en cuánto salta.",
      };
    }
  }

  /* ------------------------------------------------- montones del mismo tamaño */
  const repetida = op.match(/^(\d+)(?: \+ \1)+ = \?$/);
  if (repetida) {
    const porGrupo = Number(repetida[1]);
    const grupos = op.split("+").length;
    const parciales: number[] = [];
    for (let i = 1; i <= grupos; i++) parciales.push(porGrupo * i);
    return {
      pista: "No cuentes los montones: cuenta de cuánto en cuánto va cada montón.",
      pasos: [
        `Son ${grupos} montones y cada uno tiene ${porGrupo}.`,
        `Cuenta de ${porGrupo} en ${porGrupo}: ${listar(parciales)}.`,
        `En total hay ${porGrupo * grupos}.`,
      ],
      ojo: `Contar de ${porGrupo} en ${porGrupo} es mucho más rápido que contar de uno en uno.`,
    };
  }

  /* --------------------------------------------------- sumas de tres números */
  const tres = op.match(/^(\d+) \+ (\d+) \+ (\d+) = \?$/);
  if (tres) {
    const [a, b, c] = [Number(tres[1]), Number(tres[2]), Number(tres[3])];
    return {
      pista: "Con tres números se suma de a dos: primero dos, y al resultado le sumas el que queda.",
      pasos: [
        `Con tres números se suma de a dos: primero ${a} + ${b} = ${a + b}.`,
        `A ese resultado le sumas el que queda: ${a + b} + ${c} = ${a + b + c}.`,
        `En total son ${a + b + c}.`,
      ],
      ojo: "Puedes empezar por los dos que te queden más fáciles: el total no cambia.",
    };
  }

  return null;
}
