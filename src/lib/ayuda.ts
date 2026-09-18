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

/* Sumar o restar una decena entera —10, 20, 100— no se cuenta: se le cambia
   una cifra al número. Es la estrategia que el DBA quiere que el niño use, y
   sin esta rama la explicación general salía con números negativos: "a 42 le
   faltan −32 para llegar a 10". */
function decenaRedonda(a: number, b: number, suma: boolean): Ayuda {
  const esCentena = b % 100 === 0;
  const cual = esCentena ? "centenas" : "decenas";
  const unidad = esCentena ? "centena" : "decena";
  const n = esCentena ? b / 100 : b / 10;
  const r = suma ? a + b : a - b;
  return {
    pista: `Sumar o quitar ${unidad}s enteras no se cuenta de uno en uno: cambia solo la cifra de las ${cual}.`,
    pasos: [
      `${b} ${n === 1 ? "es" : "son"} ${n} ${n === 1 ? unidad : unidad + "s"} ${n === 1 ? "justa" : "justas"}, sin nada suelto.`,
      esCentena
        ? `Las decenas y las unidades de ${a} no se mueven: sigue terminando en ${String(a % 100).padStart(2, "0")}.`
        : `Las unidades de ${a} no se mueven: siguen siendo ${a % 10}.`,
      `${suma ? "Le agregas" : "Le quitas"} ${n} a las ${cual} y queda ${r}.`,
    ],
    ojo: esCentena
      ? "Fíjate en que las dos últimas cifras no cambiaron: eso es lo que te dice que lo hiciste bien."
      : "Fíjate en que la cifra de las unidades no cambió: eso es lo que te dice que lo hiciste bien.",
  };
}

/* Sumar y restar SIN el algoritmo clásico.

   Esto no es una preferencia nuestra: el MEN lo pide con esas palabras. La
   evidencia del DBA 2 del grado 2 dice «usa algoritmos NO CONVENCIONALES para
   calcular o estimar», y sus Mallas de Aprendizaje lo repiten de frente —
   «encontrar estrategias […] sin utilizar los algoritmos clásicos de suma y
   resta»— y nombran cuáles sí: redondear a la decena más cercana, contar de 10
   en 10 desde uno de los números, y usar los dobles.

   La palabra «estandarizados» no aparece hasta GRADO 4. El grado 3 todavía
   habla de descomponer y de completar hasta la decena.

   Lo que había aquí antes era el algoritmo de columnas con la que se lleva y la
   que se presta: correcto de resultado, y tres años adelantado. Lo encontró el
   director jugando 83 − 45.

   Cuando llegue el grado 4 habrá que agregar el algoritmo estandarizado al
   lado de estos, no en vez de ellos: ahí el DBA sí lo pide. */

/** Restar completando hasta la decena, que es lo que el MEN nombra.
 *  83 − 45: de 45 a 50 son 5, de 50 a 80 son 30, de 80 a 83 son 3 → 38. */
function restaCompletando(a: number, b: number): Ayuda {
  const aLaDecena = (10 - (b % 10)) % 10;
  const desdeDecena = b + aLaDecena;
  const decenaDeA = a - (a % 10);
  const porDecenas = decenaDeA - desdeDecena;
  const sueltas = a - decenaDeA;
  const tramos: string[] = [];
  if (aLaDecena) tramos.push(`de ${b} a ${desdeDecena} hay ${aLaDecena}`);
  if (porDecenas) tramos.push(`de ${desdeDecena} a ${decenaDeA} hay ${porDecenas}`);
  if (sueltas) tramos.push(`de ${decenaDeA} a ${a} hay ${sueltas}`);
  return {
    pista: "No cuentes hacia atrás: cuenta hacia adelante desde el número pequeño, parando en las decenas.",
    pasos: [
      `Restar es ver cuánto hay de ${b} hasta ${a}.`,
      `Ve por tramos, apoyándote en las decenas: ${tramos.join(", ")}.`,
      `Junta los tramos: ${[aLaDecena, porDecenas, sueltas].filter(Boolean).join(" + ")} = ${a - b}.`,
    ],
    ojo: "Parar en la decena es lo que hace fácil el salto largo: de una decena a otra se cuenta de 10 en 10.",
  };
}

/** Sumar descomponiendo LOS DOS números y juntando lo igual con lo igual.
 *
 *  Es el método que las Mallas de Aprendizaje del grado 2 muestran trabajado,
 *  con este ejemplo exacto (p. 26):
 *
 *      Una posible forma de sumar 354 + 476
 *        300 y 400 son 700 · 50 y 70 son 120 · 4 y 6 son 10
 *        700 y 120 son 820; 820 y 10 son 830
 *
 *  Antes esto descomponía solo el segundo número y contaba hacia adelante
 *  (368 + 200, + 10, + 4). También es un algoritmo no convencional y también
 *  vale, pero obliga a cargar un número de tres cifras en la cabeza en cada
 *  paso. Juntando lo igual con lo igual, cada suma parcial es de una sola
 *  cifra. */
