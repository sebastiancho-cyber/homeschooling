/* La ilustración se DERIVA del ejercicio, no se etiqueta a mano.

   Con cientos de ejercicios, etiquetarlos uno a uno garantiza que tarde o
   temprano el dibujo deje de corresponder al enunciado. Derivándola, cambiar el
   ejercicio cambia el dibujo solo.

   Solo se ilustra donde el dibujo AÑADE algo: mostrar la cantidad para que se
   pueda contar, los montones para que se vea el agrupamiento, los dieces para
   que se vea por qué se llaman así. Donde no aporta, no se pone nada.

   Las formas que entiende están en src/components/Ilustracion.tsx y
   src/components/Figura.tsx: agregar una aquí sin agregarla allá deja el
   ejercicio con un dibujo que no se pinta. */

const ICONOS_BASE = [
  [/medias/i, "🧦"], [/zapatos/i, "👟"], [/guantes/i, "🧤"], [/manos/i, "✋"],
  [/manzana/i, "🍎"], [/dulce/i, "🍬"], [/globo/i, "🎈"], [/galleta/i, "🍪"],
  [/uva/i, "🍇"], [/arepa/i, "🫓"], [/crayola/i, "🖍️"], [/bomba/i, "🎈"],
  [/carrito/i, "🚗"], [/pájaro|pajaro/i, "🐦"], [/lápiz|lapiz|lápices/i, "✏️"],
  [/ficha/i, "🔵"], [/sticker/i, "⭐"],
];

/* Las figuras geométricas, derivadas del texto igual que todo lo demás.
   Ver src/components/Figura.tsx. */
const FIGURAS = ["triángulo", "cuadrado", "rectángulo", "círculo", "cubo", "esfera", "cilindro", "cono", "prisma", "pirámide"];
const sinTildes = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

function figuraDe(texto) {
  const t = sinTildes(texto);
  for (const f of FIGURAS) {
    const sin = sinTildes(f);
    // Anclado al principio: "Prisma rectangular" no puede contar como
    // "rectángulo", que es una figura plana y otra cosa.
    if (t === sin || t.startsWith(sin + " ") || t.startsWith(sin + "s")) return f;
  }
  return null;
}

/* Las cuatro opciones son figuras → se dibujan las cuatro.

   Es lo que separa "escoger la palabra triángulo" de "mirar cuál de estos
   tiene 3 lados". Solo se hace cuando las CUATRO son figuras: si una sola se
   quedara sin dibujo, el dibujo mismo sería la pista de cuál es la respuesta. */
function figurasDeOpciones(v) {
  const nombres = v.o.map(figuraDe);
  return nombres.every(Boolean) ? nombres : null;
}

/* El ilustrador de un grado.

   `iconosExtra` es lo único que cambia de un grado a otro: el vocabulario. Un
   grado que hable de canicas le pasa [[/canica/i, "🔴"]] y el resto sigue
   igual. Van de primeras, así que un grado puede además corregir un icono base
   que no le sirva. */
