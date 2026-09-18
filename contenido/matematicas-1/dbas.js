/* El contenido de Matemáticas, grado 1.

   Esto es lo ÚNICO que cambia de un grado a otro. Todo lo demás —los moldes de
   los distractores, los detectores de fugas, el control de calidad, el SQL—
   vive en `contenido/nucleo/` y se comparte, para que un arreglo hecho una vez
   quede hecho para todos.

   La estructura es la del MEN: cada DBA trae sus evidencias de aprendizaje, y
   cada `slot` (ranura) es una pregunta de la lección, con `e` apuntando a la
   evidencia que mide y tres versiones `v` que se sortean al jugar.

     evidencias: los textos del MEN, en su orden.
     slots: [{ e: nº de evidencia, v: [tres versiones] }]
     versión: { p: enunciado, op: línea de operación, o: [4 opciones], c: 0 }

   La correcta va SIEMPRE de primera y el barajado lo hace el servidor. */

const { suma, resta, falta, secuencia } = require("../nucleo/calculo.js");

/* Llegar al diez es una ranura propia del grado 1 —el paso por la decena es la
   estrategia que el DBA 2 quiere que el niño acabe usando— así que se arma
   aquí y no en el núcleo. */
const { opciones } = require("../nucleo/calculo.js");
const alDiez = (a) => ({
  p: `¿Cuánto le falta a ${a} para llegar a 10?`, op: `${a} + ? = 10`,
  o: opciones(10 - a, 10 + a, 4 * a + 1), c: 0,
});

