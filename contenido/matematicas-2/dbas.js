/* El contenido de Matemáticas, grado 2.

   Esto es lo ÚNICO que cambia de un grado a otro. Todo lo demás —los moldes de
   los distractores, los detectores de fugas, el control de calidad, el SQL—
   vive en `contenido/nucleo/` y se comparte.

   Los enunciados de los DBA, sus evidencias y sus ejemplos salen del documento
   oficial: «Derechos Básicos de Aprendizaje V.2, Matemáticas», Ministerio de
   Educación Nacional, 2017, páginas 14 a 21. Las evidencias van LITERALES: son
   la clasificación curricular contra la cual se audita la cobertura, y
   resumirlas sería quitarle a la app justamente lo que la hace distinta de un
   juego cualquiera.

   El rango del grado: hasta 999, con reagrupación (lo que en el salón se llama
   «llevar» y «prestar»), y multiplicación y reparto sencillos.

     evidencias: los textos del MEN, en su orden.
     slots: [{ e: nº de evidencia, v: [tres versiones] }]
     versión: { p: enunciado, op: línea de operación, o: [4 opciones], c: 0 }

   La correcta va SIEMPRE de primera y el barajado lo hace el servidor. */

const {
  suma,
  resta,
  falta,
  faltaIzq,
  secuencia,
  opciones,
  opcionesMulti,
  multiplicacion,
  reparto,
  porCuanto,
  arreglo,
} = require("../nucleo/calculo.js");

/* Una versión sin cálculo derivado: el enunciado manda y las opciones se
   escriben a mano. Se usa en todo lo conceptual, que en este grado es más de
   la mitad. */
const v = (p, op, o) => (op === null ? { p, o, c: 0 } : { p, op, o, c: 0 });