function sumaDescomponiendo(a: number, b: number): Ayuda {
  const partes = (n: number) => [Math.floor(n / 100) * 100, Math.floor((n % 100) / 10) * 10, n % 10];
  const [cA, dA, uA] = partes(a);
  const [cB, dB, uB] = partes(b);
  const nombres = ["las centenas", "las decenas", "las unidades"];

  const parciales: { texto: string; valor: number }[] = [];
  [[cA, cB], [dA, dB], [uA, uB]].forEach(([x, y], i) => {
    if (x === 0 && y === 0) return;
    parciales.push({ texto: `${nombres[i]}: ${x} y ${y} son ${x + y}`, valor: x + y });
  });

  // Y se juntan los parciales de a dos, que es como lo junta el documento.
  const juntar: string[] = [];
  let corriendo = parciales[0].valor;
  for (let i = 1; i < parciales.length; i++) {
    juntar.push(`${corriendo} y ${parciales[i].valor} son ${corriendo + parciales[i].valor}`);
    corriendo += parciales[i].valor;
  }

  return {
    pista: "Parte los dos números y junta lo igual con lo igual: las decenas con las decenas, las unidades con las unidades.",
    pasos: [
      `${a} es ${partes(a).filter(Boolean).join(" + ")} y ${b} es ${partes(b).filter(Boolean).join(" + ")}.`,
      `Junta lo que es igual — ${parciales.map((p) => p.texto).join("; ")}.`,
      `Ahora suma esos pedazos: ${juntar.join("; ")}.`,
    ],
    ojo: "Cada pedazo se suma aparte y son números redondos: se hace de cabeza, sin llevar nada.",
  };
}

