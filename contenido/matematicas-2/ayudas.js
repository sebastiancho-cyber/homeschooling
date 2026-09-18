/* Las explicaciones escritas del grado 2.

   Se escriben a mano las de los ejercicios CONCEPTUALES —comparar, medir,
   reconocer figuras, leer datos, decidir si algo es probable—, que no tienen
   una operación de la cual derivar los pasos. Las de cálculo no están aquí:
   esas salen solas de la línea de operación, en `src/lib/ayuda.ts`, y cambian
   con los números.

   Dos reglas que no se pueden romper:

   · La `pista` dice CÓMO se hace y nunca cuánto da. Es lo único que el niño ve
     antes de responder, y una respuesta regalada no enseña nada.
   · Una ayuda es de la RANURA, no de la versión: la comparten las tres. Por eso
     no puede nombrar los números de una versión concreta; cuando hace falta un
     ejemplo, dice «por ejemplo».

   La llave es `${dba}|${enunciado de la primera versión}`. Por el enunciado y
   no por la posición: repartir las ranuras las mueve de sitio, y una ayuda que
   se queda en la posición vieja no falla, MIENTE. Si un enunciado cambia, el
   generador avisa que la ayuda quedó huérfana. */

module.exports = {
  // ============================================================ DBA 1
  "1|¿Cuántos globos más tiene Ana que Luis?": {
    pista: "«Cuántos más» se busca restando: mira la diferencia entre las dos barras.",
    pasos: [
      "Busca en el dibujo la barra de cada uno y cuánto marca.",
      "La pregunta no es cuántos hay en total: es cuánto le sobra al que tiene más.",
      "Réstale al mayor el menor, y eso es lo que los separa.",
    ],
    ojo: "Si sumas las dos barras te da cuántos hay entre los dos, que es otra pregunta.",
  },
  "1|Hay 4 filas con 5 sillas cada una. ¿Qué cuenta da el total?": {
    pista: "No te piden el total: te piden con qué cuenta se saca.",
    pasos: [
      "Mira qué se repite: hay varias filas y todas tienen lo mismo.",
      "Cuando algo igual se repite varias veces, la cuenta es multiplicar.",
      "El primer número dice cuántas filas hay y el segundo cuántos tiene cada una.",
    ],
    ojo: "Sumar los dos números no sirve: eso junta una fila con el número de filas.",
  },
  "1|¿En cuál de estas situaciones hay que multiplicar?": {
    pista: "Busca la que tenga varios montones y todos del mismo tamaño.",
    pasos: [
      "Se multiplica cuando algo igual se repite: montones del mismo tamaño.",
      "Si a una cantidad le llega más, se suma; si se le va, se resta.",
      "Si un total se parte en pedazos iguales, se reparte.",
    ],
    ojo: "Que haya dos números no quiere decir que haya que multiplicarlos.",
  },
  "1|Reparten 20 fichas entre 4 niños, iguales. ¿Qué haces?": {
    pista: "Fíjate si algo se junta, se quita, se repite o se parte en pedazos iguales.",
    pasos: [
      "Juntar dos cantidades es sumar; sacarle a una es restar.",
      "Repetir lo mismo varias veces es multiplicar.",
      "Partir un total en pedazos iguales es repartir.",
    ],
    ojo: "La palabra «en total» no siempre pide sumar: depende de si algo se repite.",
  },
  "1|Sabes que cada hora vale $2.000. ¿Qué NO puedes calcular?": {
    pista: "Revisa qué datos te dieron y cuáles harían falta para cada pregunta.",
    pasos: [
      "Anota qué sabes exactamente. Nada más que eso.",
      "Lee cada pregunta y busca si el dato que necesita está ahí.",
      "La que pide un dato que nadie te dio es la que no se puede responder.",
    ],
    ojo: "Saber que algo no se puede calcular también es saber matemáticas.",
  },

  // ============================================================ DBA 2
  "2|El dibujo muestra los votos. ¿Cuál sabor ganó?": {
    pista: "Ganó el de la barra más larga, no el que esté escrito primero.",
    pasos: [
      "Mira las barras y compara cuál llega más lejos.",
      "Si dos llegan igual de lejos, entonces nadie ganó: quedaron empatados.",
      "Responde con el nombre de esa barra, no con su número.",
    ],
    ojo: "El orden en que están escritos no dice nada: lo que manda es el largo.",
  },
  "2|Mira el dibujo. ¿Cuántos votos hay en total?": {
    pista: "«En total» es juntarlos todos: suma lo que marca cada barra.",
    pasos: [
      "Lee el número de cada barra, una por una.",
      "Súmalos de a dos: los dos primeros, y a ese resultado el que sigue.",
      "No dejes ninguna barra por fuera, ni siquiera la más pequeñita.",
    ],
    ojo: "El total no es el de la barra más larga: es el de todas juntas.",
  },
  "2|¿Cuántos votos más tiene la mora que la fresa?": {
    pista: "«Cuántos más» es una resta entre dos barras, no una suma de todas.",
    pasos: [
      "Busca solo las dos barras que nombra la pregunta.",
      "Mira cuánto marca cada una.",
      "Réstale a la mayor la menor: eso es lo que las separa.",
    ],
    ojo: "Aquí sobra una barra. No todos los datos de un gráfico sirven para toda pregunta.",
  },
  "2|Hay 3 filas de 5 frutas. Con una fila más, ¿cuántas frutas son?": {
    pista: "El dibujo enseña las filas que hay; la pregunta pide una más.",
    pasos: [
      "Mira cuántos hay en UNA fila: todas tienen lo mismo.",
      "Cuenta las filas del dibujo y súmale la que te piden poner.",
      "Multiplica lo de una fila por ese total de filas.",
    ],
    ojo: "Contar lo que está dibujado deja la cuenta corta: falta la fila nueva.",
  },
  "2|Un dibujo vale 5 votos. ¿Cuántos votos sacó Ana?": {
    pista: "Cada dibujito vale varios: cuenta los dibujos y después aplica lo que vale cada uno.",
    pasos: [
      "Mira debajo del gráfico: ahí dice cuánto vale un dibujo.",
      "Cuenta cuántos dibujos tiene la fila que te preguntan.",
      "Suma ese valor tantas veces como dibujos haya.",
    ],
    ojo: "El error más común es responder cuántos DIBUJOS hay en vez de cuánto valen.",
  },
  "2|Sin hacer la cuenta, ¿cerca de cuánto da 48 + 31?": {
    pista: "Estimar es redondear cada número a la decena más cercana y sumar esas decenas.",
    pasos: [
      "Mira cada número y busca a qué decena está más cerca.",
      "Por ejemplo, 48 está más cerca de 50 que de 40.",
      "Suma las dos decenas redondas: eso te dice por dónde va el resultado.",
    ],
    ojo: "Estimar no es equivocarse: es saber por dónde va antes de hacer la cuenta.",
  },

  // ============================================================ DBA 3
  "3|¿Cuál de estos números es el MAYOR?": {
    pista: "Compara primero la cifra de más a la izquierda; solo si empatan, pasa a la siguiente.",
    pasos: [
      "Mira la primera cifra de cada número, la de más a la izquierda.",
      "El que la tenga más grande ya ganó, sin mirar nada más.",
      "Si varias empatan ahí, compara la cifra que sigue, y así.",
    ],
    ojo: "Lee bien si te piden el MAYOR o el MENOR: es la trampa más común.",
  },
  "3|¿Cuál lista está ordenada de MENOR a mayor?": {
    pista: "Recorre cada lista de izquierda a derecha y comprueba que siempre vaya para el mismo lado.",
    pasos: [
      "Toma la primera lista y compara el primero con el segundo.",
      "Si va bien, sigue con el segundo y el tercero, y así hasta el final.",
      "Con que un solo par esté al revés, esa lista ya no sirve.",
    ],
    ojo: "No basta con mirar el primero y el último: hay que revisar todos los pasos.",
  },
  "3|¿Cuál número está entre 250 y 300?": {
    pista: "Estar «entre» es cumplir dos cosas a la vez: pasar del primero y no llegar al segundo.",
    pasos: [
      "Descarta los que sean más pequeños que el primero.",
      "Descarta los que sean más grandes que el segundo.",
      "El que sobrevive a las dos pruebas es el que está entre los dos.",
    ],
    ojo: "Cumplir una sola de las dos condiciones no alcanza: tienen que ser las dos.",
  },
  "3|¿Cuál número va justo ANTES del 700?": {
    pista: "El de antes es uno menos; el de después, uno más.",
    pasos: [
      "Fíjate si te piden el de antes o el de después.",
      "El anterior se consigue quitando 1, y el siguiente sumando 1.",
      "Cuando el número termina en ceros, al quitar 1 cambian varias cifras a la vez.",
    ],
    ojo: "El anterior no es el número redondo de más abajo: entre esos dos hay muchos.",
  },
  "3|Tienes 9 y yo 6. Los dos ganamos 4. ¿Quién tiene más?": {
    pista: "Si a los dos les pasa lo MISMO, la diferencia no cambia; si solo a uno, hay que mirar otra vez.",
    pasos: [
      "Mira quién tenía más antes de que pasara nada.",
      "Si los dos ganan o pierden lo mismo, el que iba adelante sigue adelante.",
      "Si solo uno cambia, compara de nuevo con los números nuevos.",
    ],
    ojo: "Darles a los dos no empata a nadie: los sube a los dos por igual.",
  },
  "3|Antonio tiene más que Bea. A los dos les quitan 2.": {
    pista: "Quitarles lo mismo a los dos deja la diferencia intacta.",
    pasos: [
      "Imagina la diferencia como el pedazo que le sobra al que tiene más.",
      "Si a los dos les quitas lo mismo, ese pedazo sigue siendo igual de grande.",
      "Por eso el que tenía más sigue teniendo más.",
    ],
    ojo: "Si solo a uno le quitan, puede cambiar todo, y a veces no se sabe sin los números.",
  },
  "3|Un número en el espacio: 3 + ? es mayor que 8. ¿Cuántos sirven?": {
    pista: "Prueba con un número, mira si cumple, y después mira si los vecinos también cumplen.",
    pasos: [
      "Empieza probando un número cualquiera y comprueba la condición.",
      "Si el que probaste sirve, mira qué pasa con el que sigue y con el anterior.",
      "Cuando la condición dice «mayor que» suelen servir muchos; cuando dice «igual a», uno solo.",
    ],
    ojo: "La pregunta no es cuál número sirve, sino CUÁNTOS sirven. No es lo mismo.",
  },
  "3|En un plato hay 7 uvas y en otro 7. ¿Cómo están?": {
    pista: "Compara las dos cantidades; si a una no le pusieron número, no se puede decidir.",
    pasos: [
      "Mira si te dieron un número para cada plato.",
      "Si los dos tienen número, compáralos y ya.",
      "Si uno dice solo «varias» o «algunas», no hay con qué compararlo.",
    ],
    ojo: "«Varias» no es un número: puede ser más o puede ser menos, y por eso no alcanza.",
  },
  "3|Ana tiene 10 y Beto 14. ¿Qué haces para dejarlos iguales?": {
    pista: "Primero mira cuánto los separa: eso es lo que hay que mover.",
    pasos: [
      "Resta el menor del mayor: eso es lo que los separa.",
      "Puedes darle esa diferencia al que tiene menos, o quitársela al que tiene más.",
      "Si le das a los dos lo mismo, siguen igual de separados que antes.",
    ],
    ojo: "Darles a los dos la misma cantidad no los empata nunca.",
  },
  "3|Hay 8 y 8. ¿Qué operación deja el primero con más?": {
    pista: "Lo que se le hace a UNO solo cambia la comparación; lo que se le hace a los dos, no.",
    pasos: [
      "Parten iguales, así que cualquier cambio en los dos los deja iguales.",
      "Para que uno quede con más, hay que subirle a ese o bajarle al otro.",
      "Decide a cuál de los dos le conviene el cambio según lo que te preguntan.",
    ],
    ojo: "Quitarle al segundo deja al primero con más, aunque al primero no le hayas tocado nada.",
  },

  // ============================================================ DBA 4
  "4|¿Con cuál de estos averiguas lo que PESA una papaya?": {
    pista: "Cada instrumento sirve para una cosa distinta: piensa qué te están preguntando.",
    pasos: [
      "Lo que pesa se averigua con algo que compare pesos.",
      "Lo que mide de largo, con algo que tenga marcas de longitud.",
      "Lo que dura, con algo que cuente el tiempo.",
    ],
    ojo: "El instrumento no se escoge por el objeto sino por lo que le quieres averiguar.",
  },
  "4|Quieres saber cuánta agua le cabe a una olla. ¿Qué usas?": {
    pista: "Lo que cabe adentro se averigua llenándolo con una medida conocida.",
    pasos: [
      "Piensa qué estás midiendo: si es lo de adentro, necesitas algo que llene.",
      "Un recipiente con marcas te dice cuánto va cabiendo.",
      "Una regla no sirve para eso: mide bordes, no contenido.",
    ],
    ojo: "Un recipiente alto no siempre es el que más le cabe: también cuenta lo ancho.",
  },
  /* Esta ayuda la comparten TRES versiones que miden cosas distintas —un largo,
     un peso y una duración—, así que tiene que servirle a las tres. Antes
     hablaba solo de pasos largos y cortos, y al que le tocaba la del reloj le
     explicaban algo que no tenía nada que ver. */
  "4|Para medir el largo del salón con pasos, ¿qué cuidas?": {
    pista: "Lo que se cuida al medir es que la manera de medir no cambie a mitad de camino.",
    pasos: [
      "Si mides con algo del cuerpo, esa medida tiene que ser siempre del mismo tamaño.",
      "Si comparas dos cosas, las dos se miden con el mismo instrumento.",
      "Si mides cuánto dura algo, hacen falta los dos momentos: cuándo empieza y cuándo acaba.",
    ],
    ojo: "Medir bien no es medir rápido: es medir siempre de la misma manera.",
  },
  "4|Mides una cinta con cuartas y te sobra un pedacito.": {
    pista: "Cuando la unidad no cabe un número exacto de veces, la medida es aproximada, no falsa.",
    pasos: [
      "Cuenta cuántas unidades completas caben.",
      "Si sobra un pedacito, la medida está entre ese número y el siguiente.",
      "Se dice «casi» o «un poco más de», que es la verdad.",
    ],
    ojo: "Decir un número exacto cuando sobró un pedazo es decir algo que no es cierto.",
  },
  "4|La mesa da 8 cuartas y el escritorio 6. ¿Cuál es más largo?": {
    pista: "Dos medidas solo se pueden comparar si están hechas con la MISMA unidad.",
    pasos: [
      "Mira si las dos medidas se tomaron con lo mismo.",
      "Si es la misma unidad, el que tenga más unidades es el más largo.",
      "Si cada uno midió con su propia cuarta o su propio paso, no se pueden comparar.",
    ],
    ojo: "Más unidades no siempre es más largo: puede ser que la unidad fuera más pequeña.",
  },
  "4|¿Cuál de estos pesa cerca de un kilo?": {
    pista: "Piensa en cosas que hayas cargado y compáralas con lo que te preguntan.",
    pasos: [
      "Descarta primero lo muchísimo más pequeño.",
      "Descarta lo muchísimo más grande.",
      "De lo que queda, escoge lo que se parezca a algo que ya conozcas de ese tamaño.",
    ],
    ojo: "Estimar es comparar con algo conocido, no adivinar.",
  },
  "4|El salón mide 6 metros. ¿Cuánto medirá el pasillo?": {
    pista: "Usa lo que ya mediste como referencia y pregúntate cuántas veces cabría.",
    pasos: [
      "Ya sabes cuánto mide una cosa: ese es tu punto de partida.",
      "Piensa si lo otro es parecido, el doble, o muchísimo más.",
      "Escoge la medida que quede en ese rango.",
    ],
    ojo: "Cambiar de unidad cambia el número: 12 metros y 12 centímetros no se parecen en nada.",
  },
  "4|Tienes que medir el ancho de una hoja. ¿Qué te sirve?": {
    pista: "Escoge el instrumento por lo que vas a averiguar, no por el objeto.",
    pasos: [
      "Un ancho es una longitud: necesitas algo con marcas de largo.",
      "Un día es tiempo: necesitas algo que cuente días.",
      "Repartir un líquido necesita algo con marcas de cuánto cabe.",
    ],
    ojo: "El mismo objeto se puede medir de varias maneras según qué le preguntes.",
  },
  "4|Vas a medir el largo de la cancha. ¿Por dónde empiezas?": {
    pista: "Antes de medir hay que poner el punto de partida en su sitio.",
    pasos: [
      "Si es longitud, el cero va justo donde empieza lo que vas a medir.",
      "Si es peso, la aguja tiene que estar en cero antes de poner nada.",
      "Si es tiempo, hay que mirar el reloj al empezar y también al terminar.",
    ],
    ojo: "Empezar mal el conteo daña toda la medida, aunque después lo hagas todo bien.",
  },

  // ============================================================ DBA 5
  "5|De una cancha de fútbol, ¿qué se mide con pasos?": {
    pista: "Cada instrumento mide una cosa distinta: pregúntate cuál de ellas estás nombrando.",
    pasos: [
      "Los pasos y las cuartas miden distancias.",
      "Los recipientes con marcas miden lo que cabe.",
      "Los relojes miden lo que dura.",
    ],
    ojo: "De un mismo objeto se pueden medir varias cosas: largo, peso, duración.",
  },
  "5|Cubres el piso con baldosas para saber su superficie.": {
    pista: "La superficie se mide CUBRIENDO, no rodeando ni pesando.",
    pasos: [
      "Para saber cuánto cubre algo, se cuenta cuántas piezas iguales caben encima.",
      "Para saber cuánto lo rodea, se mide el borde y se suma.",
      "Son dos preguntas distintas y dan números distintos.",
    ],
    ojo: "Contar las piezas de un solo lado da el largo, no la superficie.",
  },
  "5|El salón da 20 pasos tuyos y 25 pasos de Ana.": {
    pista: "Si el mismo espacio da más unidades, es porque esa unidad es más pequeña.",
    pasos: [
      "El salón no cambió de tamaño: los dos midieron lo mismo.",
      "El que necesitó más pasos los tiene más cortos.",
      "El que necesitó menos, los tiene más largos.",
    ],
    ojo: "Un número más grande no significa un espacio más grande si la unidad cambió.",
  },
  "5|¿Qué hora marca el reloj?": {
    pista: "La manecilla corta dice la hora y la larga dice los minutos.",
    pasos: [
      "Busca la manecilla corta: la hora es el número que ya pasó, no el que viene.",
      "Busca la larga y cuenta de 5 en 5 desde el 12 hasta donde apunta.",
      "Primero se dice la hora y después los minutos.",
    ],
    ojo: "Leer la manecilla larga como si fuera la hora es el error más común.",
  },
  "5|Mira las manecillas. ¿Qué hora es?": {
    pista: "Fíjate en cuál manecilla es la corta: esa manda para la hora.",
    pasos: [
      "La manecilla de las horas va despacio y casi nunca apunta a un número exacto.",
      "Si está entre dos números, la hora es el MENOR de los dos.",
      "La manecilla larga se lee contando de 5 en 5 desde el 12.",
    ],
    ojo: "Pasada la media hora, la corta ya casi toca el número siguiente y confunde.",
  },
  "5|Pipe sale a las 8:00 y llega a las 8:30. ¿Cuánto tardó?": {
    pista: "La duración es lo que hay entre la hora de salida y la de llegada.",
    pasos: [
      "Mira a qué hora empezó y a qué hora terminó.",
      "Si la hora es la misma, la diferencia está solo en los minutos.",
      "Si cambió la hora, cada hora completa son 60 minutos.",
    ],
    ojo: "La hora de llegada no es la duración: es el momento en que terminó.",
  },
  "5|Salen juntos. Pipe tarda 30 min y Lupe 35 min. ¿Quién llegó antes?": {
    pista: "Si salieron a la misma hora, llegó primero el que tardó menos.",
    pasos: [
      "Comprueba primero si de verdad salieron al mismo tiempo.",
      "Si salieron juntos, basta con comparar cuánto tardó cada uno.",
      "Si no salieron juntos, tardar menos ya no alcanza para saber quién llegó primero.",
    ],
    ojo: "Tardar menos y llegar antes solo son lo mismo cuando los dos arrancaron juntos.",
  },
  "5|¿Qué le mides a una puerta si te preguntan su alto?": {
    pista: "Cada palabra —alto, capacidad, peso— nombra una cosa distinta que medir.",
    pasos: [
      "El alto es una distancia: va de abajo hacia arriba.",
      "La capacidad es lo que le cabe adentro.",
      "El peso es lo que marca la balanza cuando lo pones encima.",
    ],
    ojo: "Un objeto grande no siempre es pesado, y uno pesado no siempre es grande.",
  },

  // ============================================================ DBA 6
  "6|¿Cuál de estas figuras tiene cuatro lados iguales?": {
    pista: "Cuenta los lados de cada figura y, si hace falta, mira si miden lo mismo.",
    pasos: [
      "Un lado es cada tramo recto del borde.",
      "Cuenta los lados de cada figura antes de decidir.",
      "Si varias tienen el mismo número de lados, mira si miden todos igual.",
    ],
    ojo: "Cuatro lados no basta: el rectángulo también tiene cuatro y no son todos iguales.",
  },
  "6|Una figura tiene 4 lados y dos son más largos.": {
    pista: "Lee la descripción entera y descarta las figuras que incumplan alguna parte.",
    pasos: [
      "Empieza por el número de lados: eso ya descarta varias.",
      "Después mira si dice algo sobre el tamaño de los lados.",
      "La figura buena es la que cumple TODO lo que dice, no solo lo primero.",
    ],
    ojo: "Quedarse con la primera pista es lo que hace confundir el cuadrado con el rectángulo.",
  },
  "6|¿Cuántos lados tiene un rectángulo?": {
    pista: "Recorre el borde con el dedo y cuenta cada tramo recto, sin repetir ninguno.",
    pasos: [
      "Empieza en una esquina y ve siguiendo el borde.",
      "Cada tramo recto entre dos esquinas es un lado.",
      "Vuelves a la esquina de partida cuando ya los contaste todos.",
    ],
    ojo: "En estas figuras hay tantos lados como esquinas: si te dan distinto, contaste mal.",
  },
  "6|¿Cuál de estos cuerpos rueda por todos lados?": {
    pista: "Piensa qué tiene ese cuerpo por fuera: caras planas, o superficie curva.",
    pasos: [
      "Lo que tiene caras planas se queda quieto apoyado en una de ellas.",
      "Lo que es curvo por todas partes no encuentra dónde quedarse quieto.",
      "Algunos tienen las dos cosas y solo ruedan para un lado.",
    ],
    ojo: "Rodar no depende del tamaño sino de si hay caras planas donde apoyarse.",
  },
  "6|Una lata de gaseosa se parece a un:": {
    pista: "Mírale la forma al objeto: cuántas caras planas tiene y cómo son.",
    pasos: [
      "Fíjate si tiene caras planas y de qué forma son.",
      "Fíjate si tiene alguna parte curva.",
      "Busca el cuerpo geométrico que tenga esas mismas partes.",
    ],
    ojo: "Los objetos de verdad nunca son perfectos: se PARECEN a un cuerpo, no son ese cuerpo.",
  },
  "6|¿Cuántas caras tiene un cubo?": {
    pista: "Cara es cada superficie plana; arista, cada línea donde se juntan dos caras; vértice, cada punta.",
    pasos: [
      "Para las caras, piensa en las tapas: arriba, abajo y los lados.",
      "Para las aristas, cuenta las líneas donde se doblan dos caras.",
      "Para los vértices, cuenta las puntas donde se juntan las líneas.",
    ],
    ojo: "Caras, aristas y vértices son tres cosas distintas y dan tres números distintos.",
  },
  "6|Si mojas una cara del cubo y la estampas, ¿qué sale?": {
    pista: "Lo que queda estampado es la forma PLANA de esa cara.",
    pasos: [
      "Mira qué forma tiene la cara que vas a estampar.",
      "El sello deja esa forma plana, no el cuerpo entero.",
      "Por eso un cuerpo puede dejar sellos distintos según qué cara uses.",
    ],
    ojo: "El sello nunca sale con volumen: un cuerpo deja siempre una figura plana.",
  },
  "6|¿En qué se diferencia un cuadrado de un cubo?": {
    pista: "Uno es plano y el otro ocupa lugar: piensa si se puede llenar o solo dibujar.",
    pasos: [
      "Las figuras planas se dibujan en una hoja y no tienen adentro.",
      "Los cuerpos ocupan espacio, se pueden llenar y se pueden agarrar.",
      "Las caras de un cuerpo SON figuras planas: por ahí se relacionan.",
    ],
    ojo: "Que tengan nombres parecidos no los vuelve lo mismo: uno cabe en una hoja y el otro no.",
  },
  "6|Andrés escribe: «mi balón tiene forma de cubo». ¿Está bien?": {
    pista: "Comprueba si el objeto de verdad tiene las partes que ese nombre promete.",
    pasos: [
      "Piensa qué partes tiene el cuerpo que él nombró.",
      "Piensa qué partes tiene el objeto de verdad.",
      "Si no coinciden, la descripción está mal, y hay que decir por qué.",
    ],
    ojo: "No alcanza con decir que está mal: hay que señalar en qué parte falla.",
  },
  "6|¿Cuál figura NO tiene esquinas?": {
    pista: "Ojo con el NO: te están pidiendo la que NO cumple, no la que sí.",
    pasos: [
      "Lee otra vez la pregunta y fíjate si hay un NO.",
      "Revisa una por una si cumplen o no cumplen.",
      "Escoge la que se sale del grupo, no la que encaja.",
    ],
    ojo: "Las preguntas con NO se fallan por leerlas rápido, no por no saber la materia.",
  },
  // ============================================================ DBA 7
  "7|Mira la línea del dibujo. ¿Cómo está puesta?": {
    pista: "Compara la línea con el marco: mira si va como el suelo, como una pared, o cruzada.",
    pasos: [
      "Una línea acostada, que va de lado a lado, está horizontal.",
      "Una línea parada, que va de arriba abajo, está vertical.",
      "Dos líneas que van juntas sin tocarse nunca están paralelas.",
    ],
    ojo: "Horizontal y vertical no existen solas: se dicen siempre comparando con algo.",
  },
  "7|Mira el dibujo. ¿Cómo se llaman estas dos líneas?": {
    pista: "Mira si las líneas se cruzan o no, y cómo quedan las esquinas si se cruzan.",
    pasos: [
      "Si por más que sigan nunca se tocan, son paralelas.",
      "Si se cruzan dejando cuatro esquinas iguales, son perpendiculares.",
      "Una sola línea no es ni lo uno ni lo otro: se dice si está horizontal o vertical.",
    ],
    ojo: "Paralelas y perpendiculares hablan de DOS líneas; horizontal y vertical, de una sola.",
  },
  "7|Dos líneas se cruzan y forman cuatro esquinas iguales.": {
    pista: "Lo que decide el nombre es si se cruzan y cómo quedan las esquinas.",
    pasos: [
      "Pregúntate primero: ¿se llegan a tocar o no?",
      "Si no se tocan nunca y van siempre a la misma distancia, son paralelas.",
      "Si se cruzan y las cuatro esquinas quedan iguales, son perpendiculares.",
    ],
    ojo: "Cruzarse no basta para ser perpendiculares: las esquinas tienen que quedar parejas.",
  },
  "7|En un marco cuadrado, ¿cómo son el lado de arriba y el de abajo?": {
    pista: "Piensa si esos dos lados llegarían a tocarse si los estiraras mucho.",
    pasos: [
      "Los lados de enfrente van uno frente al otro y nunca se tocan: son paralelos.",
      "Los lados que comparten una esquina se cruzan ahí mismo: son perpendiculares.",
      "Mira en el marco cuáles te están nombrando antes de decidir.",
    ],
    ojo: "En un marco hay las dos cosas a la vez: depende de qué par de lados mires.",
  },
  "7|¿Cuál de estas cosas está casi siempre vertical?": {
    pista: "Piensa cómo se ve esa cosa en la vida real: parada, acostada, o cruzando a otra.",
    pasos: [
      "Lo que va de arriba abajo, como un poste o una pared, está vertical.",
      "Lo que se extiende de lado a lado, como el piso o el agua quieta, está horizontal.",
      "Dos cosas son perpendiculares cuando una está parada sobre la otra.",
    ],
    ojo: "El agua quieta siempre queda horizontal: por eso sirve para saber si algo está derecho.",
  },
  "7|Los rieles del tren no se tocan nunca. ¿Cómo son?": {
    pista: "Si van juntas a la misma distancia, son una cosa; si se cruzan derechito, son otra.",
    pasos: [
      "Van a la misma distancia y no se tocan nunca: paralelas.",
      "Se cruzan dejando esquinas iguales: perpendiculares.",
      "Busca en el enunciado cuál de las dos cosas está describiendo.",
    ],
    ojo: "Que dos líneas no se toquen EN EL DIBUJO no basta: hay que pensar si se tocarían al seguir.",
  },
  "7|Caminas por una calle y doblas en la esquina. ¿Qué hiciste?": {
    pista: "Doblar en una esquina es pasarse a la calle que cruza; seguir derecho es quedarse en la misma.",
    pasos: [
      "Si doblaste, cambiaste a una calle que cruza a la primera.",
      "Si seguiste derecho, sigues en la misma calle.",
      "Pasar a otra calle que va en la misma dirección es pasar a una paralela.",
    ],
    ojo: "Cambiar de calle y devolverse no son lo mismo: devolverse es volver por donde viniste.",
  },
  "7|Subes por las escaleras del edificio. ¿Cómo te mueves?": {
    pista: "Piensa para dónde te lleva ese movimiento: arriba, abajo, o de lado.",
    pasos: [
      "Subir o bajar es moverse en vertical.",
      "Caminar por un pasillo plano es moverse en horizontal.",
      "Dar vueltas alrededor de algo no es ni lo uno ni lo otro.",
    ],
    ojo: "Un tobogán baja, pero no baja derecho: va bajando mientras avanza.",
  },
  "7|Te dicen: «sigue derecho y no dobles». ¿Qué haces?": {
    pista: "Traduce la indicación a un movimiento: ¿te quedas en la misma calle o te cambias?",
    pasos: [
      "«Sigue derecho» es quedarse en la misma calle, sin cambiar.",
      "«Dobla» es cambiarse a la calle que cruza, y hay que saber para qué lado.",
      "Si la indicación no dice para qué lado, falta un dato para poder seguirla.",
    ],
    ojo: "Una indicación incompleta no es una indicación: hay que notar qué le falta.",
  },
  "7|¿Por qué dos líneas paralelas nunca se cruzan?": {
    pista: "La razón está en la distancia entre ellas: fíjate si esa distancia cambia o no.",
    pasos: [
      "Dos paralelas van siempre separadas por lo mismo, de principio a fin.",
      "Si la distancia nunca se achica, no hay manera de que lleguen a tocarse.",
      "Las que se cruzan van en direcciones distintas, y por eso en algún punto se encuentran.",
    ],
    ojo: "No es que sean cortas: aunque siguieran para siempre, tampoco se tocarían.",
  },

  // ============================================================ DBA 8
  "8|Para devolverte en la cadena, ¿qué le haces a un «+5»?": {
    pista: "Para deshacer un paso hay que hacer lo contrario de lo que decía.",
    pasos: [
      "Lo contrario de sumar es restar, y lo contrario de restar es sumar.",
      "El número no cambia: lo que cambia es la operación.",
      "Y se empieza por el último paso, que es el que se deshace primero.",
    ],
    ojo: "Deshacer no es repetir: si el paso sumaba, para volver hay que quitar.",
  },
  "8|Si a un número le sumas 7 y luego le quitas 7, ¿qué queda?": {
    pista: "Dos operaciones contrarias con el mismo número se anulan entre ellas.",
    pasos: [
      "Sumar y después quitar lo mismo deja el número como estaba.",
      "Si los números no son iguales, no se anulan del todo: queda la diferencia.",
      "Piensa qué sobró después de que se cancelara lo que se pudo cancelar.",
    ],
    ojo: "Que se anulen no quiere decir que quede en cero: queda el número del principio.",
  },
  "8|Sabes que 8 + 5 = 13. ¿Qué otra cuenta sabes ya?": {
    pista: "De una suma que ya conoces salen restas gratis, sin volver a calcular.",
    pasos: [
      "Si dos números juntos dan un total, quitarle uno al total devuelve el otro.",
      "Del mismo modo, si una resta te da un resultado, sumarlo al que se fue devuelve el de partida.",
      "Comprueba tu respuesta haciendo la cuenta al derecho.",
    ],
    ojo: "El total nunca puede quedar de un lado de la resta como si fuera una parte.",
  },
  "8|Buscas un número probando. Probaste 5 y quedó corto.": {
    pista: "Cada intento te dice para qué lado moverte en el siguiente.",
    pasos: [
      "Si el resultado quedó corto, el número que buscas es más grande.",
      "Si se pasó, el que buscas es más pequeño.",
      "Si quedó justo, ya lo encontraste y no hay que seguir probando.",
    ],
    ojo: "Probar no es adivinar: cada intento descarta la mitad de las opciones que quedaban.",
  },

  // ============================================================ DBA 9
  "9|¿Cuál número va en el espacio? 15, 20, ?, 30": {
    pista: "Averigua de cuánto en cuánto salta la serie usando dos números que sí estén.",
    pasos: [
      "Busca dos números seguidos que estén completos y mira cuánto hay entre ellos.",
      "Ese salto se repite en toda la serie, también donde está el hueco.",
      "Aplícale el salto al número de antes del hueco y comprueba con el de después.",
    ],
    ojo: "Comprobar por los dos lados es lo que te dice si acertaste con el salto.",
  },
  "9|¿Cuál signo va en el espacio? 9 ? 4 = 13": {
    pista: "Mira si el resultado es más grande o más pequeño que los números de partida.",
    pasos: [
      "Si el resultado es mayor que los dos, se sumó o se multiplicó.",
      "Si es menor, se restó o se repartió.",
      "Después prueba la operación que pensaste y comprueba que dé exactamente.",
    ],
    ojo: "No basta con que el resultado quede del lado correcto: tiene que dar el número exacto.",
  },
  "9|¿Cuál signo va en el espacio? 20 ? 5 = 4": {
    pista: "Compara el tamaño del resultado con el de los números de partida.",
    pasos: [
      "Un resultado mucho más pequeño suele venir de repartir.",
      "Un resultado mucho más grande suele venir de multiplicar.",
      "Prueba el signo que pensaste antes de responder.",
    ],
    ojo: "Sumar y multiplicar los dos agrandan, pero no dan lo mismo: hay que probar.",
  },
  "9|Empezaste en 30 y llegaste a 42. ¿Qué pasó en el camino?": {
    pista: "Compara el de llegada con el de partida: mira si creció o se achicó, y cuánto.",
    pasos: [
      "Si el número creció, le sumaron o lo multiplicaron.",
      "Si se achicó, le restaron o lo repartieron.",
      "Mira la diferencia exacta y prueba con qué operación se consigue.",
    ],
    ojo: "Crecer no siempre es sumar: multiplicar también crece, y mucho más rápido.",
  },
  "9|¿Cuál de estas cuentas NO da 12?": {
    pista: "Ojo con el NO: hay que buscar la que falla, no la que cumple.",
    pasos: [
      "Resuelve las cuentas una por una.",
      "Ve marcando cuáles dan el número que dice el enunciado.",
      "La que sobra, la que da distinto, es la respuesta.",
    ],
    ojo: "En las preguntas con NO, la primera que te dé bien es justo la que NO sirve.",
  },
  "9|El 12 se puede escribir de varias formas. ¿Cuál sirve?": {
    pista: "Un mismo número se puede escribir de muchas maneras; hay que probar cuál da ese número.",
    pasos: [
      "Resuelve cada opción y mira qué número te da.",
      "La que dé exactamente el número del enunciado es la que sirve.",
      "Puede haber varias formas de escribirlo, pero aquí solo una está en la lista.",
    ],
    ojo: "Que dos cuentas se parezcan no quiere decir que den lo mismo: hay que resolverlas.",
  },
  "9|¿Cuál vale lo mismo que 8 + 5?": {
    pista: "Resuelve la cuenta del enunciado y después busca cuál de las opciones da lo mismo.",
    pasos: [
      "Primero saca cuánto da la suma que te muestran.",
      "Después ve probando las opciones hasta encontrar la que da ese mismo número.",
      "Fíjate en las que empiezan por 10: esas se resuelven casi sin pensar.",
    ],
    ojo: "Dos sumas distintas pueden valer lo mismo; por eso una se puede cambiar por la otra.",
  },
  "9|De las parejas que suman 10, ¿cuál da el mayor al multiplicar?": {
    pista: "Multiplica cada pareja y compara los resultados: ahí se ve el patrón.",
    pasos: [
      "Toma cada pareja y multiplícala.",
      "Anota los resultados y compáralos.",
      "Vas a ver que el mayor sale cuando los dos números son lo más parecidos posible.",
    ],
    ojo: "Todas las parejas suman lo mismo, así que la suma no ayuda a decidir: hay que multiplicar.",
  },
  "9|Buscas dos números que sumen 9 y uno sea el doble del otro.": {
    pista: "Prueba parejas que cumplan una condición y después comprueba la otra.",
    pasos: [
      "Empieza por las parejas que sumen lo que pide el enunciado.",
      "De esas, mira cuál cumple además la segunda condición.",
      "Comprueba las dos cosas antes de responder, no solo una.",
    ],
    ojo: "Una pareja que cumple una sola de las dos condiciones no sirve.",
  },

  // ============================================================ DBA 10
  "10|Cada dibujo vale 5 votos. ¿Cuánto valen 3 dibujos?": {
    pista: "Cada dibujo vale varios: hay que repetir ese valor tantas veces como dibujos haya.",
    pasos: [
      "Mira cuánto vale un solo dibujo.",
      "Cuenta cuántos dibujos hay.",
      "Suma el valor de uno tantas veces como dibujos tengas.",
    ],
    ojo: "Sumar el valor con la cantidad de dibujos no da nada: hay que repetir, no juntar.",
  },
  "10|Cada dibujo vale 5 votos y hay 20 votos. ¿Cuántos dibujos?": {
    pista: "Aquí es al revés: sabes el total y buscas cuántos dibujos hacen falta.",
    pasos: [
      "Pregúntate cuántas veces cabe el valor de un dibujo dentro del total.",
      "Ve contando de ese valor en ese valor hasta llegar al total.",
      "Las veces que contaste son los dibujos.",
    ],
    ojo: "Restarle el valor de un dibujo al total no responde la pregunta: hay que repartir.",
  },
  "10|Con muchos datos, ¿por qué un dibujo vale varios y no uno?": {
    pista: "Piensa qué pasaría con la hoja si cada dibujo valiera uno solo.",
    pasos: [
      "Con muchos datos, dibujar uno por uno llenaría la hoja entera.",
      "Por eso se agrupa: un dibujo representa varios.",
      "Y entonces hay que escribir abajo cuánto vale cada uno, o nadie puede leerlo.",
    ],
    ojo: "Si dos dibujos del mismo gráfico valen distinto, el gráfico engaña al que lo mira.",
  },
  "10|Un dibujo vale 5 votos. ¿Cuántos votos sacó el candidato 2?": {
    pista: "Cuenta los dibujos de esa fila y después aplica lo que vale cada uno.",
    pasos: [
      "Busca la fila que te preguntan y cuenta sus dibujos.",
      "Mira debajo del gráfico cuánto vale cada dibujo.",
      "Suma ese valor tantas veces como dibujos contaste.",
    ],
    ojo: "Responder el número de dibujos en vez del número de votos es el error clásico.",
  },
  "10|Un dibujo vale 5 niños. ¿Qué día vinieron más niños?": {
    pista: "Como todos los dibujos valen igual, gana la fila que tenga más dibujos.",
    pasos: [
      "Compara cuántos dibujos tiene cada fila.",
      "La fila con más dibujos es la del valor más alto, y la de menos, la más baja.",
      "Si todas tienen los mismos dibujos, entonces quedaron iguales.",
    ],
    ojo: "Aquí no hace falta calcular los totales: basta comparar, porque la escala es la misma.",
  },
  "10|Un dibujo vale 5 votos. ¿Cuántos votos hay en total?": {
    pista: "Calcula lo de cada fila y después júntalo todo.",
    pasos: [
      "Convierte los dibujos de cada fila a su valor.",
      "Suma los valores de todas las filas.",
      "También puedes contar todos los dibujos del gráfico y aplicar la escala una sola vez.",
    ],
    ojo: "No olvides ninguna fila: la más corta también suma.",
  },
  "10|El informe dice que ganó Beto. Mira el dibujo: ¿es cierto?": {
    pista: "Comprueba la afirmación contra el dibujo: no la creas solo porque está escrita.",
    pasos: [
      "Lee con cuidado qué afirma exactamente el informe.",
      "Busca en el gráfico los datos que hacen falta para comprobarlo.",
      "Compara lo que dice con lo que muestra, y decide si coincide.",
    ],
    ojo: "Que algo esté escrito en un informe no lo vuelve cierto: el gráfico es el que manda.",
  },
  "10|Mira el dibujo. ¿Cuántos votos separan a Ana de Caro?": {
    pista: "Calcula el valor de cada uno de los dos y réstalos.",
    pasos: [
      "Cuenta los dibujos de cada una de las dos filas que te nombran.",
      "Convierte cada fila a votos con la escala.",
      "Réstale al mayor el menor.",
    ],
    ojo: "Restar los DIBUJOS y no convertir a votos deja el resultado mucho más pequeño de lo real.",
  },
  "10|Anotaste los votos con palitos: IIII IIII II. ¿Cuántos son?": {
    pista: "Los palitos se anotan en grupos: cuenta los grupos completos y súmale los sueltos.",
    pasos: [
      "Cada grupo completo vale lo mismo; cuenta cuántos grupos hay.",
      "Suma después los palitos sueltos que quedaron al final.",
      "El total es lo de los grupos más lo suelto.",
    ],
    ojo: "Contar los grupos y olvidar los sueltos deja la cuenta corta.",
  },
  "10|En la tabla, el sabor de fresa tiene 8 palitos. ¿Qué significa?": {
    pista: "Cada palito es una respuesta de alguien: piensa qué se estaba preguntando.",
    pasos: [
      "En una tabla de conteo, cada marca es una vez que apareció ese dato.",
      "El dato que más marcas tiene es el que más se repitió.",
      "Si dos tienen las mismas marcas, los escogió la misma cantidad de gente.",
    ],
    ojo: "Los palitos cuentan respuestas, no pesos ni precios ni cantidades de producto.",
  },
  "10|En un gráfico de puntos, cada punto vale un niño. ¿Y 6 puntos?": {
    pista: "En un gráfico de puntos cada punto vale uno: se cuenta y ya.",
    pasos: [
      "Cuenta los puntos de la columna que te preguntan.",
      "Como cada punto vale uno, ese número es la respuesta.",
      "La columna con más puntos es la que llega más arriba.",
    ],
    ojo: "Es distinto del pictograma: ahí un dibujo vale varios, aquí un punto vale uno.",
  },

  // ============================================================ DBA 11
  "11|Mañana sale el sol por la mañana. ¿Cómo es eso?": {
    pista: "Pregúntate si eso pasa siempre, si no puede pasar nunca, o si depende.",
    pasos: [
      "Lo que pasa siempre, sin fallar, es seguro.",
      "Lo que no puede pasar de ninguna manera es imposible.",
      "Lo que unas veces pasa y otras no, puede pasar o no.",
    ],
    ojo: "Que algo sea muy probable no lo vuelve seguro: seguro es que no falla nunca.",
  },
  "11|Sacas una ficha de una bolsa con puras fichas rojas.": {
    pista: "Mira qué hay dentro de la bolsa antes de decidir qué puede salir.",
    pasos: [
      "Si todas las fichas son del mismo color, ese color sale seguro.",
      "Si hay de varios colores, puede salir cualquiera de los que hay.",
      "Un color que no esté en la bolsa es imposible que salga.",
    ],
    ojo: "Lo que no está adentro no puede salir, por mucho que uno lo quiera.",
  },
  "11|En un dado de seis caras sale un número menor que 7.": {
    pista: "Piensa qué números tiene el dado y cuáles cumplen lo que dice la frase.",
    pasos: [
      "Un dado normal solo tiene los números del 1 al 6.",
      "Si TODOS los números cumplen la frase, eso pasa siempre.",
      "Si NINGUNO la cumple, no pasa nunca; si solo algunos, pasa a veces.",
    ],
    ojo: "El dado no tiene ni 0 ni números mayores que 6: esos son imposibles.",
  },
  "11|En la bolsa hay 5 rojas y 1 azul. ¿Qué es más probable?": {
    pista: "Compara de cuál color hay más: de ese hay más opción de que salga.",
    pasos: [
      "Cuenta cuántas hay de cada color.",
      "El color del que haya más tiene más opción de salir.",
      "Si hay la misma cantidad de los dos, los dos tienen la misma opción.",
    ],
    ojo: "Más opción no es seguridad: la ficha de la que hay una sola también puede salir.",
  },
  "11|Sacas una ficha de la bolsa. ¿Qué resultado es imposible?": {
    pista: "Imposible es lo que no puede pasar de ninguna manera, no lo que pasa poco.",
    pasos: [
      "Mira qué resultados existen de verdad en esa situación.",
      "Un resultado que no está entre ellos es imposible.",
      "Un resultado que existe pero es raro no es imposible: es poco probable.",
    ],
    ojo: "Confundir «difícil» con «imposible» es el error que persigue esta pregunta.",
  },
  "11|Una moneda cayó cara cuatro veces seguidas. ¿Y ahora?": {
    pista: "Piensa si lo que pasó antes puede cambiar lo que va a pasar ahora.",
    pasos: [
      "La moneda y el dado no guardan memoria de lo que salió antes.",
      "Cada tiro empieza de nuevo, con las mismas opciones de siempre.",
      "Por eso lo que salió antes no obliga a nada en el siguiente tiro.",
    ],
    ojo: "Pensar que «ya le toca» al otro lado es el error más común con las monedas.",
  },
  "11|David dice que SIEMPRE ganará porque sabe lanzar aviones.": {
    pista: "Distingue entre tener más opción de ganar y tener la victoria asegurada.",
    pasos: [
      "Saber hacer algo mejora las opciones: eso es cierto.",
      "Pero mejorar las opciones no es lo mismo que no poder perder nunca.",
      "Basta con imaginar una sola vez en que pierda para que el «siempre» sea falso.",
    ],
    ojo: "Una sola excepción tumba un «siempre». Para lo demás se dice «es probable».",
  },
  "11|Lleva diez días lloviendo por la tarde. ¿Y mañana?": {
    pista: "Lo que has observado sirve para esperar algo, no para asegurarlo.",
    pasos: [
      "Mira qué ha pasado hasta ahora y cuántas veces.",
      "Si ha pasado muchas veces, es probable que vuelva a pasar.",
      "Pero sigue siendo probable, no seguro: pudo cambiar.",
    ],
    ojo: "Predecir con lo observado está bien; decir que es seguro, no.",
  },
  "11|Sacaste 20 fichas y 18 eran rojas. ¿Qué hay en la bolsa?": {
    pista: "Lo que sacaste da una idea de lo que hay adentro, si sacaste suficientes.",
    pasos: [
      "Mira cuántas sacaste en total y cómo se repartieron.",
      "Si casi todas salieron de un color, lo más probable es que adentro haya sobre todo de ese.",
      "Si salieron parejas, lo más probable es que adentro haya parecido de los dos.",
    ],
    ojo: "Con muy pocas veces no se puede concluir nada: hacen falta varias.",
  },
  "11|¿Cuál de estas cosas ya se sabe antes de que pase?": {
    pista: "Separa lo que está decidido de antemano de lo que depende de cómo salgan las cosas.",
    pasos: [
      "Lo que sigue una regla fija —los días, los meses— ya se sabe antes.",
      "Lo que depende de la suerte o de otra gente no se sabe hasta que pasa.",
      "Y lo que contradice una regla fija no va a pasar nunca.",
    ],
    ojo: "Que algo sea muy probable no lo vuelve sabido: sabido es lo que no puede salir de otra forma.",
  },
};