function ilustrador(iconosExtra = []) {
  const ICONOS = [...iconosExtra, ...ICONOS_BASE];
  const iconoDe = (texto, porDefecto = "🔵") => {
    for (const [re, ico] of ICONOS) if (re.test(texto)) return ico;
    return porDefecto;
  };

  function visualPara(v) {
    const op = v.op ?? "";

    /* La figura del enunciado, cuando lo que se mide es CONTAR sus lados, sus
       puntas o sus esquinas. Ahí el dibujo no regala nada: es el ejercicio.

       No se dibuja cuando la pregunta es reconocer la figura a partir de una
       descripción ("Tiene 3 lados y 3 puntas. Es un:"), porque ahí el dibujo SÍ
       sería la respuesta. Esas llevan las figuras en las opciones. */
    const preguntaCuantos = /cuántos|cuántas/i.test(v.p) && /lados|puntas|esquinas|palitos/i.test(v.p);
    const planaNombrada = v.p.match(/\b(triángulo|cuadrado|rectángulo|círculo)\b/i);
    if (preguntaCuantos && planaNombrada) {
      return { vis: { tipo: "figura", nombre: planaNombrada[1].toLowerCase() } };
    }

    // Pictograma: la línea de operación son solo emojis. El dibujo ES el dato,
    // así que reemplaza a la línea en vez de acompañarla.
    // Se permiten + − · como separadores: son los que dicen QUÉ operación es.
    const soloEmojis = op.length > 0 && !/[a-zA-Z0-9=?]/.test(op);
    if (soloEmojis) {
      const partir = (sep) => op.split(sep).map((t) => [...t].filter((c) => c.trim().length > 0));

      const juntados = partir("+");
      if (juntados.length === 2 && juntados.every((m) => m.length > 0)) {
        return {
          vis: { tipo: "juntar", icono: juntados[0][0], primero: juntados[0].length, segundo: juntados[1].length },
          quitarOp: true,
        };
      }

      const quitados = partir(/[−-]/);
      if (quitados.length === 2 && quitados.every((m) => m.length > 0)) {
        // Los de la derecha son los que SE VAN, no un montón aparte que se suma.
        return {
          vis: { tipo: "quitar", icono: quitados[0][0], cantidad: quitados[0].length, seVan: quitados[1].length },
          quitarOp: true,
        };
      }

      const montones = partir("·");
      if (montones.length >= 2 && montones.every((m) => m.length > 0)) {
        // Varias colecciones alineadas: la pregunta es cuál tiene más, y eso se
        // ve antes de contar si todas las filas empiezan en la misma vertical.
        return {
          vis: {
            tipo: "comparar",
            icono: montones[0][0],
            lados: montones.map((m, i) => ({ etiqueta: `Grupo ${i + 1}`, cantidad: m.length })),
          },
          quitarOp: true,
        };
      }
      if (montones.length === 1 && montones[0].length > 0) {
        return { vis: { tipo: "contar", icono: montones[0][0], cantidad: montones[0].length }, quitarOp: true };
      }
    }

    // Votaciones: "Rojo 3 · Azul 5 · Verde 2". Las barras muestran etiqueta y
    // valor, así que también reemplazan la línea.
    if (op.includes("·") && /[A-Za-zÁÉÍÓÚáéíóúñ]+\s+\d+/.test(op)) {
      const datos = op.split("·").map((t) => t.trim()).map((t) => {
        const m = t.match(/^(.+?)\s+(\d+)$/);
        return m ? { etiqueta: m[1], valor: Number(m[2]) } : null;
      });
      if (datos.every(Boolean) && datos.length >= 2) {
        return { vis: { tipo: "barras", datos }, quitarOp: true };
      }
    }

    // Grupos iguales: "2 + 2 + 2 + 2 = ?". Aquí la operación SÍ se queda: el
    // dibujo muestra los montones y la línea muestra cómo se escribe.
    const repetida = op.match(/^(\d+)(?: \+ \1)+ = \?$/);
    if (repetida) {
      const porGrupo = Number(repetida[1]);
      const grupos = op.split("+").length;
      return { vis: { tipo: "grupos", icono: iconoDe(v.p), grupos, porGrupo } };
    }

    // Juntar: una suma en la que algo LLEGA. El dibujo modela la situación —el
    // segundo montón entra después del primero—, no la cuenta.
    //
    // Por eso mismo no se ilustra "¿Cuánto es? 4 + 5 = ?": ahí la cuenta ES la
    // destreza que se mide, y dibujarla la regala. La regla no es "toda suma
    // lleva dibujo", es "toda situación lleva dibujo".
    const sumaSimple = op.match(/^(\d+) \+ (\d+) = \?$/);
    if (sumaSimple && /le dan|le regalan|llegan|le prestan|le ponen|echa/i.test(v.p)) {
      return {
        vis: {
          tipo: "juntar",
          icono: iconoDe(v.p),
          primero: Number(sumaSimple[1]),
          segundo: Number(sumaSimple[2]),
        },
      };
    }

    // Valor posicional, en sus dos formas.
    const tieneDU = v.p.match(/(\d+)\s+decenas?\s+y\s+(\d+)\s+unidad/i);
    if (tieneDU) {
      return { vis: { tipo: "decenas", decenas: Number(tieneDU[1]), unidades: Number(tieneDU[2]) } };
    }
    const numeroTiene = v.p.match(/^El número (\d+) tiene:$/);
    if (numeroTiene) {
      const n = Number(numeroTiene[1]);
      return { vis: { tipo: "decenas", decenas: Math.floor(n / 10), unidades: n % 10 } };
    }

    // Quitar: una resta con un contexto en el que algo se va.
    const resta = op.match(/^(\d+) − (\d+) = \?$/);
    // Nada de "usas": en medición, "usas 5 clips de cinta" no son cinco objetos
    // que se van, y dibujarlos así enseña algo falso.
    if (resta && /come|regala|pierde|revienta|se van/i.test(v.p)) {
      return {
        vis: { tipo: "quitar", icono: iconoDe(v.p), cantidad: Number(resta[1]), seVan: Number(resta[2]) },
      };
    }

    return null;
  }

  return { visualPara, figurasDeOpciones, figuraDe, iconoDe };
}

module.exports = { ilustrador, figuraDe, figurasDeOpciones, FIGURAS, ICONOS_BASE };