export function ayudaPara(operation: string | undefined): Ayuda | null {
  if (!operation) return null;
  const op = operation.replace(/\s+/g, " ").trim();

  /* -------------------------------------------------- cadena numérica */
  /* El ejemplo oficial del DBA 8 del grado 2: un número entra, pasa por
     operaciones en fila y sale otro. Lo importante no es la cuenta: es que la
     cadena se puede recorrer al revés, y recorrerla al revés obliga a cambiar
     cada operación por la contraria. Eso es, literalmente, la primera
     evidencia del DBA — "establece relaciones de reversibilidad entre la suma
     y la resta". */
  const cadena = op.match(/^cadena (.+)$/);
  if (cadena) {
    const partes = cadena[1].split("|").map((t) => t.trim());
    const pasos = partes.slice(1, -1);
    const aplicar = (n: number, paso: string, alReves = false) => {
      const m = paso.match(/^([+−-])\s*(\d+)$/);
      if (!m) return null;
      const suma = m[1] === "+";
      return suma === !alReves ? n + Number(m[2]) : n - Number(m[2]);
    };
    const contrario = (paso: string) => (paso.startsWith("+") ? paso.replace("+", "−") : paso.replace(/^[−-]/, "+"));
    // "4 +3" se lee mal; el signo necesita su espacio, como en todo lo demás.
    const espaciado = (paso: string) => paso.replace(/^([+−-])\s*/, "$1 ").replace("-", "−");

    // Hacia adelante: se conoce la entrada.
    if (partes[partes.length - 1] === "?" && /^\d+$/.test(partes[0])) {
      let n = Number(partes[0]);
      const cuenta: string[] = [];
      for (const paso of pasos) {
        const antes = n;
        const sig = aplicar(n, paso);
        if (sig === null) return null;
        n = sig;
        cuenta.push(`${antes} ${espaciado(paso)} = ${n}`);
      }
      return {
        pista: "Entra un número por la izquierda y va cambiando en cada paso. Hazlos en orden, uno por uno.",
        pasos: [
          `Empieza con ${partes[0]} y aplica los pasos en orden, sin saltarte ninguno.`,
          cuenta.join(", luego "),
          `Sale ${n}.`,
        ],
        ojo: "Si haces los pasos en otro orden con sumas y restas llegas al mismo sitio, pero es más fácil perderse.",
      };
    }

    // Al revés: se conoce la salida y se busca la entrada.
    if (partes[0] === "?" && /^\d+$/.test(partes[partes.length - 1])) {
      let n = Number(partes[partes.length - 1]);
      const cuenta: string[] = [];
      for (const paso of [...pasos].reverse()) {
        const antes = n;
        const sig = aplicar(n, paso, true);
        if (sig === null) return null;
        n = sig;
        cuenta.push(`${antes} ${espaciado(contrario(paso))} = ${n}`);
      }
      return {
        pista: "Aquí conoces la salida, no la entrada: recorre la cadena al revés y cambia cada paso por el contrario.",
        pasos: [
          `De la salida hacia atrás, cada paso se deshace: lo que sumaba ahora resta, y lo que restaba ahora suma.`,
          `Empieza en ${partes[partes.length - 1]}: ${cuenta.join(", luego ")}.`,
          `La entrada era ${n}.`,
        ],
        ojo: "Deshacer no es repetir: si el paso decía sumar, para volver hay que restar.",
      };
    }
  }

  /* ------------------------------------------------------ multiplicación */
  const multi = op.match(/^(\d+) × (\d+) = \?$/);
  if (multi) {
    const a = Number(multi[1]);
    const b = Number(multi[2]);
    const parciales: number[] = [];
    for (let i = 1; i <= a; i++) parciales.push(b * i);
    return {
      pista: "Multiplicar es sumar montones iguales: cuenta de tantos en tantos como tenga cada montón.",
      pasos: [
        `${a} × ${b} quiere decir ${a} montones de ${b}.`,
        a <= MAX_PASOS
          ? `Cuenta de ${b} en ${b}: ${listar(parciales)}.`
          : `Súmalos de a poco: ${b} + ${b} = ${b * 2}, y así hasta juntar los ${a} montones.`,
        `En total hay ${a * b}.`,
      ],
      ojo: `${a} montones de ${b} y ${b} montones de ${a} dan lo mismo: puedes contar por el lado que te quede más fácil.`,
    };
  }

  /* ------------------------------------------------------------- reparto */
  const reparto = op.match(/^(\d+) ÷ (\d+) = \?$/);
  if (reparto) {
    const total = Number(reparto[1]);
    const partes = Number(reparto[2]);
    const cada = total / partes;
    return {
      pista: "Repartir por igual es ver cuánto le toca a cada uno cuando no le sobra a nadie.",
      pasos: [
        `Tienes ${total} para repartir entre ${partes}, y a todos les tiene que tocar lo mismo.`,
        `Piénsalo al revés: ¿cuántos hay que darle a cada uno para gastar los ${total}? ${partes} × ${cada} = ${total}.`,
        `A cada uno le tocan ${cada}.`,
      ],
      ojo: "Repartir y multiplicar son la misma cuenta al derecho y al revés.",
    };
  }

  /* --------------------------------------- multiplicación con un hueco */
  const multiFalta = op.match(/^(\d+) × \? = (\d+)$/);
  const multiFaltaIzq = op.match(/^\? × (\d+) = (\d+)$/);
  if (multiFalta || multiFaltaIzq) {
    const dado = Number((multiFalta ?? multiFaltaIzq)![1]);
    const total = Number((multiFalta ?? multiFaltaIzq)![2]);
    const falta = total / dado;
    return {
      pista: "Busca por cuánto hay que multiplicar el número que ya tienes para llegar al total.",
      pasos: [
        `Ya tienes ${dado} y quieres llegar a ${total}.`,
        `Cuenta de ${dado} en ${dado} hasta ${total} y mira cuántos saltos diste.`,
        `Son ${falta}, porque ${dado} × ${falta} = ${total}.`,
      ],
      ojo: `Sumar ${dado} y ${total} no sirve aquí: lo que falta es un número de veces, no una cantidad.`,
    };
  }

  /* -------------------------------- decenas enteras, y las columnas */
  const sumaGrande = op.match(/^(\d+) \+ (\d+) = \?$/);
  if (sumaGrande) {
    const a = Number(sumaGrande[1]);
    const b = Number(sumaGrande[2]);
    if (a >= 10 && b >= 10 && ((b % 10 === 0 && b < 100) || b % 100 === 0)) return decenaRedonda(a, b, true);
    if (a >= 10 && b >= 10) return sumaDescomponiendo(a, b);
  }
  const restaGrande = op.match(/^(\d+) [−-] (\d+) = \?$/);
  if (restaGrande) {
    const a = Number(restaGrande[1]);
    const b = Number(restaGrande[2]);
    if (a >= 10 && b >= 10 && ((b % 10 === 0 && b < 100) || b % 100 === 0)) return decenaRedonda(a, b, false);
    if (a >= 10 && b >= 10) return restaCompletando(a, b);
  }


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
        pista: "Averigua de cuánto en cuánto salta la secuencia y para qué lado, y dale ese mismo salto al último número.",
        pasos: [
          `Mira de cuánto en cuánto va: de ${nums[0]} a ${nums[1]} ${paso > 0 ? `sube ${paso}` : `baja ${-paso}`}.`,
          `Y sigue saltando igual hasta ${ultimo}.`,
          `Entonces el que sigue es ${ultimo} ${paso > 0 ? `+ ${paso}` : `− ${-paso}`} = ${ultimo + paso}.`,
        ],
        ojo: "Lo primero siempre es averiguar de cuánto en cuánto salta, y para qué lado.",
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