const DBAS = {
  /* ===================================================================== 1
     Interpreta, propone y resuelve problemas aditivos (de composición,
     transformación y relación) que involucren la cantidad en una colección, la
     medida de magnitudes (longitud, peso, capacidad y duración de eventos) y
     problemas multiplicativos sencillos.

     El EJEMPLO oficial es una sala de videojuegos en la que hay que pagar por
     hora, y pide PROPONER una pregunta que se responda con una multiplicación
     y otra con una división. Proponer no cabe en una selección múltiple, pero
     reconocer cuál de cuatro preguntas se responde multiplicando sí, y mide lo
     mismo: saber qué operación pide la situación. De ahí salen las tres
     últimas ranuras. */
  1: {
    evidencias: [
      "Interpreta y construye diagramas para representar relaciones aditivas y multiplicativas entre cantidades que se presentan en situaciones o fenómenos.",
      "Describe y resuelve situaciones variadas con las operaciones de suma y resta en problemas cuya estructura puede ser a + b = ?, a + ? = c, o ? + b = c.",
      "Reconoce en diferentes situaciones relaciones aditivas y multiplicativas y formula problemas a partir de ellas.",
    ],
    /* El orden es una RAMPA DE DIFICULTAD, no el orden del documento.

       Ordenado por evidencia, este tema empezaba con cuatro dibujos fáciles
       seguidos y saltaba de golpe a 146 + 235: arrancaba en kínder y aterrizaba
       en tercero. Ahora va de lo concreto a lo abstracto, y las evidencias caen
       donde les toca por dificultad, entremezcladas.

       El cálculo es de DOS cifras a propósito. El rango del grado llega a 999,
       pero ese es el techo del AÑO: la suma en columna con reagrupación se
       enseña en el tema 2, que se llama justamente «Varias maneras de sacar la
       cuenta». Pedirla aquí es pedirla antes de enseñarla. */
    slots: [
      {
        e: 1,
        v: [
          v("Tenías 12 dulces y te comes 5. ¿Cuántos quedan?", "12 − 5 = ?", opciones(7, 17, 27)),
          v("Tenías 14 uvas y te comes 6. ¿Cuántas quedan?", "14 − 6 = ?", opciones(8, 20, 32)),
          v("Tenías 11 arepas y se van 4. ¿Cuántas quedan?", "11 − 4 = ?", opciones(7, 15, 23)),
        ],
      },
      {
        e: 1,
        // Comparar es una relación, no una cuenta: el diagrama de barras la
        // muestra antes de restar. Las barras llevan los nombres que dice el
        // enunciado, que si no la pregunta hablaría de algo que no está.
        v: [
          v("¿Cuántos globos más tiene Ana que Luis?", "Ana 7 · Luis 4", opciones(3, 11, 74)),
          v("¿Cuántas fichas menos tiene Sara que Jorge?", "Jorge 9 · Sara 5", opciones(4, 14, 95)),
          v("¿Cuántos puntos más hizo el equipo azul?", "Azul 15 · Verde 8", opciones(7, 23, 158)),
        ],
      },
      {
        e: 3,
        v: [
          v("Reparten 20 fichas entre 4 niños, iguales. ¿Qué haces?", null, [
            "Reparto el total entre los niños",
            "Junto el total con los niños",
            "Le quito los niños al total",
            "Repito el total tantas veces",
          ]),
          v("Cada caja lleva 8 huevos y hay 3 cajas. ¿Qué haces?", null, [
            "Repito el contenido de una caja",
            "Reparto el contenido entre las cajas",
            "Le quito las cajas al contenido",
            "Junto el contenido con las cajas",
          ]),
          v("Tenías 30 monedas y gastaste 12. ¿Qué haces?", null, [
            "Le quito lo gastado a lo que tenías",
            "Junto lo gastado con lo que tenías",
            "Reparto lo gastado en partes iguales",
            "Repito lo gastado varias veces",
          ]),
        ],
      },
      {
        e: 1,
        /* El mismo dibujo de la primera ranura, pero preguntando por la CUENTA
           y no por el total. Contar sirve para el total; para decir qué cuenta
           lo resuelve hay que ver las filas. Sin esta ranura, el arreglo se
           contesta contando de uno en uno y la relación multiplicativa —que es
           lo que pide la evidencia— no se mide nunca.

           Las opciones van en palabras y no en signos a propósito: la marca del
           dibujo («arreglo 4×5») lleva un ×, y si la correcta fuera la única con
           ese signo bastaría con emparejarlo sin entender nada. */
        v: [
          v("Hay 4 filas con 5 sillas cada una. ¿Qué cuenta da el total?", "arreglo 4×5", [
            "4 veces 5",
            "4 más 5",
            "5 menos 4",
            "5 entre 4",
          ]),
          v("Hay 3 filas con 6 galletas cada una. ¿Qué cuenta da el total?", "arreglo 3×6", [
            "3 veces 6",
            "3 más 6",
            "6 menos 3",
            "6 entre 3",
          ]),
          v("Hay 2 filas con 8 flores cada una. ¿Qué cuenta da el total?", "arreglo 2×8", [
            "2 veces 8",
            "2 más 8",
            "8 menos 2",
            "8 entre 2",
          ]),
        ],
      },
      {
        e: 1,
        /* Aquí NO va dibujo, y es a propósito.

           Un arreglo dibujado entero siempre se puede contar de uno en uno, por
           grande que sea el montón: agrandarlo no lo vuelve una multiplicación,
           solo lo vuelve más molesto. Si el dibujo enseña todos los objetos, el
           ejercicio mide contar.

           Se muestra lo que trae UNA cubeta con palabras y se pregunta por
           cuatro. No hay nada que contar: hay que repetir. */
        v: [
          multiplicacion(4, 6, "Cada cubeta trae 6 huevos. ¿Cuántos hay en 4 cubetas?"),
          multiplicacion(3, 5, "Cada caja trae 5 lápices. ¿Cuántos hay en 3 cajas?"),
          multiplicacion(5, 4, "Cada bolsa trae 4 panes. ¿Cuántos hay en 5 bolsas?"),
        ],
      },
      {
        e: 2,
        v: [
          suma(34, 25, "Junta las dos cajas. ¿Cuántos tornillos son?"),
          suma(46, 23, "Junta los dos frascos. ¿Cuántas semillas son?"),
          suma(52, 37, "Junta las dos bolsas. ¿Cuántas canicas son?"),
        ],
      },
      {
        e: 2,
        v: [
          falta(45, 80, "Tienes 45 puntos y quieres llegar a 80. ¿Cuántos faltan?"),
          falta(38, 90, "Tienes 38 puntos y quieres llegar a 90. ¿Cuántos faltan?"),
          falta(64, 100, "Tienes 64 puntos y quieres llegar a 100. ¿Cuántos faltan?"),
        ],
      },
      {
        e: 2,
        v: [
          faltaIzq(30, 75, "Le pusiste 30 más y quedaron 75. ¿Cuántos había?"),
          faltaIzq(40, 92, "Le pusiste 40 más y quedaron 92. ¿Cuántos había?"),
          faltaIzq(25, 61, "Le pusiste 25 más y quedaron 61. ¿Cuántos había?"),
        ],
      },
      {
        e: 3,
        /* Las opciones son SITUACIONES, no preguntas.

           Antes el enunciado decía «Un paquete trae 6 lápices. ¿Cuál se
           resuelve multiplicando?» — y «¿cuál?» no tenía sujeto: la frase
           remitía a unas opciones que eran medias frases sobre cosas que no
           existían en ninguna parte («cuántos sobran de 20», sin que hubiera
           ningún 20). Leída en el globo no significaba nada.

           Una situación se puede imaginar; una pregunta sobre preguntas, no.
           Y son las cuatro operaciones, una por opción, sobre los mismos
           objetos: lo que cambia es qué les pasa. */
        v: [
          v("¿En cuál de estas situaciones hay que multiplicar?", null, [
            "6 cajas con 4 lápices cada una",
            "6 lápices y te regalan 4 más",
            "6 lápices y te quitan 4",
            "6 lápices repartidos entre 4 niños",
          ]),
          v("¿En cuál de estas situaciones hay que multiplicar?", null, [
            "5 mesas con 3 puestos cada una",
            "5 puestos y ponen 3 más",
            "5 puestos y quitan 3",
            "5 puestos repartidos entre 3 grupos",
          ]),
          v("¿En cuál de estas situaciones hay que multiplicar?", null, [
            "7 bolsas con 2 galletas cada una",
            "7 galletas y te dan 2 más",
            "7 galletas y te comes 2",
            "7 galletas repartidas entre 2 niños",
          ]),
        ],
      },
      {
        e: 3,
        // La pregunta que NO se puede responder. Es matemática de verdad —saber
        // cuándo los datos no alcanzan— y además es la manera honesta de que
        // «No se puede saber» sea a veces la respuesta y no un relleno que el
        // niño aprende a descartar sin leer.
        v: [
          v("Sabes que cada hora vale $2.000. ¿Qué NO puedes calcular?", null, [
            "Cuántas horas jugó Camilo",
            "Cuánto cuestan cuatro horas",
            "Cuánto cuestan dos horas",
            "Cuánto cuesta media hora menos",
          ]),
          v("Sabes que hay 24 niños y 4 mesas iguales. ¿Qué NO sabes?", null, [
            "Cuántos años tiene cada niño",
            "Cuántos niños hay por mesa",
            "Cuántos niños hay en dos mesas",
            "Cuántas mesas se usaron",
          ]),
          v("Sabes que la cinta mide 60 cm y la cortas por la mitad.", null, [
            "No se sabe de qué color es",
            "No se sabe cuánto mide cada parte",
            "No se sabe cuántas partes quedan",
            "No se sabe cuánto medía antes",
          ]),
        ],
      },
    ],
  },

  /* ===================================================================== 2
     Utiliza diferentes estrategias para calcular (agrupar, representar
     elementos en colecciones, etc.) o estimar el resultado de una suma y
     resta, multiplicación o reparto equitativo.

     Solo DOS evidencias, así que la lección va a 5 ranuras por evidencia: es
     el DBA que obligó a que el techo dejara de ser fijo. No es acaparar,
     porque la segunda evidencia abarca las cuatro operaciones. */
  2: {
    evidencias: [
      "Construye representaciones pictóricas y establece relaciones entre las cantidades involucradas en diferentes fenómenos o situaciones.",
      "Usa algoritmos no convencionales para calcular o estimar el resultado de sumas, restas, multiplicaciones y divisiones entre números naturales, los describe y los justifica.",
    ],
    slots: [
      // --- ev1: la representación pictórica ---
      {
        e: 1,
        v: [
          v("El dibujo muestra los votos. ¿Cuál sabor ganó?", "Fresa 12 · Mora 18 · Uva 9", [
            "Ganó la mora",
            "Ganó la fresa",
            "Ganó la uva",
            "Quedaron empatados",
          ]),
          v("El dibujo muestra los votos. ¿Cuál deporte ganó?", "Fútbol 14 · Patinaje 11 · Tenis 7", [
            "Ganó el fútbol",
            "Ganó el patinaje",
            "Ganó el tenis",
            "Quedaron empatados",
          ]),
          v("El dibujo muestra los votos. ¿Cuál color ganó?", "Rojo 10 · Azul 10 · Verde 6", [
            "Quedaron empatados",
            "Ganó el rojo",
            "Ganó el azul",
            "Ganó el verde",
          ]),
        ],
      },
      {
        e: 1,
        v: [
          v("Mira el dibujo. ¿Cuántos votos hay en total?", "Fresa 5 · Mora 8 · Uva 4", opciones(17, 8, 54)),
          v("Mira el dibujo. ¿Cuántos votos hay en total?", "Perro 6 · Gato 7 · Pez 3", opciones(16, 7, 67)),
          v("Mira el dibujo. ¿Cuántos votos hay en total?", "Rojo 9 · Azul 5 · Verde 5", opciones(19, 9, 95)),
        ],
      },
      {
        e: 1,
        v: [
          v("Mira el dibujo. ¿Cuántos votos más tiene la mora?", "Fresa 6 · Mora 13 · Uva 4", opciones(7, 19, 63)),
          v("Mira el dibujo. ¿Cuántos votos menos tiene el pez?", "Perro 12 · Gato 8 · Pez 5", opciones(7, 17, 125)),
          v("Mira el dibujo. ¿Cuántos votos separan al rojo del azul?", "Rojo 14 · Azul 6 · Verde 6", opciones(8, 20, 146)),
        ],
      },
      {
        e: 1,
        v: [
          arreglo(3, 5, "¿Cuántas frutas hay en las tres filas?"),
          arreglo(2, 9, "¿Cuántas fichas hay en las dos filas?"),
          arreglo(4, 6, "¿Cuántos puntos hay en las cuatro filas?"),
        ],
      },
      {
        e: 1,
        v: [
          v("Un dibujo vale 5 votos. ¿Cuántos votos sacó Ana?", "×5 votos · Ana 15 · Beto 25 · Caro 10", opcionesMulti(15, 3, 5, 41)),
          v("Un dibujo vale 10 libros. ¿Cuántos libros hay de cuentos?", "×10 libros · Cuentos 30 · Poesía 20 · Ciencia 40", opcionesMulti(30, 3, 10, 73)),
          v("Un dibujo vale 5 niños. ¿Cuántos niños vinieron el martes?", "×5 niños · Lunes 20 · Martes 35 · Miércoles 15", opcionesMulti(35, 7, 5, 112)),
        ],
      },
      // --- ev2: calcular y estimar ---
      {
        e: 2,
        v: [
          suma(247, 135, "¿Cuánto es?"),
          suma(368, 214, "¿Cuánto es?"),
          suma(156, 273, "¿Cuánto es?"),
        ],
      },
      {
        e: 2,
        v: [
          resta(64, 28, "¿Cuánto es?"),
          resta(83, 45, "¿Cuánto es?"),
          resta(72, 36, "¿Cuánto es?"),
        ],
      },
      {
        e: 2,
        v: [
          multiplicacion(6, 4, "¿Cuánto es?"),
          multiplicacion(7, 3, "¿Cuánto es?"),
          multiplicacion(5, 8, "¿Cuánto es?"),
        ],
      },
      {
        e: 2,
        v: [
          reparto(24, 4, "Reparte por igual. ¿Cuánto le toca a cada uno?"),
          reparto(35, 5, "Reparte por igual. ¿Cuánto le toca a cada uno?"),
          reparto(27, 3, "Reparte por igual. ¿Cuánto le toca a cada uno?"),
        ],
      },
      {
        e: 2,
        // Estimar no es calcular: la pregunta pide el redondeo, no el resultado,
        // y por eso las opciones son decenas justas.
        v: [
          v("Sin hacer la cuenta, ¿cerca de cuánto da 48 + 31?", null, ["80", "70", "90", "100"]),
          v("Sin hacer la cuenta, ¿cerca de cuánto da 61 + 28?", null, ["90", "80", "100", "70"]),
          v("Sin hacer la cuenta, ¿cerca de cuánto da 34 + 27?", null, ["60", "50", "70", "80"]),
        ],
      },
    ],
  },

  /* ===================================================================== 3
     Utiliza el Sistema de Numeración Decimal para comparar, ordenar y
     establecer diferentes relaciones entre dos o más secuencias de números con
     ayuda de diferentes recursos.

     El EJEMPLO oficial no es de valor posicional: es el tablero de Sara, medio
     borrado, donde hay que poner números en los espacios vacíos PARA QUE LA
     RELACIÓN SE CUMPLA, y luego discutir cuántos números sirven. Escribir este
     tema sin mirar el ejemplo habría dado diez preguntas de «¿cuál es mayor?»,
     que es su sombra. Las seis últimas ranuras salen de ahí. */
  3: {
    evidencias: [
      "Compara y ordena números de menor a mayor y viceversa a través de recursos como la calculadora, aplicación, material gráfico que represente billetes, diagramas de colecciones, etc.",
      "Propone ejemplos y comunica de forma oral y escrita las condiciones que puede establecer para conservar una relación (mayor que, menor que) cuando se aplican algunas operaciones a ellos.",
      "Reconoce y establece relaciones entre expresiones numéricas (hay más, hay menos, hay la misma cantidad) y describe el tipo de operaciones que debe realizarse para que a pesar de cambiar los valores numéricos, la relación se conserve.",
    ],
    slots: [
      {
        e: 1,
        // Se alterna mayor y menor a propósito: si todas preguntaran por el
        // mayor, la respuesta sería siempre la opción más grande y bastaría
        // con mirar, sin comparar cifra por cifra.
        v: [
          v("¿Cuál de estos números es el MAYOR?", null, ["374", "347", "337", "343"]),
          v("¿Cuál de estos números es el MENOR?", null, ["419", "491", "441", "494"]),
          v("¿Cuál de estos números es el MAYOR?", null, ["620", "602", "612", "608"]),
        ],
      },
      {
        e: 1,
        v: [
          v("¿Cuál lista está ordenada de MENOR a mayor?", null, [
            "125, 152, 215, 251",
            "152, 125, 251, 215",
            "251, 215, 152, 125",
            "215, 251, 125, 152",
          ]),
          v("¿Cuál lista está ordenada de MAYOR a menor?", null, [
            "480, 408, 84, 48",
            "48, 84, 408, 480",
            "408, 480, 48, 84",
            "84, 48, 480, 408",
          ]),
          v("¿Cuál lista está ordenada de MENOR a mayor?", null, [
            "309, 390, 903, 930",
            "390, 309, 930, 903",
            "930, 903, 390, 309",
            "903, 930, 309, 390",
          ]),
        ],
      },
      {
        e: 1,
        v: [
          v("¿Cuál número está entre 250 y 300?", null, ["274", "250", "305", "247"]),
          v("¿Cuál número está entre 400 y 450?", null, ["418", "400", "462", "395"]),
          v("¿Cuál número está entre 700 y 800?", null, ["765", "700", "815", "697"]),
        ],
      },
      {
        e: 1,
        v: [
          v("¿Cuál número va justo ANTES del 700?", null, ["699", "701", "690", "600"]),
          v("¿Cuál número va justo DESPUÉS del 899?", null, ["900", "898", "809", "890"]),
          v("¿Cuál número va justo ANTES del 510?", null, ["509", "511", "500", "501"]),
        ],
      },
      // --- ev2: la relación que se conserva, o no ---
      {
        e: 2,
        v: [
          v("Tienes 9 y yo 6. Los dos ganamos 4. ¿Quién tiene más?", null, [
            "Tú, igual que antes",
            "Yo, porque gané lo mismo",
            "Quedamos con la misma",
            "Ya no se puede saber",
          ]),
          v("Tienes 9 y yo 6. Solo yo gano 5. ¿Quién tiene más?", null, [
            "Yo, porque cambié el orden",
            "Tú, igual que antes",
            "Quedamos con la misma",
            "Ya no se puede saber",
          ]),
          v("Tienes 9 y yo 6. Yo gano 3. ¿Quién tiene más?", null, [
            "Quedamos con la misma",
            "Tú, igual que antes",
            "Yo, porque cambié el orden",
            "Ya no se puede saber",
          ]),
        ],
      },
      {
        e: 2,
        v: [
          v("Antonio tiene más que Bea. A los dos les quitan 2.", null, [
            "Antonio sigue teniendo más",
            "Antonio y Bea quedan iguales",
            "Bea le pasa a Antonio",
            "Depende de cuánto tenía cada uno",
          ]),
          v("Antonio tiene más que Bea. A Antonio le quitan 6.", null, [
            "Depende de cuánto tenía cada uno",
            "Antonio sigue teniendo más",
            "Antonio y Bea quedan iguales",
            "Bea le pasa a Antonio seguro",
          ]),
          v("Antonio y Bea tienen igual. A los dos les dan 7.", null, [
            "Antonio y Bea siguen iguales",
            "Antonio queda con más",
            "Bea queda con más que Antonio",
            "Depende de cuánto tenía cada uno",
          ]),
        ],
      },
      {
        e: 2,
        // Del ejemplo del tablero de Sara: no es hallar EL número, es ver
        // cuántos sirven. Indagar otras soluciones, dice el MEN.
        v: [
          v("Un número en el espacio: 3 + ? es mayor que 8. ¿Cuántos sirven?", null, [
            "Muchos, del 6 en adelante",
            "Solo uno, el 6",
            "Solo dos, el 5 y el 6",
            "Ninguno sirve",
          ]),
          v("Un número en el espacio: 4 + ? es igual a 9. ¿Cuántos sirven?", null, [
            "Solo uno, el 5",
            "Muchos, del 5 en adelante",
            "Solo dos, el 4 y el 5",
            "Ninguno sirve",
          ]),
          v("Un número en el espacio: 2 + ? es menor que 5. ¿Cuántos sirven?", null, [
            "Solo tres: 0, 1 y 2",
            "Solo uno, el 2",
            "Muchos, del 2 en adelante",
            "Ninguno sirve",
          ]),
        ],
      },
      // --- ev3: hay más, hay menos, la misma cantidad ---
      {
        e: 3,
        v: [
          v("En un plato hay 7 uvas y en otro 7. ¿Cómo están?", null, [
            "Hay la misma cantidad",
            "Hay más en el primero",
            "Hay más en el segundo",
            "No alcanza el dato"
          ]),
          v("En un plato hay 12 uvas y en otro 8. ¿Cómo están?", null, [
            "Hay más en el primero",
            "Hay la misma cantidad",
            "Hay más en el segundo",
            "No alcanza el dato"
          ]),
          v("En un plato hay 6 uvas y en otro «varias». ¿Cómo están?", null, [
            "No alcanza el dato",
            "Hay la misma cantidad",
            "Hay más en el primero",
            "Hay más en el segundo"
          ]),
        ],
      },
      {
        e: 3,
        v: [
          v("Ana tiene 10 y Beto 14. ¿Qué haces para dejarlos iguales?", null, [
            "Le doy 4 a Ana",
            "Le doy 4 a Beto",
            "Les doy 4 a los dos",
            "Le quito 4 a Ana",
          ]),
          v("Ana tiene 15 y Beto 9. ¿Qué haces para dejarlos iguales?", null, [
            "Le quito 6 a Ana",
            "Le quito 6 a Beto",
            "Les quito 6 a los dos",
            "Le doy 6 a Ana",
          ]),
          v("Ana tiene 13 y Beto 8. ¿Qué haces para dejarlos iguales?", null, [
            "Le doy 5 a Beto",
            "Le quito 5 a Beto",
            "Le doy 5 a Ana y 5 a Beto",
            "Le quito 5 a Ana",
          ]),
        ],
      },
      {
        e: 3,
        v: [
          v("Hay 8 y 8. ¿Qué operación deja el primero con más?", null, [
            "Sumarle 3 al primero",
            "Sumarle 3 a los dos",
            "Quitarle 3 al primero",
            "Quitarle 3 a los dos",
          ]),
          v("Hay 8 y 8. ¿Qué operación los deja como estaban?", null, [
            "Sumarle 3 a los dos",
            "Sumarle 3 al primero",
            "Quitarle 3 al primero",
            "Sumarle 3 solo al segundo",
          ]),
          v("Hay 8 y 8. ¿Qué operación deja el segundo con más?", null, [
            "Quitarle 3 al primero",
            "Quitarle 3 a los dos",
            "Sumarle 3 al primero",
            "Sumarle 3 a los dos",
          ]),
        ],
      },
    ],
  },

  /* ===================================================================== 4
     Compara y explica características que se pueden medir, en el proceso de
     resolución de problemas relativos a longitud, superficie, velocidad, peso
     o duración de los eventos, entre otros.

     Cuidado especial aquí con el lenguaje: preguntar «¿cuál de estas es una
     medición?» y poner de respuesta «mide 3 metros» es regalar la respuesta
     dentro de la propia palabra. Ninguna opción de este tema repite la palabra
     de la magnitud por la que pregunta el enunciado. */
  4: {
    evidencias: [
      "Utiliza instrumentos y unidades de medición apropiados para medir magnitudes diferentes.",
      "Describe los procedimientos necesarios para medir longitudes, superficies, capacidades, pesos de los objetos y la duración de los eventos.",
      "Mide magnitudes con unidades arbitrarias y estandarizadas.",
      "Estima la medida de diferentes magnitudes en situaciones prácticas.",
    ],
    slots: [
      {
        e: 1,
        v: [
          v("¿Con cuál de estos averiguas lo que PESA una papaya?", null, [
            "Con una balanza",
            "Con una regla",
            "Con un reloj",
            "Con una jarra marcada",
          ]),
          v("¿Con cuál de estos averiguas lo que MIDE una mesa?", null, [
            "Con un metro",
            "Con una balanza",
            "Con un reloj",
            "Con una jarra marcada",
          ]),
          v("¿Con cuál de estos averiguas lo que DURA una canción?", null, [
            "Con un reloj",
            "Con una balanza",
            "Con una regla",
            "Con una jarra marcada",
          ]),
        ],
      },
      {
        e: 1,
        v: [
          v("Quieres saber cuánta agua le cabe a una olla. ¿Qué usas?", null, [
            "Una jarra marcada",
            "Una cuerda larga",
            "Una balanza de cocina",
            "Un calendario",
          ]),
          v("Quieres saber cuánto le falta al recreo. ¿Qué usas?", null, [
            "Un reloj de pared",
            "Una cuerda larga",
            "Una balanza de cocina",
            "Una jarra marcada",
          ]),
          v("Quieres saber si la maleta va muy cargada. ¿Qué usas?", null, [
            "Una balanza de pie",
            "Una cuerda larga",
            "Un calendario grande",
            "Una jarra marcada",
          ]),
        ],
      },
      {
        e: 2,
        v: [
          v("Para medir el largo del salón con pasos, ¿qué cuidas?", null, [
            "Que todos los pasos sean iguales",
            "Que los pasos sean muy rápidos",
            "Que el salón esté bien barrido",
            "Que empieces con el pie derecho",
          ]),
          v("Para pesar dos frutas y compararlas, ¿qué cuidas?", null, [
            "Que las pongas en la misma balanza",
            "Que las pongas en el mismo plato",
            "Que las dos sean del mismo color",
            "Que las peses el mismo día",
          ]),
          v("Para medir cuánto dura un juego, ¿qué cuidas?", null, [
            "Que mires el reloj al empezar",
            "Que mires el reloj al terminar",
            "Que el juego te guste mucho",
            "Que juegues con tres amigos",
          ]),
        ],
      },
      {
        e: 2,
        v: [
          v("Mides una cinta con clips y te sobra un pedacito.", null, [
            "Digo «casi 7 clips»",
            "Digo «exactamente 7 clips»",
            "Digo «ningún clip»",
            "Digo «el pedacito no cuenta»",
          ]),
          v("Mides con cuartas y a tu amigo le dan más cuartas.", null, [
            "Su cuarta es más pequeña",
            "Su cuarta es más grande",
            "Midió mal, seguro",
            "Los dos midieron cosas iguales",
          ]),
          v("Mides el mismo escritorio con pasos y con cuartas.", null, [
            "Me dan números distintos",
            "Me dan el mismo número",
            "Me da cero con las cuartas",
            "No se puede medir de dos modos",
          ]),
        ],
      },
      {
        e: 3,
        v: [
          v("La mesa da 8 cuartas y el escritorio 6. ¿Cuál es más largo?", null, [
            "La mesa",
            "El escritorio",
            "Los dos miden lo mismo",
            "Falta saber de quién es la cuarta",
          ]),
          v("La cuerda da 5 pasos y la cinta 5 pasos. ¿Cuál es más larga?", null, [
            "Las dos miden lo mismo",
            "La cuerda",
            "La cinta",
            "Falta saber de quién es el paso",
          ]),
          v("Tu mesa da 8 cuartas y la de Luis 7 cuartas de él.", null, [
            "Las cuartas no son del mismo tamaño",
            "La mesa tuya es más larga",
            "La mesa de Luis es más larga",
            "Las dos mesas miden lo mismo",
          ]),
        ],
      },
      {
        e: 3,
        v: [
          v("Un lápiz da 9 clips y un borrador 3 clips. ¿Cuántos más?", "9 − 3 = ?", opciones(6, 12, 39)),
          v("Una cinta da 14 clips y otra 6 clips. ¿Cuántos más?", "14 − 6 = ?", opciones(8, 20, 62)),
          v("Un cuaderno da 11 clips y una tarjeta 4. ¿Cuántos más?", "11 − 4 = ?", opciones(7, 15, 47)),
        ],
      },
      {
        e: 4,
        v: [
          v("¿Cuál de estos pesa cerca de un kilo?", null, [
            "Un paquete de arroz",
            "Una moneda de $500",
            "Una hoja de cuaderno",
            "Un bus de colegio",
          ]),
          v("¿Cuál de estos mide cerca de un metro?", null, [
            "Una puerta de ancho",
            "Una moneda de $500",
            "Una hoja de cuaderno",
            "Una cancha de fútbol",
          ]),
          v("¿Cuál de estos dura cerca de un minuto?", null, [
            "Un cepillado de dientes",
            "Un parpadeo",
            "Un día de colegio",
            "Unas vacaciones de mitad de año",
          ]),
        ],
      },
      {
        e: 4,
        v: [
          v("El salón mide 6 metros. ¿Cuánto medirá el pasillo?", null, [
            "Como 12 metros",
            "Como 120 metros",
            "Como 1.200 metros",
            "Como 12 centímetros",
          ]),
          v("Una arepa pesa 100 gramos. ¿Cuánto pesarán diez?", null, [
            "Como un kilo",
            "Como diez kilos",
            "Como cien kilos",
            "Como un gramo",
          ]),
          v("Un recreo dura 20 minutos. ¿Cuánto durarán tres?", null, [
            "Como una hora",
            "Como un minuto",
            "Como un día",
            "Como una semana",
          ]),
        ],
      },
      {
        e: 1,
        v: [
          v("Tienes que medir el ancho de una hoja. ¿Qué te sirve?", null, [
            "Una regla",
            "Una balanza",
            "Un calendario",
            "Una jarra marcada",
          ]),
          v("Tienes que saber qué día cae tu cumpleaños. ¿Qué usas?", null, [
            "Un calendario",
            "Una regla",
            "Una balanza",
            "Una jarra marcada",
          ]),
          v("Tienes que repartir jugo en partes iguales. ¿Qué usas?", null, [
            "Una jarra marcada",
            "Un calendario",
            "Una regla",
            "Una balanza",
          ]),
        ],
      },
      {
        e: 2,
        v: [
          v("Vas a medir el largo de la cancha. ¿Por dónde empiezas?", null, [
            "Pongo el cero justo en la orilla",
            "Pongo el cero por la mitad",
            "Empiezo por donde me quede",
            "Empiezo por el otro extremo",
          ]),
          v("Vas a pesar una fruta en la balanza. ¿Qué miras antes?", null, [
            "Que la aguja marque cero",
            "Que la aguja marque uno",
            "Que la fruta esté madura",
            "Que la fruta esté lavada",
          ]),
          v("Vas a medir cuánto tardas en llegar. ¿Qué haces?", null, [
            "Miro la hora al salir y al llegar",
            "Miro la hora solo al llegar",
            "Miro la hora solo al salir",
            "Cuento los pasos del camino",
          ]),
        ],
      },
    ],
  },

  /* ===================================================================== 5
     Utiliza patrones, unidades e instrumentos convencionales y no
     convencionales en procesos de medición, cálculo y estimación de magnitudes
     como longitud, peso, capacidad y tiempo.

     El EJEMPLO oficial es el de Pipe y Lupe, que salen a la misma hora y uno
     tarda 30 minutos y el otro 35: hay que SEÑALAR LA PAREJA DE RELOJES de la
     hora de llegada. Por eso el reloj de manecillas existe. */
  5: {
    evidencias: [
      "Describe objetos y eventos de acuerdo con atributos medibles: superficie, tiempo, longitud, peso, ángulos.",
      "Realiza mediciones con instrumentos y unidades no convencionales, como pasos, cuadrados o rectángulos, cuartas, metros, entre otros.",
      "Compara eventos según su duración, para ello utiliza relojes convencionales.",
    ],
    slots: [
      {
        e: 1,
        v: [
          v("De una cancha de fútbol, ¿qué se mide con pasos?", null, [
            "Lo que hay de arco a arco",
            "Lo que se demora un partido",
            "Lo que pesa cada jugador",
            "Lo que cuesta la entrada",
          ]),
          v("De una piscina, ¿qué se mide con una jarra marcada?", null, [
            "El agua que le cabe",
            "El tiempo que abre al día",
            "Los metros que tiene de fondo",
            "Las personas que entran",
          ]),
          v("De una película, ¿qué se mide con un reloj?", null, [
            "Lo que se demora en pasar",
            "Lo que mide la pantalla",
            "Lo que pesa el proyector",
            "Lo que vale el boleto",
          ]),
        ],
      },
      {
        e: 1,
        v: [
          v("Cubres el piso con baldosas para saber su superficie.", null, [
            "Cuento las baldosas que caben",
            "Mido el borde de una baldosa",
            "Peso una baldosa en la balanza",
            "Cuento las baldosas de un lado",
          ]),
          v("Quieres saber cuánto papel cubre la mesa.", null, [
            "Cuento los cuadrados que caben",
            "Mido el borde de un cuadrado",
            "Peso el papel en la balanza",
            "Cuento los cuadrados de un lado",
          ]),
          v("Quieres saber cuánta cinta rodea el cuaderno.", null, [
            "Mido todo el borde y lo sumo",
            "Cuento los cuadrados que caben",
            "Peso el cuaderno en la balanza",
            "Mido solo el lado más largo",
          ]),
        ],
      },
      {
        e: 2,
        v: [
          v("El salón da 20 pasos tuyos y 25 pasos de Ana.", null, [
            "El paso de Ana es más corto",
            "El paso de Ana es más largo",
            "El salón cambió de tamaño",
            "Alguno de los dos contó mal",
          ]),
          v("La mesa da 6 cuartas tuyas y 5 cuartas de tu papá.", null, [
            "La cuarta de tu papá es más larga",
            "La cuarta de tu papá es más corta",
            "La mesa cambió de tamaño",
            "Alguno de los dos contó mal",
          ]),
          v("El patio da 40 pasos tuyos y 40 pasos de Luis.", null, [
            "Los dos pasos miden parecido",
            "El paso de Luis es más largo",
            "El paso de Luis es más corto",
            "Alguno de los dos contó mal",
          ]),
        ],
      },
      {
        e: 2,
        v: [
          v("Mides una tira con cuadrados de papel: caben 12.", "arreglo 1×12", opciones(12, 6, 121)),
          v("Mides una tira con cuadrados de papel: caben 15.", "arreglo 1×15", opciones(15, 5, 151)),
          v("Mides una tira con cuadrados de papel: caben 9.", "arreglo 1×9", opciones(9, 3, 91)),
        ],
      },
      {
        e: 2,
        v: [
          multiplicacion(4, 3, "Cada paso mide 4 baldosas. ¿Cuántas en 3 pasos?"),
          multiplicacion(5, 4, "Cada cuarta mide 5 clips. ¿Cuántos en 4 cuartas?"),
          multiplicacion(6, 3, "Cada vaso llena 6 pocillos. ¿Cuántos en 3 vasos?"),
        ],
      },
      {
        e: 3,
        v: [
          v("¿Qué hora marca el reloj?", "reloj 3:00", ["3:00", "12:03", "6:00", "3:30"]),
          v("¿Qué hora marca el reloj?", "reloj 6:30", ["6:30", "12:30", "6:06", "7:30"]),
          v("¿Qué hora marca el reloj?", "reloj 9:15", ["9:15", "3:45", "9:03", "12:09"]),
        ],
      },
      {
        e: 3,
        v: [
          v("Mira las manecillas. ¿Qué hora es?", "reloj 7:45", ["7:45", "9:35", "8:45", "7:09"]),
          v("Mira las manecillas. ¿Qué hora es?", "reloj 10:20", ["10:20", "4:50", "10:04", "11:20"]),
          v("Mira las manecillas. ¿Qué hora es?", "reloj 1:50", ["1:50", "10:05", "2:50", "1:10"]),
        ],
      },
      {
        e: 3,
        v: [
          v("Pipe sale a las 8:00 y llega a las 8:30. ¿Cuánto tardó?", null, [
            "30 minutos",
            "8 minutos",
            "30 horas",
            "1 hora"
          ]),
          v("Lupe sale a las 8:00 y llega a las 8:35. ¿Cuánto tardó?", null, [
            "35 minutos",
            "8 minutos",
            "35 horas",
            "1 hora"
          ]),
          v("Ana sale a las 2:00 y llega a las 3:00. ¿Cuánto tardó?", null, [
            "1 hora",
            "3 horas",
            "2 horas",
            "30 minutos"
          ]),
        ],
      },
      {
        e: 3,
        // El ejemplo oficial: los dos salen a la misma hora y uno tarda más.
        // La pregunta no es cuánto tardó cada uno, es quién llegó primero.
        v: [
          v("Salen juntos. Pipe tarda 30 min y Lupe 35 min. ¿Quién llegó antes?", null, [
            "Pipe, porque tardó menos",
            "Lupe, porque tardó menos",
            "Pipe y Lupe llegaron juntos",
            "Falta saber cuándo salieron",
          ]),
          v("Salen juntos. Pipe tarda 40 min y Lupe 25 min. ¿Quién llegó antes?", null, [
            "Lupe, porque tardó menos",
            "Pipe, porque tardó menos",
            "Pipe y Lupe llegaron juntos",
            "Falta saber cuándo salieron",
          ]),
          v("Pipe tarda 30 min y Lupe 35 min, pero no salieron juntos.", null, [
            "Falta saber cuándo salió cada uno",
            "Pipe, porque tardó menos",
            "Lupe, porque tardó menos",
            "Pipe y Lupe llegaron juntos",
          ]),
        ],
      },
      {
        e: 1,
        v: [
          v("¿Qué le mides a una puerta si te preguntan su alto?", null, [
            "Lo que hay del piso al techo",
            "Lo que hay de un lado al otro",
            "Lo que pesa cuando la cargas",
            "Lo que tarda en cerrarse",
          ]),
          v("¿Qué le mides a un vaso si te preguntan su capacidad?", null, [
            "Lo que le cabe de agua",
            "Lo que hay del piso al borde",
            "Lo que pesa estando vacío",
            "Lo que tarda en llenarse",
          ]),
          v("¿Qué le mides a una caja si te preguntan su peso?", null, [
            "Lo que marca la balanza",
            "Lo que hay del piso a la tapa",
            "Lo que le cabe de agua",
            "Lo que tarda en llenarse",
          ]),
        ],
      },
    ],
  },

  /* ===================================================================== 6
     Clasifica, describe y representa objetos del entorno a partir de sus
     propiedades geométricas para establecer relaciones entre las formas
     bidimensionales y tridimensionales.

     El EJEMPLO oficial es la carta de Andrés a su tía Sofía describiendo su
     habitación: cama rectangular, ventana cuadrada, pintura triangular,
     balones esféricos, cubos para apilar. La tarea es ESTUDIAR SI LA
     DESCRIPCIÓN ES CORRECTA. Las últimas ranuras salen de ahí. */
  6: {
    evidencias: [
      "Reconoce las figuras geométricas según el número de lados.",
      "Diferencia los cuerpos geométricos.",
      "Compara figuras y cuerpos geométricos y establece relaciones y diferencias entre ambos.",
    ],
    slots: [
      {
        e: 1,
        v: [
          v("¿Cuál de estas figuras tiene cuatro lados iguales?", null, ["cuadrado", "triángulo", "círculo", "rectángulo"]),
          v("¿Cuál de estas figuras no tiene ningún lado recto?", null, ["círculo", "cuadrado", "triángulo", "rectángulo"]),
          v("¿Cuál de estas figuras tiene tres lados?", null, ["triángulo", "cuadrado", "círculo", "rectángulo"]),
        ],
      },
      {
        e: 1,
        v: [
          v("Una figura tiene 4 lados y dos son más largos.", null, ["rectángulo", "cuadrado", "triángulo", "círculo"]),
          v("Una figura tiene 4 esquinas y todos sus lados iguales.", null, ["cuadrado", "rectángulo", "triángulo", "círculo"]),
          v("Una figura tiene 3 esquinas y 3 lados rectos.", null, ["triángulo", "cuadrado", "rectángulo", "círculo"]),
        ],
      },
      {
        e: 1,
        v: [
          v("¿Cuántos lados tiene un rectángulo?", null, ["4", "3", "5", "6"]),
          v("¿Cuántas esquinas tiene un triángulo?", null, ["3", "4", "5", "6"]),
          v("¿Cuántos lados tiene un cuadrado?", null, ["4", "3", "6", "8"]),
        ],
      },
      {
        e: 2,
        v: [
          v("¿Cuál de estos cuerpos rueda por todos lados?", null, ["esfera", "cubo", "prisma", "pirámide"]),
          v("¿Cuál de estos cuerpos tiene una punta sola arriba?", null, ["cono", "cubo", "cilindro", "esfera"]),
          v("¿Cuál de estos cuerpos tiene todas sus caras iguales?", null, ["cubo", "cono", "cilindro", "esfera"]),
        ],
      },
      {
        e: 2,
        v: [
          v("Una lata de gaseosa se parece a un:", null, ["cilindro", "cubo", "cono", "prisma"]),
          v("Un dado se parece a un:", null, ["cubo", "cilindro", "cono", "prisma"]),
          v("Una caja de cereal se parece a un:", null, ["prisma", "cubo", "cilindro", "cono"]),
        ],
      },
      {
        e: 2,
        v: [
          v("¿Cuántas caras tiene un cubo?", null, ["6", "4", "8", "12"]),
          v("¿Cuántas aristas tiene un cubo?", null, ["12", "6", "8", "4"]),
          v("¿Cuántos vértices tiene un cubo?", null, ["8", "6", "12", "4"]),
        ],
      },
      {
        e: 3,
        v: [
          v("Si mojas una cara del cubo y la estampas, ¿qué sale?", null, ["un cuadrado", "un triángulo", "un círculo", "un rectángulo"]),
          v("Si mojas la base del cono y la estampas, ¿qué sale?", null, ["un círculo", "un cuadrado", "un triángulo", "un rectángulo"]),
          v("Si mojas la base del cilindro y la estampas, ¿qué sale?", null, ["un círculo", "un cuadrado", "un triángulo", "un rectángulo"]),
        ],
      },
      {
        e: 3,
        v: [
          v("¿En qué se diferencia un cuadrado de un cubo?", null, [
            "El cubo se puede llenar",
            "El cubo tiene menos esquinas",
            "El cuadrado se puede llenar",
            "El cuadrado tiene más caras",
          ]),
          v("¿En qué se diferencia un círculo de una esfera?", null, [
            "La esfera se puede llenar",
            "La esfera tiene menos bordes",
            "El círculo se puede llenar",
            "El círculo rueda por todos lados",
          ]),
          v("¿En qué se parecen un cuadrado y la cara de un cubo?", null, [
            "Los dos tienen cuatro lados",
            "Los dos se pueden llenar",
            "Los dos tienen seis caras",
            "Los dos ruedan por el piso",
          ]),
        ],
      },
      {
        e: 3,
        // De la carta de Andrés: estudiar si la descripción es correcta.
        v: [
          v("Andrés escribe: «mi balón tiene forma de cubo». ¿Está bien?", null, [
            "No: un balón no tiene caras planas",
            "Sí: el balón tiene seis caras",
            "No: un balón no rueda nunca",
            "Sí: el cubo rueda como el balón",
          ]),
          v("Andrés escribe: «mi ventana es un cuadrado». ¿Está bien?", null, [
            "Sí: es plana y de cuatro lados",
            "No: una ventana no es plana",
            "No: el cuadrado no tiene lados",
            "Sí: la ventana se puede llenar",
          ]),
          v("Andrés escribe: «mi cama es una esfera». ¿Está bien?", null, [
            "No: la cama no rueda por el piso",
            "Sí: la cama tiene forma redonda",
            "No: la esfera tiene cuatro lados",
            "Sí: las dos cosas son planas",
          ]),
        ],
      },
      {
        e: 1,
        v: [
          v("¿Cuál figura NO tiene esquinas?", null, ["círculo", "triángulo", "cuadrado", "rectángulo"]),
          v("¿Cuál figura tiene más lados que el triángulo?", null, ["cuadrado", "círculo", "triángulo", "cono"]),
          v("¿Cuál figura tiene igual número de lados que el cuadrado?", null, ["rectángulo", "triángulo", "círculo", "cono"]),
        ],
      },
    ],
  },

  /* ===================================================================== 7
     Describe desplazamientos y referencia la posición de un objeto mediante
     nociones de horizontalidad, verticalidad, paralelismo y perpendicularidad
     en la solución de problemas.

     El EJEMPLO oficial pide dar indicaciones para llegar a un sitio usando esas
     cuatro palabras. Dar indicaciones no cabe en una selección múltiple;
     reconocer si unas indicaciones dadas sirven, sí. */
  7: {
    evidencias: [
      "Describe desplazamientos a partir de las posiciones de las líneas.",
      "Representa líneas y reconoce las diferentes posiciones y la relación entre ellas.",
      "En dibujos, objetos o espacios reales, identifica posiciones de objetos, de aristas o líneas que son paralelas, verticales o perpendiculares.",
      "Argumenta las diferencias entre las posiciones de las líneas.",
    ],
    slots: [
      {
        e: 2,
        v: [
          v("Mira la línea del dibujo. ¿Cómo está puesta?", "lineas horizontal", [
            "Acostada, como el horizonte",
            "Parada, como un poste",
            "Cruzada en forma de equis",
            "Doblada por la mitad",
          ]),
          v("Mira la línea del dibujo. ¿Cómo está puesta?", "lineas vertical", [
            "Parada, como un poste",
            "Acostada, como el horizonte",
            "Cruzada en forma de equis",
            "Doblada por la mitad",
          ]),
          v("Mira las dos líneas del dibujo. ¿Cómo están?", "lineas paralelas", [
            "Van juntas y nunca se tocan",
            "Se cruzan formando esquinas",
            "Se juntan en una sola punta",
            "Una está doblada y la otra no",
          ]),
        ],
      },
      {
        e: 2,
        v: [
          v("Mira el dibujo. ¿Cómo se llaman estas dos líneas?", "lineas perpendiculares", [
            "Perpendiculares",
            "Paralelas",
            "Horizontales",
            "Verticales",
          ]),
          v("Mira el dibujo. ¿Cómo se llaman estas dos líneas?", "lineas paralelas", [
            "Paralelas",
            "Perpendiculares",
            "Redondas",
            "Torcidas",
          ]),
          v("Mira el dibujo. ¿Cómo se llama esta línea?", "lineas vertical", [
            "Vertical",
            "Horizontal",
            "Paralela",
            "Redonda",
          ]),
        ],
      },
      {
        e: 4,
        v: [
          v("Dos líneas se cruzan y forman cuatro esquinas iguales.", null, [
            "Son perpendiculares",
            "Son paralelas",
            "Son horizontales",
            "Son verticales",
          ]),
          v("Dos líneas van juntas y por más que sigan no se tocan.", null, [
            "Son paralelas",
            "Son perpendiculares",
            "Son horizontales",
            "Son verticales",
          ]),
          v("Dos líneas se cruzan, pero las esquinas quedan disparejas.", null, [
            "Se cruzan, pero quedan torcidas",
            "Se cruzan formando esquinas iguales",
            "No se cruzan en ningún punto",
            "Van siempre a la misma distancia",
          ]),
        ],
      },
      {
        e: 3,
        v: [
          v("En un marco cuadrado, ¿cómo son el lado de arriba y el de abajo?", null, [
            "Paralelos entre ellos",
            "Perpendiculares entre ellos",
            "Una sola línea",
            "Líneas torcidas",
          ]),
          v("En un marco cuadrado, ¿cómo son un lado y el de al lado?", null, [
            "Perpendiculares entre ellos",
            "Paralelos entre ellos",
            "Una sola línea",
            "Líneas torcidas",
          ]),
          v("En una escalera, ¿cómo están los escalones entre sí?", null, [
            "Paralelos entre ellos",
            "Perpendiculares entre ellos",
            "Una sola línea",
            "Líneas torcidas",
          ]),
        ],
      },
      {
        e: 3,
        v: [
          v("¿Cuál de estas cosas está casi siempre vertical?", null, [
            "Un poste de la luz",
            "El piso del salón",
            "La superficie del agua",
            "El techo de la casa",
          ]),
          v("¿Cuál de estas cosas está casi siempre horizontal?", null, [
            "La superficie del agua",
            "Un poste de la luz",
            "Un árbol crecido",
            "La pared del salón",
          ]),
          v("¿Cuál de estas parejas es perpendicular?", null, [
            "La pared y el piso",
            "El piso y el techo",
            "Dos postes de la luz",
            "Dos rieles del tren",
          ]),
        ],
      },
      {
        e: 3,
        v: [
          v("Los rieles del tren no se tocan nunca. ¿Cómo son?", null, [
            "Paralelos",
            "Perpendiculares",
            "Torcidos",
            "Redondos",
          ]),
          v("El palo de una cruz atraviesa al otro derechito. ¿Cómo son?", null, [
            "Perpendiculares",
            "Paralelos",
            "Torcidos",
            "Redondos",
          ]),
          v("Los lados de una hoja de cuaderno, los de arriba y abajo:", null, [
            "Paralelos",
            "Perpendiculares",
            "Torcidos",
            "Redondos",
          ]),
        ],
      },
      // --- ev1: el desplazamiento ---
      {
        e: 1,
        v: [
          v("Caminas por una calle y doblas en la esquina. ¿Qué hiciste?", null, [
            "Cambié a la calle perpendicular",
            "Seguí por la calle paralela",
            "Me devolví por la misma calle",
            "Crucé la calle sin doblar",
          ]),
          v("Caminas una calle y luego otra que va en la misma dirección.", null, [
            "Pasé a una calle paralela",
            "Pasé a una calle perpendicular",
            "Me devolví por la misma calle",
            "Doblé en la esquina",
          ]),
          v("Para ir de la casa a la iglesia hay que doblar en dos esquinas.", null, [
            "Cambié de calle dos veces",
            "Seguí siempre por la misma calle",
            "Caminé siempre en línea recta",
            "Volví al punto de partida",
          ]),
        ],
      },
      {
        e: 1,
        v: [
          v("Subes por las escaleras del edificio. ¿Cómo te mueves?", null, [
            "Hacia arriba, en vertical",
            "Hacia el lado, en horizontal",
            "Hacia atrás, devolviéndome",
            "En redondo, dando vueltas",
          ]),
          v("Caminas por el pasillo derecho del piso. ¿Cómo te mueves?", null, [
            "Hacia el lado, en horizontal",
            "Hacia arriba, en vertical",
            "Hacia abajo, en vertical",
            "En redondo, dando vueltas",
          ]),
          v("Bajas por el tobogán del parque. ¿Cómo te mueves?", null, [
            "Hacia abajo, en bajada",
            "Hacia arriba, en vertical",
            "Hacia el lado, en horizontal",
            "En redondo, dando vueltas",
          ]),
        ],
      },
      {
        e: 1,
        v: [
          v("Te dicen: «sigue derecho y no dobles». ¿Qué haces?", null, [
            "Camino en línea recta",
            "Doblo en la primera esquina",
            "Doblo en la segunda esquina",
            "Me devuelvo por donde vine",
          ]),
          v("Te dicen: «dobla a la derecha en la esquina». ¿Qué haces?", null, [
            "Cambio a la calle de la derecha",
            "Sigo derecho sin doblar",
            "Cambio a la calle de la izquierda",
            "Me devuelvo por donde vine",
          ]),
          v("Te dicen: «la tienda queda enseguida». ¿Qué te falta saber?", null, [
            "Para qué lado queda",
            "Cuánto cuestan las cosas",
            "A qué hora abren",
            "Quién atiende adentro",
          ]),
        ],
      },
      {
        e: 4,
        v: [
          v("¿Por qué dos líneas paralelas nunca se cruzan?", null, [
            "Porque van siempre a igual distancia",
            "Porque las dos están acostadas",
            "Porque las dos están paradas",
            "Porque las dos son muy cortas",
          ]),
          v("¿Por qué dos líneas perpendiculares sí se cruzan?", null, [
            "Porque van en direcciones distintas",
            "Porque van a la misma distancia",
            "Porque las dos están acostadas",
            "Porque las dos son muy largas",
          ]),
          v("¿Puede una línea ser vertical y horizontal a la vez?", null, [
            "No, porque son direcciones distintas",
            "Sí, si está doblada por la mitad",
            "Sí, si es lo bastante larga",
            "Depende de qué tan gruesa sea",
          ]),
        ],
      },
    ],
  },

  /* ===================================================================== 8
     Propone e identifica patrones y utiliza propiedades de los números y de
     las operaciones para calcular valores desconocidos en expresiones
     aritméticas.

     Solo DOS evidencias, así que van cinco ranuras cada una.

     El EJEMPLO oficial es la CADENA NUMÉRICA: entra un número, pasa por +3, +5
     y −2, y sale otro. Pide los valores de salida para las entradas 1, 4 y 7,
     los de entrada para las salidas 18 y 36, y recorrer la cadena de derecha a
     izquierda. Eso último es la primera evidencia entera. */
  8: {
    evidencias: [
      "Establece relaciones de reversibilidad entre la suma y la resta.",
      "Utiliza diferentes procedimientos para calcular un valor desconocido.",
    ],
    slots: [
      {
        e: 2,
        v: [
          v("Entra un número y pasa por la cadena. ¿Cuál sale?", "cadena 1 | +3 | +5 | −2 | ?", opciones(7, 11, 17)),
          v("Entra un número y pasa por la cadena. ¿Cuál sale?", "cadena 4 | +3 | +5 | −2 | ?", opciones(10, 14, 44)),
          v("Entra un número y pasa por la cadena. ¿Cuál sale?", "cadena 7 | +3 | +5 | −2 | ?", opciones(13, 17, 71)),
        ],
      },
      {
        e: 2,
        v: [
          v("Sigue la cadena paso a paso. ¿Qué número sale?", "cadena 12 | +6 | −4 | ?", opciones(14, 22, 126)),
          v("Sigue la cadena paso a paso. ¿Qué número sale?", "cadena 20 | −5 | +8 | ?", opciones(23, 7, 205)),
          v("Sigue la cadena paso a paso. ¿Qué número sale?", "cadena 15 | +9 | −6 | ?", opciones(18, 30, 159)),
        ],
      },
      {
        e: 1,
        // El camino de vuelta. Es la primera evidencia del DBA, literal.
        v: [
          v("Conoces la salida, no la entrada. ¿Cuál entró?", "cadena ? | +3 | +5 | −2 | 18", opciones(12, 24, 183)),
          v("Conoces la salida, no la entrada. ¿Cuál entró?", "cadena ? | +3 | +5 | −2 | 36", opciones(30, 42, 363)),
          v("Conoces la salida, no la entrada. ¿Cuál entró?", "cadena ? | +4 | −1 | 20", opciones(17, 25, 201)),
        ],
      },
      {
        e: 1,
        v: [
          v("Para devolverte en la cadena, ¿qué le haces a un «+5»?", null, [
            "Lo cambio por quitar 5",
            "Lo dejo igual, sumando 5",
            "Lo cambio por sumar 10",
            "Lo cambio por quitar 10",
          ]),
          v("Para devolverte en la cadena, ¿qué le haces a un «−4»?", null, [
            "Lo cambio por sumar 4",
            "Lo dejo igual, quitando 4",
            "Lo cambio por quitar 8",
            "Lo cambio por sumar 8",
          ]),
          v("Para devolverte en la cadena, ¿por dónde empiezas?", null, [
            "Por el último paso de todos",
            "Por el primer paso de todos",
            "Por el paso de la mitad",
            "Por el que tenga el número mayor",
          ]),
        ],
      },
      {
        e: 1,
        v: [
          v("Si a un número le sumas 7 y luego le quitas 7, ¿qué queda?", null, [
            "El mismo número del principio",
            "El número más 14",
            "El número menos 14",
            "Siempre queda en cero",
          ]),
          v("Si a un número le quitas 5 y luego le sumas 5, ¿qué queda?", null, [
            "El mismo número del principio",
            "El número más 10",
            "El número menos 10",
            "Siempre queda en cero",
          ]),
          v("Si a un número le sumas 6 y luego le quitas 2, ¿qué queda?", null, [
            "El número más 4",
            "El mismo número del principio",
            "El número más 8",
            "El número menos 4",
          ]),
        ],
      },
      {
        e: 1,
        v: [
          falta(28, 45, "¿Qué número falta?"),
          falta(37, 62, "¿Qué número falta?"),
          falta(19, 53, "¿Qué número falta?"),
        ],
      },
      {
        e: 2,
        v: [
          faltaIzq(16, 40, "¿Qué número falta?"),
          faltaIzq(23, 51, "¿Qué número falta?"),
          faltaIzq(35, 72, "¿Qué número falta?"),
        ],
      },
      {
        e: 2,
        v: [
          porCuanto(4, 20, "¿Por cuánto hay que multiplicar?"),
          porCuanto(6, 30, "¿Por cuánto hay que multiplicar?"),
          porCuanto(3, 24, "¿Por cuánto hay que multiplicar?"),
        ],
      },
      {
        e: 1,
        v: [
          v("Sabes que 8 + 5 = 13. ¿Qué otra cuenta sabes ya?", null, [
            "Que 13 − 5 = 8",
            "Que 13 + 5 = 8",
            "Que 8 − 5 = 13",
            "Que 5 − 8 = 13",
          ]),
          v("Sabes que 14 − 6 = 8. ¿Qué otra cuenta sabes ya?", null, [
            "Que 8 + 6 = 14",
            "Que 14 + 6 = 8",
            "Que 6 + 14 = 8",
            "Que 8 − 6 = 14",
          ]),
          v("Sabes que 9 + 7 = 16. ¿Qué otra cuenta sabes ya?", null, [
            "Que 16 − 9 = 7",
            "Que 16 + 9 = 7",
            "Que 9 − 7 = 16",
            "Que 7 − 16 = 9",
          ]),
        ],
      },
      {
        e: 2,
        v: [
          v("Buscas un número probando. Probaste 5 y quedó corto.", null, [
            "Pruebo con uno más grande",
            "Pruebo con uno más pequeño",
            "Pruebo otra vez con el 5",
            "Ya no se puede seguir probando",
          ]),
          v("Buscas un número probando. Probaste 9 y se pasó.", null, [
            "Pruebo con uno más pequeño",
            "Pruebo con uno más grande",
            "Pruebo otra vez con el 9",
            "Ya no se puede seguir probando",
          ]),
          v("Buscas un número probando. Probaste 6 y quedó justo.", null, [
            "Ya lo encontré: es el 6",
            "Pruebo con el 7, más grande",
            "Pruebo con el 5, más pequeño",
            "Tengo que probar los 10 números",
          ]),
        ],
      },
    ],
  },

  /* ===================================================================== 9
     Opera sobre secuencias numéricas para encontrar números u operaciones
     faltantes y utiliza las propiedades de las operaciones en contextos
     escolares o extraescolares.

     El EJEMPLO oficial pide encontrar TODAS las parejas de números cuya suma es
     12, multiplicar cada pareja, y construir reglas sobre cuántas parejas hay
     y cuál da el producto mayor. Las últimas ranuras salen de ahí: no es hallar
     un número, es contar cuántos sirven y ver el patrón. */
  9: {
    evidencias: [
      "Utiliza las propiedades de las operaciones para encontrar números desconocidos en igualdades numéricas.",
      "Utiliza las propiedades de las operaciones para encontrar operaciones faltantes en un proceso de cálculo numérico.",
      "Reconoce que un número puede escribirse de varias maneras equivalentes.",
      "Utiliza ensayo y error para encontrar valores u operaciones desconocidas.",
    ],
    slots: [
      {
        e: 1,
        v: [
          secuencia([20, 25, 30, 35], 40, [45, 36, 39], "¿Qué número sigue?"),
          secuencia([12, 22, 32, 42], 52, [53, 44, 62], "¿Qué número sigue?"),
          secuencia([6, 12, 18, 24], 30, [26, 32, 36], "¿Qué número sigue?"),
        ],
      },
      {
        e: 1,
        // Secuencias que BAJAN: sin ellas, "seguir el patrón" se vuelve
        // "sumarle algo", y eso no es el patrón, es una costumbre.
        v: [
          secuencia([30, 27, 24, 21], 18, [24, 19, 17], "¿Qué número sigue?"),
          secuencia([50, 45, 40, 35], 30, [40, 31, 25], "¿Qué número sigue?"),
          secuencia([100, 90, 80, 70], 60, [80, 65, 50], "¿Qué número sigue?"),
        ],
      },
      {
        e: 1,
        v: [
          v("¿Cuál número va en el espacio? 15, 20, ?, 30", null, ["25", "22", "26", "35"]),
          v("¿Cuál número va en el espacio? 8, ?, 16, 20", null, ["12", "10", "14", "18"]),
          v("¿Cuál número va en el espacio? 40, 36, ?, 28", null, ["32", "34", "30", "24"]),
        ],
      },
      {
        e: 2,
        v: [
          v("¿Cuál signo va en el espacio? 9 ? 4 = 13", null, ["El de sumar", "El de restar", "El de multiplicar", "El de repartir"]),
          v("¿Cuál signo va en el espacio? 9 ? 4 = 5", null, ["El de restar", "El de sumar", "El de multiplicar", "El de repartir"]),
          v("¿Cuál signo va en el espacio? 9 ? 4 = 36", null, ["El de multiplicar", "El de sumar", "El de restar", "El de repartir"]),
        ],
      },
      {
        e: 2,
        v: [
          v("¿Cuál signo va en el espacio? 20 ? 5 = 4", null, ["El de repartir", "El de sumar", "El de restar", "El de multiplicar"]),
          v("¿Cuál signo va en el espacio? 6 ? 6 = 12", null, ["El de sumar", "El de restar", "El de multiplicar", "El de repartir"]),
          v("¿Cuál signo va en el espacio? 6 ? 6 = 36", null, ["El de multiplicar", "El de sumar", "El de restar", "El de repartir"]),
        ],
      },
      {
        e: 2,
        v: [
          v("Empezaste en 30 y llegaste a 42. ¿Qué pasó en el camino?", null, [
            "Le sumaron 12",
            "Le restaron 12",
            "Lo repartieron en 12",
            "Lo multiplicaron por 12",
          ]),
          v("Empezaste en 30 y llegaste a 18. ¿Qué pasó en el camino?", null, [
            "Le restaron 12",
            "Le sumaron 12",
            "Lo repartieron en 12",
            "Lo multiplicaron por 12",
          ]),
          v("Empezaste en 6 y llegaste a 24. ¿Qué pasó en el camino?", null, [
            "Lo multiplicaron por 4",
            "Le sumaron 4",
            "Le restaron 4",
            "Lo repartieron en 4",
          ]),
        ],
      },
      {
        e: 3,
        v: [
          v("¿Cuál de estas cuentas NO da 12?", null, ["7 + 4", "8 + 4", "6 + 6", "20 − 8"]),
          v("¿Cuál de estas cuentas NO da 15?", null, ["9 + 7", "8 + 7", "10 + 5", "20 − 5"]),
          v("¿Cuál de estas cuentas NO da 20?", null, ["12 + 9", "15 + 5", "10 + 10", "25 − 5"]),
        ],
      },
      {
        e: 3,
        v: [
          v("El 12 se puede escribir de varias formas. ¿Cuál sirve?", null, ["4 × 3", "4 × 4", "5 × 3", "6 × 3"]),
          v("El 18 se puede escribir de varias formas. ¿Cuál sirve?", null, ["6 × 3", "6 × 4", "5 × 3", "4 × 3"]),
          v("El 24 se puede escribir de varias formas. ¿Cuál sirve?", null, ["8 × 3", "8 × 4", "6 × 3", "7 × 3"]),
        ],
      },
      {
        e: 3,
        v: [
          v("¿Cuántas parejas de números suman 3, contando el 0?", null, ["4", "3", "2", "6"]),
          v("¿Cuántas parejas de números suman 4, contando el 0?", null, ["5", "4", "3", "8"]),
          v("¿Cuántas parejas de números suman 5, contando el 0?", null, ["6", "5", "4", "10"]),
        ],
      },
      {
        e: 4,
        // Del ejemplo: de todas las parejas que suman lo mismo, ¿cuál da el
        // producto mayor? La respuesta es la pareja pareja, y descubrirlo
        // probando es justamente "ensayo y error".
        v: [
          v("De las parejas que suman 10, ¿cuál da el mayor al multiplicar?", null, ["5 y 5", "1 y 9", "2 y 8", "3 y 7"]),
          v("De las parejas que suman 8, ¿cuál da el mayor al multiplicar?", null, ["4 y 4", "1 y 7", "2 y 6", "3 y 5"]),
          v("De las parejas que suman 12, ¿cuál da el mayor al multiplicar?", null, ["6 y 6", "2 y 10", "3 y 9", "4 y 8"]),
        ],
      },
      {
        e: 4,
        v: [
          v("Buscas dos números que sumen 9 y uno sea el doble del otro.", null, ["3 y 6", "4 y 5", "2 y 7", "1 y 8"]),
          v("Buscas dos números que sumen 12 y uno sea el doble del otro.", null, ["4 y 8", "5 y 7", "3 y 9", "2 y 10"]),
          v("Buscas dos números que sumen 15 y uno sea el doble del otro.", null, ["5 y 10", "6 y 9", "7 y 8", "4 y 11"]),
        ],
      },
    ],
  },

  /* ==================================================================== 10
     Clasifica y organiza datos, los representa utilizando tablas de conteo,
     pictogramas con escalas y gráficos de puntos, comunica los resultados
     obtenidos para responder preguntas sencillas.

     El EJEMPLO oficial son las elecciones a personero, con un pictograma en el
     que «cada dibujo equivale a 5 votos», y pide COMPROBAR cuatro afirmaciones
     del informe: quién ganó, el total, quién sacó el doble y quién la mitad.
     Ahí está la gracia del tema, y por eso la escala se dibuja. */
  10: {
    evidencias: [
      "Identifica la equivalencia de fichas u objetos con el valor de la variable.",
      "Organiza los datos en tablas de conteo y en pictogramas con escala (uno a muchos).",
      "Lee la información presentada en tablas de conteo, pictogramas con escala y gráficos de puntos.",
      "Comunica los resultados respondiendo preguntas tales como: ¿cuántos hay en total?, ¿cuántos hay de cada dato?, ¿cuál es el dato que más se repite?, ¿cuál es el dato que menos se repite?",
    ],
    slots: [
      {
        e: 1,
        v: [
          v("Cada dibujo vale 5 votos. ¿Cuánto valen 3 dibujos?", null, ["15 votos", "8 votos", "3 votos", "5 votos"]),
          v("Cada dibujo vale 10 votos. ¿Cuánto valen 4 dibujos?", null, ["40 votos", "14 votos", "4 votos", "10 votos"]),
          v("Cada dibujo vale 2 votos. ¿Cuánto valen 6 dibujos?", null, ["12 votos", "8 votos", "6 votos", "2 votos"]),
        ],
      },
      {
        e: 1,
        v: [
          v("Cada dibujo vale 5 votos y hay 20 votos. ¿Cuántos dibujos?", null, ["4 dibujos", "15 dibujos", "25 dibujos", "20 dibujos"]),
          v("Cada dibujo vale 10 votos y hay 50 votos. ¿Cuántos dibujos?", null, ["5 dibujos", "40 dibujos", "60 dibujos", "50 dibujos"]),
          v("Cada dibujo vale 2 votos y hay 14 votos. ¿Cuántos dibujos?", null, ["7 dibujos", "12 dibujos", "16 dibujos", "14 dibujos"]),
        ],
      },
      {
        e: 2,
        v: [
          v("Con muchos datos, ¿por qué un dibujo vale varios y no uno?", null, [
            "Porque si no, no cabrían en la hoja",
            "Porque así los datos se ven mayores",
            "Porque así la cuenta da más fácil",
            "Porque los dibujos salen más bonitos",
          ]),
          v("Si un dibujo vale 5 y otro vale 10 en el mismo gráfico:", null, [
            "El gráfico engaña al que lo lee",
            "El gráfico queda más completo",
            "El gráfico se lee más rápido",
            "El gráfico no cambia en nada",
          ]),
          v("¿Qué hay que escribir siempre debajo de un pictograma?", null, [
            "Cuánto vale cada dibujo",
            "Cuántos dibujos hay en total",
            "Quién hizo el pictograma",
            "De qué color son los dibujos",
          ]),
        ],
      },
      {
        e: 3,
        v: [
          v("Un dibujo vale 5 votos. ¿Cuántos votos sacó el candidato 2?", "×5 votos · Cand 1 20 · Cand 2 45 · Cand 3 25", opcionesMulti(45, 9, 5, 452)),
          v("Un dibujo vale 5 votos. ¿Cuántos votos sacó el candidato 3?", "×5 votos · Cand 1 30 · Cand 2 20 · Cand 3 40", opcionesMulti(40, 8, 5, 403)),
          v("Un dibujo vale 10 libros. ¿Cuántos libros hay de ciencia?", "×10 libros · Cuentos 40 · Poesía 20 · Ciencia 60", opcionesMulti(60, 6, 10, 601)),
        ],
      },
      {
        e: 3,
        v: [
          v("Un dibujo vale 5 niños. ¿Qué día vinieron más niños?", "×5 niños · Lunes 20 · Martes 35 · Miércoles 15", [
            "El martes, que tuvo más",
            "El lunes, que tuvo más",
            "El miércoles, que tuvo más",
            "Los tres días fueron iguales",
          ]),
          v("Un dibujo vale 5 niños. ¿Qué día vinieron menos niños?", "×5 niños · Lunes 25 · Martes 30 · Miércoles 10", [
            "El miércoles, que tuvo menos",
            "El lunes, que tuvo menos",
            "El martes, que tuvo menos",
            "Los tres días fueron iguales",
          ]),
          v("Un dibujo vale 5 niños. ¿Qué día vinieron más niños?", "×5 niños · Lunes 20 · Martes 20 · Miércoles 20", [
            "Los tres días fueron iguales",
            "El lunes, que tuvo más",
            "El martes, que tuvo más",
            "El miércoles, que tuvo más",
          ]),
        ],
      },
      {
        e: 3,
        v: [
          v("Un dibujo vale 5 votos. ¿Cuántos votos hay en total?", "×5 votos · Ana 15 · Beto 10 · Caro 20", opcionesMulti(45, 9, 5, 451)),
          v("Un dibujo vale 10 votos. ¿Cuántos votos hay en total?", "×10 votos · Ana 20 · Beto 30 · Caro 10", opcionesMulti(60, 6, 10, 602)),
          v("Un dibujo vale 5 votos. ¿Cuántos votos hay en total?", "×5 votos · Ana 25 · Beto 5 · Caro 15", opcionesMulti(45, 9, 5, 453)),
        ],
      },
      {
        e: 4,
        v: [
          v("El informe dice que ganó Beto. Mira el dibujo: ¿es cierto?", "×5 votos · Ana 30 · Beto 20 · Caro 15", [
            "No: la que ganó fue Ana",
            "Sí: Beto fue el que ganó",
            "No: el que ganó fue Caro",
            "No se puede saber quién ganó",
          ]),
          v("El informe dice que ganó Ana. Mira el dibujo: ¿es cierto?", "×5 votos · Ana 35 · Beto 25 · Caro 10", [
            "Sí: Ana fue la que ganó",
            "No: el que ganó fue Beto",
            "No: el que ganó fue Caro",
            "No se puede saber quién ganó",
          ]),
          v("El informe dice que Caro sacó el doble que Beto. ¿Es cierto?", "×5 votos · Ana 15 · Beto 10 · Caro 20", [
            "Sí: Caro sacó el doble que Beto",
            "No: Caro sacó menos que Beto",
            "No: Caro sacó el triple que Beto",
            "No se puede saber con el dibujo",
          ]),
        ],
      },
      {
        e: 4,
        v: [
          v("Mira el dibujo. ¿Cuántos votos separan a Ana de Caro?", "×5 votos · Ana 30 · Beto 20 · Caro 15", opciones(15, 45, 301)),
          v("Mira el dibujo. ¿Cuántos votos separan a Ana de Beto?", "×5 votos · Ana 40 · Beto 15 · Caro 25", opciones(25, 55, 402)),
          v("Mira el dibujo. ¿Cuántos votos separan a Beto de Caro?", "×5 votos · Ana 10 · Beto 35 · Caro 25", opciones(10, 60, 353)),
        ],
      },
      {
        e: 2,
        v: [
          v("Anotaste con palitos: IIII IIII II. ¿Cuántos son?", null, ["10", "3", "11", "2"]),
          v("Anotaste con palitos: IIII III. ¿Cuántos son?", null, ["7", "2", "8", "4"]),
          v("Anotaste con palitos: IIII IIII IIII. ¿Cuántos son?", null, ["12", "3", "13", "4"]),
        ],
      },
      {
        e: 4,
        v: [
          v("En la tabla, el sabor de fresa tiene 8 palitos. ¿Qué significa?", null, [
            "Ocho niños escogieron fresa",
            "Hay ocho sabores de fresa",
            "La fresa vale ocho pesos",
            "Quedan ocho helados de fresa",
          ]),
          v("El dato que más se repite en la tabla es el chocolate.", null, [
            "Es el que más gente escogió",
            "Es el que menos gente escogió",
            "Es el que más caro cuesta",
            "Es el que primero se acabó",
          ]),
          v("Dos sabores quedaron con el mismo número de palitos.", null, [
            "Los escogió la misma cantidad",
            "El primero tiene más votos",
            "Los dos quedaron sin votos",
            "La tabla quedó mal hecha",
          ]),
        ],
      },
      {
        e: 1,
        v: [
          v("En un gráfico de puntos, cada punto vale un niño. ¿Y 6 puntos?", null, ["Seis niños", "Un niño", "Doce niños", "Tres niños"]),
          v("En un gráfico de puntos, cada punto vale un niño. ¿Y 9 puntos?", null, ["Nueve niños", "Un niño", "Dieciocho niños", "Tres niños"]),
          v("En un gráfico de puntos, ¿qué columna tiene más puntos?", null, [
            "La que llega más arriba",
            "La que queda más a la izquierda",
            "La que queda más a la derecha",
            "La que tiene el punto más grande",
          ]),
        ],
      },
    ],
  },

  /* ==================================================================== 11
     Explica, a partir de la experiencia, la posibilidad de ocurrencia o no de
     un evento cotidiano y el resultado lo utiliza para predecir la ocurrencia
     de otros eventos.

     El EJEMPLO oficial es el de los aviones de papel: David afirma que él será
     SIEMPRE el ganador porque ya sabe lanzarlos, y hay que determinar si eso es
     verdadero o falso. Saber lanzar mejora la probabilidad; no la vuelve
     certeza. Esa distinción es el tema entero. */
  11: {
    evidencias: [
      "Diferencia situaciones cotidianas cuyo resultado puede ser incierto de aquellas cuyo resultado es conocido o seguro.",
      "Identifica resultados posibles o imposibles, según corresponda, en una situación cotidiana",
      "Predice la ocurrencia o no de eventos cotidianos basado en sus observaciones.",
    ],
    slots: [
      {
        e: 1,
        v: [
          v("Mañana sale el sol por la mañana. ¿Cómo es eso?", null, ["Seguro", "Imposible", "Puede pasar o no", "Nunca se ha visto"]),
          v("Mañana llueve en la tarde. ¿Cómo es eso?", null, ["Puede pasar o no", "Seguro", "Imposible", "Nunca se ha visto"]),
          v("Mañana un perro habla en español. ¿Cómo es eso?", null, ["Imposible", "Seguro", "Puede pasar o no", "Pasa todos los días"]),
        ],
      },
      {
        e: 1,
        v: [
          v("Sacas una ficha de una bolsa con puras fichas rojas.", null, ["Sale roja seguro", "Puede salir azul", "Es imposible que salga", "Sale azul seguro"]),
          v("Sacas una ficha de una bolsa con rojas y azules.", null, ["Puede salir de cualquiera", "Sale roja seguro", "Sale azul seguro", "Es imposible que salga"]),
          v("Sacas una ficha verde de una bolsa sin fichas verdes.", null, ["Es imposible que salga", "Sale verde seguro", "Puede salir de cualquiera", "Sale verde casi siempre"]),
        ],
      },
      {
        e: 1,
        v: [
          v("En un dado de seis caras sale un número menor que 7.", null, ["Pasa siempre", "Pasa a veces", "No pasa nunca", "Pasa una vez de cada seis"]),
          v("En un dado de seis caras sale el número 4.", null, ["Pasa a veces", "Pasa siempre", "No pasa nunca", "Pasa cinco veces de seis"]),
          v("En un dado de seis caras sale el número 9.", null, ["No pasa nunca", "Pasa siempre", "Pasa a veces", "Pasa una vez de cada seis"]),
        ],
      },
      {
        e: 2,
        v: [
          v("En la bolsa hay 5 rojas y 1 azul. ¿Qué es más probable?", null, ["Que salga una roja", "Que salga la azul", "Que las dos tengan igual opción", "Que no pueda salir ninguna"]),
          v("En la bolsa hay 1 roja y 6 azules. ¿Qué es más probable?", null, ["Que salga una azul", "Que salga la roja", "Que las dos tengan igual opción", "Que no pueda salir ninguna"]),
          v("En la bolsa hay 4 rojas y 4 azules. ¿Qué es más probable?", null, ["Que las dos tengan igual opción", "Que salga una roja", "Que salga una azul", "Que no pueda salir ninguna"]),
        ],
      },
      {
        e: 2,
        v: [
          v("Sacas una ficha de la bolsa. ¿Qué resultado es imposible?", null, [
            "Que salga una ficha amarilla",
            "Que salga una ficha roja",
            "Que salga una ficha azul",
            "Que salga cualquiera de las dos",
          ]),
          v("Tiras un dado. ¿Cuál de estos resultados es imposible?", null, [
            "Que salga un cero",
            "Que salga un uno",
            "Que salga un seis",
            "Que salga un número par",
          ]),
          v("Giras una ruleta de tres colores. ¿Qué es imposible?", null, [
            "Que caiga en un cuarto color",
            "Que caiga dos veces igual",
            "Que caiga en el primer color",
            "Que caiga en el último color",
          ]),
        ],
      },
      {
        e: 2,
        v: [
          v("Una moneda cayó cara cuatro veces seguidas. ¿Y ahora?", null, [
            "Puede caer cara o sello igual",
            "Ahora tiene que caer sello",
            "Ahora va a caer cara otra vez",
            "Ya no puede volver a caer cara",
          ]),
          v("Un dado cayó en 6 tres veces seguidas. ¿Y ahora?", null, [
            "Puede caer en cualquiera de los 6",
            "Ahora ya no puede caer en 6",
            "Ahora tiene que caer en 1",
            "Ahora va a caer en 6 otra vez",
          ]),
          v("¿La moneda se acuerda de lo que salió antes?", null, [
            "No: cada tiro empieza de nuevo",
            "Sí: por eso va cambiando",
            "Sí: por eso repite lo mismo",
            "Solo se acuerda de dos tiros",
          ]),
        ],
      },
      {
        e: 3,
        // El ejemplo oficial de los aviones de papel.
        v: [
          v("David dice que SIEMPRE ganará porque sabe lanzar aviones.", null, [
            "Falso: le ayuda, pero no asegura",
            "Cierto: el que sabe gana siempre",
            "Falso: saber lanzar no sirve",
            "Cierto: nadie más sabe lanzar",
          ]),
          v("David ganó 4 de 5 veces. ¿Qué puedes decir de la sexta?", null, [
            "Que tiene buena opción de ganar",
            "Que va a ganar con seguridad",
            "Que le toca perder esta vez",
            "Que no se puede decir nada",
          ]),
          v("Es la primera vez que todos lanzan aviones. ¿Quién gana?", null, [
            "No se puede saber todavía",
            "Gana el más alto de todos",
            "Gana el que lance de último",
            "Gana el del avión más grande",
          ]),
        ],
      },
      {
        e: 3,
        v: [
          v("Lleva diez días lloviendo por la tarde. ¿Y mañana?", null, [
            "Es probable que llueva otra vez",
            "Va a llover con seguridad",
            "Seguro que no llueve mañana",
            "No se puede pensar nada de eso",
          ]),
          v("El bus ha llegado tarde toda la semana. ¿Y mañana?", null, [
            "Puede volver a llegar tarde",
            "Va a llegar tarde con seguridad",
            "Seguro que mañana llega temprano",
            "No se puede pensar nada de eso",
          ]),
          v("El equipo ganó una vez y perdió nueve. ¿Y el próximo?", null, [
            "Tiene poca opción de ganar",
            "Va a ganar con seguridad",
            "Va a perder con seguridad",
            "Tiene la misma opción que antes",
          ]),
        ],
      },
      {
        e: 3,
        v: [
          v("Sacaste 20 fichas y 18 eran rojas. ¿Qué hay en la bolsa?", null, [
            "Casi todas las fichas son rojas",
            "Casi todas las fichas son azules",
            "Hay mitad rojas y mitad azules",
            "No hay manera de imaginarlo",
          ]),
          v("Sacaste 20 fichas: 10 rojas y 10 azules. ¿Qué hay en la bolsa?", null, [
            "Hay mitad rojas y mitad azules",
            "Casi todas las fichas son rojas",
            "Casi todas las fichas son azules",
            "No hay manera de imaginarlo",
          ]),
          v("Sacaste 2 fichas nada más y las dos eran rojas.", null, [
            "Son muy pocas fichas para decir",
            "Todas las fichas deben ser rojas",
            "Hay mitad rojas y mitad azules",
            "Casi todas las fichas son azules",
          ]),
        ],
      },
      {
        e: 1,
        v: [
          v("¿Cuál de estas cosas ya se sabe antes de que pase?", null, [
            "Que el lunes sigue al domingo",
            "Que mañana te encuentres a un amigo",
            "Que te saques un diez en el examen",
            "Que el bus venga lleno mañana",
          ]),
          v("¿Cuál de estas cosas no se sabe hasta que pase?", null, [
            "Que mañana te encuentres a un amigo",
            "Que el lunes siga al domingo",
            "Que el año tenga doce meses",
            "Que febrero venga después de enero",
          ]),
          v("¿Cuál de estas cosas no va a pasar nunca?", null, [
            "Que la semana tenga ocho días",
            "Que llueva dos días seguidos",
            "Que te encuentres a un amigo",
            "Que el bus llegue tarde",
          ]),
        ],
      },
    ],
  },
};

module.exports = DBAS;