const DBAS = {
  1: {
    evidencias: [
      "Construye e interpreta representaciones pictóricas y diagramas para representar relaciones entre cantidades que se presentan en situaciones o fenómenos.",
      "Explica cómo y por qué es posible hacer una operación (suma o resta) en relación con los usos de los números y el contexto en el cual se presentan.",
      "Reconoce en sus actuaciones cotidianas posibilidades de uso de los números y las operaciones.",
      "Interpreta y resuelve problemas de juntar, quitar y completar, que involucren la cantidad de elementos de una colección o la medida de magnitudes como longitud, peso, capacidad y duración.",
      "Utiliza las operaciones (suma y resta) para representar el cambio en una cantidad.",
    ],
    slots: [
      { e: 3, v: [
        { p: "¿En cuál el número dice CUÁNTOS hay?", o: ["Compré 5 manzanas", "Vivo en el piso 3", "Tomo el bus 20", "Marco el teléfono 315"], c: 0 },
        { p: "¿En cuál el número dice CUÁNTOS hay?", o: ["Conté 7 perros", "Vivo en la casa 7", "Veo el canal 7", "Llegué de 7º"], c: 0 },
        { p: "¿En cuál el número dice CUÁNTOS hay?", o: ["Serví 3 galletas", "Subo al piso 3", "Tomo la ruta 3", "Uso la talla 3"], c: 0 },
      ]},
      { e: 3, v: [
        // Los números van en palabras: escrito "2º", la correcta era la única
        // con esa bolita, y eso se ve sin entender nada de lo que se pregunta.
        { p: "¿En cuál el número dice el ORDEN?", o: ["Llegó de segundo", "Tiene dos perros", "Mide dos metros", "Vive en la casa dos"], c: 0 },
        { p: "¿En cuál el número dice el ORDEN?", o: ["Quedó de quinto", "Tiene cinco años", "Pesa cinco kilos", "Compró cinco panes"], c: 0 },
        { p: "¿En cuál el número dice el ORDEN?", o: ["Es el primero de la fila", "Tiene un hermano", "Mide un metro", "Cuesta un peso"], c: 0 },
      ]},
      { e: 3, v: [
        // El enunciado nombra la CATEGORÍA (una medida), no el verbo de la
        // respuesta. Preguntar "¿cuánto mide?" y responder "Mide 3 metros" le
        // regala el punto a quien solo sabe emparejar palabras.
        { p: "¿En cuál el número es una MEDIDA?", o: ["Mide 3 metros", "Tengo 3 primos", "Vivo en el piso 3", "Soy el número 3"], c: 0 },
        { p: "¿En cuál el número es una MEDIDA?", o: ["Pesa 2 kilos", "Tengo 2 gatos", "Llegué de 2º", "Vivo en el 2"], c: 0 },
        { p: "¿En cuál el número es una MEDIDA?", o: ["Dura 5 minutos", "Hay 5 sillas", "Es el puesto 5", "Tomo la ruta 5"], c: 0 },
      ]},
      // ev1 — "Construye e INTERPRETA representaciones pictóricas". La mitad
      // de construir no la puede medir una selección múltiple; la de
      // interpretar sí: se muestra el dibujo y el niño dice qué cuenta es.
      { e: 1, v: [
        { p: "¿Qué cuenta muestra el dibujo?", op: "🚗🚗🚗🚗 + 🚗🚗🚗", o: ["4 + 3", "4 − 3", "3 + 3", "4 + 4"], c: 0 },
        { p: "¿Qué cuenta muestra el dibujo?", op: "🍎🍎🍎🍎🍎 + 🍎🍎", o: ["5 + 2", "5 − 2", "2 + 2", "5 + 5"], c: 0 },
        { p: "¿Qué cuenta muestra el dibujo?", op: "🎈🎈🎈 + 🎈🎈🎈🎈", o: ["3 + 4", "4 − 3", "3 + 3", "4 + 4"], c: 0 },
      ]},
      { e: 1, v: [
        // "Los apagados se van" no es lenguaje de seis años, y las restas al
        // revés (2 − 7) son opciones muertas: nadie las marca.
        { p: "¿Qué cuenta muestra el dibujo? Los grises ya se fueron.", op: "🍬🍬🍬🍬🍬🍬🍬 − 🍬🍬", o: ["7 − 2", "7 + 2", "5 − 2", "7 − 5"], c: 0 },
        { p: "¿Qué cuenta muestra el dibujo? Los grises ya se fueron.", op: "🍪🍪🍪🍪🍪🍪 − 🍪🍪🍪", o: ["6 − 3", "6 + 3", "3 − 3", "6 − 2"], c: 0 },
        { p: "¿Qué cuenta muestra el dibujo? Los grises ya se fueron.", op: "🎈🎈🎈🎈🎈 − 🎈", o: ["5 − 1", "5 + 1", "4 − 1", "5 − 4"], c: 0 },
      ]},
      { e: 4, v: [
        suma(3, 2, "Ana tiene 3 bombas. Le regalan 2."),
        suma(4, 3, "Luis tiene 4 carritos. Le dan 3."),
        suma(5, 2, "Hay 5 pájaros. Llegan 2 más."),
      ]},
      { e: 4, v: [
        resta(4, 1, "Tienes 4 manzanas. Regalas 1."),
        resta(7, 2, "Tienes 7 dulces. Regalas 2."),
        resta(6, 2, "Hay 6 globos. Se revientan 2."),
      ]},

      { e: 4, v: [
        falta(3, 7, "Tengo 3 lápices. Quiero 7. ¿Cuántos faltan?"),
        falta(4, 9, "Tengo 4 fichas. Quiero 9. ¿Cuántas faltan?"),
        falta(2, 8, "Tengo 2 stickers. Quiero 8. ¿Cuántos faltan?"),
      ]},
      { e: 5, v: [
        // Antes las opciones eran Sumo / Resto / Cuento hacia atrás / No hago
        // nada: las dos del medio significan lo mismo, así que caían juntas, y
        // la cuarta no la marca nadie. Quedaba una sola opción viva.
        { p: "Al bus se suben 3 niños. Para saber cuántos hay ahora:", o: ["Sumo", "Resto", "Cuento los que se bajaron", "Cuento los asientos del bus"], c: 0 },
        { p: "Del bus se bajan 3 niños. Para saber cuántos quedan:", o: ["Resto", "Sumo", "Cuento los que se subieron", "Cuento las sillas"], c: 0 },
        { p: "Metes 2 lápices más a la cartuchera. Para saber cuántos hay:", o: ["Sumo", "Resto", "Cuento los que metí", "Cuento las cartucheras"], c: 0 },
      ]},
      // ev2 — "Explica cómo y por qué es posible hacer una operación en
      // relación con los USOS de los números". El ejemplo oficial del DBA 1
      // pide justamente esto: distinguir con cuáles números se puede operar.
      // Es la ranura más difícil del tema y por eso va de últimas.
      { e: 2, v: [
        // "Dato" está fuera del vocabulario de seis años, y los dos distractores
        // se podían defender: 7 + 9 = 16 sí puede ser la camiseta de otro.
        { p: "Dos jugadores tienen las camisetas 7 y 9. Sumarlas da:", o: ["Un número que no sirve para nada", "Los goles del equipo", "Cuántos jugadores hay", "La edad de los dos"], c: 0 },
        { p: "Sumas el número de tu casa y el de tu bus. El total es:", o: ["Un número que no sirve para nada", "El número de tu cuadra", "El número de otro bus", "El número de tu colegio"], c: 0 },
        { p: "Sumar dos números de teléfono sirve para:", o: ["No sirve para nada", "Llamar a los dos", "Saber quién llama", "Hacer una llamada larga"], c: 0 },
      ]},
      { e: 2, v: [
        // La palabra clave del enunciado va también en un distractor: si solo
        // estuviera en la correcta, emparejar palabras bastaría para acertar.
        { p: "Metiste 3 goles y después 2. Sumarlos te dice:", o: ["Cuántos goles metiste", "En qué minuto los metiste", "Cuánto duró el partido", "Qué camiseta usas"], c: 0 },
        { p: "Tienes 4 monedas y te dan 2. Sumarlas te dice:", o: ["Cuánto dinero tienes", "Cuánto pesa lo que tienes", "De qué año son", "Cuál moneda es"], c: 0 },
        { p: "En el bus van 8 personas y suben 3. Sumas para saber:", o: ["Cuántas personas van", "Dónde se bajan las personas", "Cuánto cuesta el pasaje", "Qué ruta hace el bus"], c: 0 },
      ]},
      { e: 5, v: [
        { p: "De la caja se pierden 4 crayolas. Para saber cuántas quedan:", o: ["Resto", "Sumo", "Cuento las que se perdieron", "Cuento las cajas"], c: 0 },
        { p: "Llegan 5 galletas más al paquete. Para saber cuántas hay:", o: ["Sumo", "Resto", "Cuento las que llegaron", "Cuento los paquetes"], c: 0 },
        { p: "Se van 3 niños del salón. Para saber cuántos quedan:", o: ["Resto", "Sumo", "Cuento los que se fueron", "Cuento los salones"], c: 0 },
      ]},
    ],
  },
  2: {
    evidencias: [
      "Realiza conteos (de uno en uno, de dos en dos, etc.) iniciando en cualquier número.",
      "Determina la cantidad de elementos de una colección agrupándolos de 1 en 1, de 2 en 2, de 5 en 5.",
      "Describe y resuelve situaciones variadas con las operaciones de suma y resta en problemas cuya estructura puede ser a + b = ?, a + ? = c, o ? + b = c.",
      "Establece y argumenta conjeturas de los posibles resultados en una secuencia numérica.",
      "Utiliza las características del sistema decimal de numeración para crear estrategias de cálculo y estimación de sumas y restas.",
    ],
    slots: [
      { e: 1, v: [
        secuencia([7, 8, 9], 10, [11, 6, 12], "Cuenta de 1 en 1. ¿Qué sigue?"),
        secuencia([4, 5, 6], 7, [8, 3, 9], "Cuenta de 1 en 1. ¿Qué sigue?"),
        secuencia([12, 13, 14], 15, [16, 11, 17], "Cuenta de 1 en 1. ¿Qué sigue?"),
      ]},
      { e: 1, v: [
        secuencia([4, 6, 8], 10, [9, 12, 7], "Cuenta de 2 en 2. ¿Qué sigue?"),
        secuencia([2, 4, 6], 8, [7, 10, 5], "Cuenta de 2 en 2. ¿Qué sigue?"),
        secuencia([10, 12, 14], 16, [15, 18, 13], "Cuenta de 2 en 2. ¿Qué sigue?"),
      ]},
      { e: 2, v: [
        { p: "Hay 4 pares de medias. Cuéntalas de 2 en 2.", op: "2 + 2 + 2 + 2 = ?", o: ["8", "6", "4", "10"], c: 0 },
        { p: "Hay 3 pares de zapatos. Cuéntalos de 2 en 2.", op: "2 + 2 + 2 = ?", o: ["6", "5", "3", "8"], c: 0 },
        { p: "Hay 5 pares de guantes. Cuéntalos de 2 en 2.", op: "2 + 2 + 2 + 2 + 2 = ?", o: ["10", "7", "5", "12"], c: 0 },
      ]},
      { e: 2, v: [
        // Antes decía "tres manos abiertas" y el dibujo salían quince manos, no
        // tres manos de cinco dedos. Ahora el montón y lo que se cuenta son la
        // misma cosa: bolsas con dulces adentro.
        { p: "Hay 3 bolsas con 5 dulces cada una.", op: "5 + 5 + 5 = ?", o: ["15", "8", "10", "20"], c: 0 },
        { p: "Hay 2 cajas con 5 crayolas cada una.", op: "5 + 5 = ?", o: ["10", "7", "5", "15"], c: 0 },
        { p: "Hay 4 platos con 5 uvas cada uno.", op: "5 + 5 + 5 + 5 = ?", o: ["20", "9", "15", "25"], c: 0 },
      ]},
      { e: 3, v: [suma(5, 3), suma(6, 2), suma(4, 5)] },
      { e: 3, v: [resta(9, 3), resta(8, 5), resta(10, 4)] },
      // El ejemplo oficial del DBA 2 es explorar qué hace la tecla = al
      // presionarla varias veces. Es la semilla de la multiplicación y no
      // teníamos nada de eso.
      { e: 4, v: [
        // La versión de la calculadora dependía de que el = repitiera el
        // operando, cosa que no hacen todas, y "tres veces" admitía dos
        // lecturas: las dos estaban entre las opciones. La idea del ejemplo
        // oficial —sumar lo mismo una y otra vez— se conserva sin el aparato.
        { p: "Vas sumando 2 cada vez. ¿Qué número sigue?", op: "5, 7, 9, ?", o: ["11", "10", "12", "14"], c: 0 },
        { p: "Vas sumando 3 cada vez. ¿Qué número sigue?", op: "4, 7, 10, ?", o: ["13", "12", "14", "16"], c: 0 },
        { p: "Vas sumando 5 cada vez. ¿Qué número sigue?", op: "2, 7, 12, ?", o: ["17", "16", "18", "22"], c: 0 },
      ]},
      // ev5 pide ESTIMAR, y hasta ahora solo le preguntábamos cuentas exactas.
      { e: 5, v: [
        // Antes daba justo 40 y no había nada que estimar.
        { p: "Sin hacer la cuenta, 18 + 19 está cerca de:", o: ["40", "20", "60", "80"], c: 0 },
        { p: "Sin hacer la cuenta, 28 + 31 está cerca de:", o: ["60", "30", "90", "15"], c: 0 },
        { p: "Sin hacer la cuenta, 41 − 19 está cerca de:", o: ["20", "60", "40", "5"], c: 0 },
      ]},
      { e: 5, v: [
        { p: "¿Cuántos dieces necesitas para armar 30?", o: ["3", "30", "13", "10"], c: 0 },
        { p: "¿Cuántos dieces necesitas para armar 50?", o: ["5", "50", "15", "10"], c: 0 },
        { p: "Con 4 dieces y 2 unos armas el número:", o: ["42", "24", "6", "402"], c: 0 },
      ]},
      { e: 4, v: [
        { p: "En 2, 4, 6, 8... todos los números son:", o: ["Pares", "Impares", "Unos pares y otros no", "Mayores que 10"], c: 0 },
        { p: "En 1, 3, 5, 7... todos los números son:", o: ["Impares", "Pares", "Unos pares y otros no", "Menores que 3"], c: 0 },
        { p: "En 5, 10, 15, 20... todos terminan en:", o: ["5 o en 0", "1 o en 2", "3 o en 4", "7 o en 9"], c: 0 },
      ]},
    ],
  },
  3: {
    evidencias: [
      'Realiza composiciones y descomposiciones de números de dos dígitos en términos de la cantidad de "dieces" y de "unos" que los conforman.',
      "Encuentra parejas de números que al adicionarse dan como resultado otro número dado.",
      'Halla los números correspondientes a tener "diez más" o "diez menos" que una cantidad determinada.',
      'Emplea estrategias de cálculo como "el paso por el diez" para realizar adiciones o sustracciones.',
    ],
    slots: [
      { e: 1, v: [
        { p: "¿Qué número tiene 5 decenas y 2 unidades?", o: ["52", "25", "502", "7"], c: 0 },
        { p: "¿Qué número tiene 3 decenas y 6 unidades?", o: ["36", "63", "306", "9"], c: 0 },
        { p: "¿Qué número tiene 8 decenas y 1 unidad?", o: ["81", "18", "801", "9"], c: 0 },
      ]},
      { e: 1, v: [
        // Decir "4 decenas y 3 unidades" o "3 unidades y 4 decenas" es decir lo
        // mismo: las dos tenían que ser falsas y se descartaban juntas. Y
        // "34 decenas" no lo marca nadie. Quedaba una sola opción en pie.
        { p: "El número 34 tiene:", o: ["3 decenas y 4 unidades", "4 decenas y 3 unidades", "3 decenas y 0 unidades", "1 decena y 4 unidades"], c: 0 },
        { p: "El número 47 tiene:", o: ["4 decenas y 7 unidades", "7 decenas y 4 unidades", "4 decenas y 0 unidades", "1 decena y 7 unidades"], c: 0 },
        { p: "El número 29 tiene:", o: ["2 decenas y 9 unidades", "9 decenas y 2 unidades", "2 decenas y 0 unidades", "1 decena y 9 unidades"], c: 0 },
      ]},
      { e: 1, v: [
        { p: "El número 70 tiene:", o: ["7 decenas y 0 unidades", "0 decenas y 7 unidades", "7 decenas y 7 unidades", "1 decena y 7 unidades"], c: 0 },
        { p: "El número 50 tiene:", o: ["5 decenas y 0 unidades", "0 decenas y 5 unidades", "5 decenas y 5 unidades", "1 decena y 5 unidades"], c: 0 },
        { p: "El número 90 tiene:", o: ["9 decenas y 0 unidades", "0 decenas y 9 unidades", "9 decenas y 9 unidades", "1 decena y 9 unidades"], c: 0 },
      ]},
      // El ejemplo oficial del DBA 3 es un juego con billetes de $1 y $10:
      // armar una cantidad de varias maneras y ver cuál usa menos billetes.
      // Preguntábamos "¿qué número tiene 5 decenas y 2 unidades?", que es la
      // sombra de reconocimiento de esa tarea.
      { e: 1, v: [
        // El ejemplo del MEN usa billetes de $1 y $10, que en Colombia no
        // existen. Con fichas de diez y de uno la idea es la misma y el niño sí
        // puede imaginarlas encima de la mesa.
        { p: "Armas 47 con fichas de 10 y de 1. ¿Cuál usa MENOS fichas?", o: ["4 de diez y 7 de uno", "3 de diez y 17 de uno", "2 de diez y 27 de uno", "47 de uno"], c: 0 },
        { p: "Armas 35 con fichas de 10 y de 1. ¿Cuál usa MENOS fichas?", o: ["3 de diez y 5 de uno", "2 de diez y 15 de uno", "1 de diez y 25 de uno", "35 de uno"], c: 0 },
        { p: "Armas 52 con fichas de 10 y de 1. ¿Cuál usa MENOS fichas?", o: ["5 de diez y 2 de uno", "4 de diez y 12 de uno", "3 de diez y 22 de uno", "52 de uno"], c: 0 },
      ]},
      { e: 2, v: [
        { p: "¿Cuál pareja suma 10?", o: ["6 y 4", "6 y 3", "5 y 6", "8 y 3"], c: 0 },
        // Con los tres distractores sumando 11, eran indistinguibles entre sí y
        // la correcta era la única distinta: se acertaba sin sumar.
        { p: "¿Cuál pareja suma 10?", o: ["7 y 3", "7 y 4", "6 y 2", "9 y 3"], c: 0 },
        { p: "¿Cuál pareja suma 10?", o: ["8 y 2", "8 y 3", "7 y 5", "6 y 2"], c: 0 },
      ]},
      { e: 4, v: [alDiez(8), alDiez(3), alDiez(9)] },
      { e: 4, v: [suma(7, 6), suma(8, 4), suma(9, 5)] },
      { e: 3, v: [
        { p: "¿Cuánto es?", op: "25 + 10 = ?", o: ["35", "26", "15", "45"], c: 0 },
        { p: "¿Cuánto es?", op: "42 + 10 = ?", o: ["52", "43", "32", "62"], c: 0 },
        { p: "¿Cuánto es?", op: "17 + 10 = ?", o: ["27", "18", "7", "37"], c: 0 },
      ]},
      { e: 3, v: [
        { p: "¿Cuánto es?", op: "40 − 10 = ?", o: ["30", "39", "50", "20"], c: 0 },
        { p: "¿Cuánto es?", op: "56 − 10 = ?", o: ["46", "55", "66", "36"], c: 0 },
        { p: "¿Cuánto es?", op: "83 − 10 = ?", o: ["73", "82", "93", "63"], c: 0 },
      ]},
      { e: 3, v: [
        { p: "Diez más que 63 es:", o: ["73", "64", "53", "630"], c: 0 },
        { p: "Diez más que 28 es:", o: ["38", "29", "18", "280"], c: 0 },
        { p: "Diez menos que 45 es:", o: ["35", "44", "55", "450"], c: 0 },
      ]},
      { e: 2, v: [
        { p: "¿Cuál pareja suma 20?", o: ["15 y 5", "15 y 10", "12 y 6", "10 y 5"], c: 0 },
        { p: "¿Cuál pareja suma 20?", o: ["12 y 8", "12 y 10", "14 y 5", "11 y 8"], c: 0 },
        { p: "¿Cuál pareja suma 15?", o: ["10 y 5", "10 y 10", "9 y 5", "8 y 6"], c: 0 },
      ]},
    ],
  },
  4: {
    evidencias: [
      "Identifica atributos que se pueden medir en los objetos.",
      "Diferencia atributos medibles (longitud, masa, capacidad, duración, cantidad de elementos de una colección), en términos de los instrumentos y las unidades utilizadas para medirlos.",
      "Compara y ordena objetos de acuerdo con atributos como altura, peso, intensidades de color, entre otros y recorridos según la distancia de cada trayecto.",
      "Compara y ordena colecciones según la cantidad de elementos.",
    ],
    slots: [
      { e: 4, v: [
        { p: "¿Cuál grupo tiene MÁS estrellas?", op: "⭐⭐⭐⭐⭐⭐⭐⭐ · ⭐⭐⭐⭐⭐ · ⭐⭐⭐", o: ["El grupo 1", "El grupo 2", "El grupo 3", "Todos tienen igual"], c: 0 },
        { p: "¿Cuál grupo tiene MÁS bolas?", op: "🔵🔵🔵🔵 · 🔵🔵🔵🔵🔵🔵🔵 · 🔵🔵", o: ["El grupo 2", "El grupo 1", "El grupo 3", "Todos tienen igual"], c: 0 },
        { p: "¿Cuál grupo tiene MÁS fichas?", op: "🟦🟦🟦 · 🟦🟦🟦🟦 · 🟦🟦🟦🟦🟦🟦🟦🟦🟦", o: ["El grupo 3", "El grupo 1", "El grupo 2", "Todos tienen igual"], c: 0 },
      ]},
      { e: 4, v: [
        { p: "¿Cuál grupo tiene MENOS?", o: ["2 flores", "5 flores", "7 flores", "9 flores"], c: 0 },
        { p: "¿Cuál grupo tiene MENOS?", o: ["3 lápices", "6 lápices", "8 lápices", "11 lápices"], c: 0 },
        { p: "¿Cuál grupo tiene MENOS?", o: ["1 galleta", "4 galletas", "7 galletas", "10 galletas"], c: 0 },
      ]},
      { e: 1, v: [
        { p: "¿Qué se puede medir de una cuerda?", o: ["Su largo", "Su color", "Su nombre", "Su dueño"], c: 0 },
        { p: "¿Qué se puede medir de una piedra?", o: ["Su peso", "Su nombre", "Si es bonita", "Su sabor"], c: 0 },
        { p: "¿Qué se puede medir de una canción?", o: ["Cuánto dura", "Su color", "Su peso", "Su sabor"], c: 0 },
      ]},
      { e: 1, v: [
        { p: "¿Qué se puede medir de una caja de jugo?", o: ["Cuánto le cabe", "De qué marca es", "De qué sabor es", "Qué dibujo tiene"], c: 0 },
        { p: "¿Qué se puede medir de una botella?", o: ["Cuánta agua le cabe", "De qué marca es", "De qué color es", "Cómo es la tapa"], c: 0 },
        { p: "¿Qué se puede medir de un salón?", o: ["Cuántos niños caben", "Cómo se llama el salón", "De qué color es", "Quién es el profe"], c: 0 },
      ]},
      { e: 3, v: [
        { p: "¿Cuál es el MÁS CORTO?", o: ["Un clip", "Un lápiz", "Una regla", "Una escoba"], c: 0 },
        { p: "¿Cuál es el MÁS LARGO?", o: ["Un bus", "Una bicicleta", "Un patín", "Un zapato"], c: 0 },
        { p: "¿Cuál es el MÁS ALTO?", o: ["Un árbol", "Una silla", "Un perro", "Una hormiga"], c: 0 },
      ]},
      { e: 3, v: [
        { p: "¿Cuál pesa MÁS?", o: ["Un balde de agua", "Un vaso de agua", "Una cuchara de agua", "Una gota de agua"], c: 0 },
        { p: "¿Cuál pesa MÁS?", o: ["Un bulto de papas", "Una bolsa de papas", "Una papa", "Un pedazo de papa"], c: 0 },
        { p: "¿Cuál pesa MENOS?", o: ["Una hoja de papel", "Un cuaderno", "Un libro", "Una maleta"], c: 0 },
      ]},
      // El ejemplo oficial del DBA 4 llena cajas de distinto tamaño con
      // algodón, arroz y plastilina para que la MÁS PEQUEÑA quede con el mayor
      // peso. Que tamaño y peso no sean lo mismo no lo preguntábamos en
      // ninguna parte: todas nuestras comparaciones de peso eran del mismo
      // material, donde el más grande siempre gana.
      { e: 3, v: [
        { p: "Cajas iguales con algodón, arroz y plastilina. ¿Cuál pesa más?", o: ["La de plastilina", "La de algodón", "La de arroz", "Todas pesan igual"], c: 0 },
        // La versión vieja no era determinable: una caja bastante más grande de
        // algodón sí pesa más que una chiquita de plastilina, y "No se puede
        // saber" estaba entre las opciones marcada como falsa. Con piedras y
        // bombas infladas la diferencia sí es segura.
        { p: "Caja grande de bombas o caja chiquita de piedras. ¿Cuál pesa más?", o: ["La caja de las piedras", "La caja de las bombas", "La caja pesa igual que la otra", "No se puede saber"], c: 0 },
        { p: "Bola de icopor grande o bola de metal pequeña. ¿Cuál pesa más?", o: ["La bola de metal", "La bola de icopor", "Las dos bolas pesan igual", "No se puede saber"], c: 0 },
      ]},
      { e: 2, v: [
        { p: "¿Con qué sabes cuánto PESA una fruta?", o: ["Con una balanza", "Con una regla", "Con un reloj", "Con un vaso"], c: 0 },
        { p: "¿Con qué sabes cuánto PESA un bulto?", o: ["Con una balanza", "Con un metro", "Con un reloj", "Con una jarra"], c: 0 },
        { p: "¿Con qué sabes cuánto MIDE una mesa?", o: ["Con un metro", "Con una balanza", "Con un reloj", "Con un vaso"], c: 0 },
      ]},
      { e: 2, v: [
        { p: "¿Con qué sabes cuánto DURA un juego?", o: ["Con un reloj", "Con una regla", "Con una balanza", "Con un vaso"], c: 0 },
        { p: "¿Con qué sabes cuánto DURA una clase?", o: ["Con un reloj", "Con un metro", "Con una balanza", "Con una jarra"], c: 0 },
        { p: "¿Con qué sabes qué día es hoy?", o: ["Con un calendario", "Con una regla", "Con una balanza", "Con un vaso"], c: 0 },
      ]},
      { e: 2, v: [
        { p: "¿Con qué sabes cuánta agua CABE en una jarra?", o: ["Con un vaso", "Con una regla", "Con un reloj", "Con una balanza"], c: 0 },
        { p: "¿Con qué sabes cuánto arroz CABE en una olla?", o: ["Con un pocillo", "Con una regla", "Con un reloj", "Con un metro"], c: 0 },
        { p: "¿Con qué mides el largo de un cuaderno?", o: ["Con una regla", "Con un reloj", "Con una balanza", "Con un pocillo"], c: 0 },
      ]},
      { e: 3, v: [
        { p: "¿Quién caminó MÁS?", o: ["El que dio 30 pasos", "El que dio 20 pasos", "El que dio 10 pasos", "El que dio 5 pasos"], c: 0 },
        { p: "¿Quién caminó MENOS?", o: ["El que dio 8 pasos", "El que dio 15 pasos", "El que dio 22 pasos", "El que dio 40 pasos"], c: 0 },
        { p: "¿Cuál recorrido es MÁS LARGO?", o: ["25 baldosas", "18 baldosas", "12 baldosas", "6 baldosas"], c: 0 },
      ]},
    ],
  },
  5: {
    evidencias: [
      "Mide longitudes con diferentes instrumentos y expresa el resultado en unidades estandarizadas o no estandarizadas comunes.",
      "Compara objetos a partir de su longitud, masa, capacidad y duración de eventos.",
      "Toma decisiones a partir de las mediciones realizadas y de acuerdo con los requerimientos del problema.",
    ],
    slots: [
      { e: 1, v: [
        { p: "La mesa mide 4 cuartas. ¿Con qué la mediste?", o: ["Con la mano", "Con un reloj", "Con una balanza", "Con un vaso"], c: 0 },
        { p: "El salón mide 12 pasos. ¿Con qué lo mediste?", o: ["Con los pies", "Con un reloj", "Con una balanza", "Con un vaso"], c: 0 },
        // Esta versión se pregunta al revés: el instrumento va en el enunciado
        // y las unidades en las opciones, así que responder deja de ser repetir
        // la palabra que el niño acaba de leer.
        { p: "¿Cuál de estas cosas mediste con la mano?", o: ["La mesa: 4 cuartas", "El salón: 12 pasos", "El juego: 5 minutos", "La bolsa: 2 kilos"], c: 0 },
      ]},
      { e: 2, v: [
        { p: "¿Cuál dura MÁS?", o: ["Una clase", "Un parpadeo", "Un estornudo", "Un aplauso"], c: 0 },
        { p: "¿Cuál dura MÁS?", o: ["Un día", "Una hora", "Un minuto", "Un segundo"], c: 0 },
        { p: "¿Cuál dura MENOS?", o: ["Un salto", "Un recreo", "Una clase", "Una semana"], c: 0 },
      ]},
      { e: 2, v: [
        { p: "¿Cuál pesa MENOS?", o: ["Una pluma", "Un libro", "Un zapato", "Una piedra"], c: 0 },
        { p: "¿Cuál pesa MENOS?", o: ["Un algodón", "Una manzana", "Un ladrillo", "Una silla"], c: 0 },
        { p: "¿Cuál pesa MÁS?", o: ["Una nevera", "Una silla", "Un plato", "Una cuchara"], c: 0 },
      ]},
      { e: 2, v: [
        { p: "Mira las dos cintas, medidas en clips. ¿Cómo son?", op: "Roja 8 · Azul 8", o: ["Igual de largas", "La roja más larga", "La azul más larga", "No se pueden comparar"], c: 0 },
        { p: "¿Cuál cinta es más larga? (medidas en clips)", op: "Roja 9 · Azul 6", o: ["La roja", "La azul", "Son iguales", "No se puede saber"], c: 0 },
        // Aquí solo hay una medida. Que la respuesta sea "no se puede saber"
        // no es un truco: es lo que hay que contestar, y es lo que enseña a no
        // decidir con datos que no alcanzan.
        { p: "¿Cuál cuerda es más corta? Solo midieron una.", op: "Verde 4 · Café sin medir", o: ["No se puede saber", "La verde", "La café", "Son iguales"], c: 0 },
      ]},
      { e: 2, v: [
        { p: "Cada jarra llenó estos vasos. ¿Cuál jarra tenía MÁS agua?", op: "Jarra A 4 · Jarra B 7", o: ["La jarra B", "La jarra A", "Las dos igual", "No se puede saber"], c: 0 },
        { p: "Cada balde llenó estos vasos. ¿Cuál balde tenía MENOS agua?", op: "Balde A 3 · Balde B 9", o: ["El balde A", "El balde B", "Los dos igual", "No se puede saber"], c: 0 },
        { p: "En cada olla caben estos pocillos. ¿Cuál olla es más grande?", op: "Olla A 6 · Olla B 10", o: ["La olla B", "La olla A", "Las dos igual", "No se puede saber"], c: 0 },
      ]},
      { e: 1, v: [
        { p: "¿Cuántos clips más largo es el lápiz azul que el rojo?", op: "Rojo 3 · Azul 5", o: ["2", "8", "1", "4"], c: 0 },
        { p: "¿Cuántos clips más larga es la cinta verde que la café?", op: "Café 4 · Verde 9", o: ["5", "13", "4", "7"], c: 0 },
        { p: "¿Cuántas cuartas más larga es la mesa grande que la chiquita?", op: "Chiquita 5 · Grande 8", o: ["3", "13", "2", "5"], c: 0 },
      ]},
      { e: 3, v: [
        falta(6, 10, "Necesitas 10 clips de cinta y tienes 6."),
        falta(4, 9, "Necesitas 9 palitos y tienes 4."),
        falta(7, 12, "Necesitas 12 cuartas de lana y tienes 7."),
      ]},
      { e: 3, v: [
        resta(12, 5, "Tienes una cinta de 12 clips y usas 5."),
        resta(10, 4, "Tienes una lana de 10 cuartas y usas 4."),
        resta(15, 6, "Tienes 15 palitos y usas 6."),
      ]},
      { e: 3, v: [
        { p: "Mide en cuartas. ¿Cabe la caja en el estante?", op: "Estante 6 · Caja 8", o: ["No, la caja es más grande", "Sí, la caja entra justo", "Sí, la caja deja espacio", "No se puede saber"], c: 0 },
        { p: "Mide en cuartas. ¿Cabe el libro en la maleta?", op: "Maleta 9 · Libro 4", o: ["Sí, el libro deja espacio", "Sí, el libro entra justo", "No, el libro es más grande", "No se puede saber"], c: 0 },
        { p: "Mide en clips. ¿Alcanza la cinta para el regalo?", op: "Cinta 7 · Regalo 7", o: ["Sí, la cinta alcanza justo", "No, la cinta no alcanza", "Sí, y sobra mucha cinta", "No se puede saber"], c: 0 },
      ]},
      { e: 1, v: [
        { p: "Si mides el salón con pasos GRANDES, das:", o: ["Menos pasos", "Más pasos", "Los mismos pasos", "El doble de pasos"], c: 0 },
        { p: "Si mides la mesa con clips PEQUEÑOS, usas:", o: ["Más clips", "Menos clips", "Los mismos clips", "Ningún clip"], c: 0 },
        { p: "Si mides con una cuarta más grande, el número sale:", o: ["Más pequeño", "Más grande", "Igual", "En cero"], c: 0 },
      ]},
    ],
  },
  6: {
    evidencias: [
      "Crea, compone y descompone formas bidimensionales y tridimensionales, para ello utiliza plastilina, papel, palitos, cajas, etc.",
      "Describe de forma verbal las cualidades y propiedades de un objeto relativas a su forma.",
      "Agrupa objetos de su entorno de acuerdo con las semejanzas y las diferencias en la forma y en el tamaño y explica el criterio que utiliza.",
      "Identifica objetos a partir de las descripciones verbales que hacen de sus características geométricas.",
    ],
    slots: [
      { e: 2, v: [
        { p: "¿Cuántos lados tiene un triángulo?", o: ["3", "4", "5", "1"], c: 0 },
        { p: "¿Cuántas puntas tiene un triángulo?", o: ["3", "4", "2", "6"], c: 0 },
        { p: "¿Cuántos lados tiene un rectángulo?", o: ["4", "3", "5", "6"], c: 0 },
      ]},
      { e: 1, v: [
        { p: "¿Con cuántos palitos haces un triángulo?", o: ["3", "2", "4", "6"], c: 0 },
        { p: "¿Con cuántos palitos haces un cuadrado?", o: ["4", "3", "5", "8"], c: 0 },
        { p: "Con 2 cuadrados iguales, uno al lado del otro, armas un:", o: ["Rectángulo", "Círculo", "Triángulo", "Cubo"], c: 0 },
      ]},
      { e: 2, v: [
        { p: "¿Cuántos lados tiene un cuadrado?", o: ["4", "3", "5", "6"], c: 0 },
        { p: "¿Cuántas esquinas tiene un cuadrado?", o: ["4", "3", "5", "2"], c: 0 },
        // Con las otras tres escritas en cifras, "Ninguno" era la única
        // palabra: se elegía por la forma, sin mirar la figura.
        { p: "¿Cuántos lados RECTOS tiene un círculo?", o: ["Ninguno", "Uno", "Dos", "Cuatro"], c: 0 },
      ]},
      // El ejemplo oficial del DBA 6 arma títeres —mariposa, pingüino— con
      // cuerpos geométricos. Aquí es lo mismo en pequeño: qué cuerpo le falta
      // a un objeto que ya empezó a armarse.
      { e: 1, v: [
        // Terminar el enunciado en "una:" dejaba fuera a cubo y cilindro sin
        // pensar en la forma. Ahora el enunciado no pide género.
        { p: "Para armar un cohete, ¿qué forma va abajo del cono?", o: ["Cilindro", "Esfera", "Cubo", "Pirámide"], c: 0 },
        { p: "Un helado de cono, ¿qué forma lleva encima?", o: ["Esfera", "Cubo", "Pirámide", "Cilindro"], c: 0 },
        { p: "Una casa de juguete de cubo, ¿qué forma lleva de techo?", o: ["Pirámide", "Esfera", "Cilindro", "Cono"], c: 0 },
      ]},
      { e: 4, v: [
        { p: "Tiene 3 lados y 3 puntas. Es un:", o: ["Triángulo", "Cuadrado", "Círculo", "Rectángulo"], c: 0 },
        { p: "Tiene 4 lados y 2 son más largos. Es un:", o: ["Rectángulo", "Triángulo", "Círculo", "Cuadrado"], c: 0 },
        { p: "No tiene lados rectos ni puntas. Es un:", o: ["Círculo", "Triángulo", "Cuadrado", "Rectángulo"], c: 0 },
      ]},
      { e: 4, v: [
        { p: "Tiene 4 lados iguales y 4 puntas. Es un:", o: ["Cuadrado", "Rectángulo", "Triángulo", "Círculo"], c: 0 },
        { p: "Rueda y no tiene puntas. Es un:", o: ["Círculo", "Cuadrado", "Triángulo", "Rectángulo"], c: 0 },
        { p: "Tiene 3 lados iguales. Es un:", o: ["Triángulo", "Cuadrado", "Círculo", "Rectángulo"], c: 0 },
      ]},
      { e: 2, v: [
        { p: "¿Cuál de estas cosas tiene las esquinas en punta?", o: ["Un libro", "Un plato", "Una moneda", "Un anillo"], c: 0 },
        { p: "¿Cuál de estas cosas tiene el borde RECTO?", o: ["Una regla", "Un plato", "Una moneda", "Un anillo"], c: 0 },
        { p: "¿Cuál de estas cosas es redonda?", o: ["Una moneda", "Un libro", "Una caja", "Una puerta"], c: 0 },
      ]},
      { e: 3, v: [
        { p: "Una pelota tiene forma de:", o: ["Esfera", "Cubo", "Cilindro", "Pirámide"], c: 0 },
        { p: "Una naranja tiene forma de:", o: ["Esfera", "Cubo", "Cono", "Cilindro"], c: 0 },
        { p: "La cara de un reloj tiene forma de:", o: ["Círculo", "Cuadrado", "Triángulo", "Rectángulo"], c: 0 },
      ]},
      { e: 3, v: [
        { p: "Un dado tiene forma de:", o: ["Cubo", "Esfera", "Cono", "Cilindro"], c: 0 },
        { p: "Una caja de zapatos tiene forma de:", o: ["Prisma", "Esfera", "Cono", "Cilindro"], c: 0 },
        { p: "Un gorro de cumpleaños tiene forma de:", o: ["Cono", "Cubo", "Esfera", "Cilindro"], c: 0 },
      ]},
      { e: 3, v: [
        { p: "Una caja de galletas tiene forma de:", o: ["Prisma", "Cilindro", "Esfera", "Cono"], c: 0 },
        { p: "Una lata de gaseosa tiene forma de:", o: ["Cilindro", "Cubo", "Esfera", "Cono"], c: 0 },
        { p: "Un rollo de papel tiene forma de:", o: ["Cilindro", "Cubo", "Esfera", "Pirámide"], c: 0 },
      ]},
    ],
  },
  7: {
    evidencias: [
      "Utiliza representaciones como planos para ubicarse en el espacio.",
      "Toma decisiones a partir de la ubicación espacial.",
      "Dibuja recorridos, para ello considera los ángulos y la lateralidad.",
      "Compara distancias a partir de la observación del plano al estimar con pasos, baldosas, etc.",
    ],
    slots: [
      { e: 1, v: [
        { p: "El perro está DEBAJO de la mesa. Entonces la mesa está:", o: ["Encima del perro", "Debajo del perro", "Al lado del perro", "Lejos del perro"], c: 0 },
        { p: "El libro está ENCIMA del cuaderno. El cuaderno está:", o: ["Debajo del libro", "Encima del libro", "Al lado del libro", "Lejos del libro"], c: 0 },
        { p: "El gato está DENTRO de la caja. La caja está:", o: ["Alrededor del gato", "Dentro del gato", "Debajo del gato", "Lejos del gato"], c: 0 },
      ]},
      { e: 4, v: [
        // El dibujo son dos barras medidas en pasos, no un plano: prometer un
        // plano y no mostrarlo deja al niño buscando algo que no está.
        { p: "Dos caminos al parque, medidos en pasos. ¿Cuál es MÁS LARGO?", op: "Por la tienda 30 · Por el puente 12", o: ["Por la tienda", "Por el puente", "Miden igual", "No se puede saber"], c: 0 },
        { p: "Dos caminos al colegio, medidos en pasos. ¿Cuál es MÁS CORTO?", op: "Por el puente 6 · Por la loma 14", o: ["Por el puente", "Por la loma", "Miden igual", "No se puede saber"], c: 0 },
        { p: "Los dos caminos miden lo mismo, en pasos. Entonces:", op: "Camino A 9 · Camino B 9", o: ["Puedes tomar cualquiera", "El A es más corto", "El B es más corto", "No se pueden comparar"], c: 0 },
      ]},
      { e: 4, v: [
        { p: "Desde tu casa, en pasos. ¿Cuál queda MÁS CERCA?", op: "Tienda 10 · Parque 25", o: ["La tienda", "El parque", "Quedan igual", "No se puede saber"], c: 0 },
        { p: "Desde tu casa, en pasos. ¿Cuál queda MÁS LEJOS?", op: "Colegio 40 · Panadería 15", o: ["El colegio", "La panadería", "Quedan igual", "No se puede saber"], c: 0 },
        { p: "Desde tu casa. ¿Cuál queda MÁS CERCA?", op: "Iglesia 2 cuadras · Parque 5 pasos", o: ["No se puede saber", "La iglesia", "El parque", "Quedan igual"], c: 0 },
      ]},
      { e: 4, v: [
        { p: "Un camino de 3 cuadras es ___ que uno de 6 cuadras.", o: ["Más corto", "Más largo", "Igual de largo", "El doble de largo"], c: 0 },
        { p: "Un camino de 9 cuadras es ___ que uno de 4 cuadras.", o: ["Más largo", "Más corto", "Igual de largo", "La mitad de largo"], c: 0 },
        // "Uno más largo" y "Uno más corto" decían lo mismo con otras palabras.
        { p: "Un camino de 5 cuadras y otro de 5 cuadras son:", o: ["Igual de largos", "Uno el doble del otro", "Uno la mitad del otro", "No se pueden comparar"], c: 0 },
      ]},
      { e: 3, v: [
        // Los dos lados se nombran en el enunciado: así emparejar la palabra
        // ya no decide, y hay que ubicarse de verdad.
        { p: "Lápiz a la derecha, borrador a la izquierda. Coges el lápiz con:", o: ["La mano derecha", "La mano izquierda", "Las dos manos", "Ninguna mano"], c: 0 },
        { p: "Lápiz a la derecha, borrador a la izquierda. Coges el borrador con:", o: ["La mano izquierda", "La mano derecha", "Las dos manos", "Ninguna mano"], c: 0 },
        { p: "Si levantas la mano derecha, la otra mano es:", o: ["La izquierda", "También la derecha", "La de arriba", "Ninguna"], c: 0 },
      ]},
      { e: 3, v: [
        { p: "Vas caminando y das media vuelta. Ahora vas:", o: ["De regreso", "Para el mismo lado", "Hacia arriba", "Sin moverte"], c: 0 },
        // La versión vieja se contestaba repitiendo la frase. Esta pide
        // componer dos giros, que es lo que de verdad mide el DBA.
        { p: "Caminas y giras a la derecha. Giras otra vez a la derecha. Vas:", o: ["De regreso", "Hacia la derecha", "Hacia la izquierda", "De frente"], c: 0 },
        { p: "Das una vuelta completa. Ahora vas:", o: ["Para el mismo lado", "De regreso", "Hacia la derecha", "Hacia arriba"], c: 0 },
      ]},
      { e: 1, v: [
        { p: "En el plano, el colegio está debajo de tu casa. Para llegar:", o: ["Bajas", "Subes", "No te mueves", "Das la vuelta"], c: 0 },
        { p: "En el plano, la tienda está arriba de tu casa. Para llegar:", o: ["Subes", "Bajas", "No te mueves", "Das la vuelta"], c: 0 },
        // Se invierte la relación: el enunciado habla de dónde está TU CASA y
        // la pregunta es para dónde ir. Repetir la palabra ya no sirve.
        { p: "En el plano, tu casa está arriba del parque. Para ir al parque:", o: ["Bajas", "Subes", "No te mueves", "Das la vuelta"], c: 0 },
      ]},
      { e: 1, v: [
        { p: "Estás en la puerta. El tablero está al frente. Para llegar:", o: ["Camino derecho", "Doy la vuelta", "Camino hacia atrás", "Me quedo quieto"], c: 0 },
        { p: "El baño queda al otro lado del colegio. Para llegar primero:", o: ["Salgo del salón", "Me quedo sentado", "Subo al techo", "Abro la ventana"], c: 0 },
        { p: "Tu puesto está en la última fila. Para llegar:", o: ["Camino hasta el fondo", "Me quedo en la puerta", "Voy al tablero", "Salgo del salón"], c: 0 },
      ]},
      { e: 2, v: [
        { p: "El parque queda más lejos que la tienda. Llegar al parque toma:", o: ["Más tiempo que a la tienda", "Menos tiempo que a la tienda", "El mismo tiempo", "La mitad del tiempo"], c: 0 },
        { p: "El colegio queda más cerca que la finca. Llegar al colegio toma:", o: ["Menos tiempo que a la finca", "Más tiempo que a la finca", "El mismo tiempo", "El doble del tiempo"], c: 0 },
        { p: "Dos casas quedan a la misma distancia. Llegar toma:", o: ["Lo mismo para las dos", "Más tiempo para una", "Menos tiempo para una", "No se puede saber"], c: 0 },
      ]},
      { e: 2, v: [
        // Con la cifra solo en la correcta, se acertaba buscando el número.
        // Ahora ninguna la lleva y lo que las separa es si dicen PARA DÓNDE.
        // "indicación" es palabra alta para seis años, y la correcta tampoco
        // decía para dónde girar, que es justo lo que la hace buena.
        { p: "¿Cuál explicación sirve para llegar a un lugar?", o: ["Camina y gira a la derecha", "Camina hasta que llegues", "Queda por allá derechito", "Es la casa más bonita"], c: 0 },
        { p: "¿Cuál explicación es más clara?", o: ["Sube y gira a la izquierda", "Queda por ahí arribita", "Está en un piso de arriba", "Es la puerta más bonita"], c: 0 },
        { p: "Para explicar un camino sirve decir:", o: ["Cuántas cuadras y para dónde", "Que queda lejos", "Que es bonito", "Que es de color azul"], c: 0 },
      ]},
    ],
  },
  8: {
    evidencias: [
      "Identifica y nombra diferencias entre objetos o grupos de objetos.",
      "Comunica las características identificadas y justifica las diferencias que encuentra.",
      "Establece relaciones de dependencia entre magnitudes.",
    ],
    slots: [
      { e: 1, v: [
        // El cuarto distractor era un chiste ("Se hicieron grandes"), así que la
        // pregunta tenía tres opciones. Ahora es un error posible: alguien que
        // piense que poner y quitar lo mismo deja el vaso distinto.
        { p: "Un vaso tenía 2 bolas. Ahora tiene 5. ¿Qué pasó?", o: ["Le pusieron más", "Le quitaron algunas", "No cambió nada", "Le pusieron y le quitaron igual"], c: 0 },
        { p: "Había 8 galletas. Ahora hay 3. ¿Qué pasó?", o: ["Quitaron algunas", "Pusieron más", "No cambió nada", "Pusieron y quitaron igual"], c: 0 },
        { p: "El frasco tenía 9 dulces. Echaron 2 y sacaron 2. Ahora tiene:", o: ["9 dulces", "13 dulces", "5 dulces", "11 dulces"], c: 0 },
      ]},
      { e: 1, v: [
        { p: "Tenías 10 dulces. Ahora tienes 6. Entonces:", o: ["Te faltan 4", "Te sobran 4", "Te faltan 6", "No cambió nada"], c: 0 },
        { p: "Tenías 7 fichas. Ahora tienes 7. Entonces:", o: ["No cambió nada", "Ganaste algunas", "Perdiste algunas", "Perdiste todas"], c: 0 },
        { p: "Había 12 sillas. Ahora hay 8. Entonces:", o: ["Quitaron 4", "Pusieron 4", "Quitaron 8", "No cambió nada"], c: 0 },
      ]},
      { e: 1, v: [
        { p: "Un grupo tiene 4 bolas y el otro tiene 4 bolas. Son:", o: ["Iguales en cantidad", "El primero tiene más", "El segundo tiene más", "No se puede saber"], c: 0 },
        { p: "Un grupo tiene 5 fichas y el otro 8. Entonces:", o: ["El segundo tiene más", "El primero tiene más", "Son iguales", "No se puede saber"], c: 0 },
        { p: "Un grupo tiene 7 lápices y el otro 7. Entonces:", o: ["Son iguales", "El primero tiene más", "El segundo tiene más", "No se puede saber"], c: 0 },
      ]},
      { e: 2, v: [
        // El enunciado menciona ahora el agua y los patos, que son las otras
        // dos opciones: así ninguna palabra sobresale.
        { p: "3 patos y 3 patos con gorra. ¿En qué se diferencian?", o: ["En la gorra", "En cuántos patos hay", "En el color de los patos", "En nada"], c: 0 },
        { p: "Dos perros del mismo color, uno grande y uno chiquito:", o: ["Se diferencian en el tamaño", "Se diferencian en el color", "Se diferencian en cuántos son", "No se diferencian"], c: 0 },
        { p: "Dos vasos del mismo tamaño, los dos llenos de agua:", o: ["No se diferencian", "Se diferencian en el tamaño", "Se diferencian en el agua", "Se diferencian en la forma"], c: 0 },
      ]},
      { e: 2, v: [
        { p: "¿En qué se diferencian estos dos grupos?", op: "🔴🔴🔴 · 🔴🔴🔴🔴🔴", o: ["Uno tiene más bolas", "Uno tiene otro color", "Uno tiene otra forma", "No se diferencian"], c: 0 },
        { p: "¿En qué se diferencian estos dos grupos?", op: "⭐⭐ · ⭐⭐⭐⭐⭐⭐", o: ["Uno tiene más estrellas", "Uno tiene otro color", "Uno tiene otro tamaño", "No se diferencian"], c: 0 },
        { p: "¿Cuál grupo tiene más?", op: "🟦🟦🟦🟦 · 🟦🟦", o: ["El grupo 1", "El grupo 2", "Los dos igual", "No se puede saber"], c: 0 },
      ]},
      { e: 3, v: [
        { p: "Sacas agua de la jarra para llenar vasos. En la jarra:", o: ["Queda menos agua", "Queda más agua", "Queda la misma agua", "Queda el doble de agua"], c: 0 },
        { p: "Le echas más agua al balde. En el balde:", o: ["Hay más agua", "Hay menos agua", "Queda igual", "El agua se seca"], c: 0 },
        { p: "Sacas un vaso de agua de la jarra y lo devuelves. En la jarra:", o: ["Queda igual", "Queda menos agua", "Queda más agua", "Queda el doble"], c: 0 },
      ]},
      { e: 3, v: [
        { p: "Suben más personas al bus. Los puestos libres:", o: ["Son menos", "Son más", "Son los mismos", "Son el doble"], c: 0 },
        { p: "Se bajan personas del bus. Los puestos libres:", o: ["Son más", "Son menos", "Son los mismos", "Desaparecen"], c: 0 },
        { p: "Llegan más niños al salón. Las sillas vacías:", o: ["Son menos", "Son más", "Son las mismas", "Se rompen"], c: 0 },
      ]},
      { e: 3, v: [
        { p: "Mientras más crece un árbol, queda:", o: ["Más alto", "Más bajito", "Igual de alto", "Más delgado"], c: 0 },
        { p: "Mientras más crece un niño, su ropa le queda:", o: ["Más apretada", "Más grande", "Igual", "Más suave"], c: 0 },
        { p: "Mientras más inflas un globo, se pone:", o: ["Más grande", "Más pequeño", "Igual", "Más pesado"], c: 0 },
      ]},
      { e: 3, v: [
        { p: "Si caminas más rápido, llegas:", o: ["Más temprano", "Más tarde", "A la misma hora", "Al día siguiente"], c: 0 },
        { p: "Si caminas más despacio, llegas:", o: ["Más tarde", "Más temprano", "A la misma hora", "Nunca"], c: 0 },
        { p: "Si el camino es más largo, te demoras:", o: ["Más tiempo", "Menos tiempo", "El mismo tiempo", "La mitad del tiempo"], c: 0 },
      ]},
      // El ejemplo oficial del DBA 8 es un dispensador: al pasar agua, DOS
      // cosas cambian a la vez y hay que explicar la relación entre ellas.
      // Antes solo preguntábamos por una.
      { e: 2, v: [
        // Todas las opciones nombran los dos recipientes: lo que las separa es
        // qué le pasa a cada uno, que es justo lo que el DBA quiere que vea.
        { p: "Pasas agua de la jarra al vaso. ¿Qué pasa?", o: ["Baja en la jarra y sube en el vaso", "Baja en la jarra y el vaso igual", "Sube en la jarra y baja en el vaso", "No cambia en ninguno de los dos"], c: 0 },
        { p: "Sacas galletas del paquete al plato. ¿Qué pasa?", o: ["Bajan del paquete y suben al plato", "Bajan del paquete y el plato igual", "Suben en el paquete y en el plato", "No cambia en ninguno de los dos"], c: 0 },
        // Decía que el agua baja lo mismo que sube: es falso. En un vaso
        // angosto sube mucho más de lo que baja en la jarra. Lo que sí se
        // conserva es el AGUA, no la altura.
        { p: "Al pasar agua al vaso, el agua que sale de la jarra es:", o: ["La misma que entra al vaso", "La mitad de la que entra", "El doble de la que entra", "Ninguna, la jarra queda igual"], c: 0 },
      ]},
    ],
  },
  9: {
    evidencias: [
      "Propone números que satisfacen una igualdad con sumas y restas.",
      "Describe las características de los números que deben ubicarse en una ecuación de tal manera que satisfaga la igualdad.",
      "Argumenta sobre el uso de la propiedad transitiva en un conjunto de igualdades.",
    ],
    slots: [
      { e: 1, v: [
        { p: "¿Qué número falta?", op: "6 = 2 + ?", o: ["4", "8", "3", "5"], c: 0 },
        { p: "¿Qué número falta?", op: "9 = 2 + ?", o: ["7", "11", "6", "8"], c: 0 },
        { p: "¿Qué número falta?", op: "8 = 3 + ?", o: ["5", "11", "4", "6"], c: 0 },
      ]},
      { e: 1, v: [
        { p: "¿Qué número falta?", op: "10 = ? + 6", o: ["4", "16", "5", "3"], c: 0 },
        { p: "¿Qué número falta?", op: "8 = ? + 5", o: ["3", "13", "4", "2"], c: 0 },
        { p: "¿Qué número falta?", op: "12 = ? + 7", o: ["5", "19", "6", "4"], c: 0 },
      ]},
      { e: 1, v: [
        { p: "¿Qué número falta?", op: "2 + 3 = 1 + ?", o: ["4", "5", "6", "3"], c: 0 },
        { p: "¿Qué número falta?", op: "3 + 4 = 2 + ?", o: ["5", "7", "6", "4"], c: 0 },
        { p: "¿Qué número falta?", op: "1 + 6 = 3 + ?", o: ["4", "7", "5", "3"], c: 0 },
      ]},
      { e: 1, v: [
        { p: "¿Qué número falta?", op: "7 − 2 = 3 + ?", o: ["2", "5", "4", "1"], c: 0 },
        { p: "¿Qué número falta?", op: "9 − 3 = 2 + ?", o: ["4", "6", "5", "3"], c: 0 },
        { p: "¿Qué número falta?", op: "8 − 1 = 4 + ?", o: ["3", "7", "4", "2"], c: 0 },
      ]},
      // El ejemplo oficial del DBA 9 llena cadenas para que den igual y luego
      // pide INDAGAR OTRAS SOLUCIONES. Que haya muchas es el punto.
      { e: 2, v: [
        // Estaba escrito "3 + ? = 4 + ?" con el MISMO signo dos veces. Con la
        // convención de siempre —un símbolo, un número— eso no tiene solución, y
        // la respuesta marcada era "Muchas": el ejercicio enseñaba lo contrario
        // de lo que quería enseñar. Con dos figuras distintas ya se lee bien.
        // Escribirlo con símbolos obliga a inventar dos figuras raras que cada
        // teléfono dibuja como quiere. Dicho con palabras se entiende igual y no
        // depende de qué tipografía tenga el aparato.
        { p: "Un lado es 3 + algo y el otro 4 + otra cosa. ¿Cuántas parejas sirven?", o: ["Muchas", "Solo una", "Ninguna", "Solo dos"], c: 0 },
        { p: "Si el lado izquierdo crece 2, el derecho tiene que:", o: ["Crecer 2 también", "Quedarse igual", "Bajar 2", "Crecer 4"], c: 0 },
        { p: "Si un lado empieza en 5 y el otro en 2, al de 2 hay que sumarle:", o: ["3 más que al de 5", "Lo mismo que al de 5", "3 menos que al de 5", "Cualquier número"], c: 0 },
      ]},
      // ev3 — la propiedad transitiva, que tenía una sola ranura. Primero con
      // objetos, que es donde un niño de seis años la ve; después con números.
      { e: 3, v: [
        // Las cuatro opciones dicen lo mismo salvo la relación: igual, más o
        // menos. Antes la correcta era la única que completaba la frase.
        { p: "La caja pesa igual que 3 libros, y 3 libros igual que 6 vasos.", o: ["La caja pesa igual que 6 vasos", "La caja pesa más que 6 vasos", "La caja pesa menos que 6 vasos", "No se puede saber"], c: 0 },
        { p: "Ana mide igual que Luis, y Luis mide igual que Sara.", o: ["Ana mide igual que Sara", "Ana mide más que Sara", "Ana mide menos que Sara", "No se puede saber"], c: 0 },
        { p: "La cinta roja mide igual que la azul, y la azul que la verde.", o: ["La roja mide igual que la verde", "La roja mide más que la verde", "La roja mide menos que la verde", "No se puede saber"], c: 0 },
      ]},
      { e: 3, v: [
        // Las tres cosas del enunciado aparecen ahora como opciones, así que
        // no basta con elegir la que se nombró primero.
        { p: "La cinta roja es más larga que la azul, y la azul que la verde.", o: ["La cinta roja", "La cinta azul", "La cinta verde", "Las tres miden igual"], c: 0 },
        { p: "Ana es más alta que Luis, y Luis es más alto que Sara.", o: ["Ana es la más alta", "Luis es el más alto", "Sara es la más alta", "Los tres miden igual"], c: 0 },
        { p: "La caja pesa más que el libro, y el libro más que el lápiz.", o: ["La caja es la más pesada", "El libro es el más pesado", "El lápiz es el más pesado", "Los tres pesan igual"], c: 0 },
      ]},
      { e: 2, v: [
        { p: "El signo = dice que los dos lados:", o: ["Valen igual", "Se suman", "Son distintos", "Se restan"], c: 0 },
        { p: "Si los dos lados valen lo mismo, se escribe:", o: ["El signo =", "El signo +", "El signo −", "El signo de mayor"], c: 0 },
        { p: "En 3 + 2 = 5, el signo = dice que:", o: ["3 + 2 vale lo mismo que 5", "3 + 2 es mayor que 5", "3 + 2 es menor que 5", "3 + 2 hay que restarlo"], c: 0 },
      ]},
      { e: 2, v: [
        { p: "En 4 + ? = 4 + 6, el número que falta es:", o: ["Igual a 6", "Mayor que 6", "Menor que 6", "Cualquiera"], c: 0 },
        { p: "En 7 + ? = 7 + 2, el número que falta es:", o: ["Igual a 2", "Mayor que 2", "Menor que 2", "Cualquiera"], c: 0 },
        { p: "En ? + 5 = 3 + 5, el número que falta es:", o: ["Igual a 3", "Mayor que 3", "Menor que 3", "Cualquiera"], c: 0 },
      ]},
      { e: 3, v: [
        { p: "Mira las dos igualdades. ¿A qué más es igual 3 + 4?", op: "3 + 4 = 7   y   7 = 5 + 2", o: ["5 + 2", "5 − 2", "3 + 2", "7 + 7"], c: 0 },
        { p: "Mira las dos igualdades. ¿A qué más es igual 2 + 6?", op: "2 + 6 = 8   y   8 = 4 + 4", o: ["4 + 4", "4 − 4", "2 + 4", "8 + 8"], c: 0 },
        { p: "Mira las dos igualdades. ¿A qué más es igual 1 + 5?", op: "1 + 5 = 6   y   6 = 3 + 3", o: ["3 + 3", "3 − 3", "1 + 3", "6 + 6"], c: 0 },
      ]},
    ],
  },
  10: {
    evidencias: [
      "Identifica en fichas u objetos reales los valores de la variable en estudio.",
      "Organiza los datos en tablas de conteo y/o en pictogramas sin escala.",
      "Lee la información presentada en tablas de conteo y/o pictogramas sin escala (1 a 1).",
      "Comunica los resultados respondiendo preguntas tales como: ¿cuántos hay en total?, ¿cuántos hay de cada dato?, ¿cuál es el dato que más se repite?, ¿cuál es el dato que menos aparece?",
    ],
    slots: [
      { e: 3, v: [
        // El dibujo tiene que MOSTRAR el sabor. Con helados genéricos, preguntar
        // "¿cuántos quieren fresa?" pide un dato que el dibujo no tiene.
        { p: "Cada chocolate vale por 1 niño. ¿Cuántos lo quieren?", op: "🍫🍫🍫🍫", o: ["4", "3", "5", "8"], c: 0 },
        { p: "Cada fresa vale por 1 niño. ¿Cuántos la quieren?", op: "🍓🍓🍓🍓🍓🍓", o: ["6", "5", "7", "12"], c: 0 },
        { p: "Cada banano vale por 1 niño. ¿Cuántos lo quieren?", op: "🍌🍌🍌", o: ["3", "2", "4", "6"], c: 0 },
      ]},
      { e: 3, v: [
        { p: "Cada dibujo vale por 1 perro. ¿Cuántos perros hay?", op: "🐶🐶🐶🐶🐶🐶", o: ["6", "5", "7", "12"], c: 0 },
        { p: "Cada dibujo vale por 1 gato. ¿Cuántos gatos hay?", op: "🐱🐱🐱🐱🐱", o: ["5", "4", "6", "10"], c: 0 },
        { p: "Cada dibujo vale por 1 pájaro. ¿Cuántos pájaros hay?", op: "🐦🐦🐦🐦🐦🐦🐦", o: ["7", "6", "8", "14"], c: 0 },
      ]},
      // El ejemplo oficial del DBA 10 es la encuesta de sabores de helado, y
      // pide ORGANIZAR los datos, no solo leerlos. Eso tenía una sola ranura.
      { e: 2, v: [
        { p: "5 niños quieren fresa. En el pictograma dibujas:", o: ["5 fresas", "1 fresa", "5 niños y 5 fresas", "10 fresas"], c: 0 },
        { p: "En el dibujo de la votación, cada dibujito vale:", o: ["Uno", "Dos", "Cinco", "Diez"], c: 0 },
        { p: "En la tabla, cada sabor de helado va:", o: ["En su propia fila", "Todos en una fila", "Sin nombre", "En cualquier fila"], c: 0 },
      ]},
      { e: 2, v: [
        { p: "En una tabla de conteo, las rayitas sirven para:", o: ["Contar cuántos hay", "Saber quién votó", "Saber qué día fue", "Adornar la tabla"], c: 0 },
        { p: "Si haces 5 rayitas en la tabla, eso quiere decir:", o: ["Que hay 5", "Que hay 1", "Que hay 10", "Que no hay"], c: 0 },
        { p: "Para anotar cada voto en la tabla, haces:", o: ["Una rayita", "Dos rayitas", "Un dibujo del niño", "El nombre del niño"], c: 0 },
      ]},
      { e: 1, v: [
        // Las cuatro empiezan igual y nombran el mismo tema: lo que las separa
        // es QUÉ se cuenta, no cómo están escritas.
        { p: "En una encuesta de mascota favorita se cuenta:", o: ["Cuántos eligen cada mascota", "Cuánto pesa cada mascota", "Cuántos años tiene cada niño", "Cuántas mascotas hay en casa"], c: 0 },
        { p: "En una encuesta de color favorito se cuenta:", o: ["Cuántos eligen cada color", "Cuántos colores existen", "Cuántos años tiene cada niño", "Cuánto cuesta cada color"], c: 0 },
        { p: "En una encuesta de deporte favorito se cuenta:", o: ["Cuántos eligen cada deporte", "Cuántos deportes existen", "Cuánto corre cada niño", "Cuánto dura cada deporte"], c: 0 },
      ]},
      { e: 1, v: [
        { p: "Para saber la fruta preferida del salón, preguntas a:", o: ["A todos los del salón", "A un solo niño del salón", "Solo a la profesora", "A nadie del salón"], c: 0 },
        { p: "Para saber el color favorito del curso, preguntas a:", o: ["A todo el curso", "A un solo niño del curso", "Solo a la profesora", "A nadie del curso"], c: 0 },
        { p: "Si solo le preguntas a dos niños, el resultado dice:", o: ["Lo que piensan esos dos niños", "Lo que piensan todos los niños", "Lo que piensan los otros niños", "Lo que piensan las profesoras"], c: 0 },
      ]},
      { e: 4, v: [
        // "¿Cuál color ganó?" no dice ganó QUÉ. Corto no es lo mismo que sin
        // contexto: sin la situación, el niño no sabe qué le preguntan.
        { p: "Votamos el color favorito. ¿Cuál ganó?", op: "Rojo 3 · Azul 5 · Verde 2", o: ["Azul", "Rojo", "Verde", "Hubo empate"], c: 0 },
        { p: "En la votación de colores, ¿cuál ganó?", op: "Rojo 6 · Azul 2 · Verde 4", o: ["Rojo", "Azul", "Verde", "Hubo empate"], c: 0 },
        { p: "Votamos el animal favorito. ¿Qué pasó?", op: "Perro 7 · Gato 7 · Pez 1", o: ["Empataron perro y gato", "Ganó el perro solo", "Ganó el gato solo", "Ganó el pez"], c: 0 },
      ]},
      { e: 4, v: [
        { p: "Votamos el color favorito. ¿Cuál tuvo menos?", op: "Rojo 3 · Azul 5 · Verde 2", o: ["Verde", "Rojo", "Azul", "Todos igual"], c: 0 },
        { p: "Votamos el animal favorito. ¿Cuál tuvo menos?", op: "Perro 4 · Gato 7 · Pez 1", o: ["Pez", "Perro", "Gato", "Todos igual"], c: 0 },
        { p: "Votamos el deporte favorito. ¿Cuál tuvo menos?", op: "Fútbol 8 · Natación 3 · Ciclismo 5", o: ["Natación", "Fútbol", "Ciclismo", "Todos igual"], c: 0 },
      ]},
      { e: 4, v: [
        { p: "Votamos el color. ¿Cuántos niños votaron en total?", op: "Rojo 3 · Azul 5 · Verde 2", o: ["10", "8", "9", "11"], c: 0 },
        { p: "Votamos el animal. ¿Cuántos niños respondieron?", op: "Perro 4 · Gato 7 · Pez 1", o: ["12", "11", "10", "13"], c: 0 },
        { p: "Votamos la fruta. ¿Cuántos niños votaron en total?", op: "Mango 6 · Piña 2 · Mora 4", o: ["12", "10", "11", "13"], c: 0 },
      ]},
      { e: 4, v: [
        { p: "¿Cuántos niños MÁS prefieren mango que papaya?", op: "Mango 7 · Papaya 2", o: ["5", "9", "4", "2"], c: 0 },
        { p: "¿Cuántos niños MÁS prefieren gato que pez?", op: "Gato 7 · Pez 1", o: ["6", "8", "5", "1"], c: 0 },
        { p: "¿Cuántos niños MÁS prefieren fútbol que natación?", op: "Fútbol 8 · Natación 3", o: ["5", "11", "4", "3"], c: 0 },
      ]},
    ],
  },
};


module.exports = DBAS;
