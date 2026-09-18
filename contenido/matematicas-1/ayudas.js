/* Las explicaciones escritas del grado 1.

   Van aquí las ranuras que NO se pueden derivar: las que no tienen una
   operación de la cual sacar los pasos. Son las conceptuales —comparar, medir,
   reconocer figuras, leer datos— y son 74 de las 100.

   La regla de REGLAS-DE-CONTENIDO.md: derivada por versión donde hay números,
   ESCRITA POR RANURA donde hay una idea. Una ranura conceptual tiene tres
   versiones que miden la misma idea con distinto disfraz, así que la
   explicación es una sola y no puede nombrar los números de una versión
   concreta. Cuando pone un ejemplo, lo dice: "por ejemplo".

   Cada una tiene:
     pista — el método, en una línea, SIN el resultado. Es lo único que se ve
             antes de responder.
     pasos — cómo se razona, después de responder.
     ojo   — el error que la pregunta está buscando. Opcional, pero casi
             siempre lo hay: si una pregunta no persigue ningún error, es que
             no está midiendo nada. */

module.exports = {
  /* ============ TEMA 1 · Para qué sirven los números ==================== */
  "1|¿En cuál el número dice CUÁNTOS hay?": {
    pista: "Busca el número que puedes contar con el dedo, uno por uno, hasta terminar.",
    pasos: [
      "Un número no siempre cuenta cosas. A veces es un nombre: el bus 20, el piso 3, un teléfono.",
      "Para saber si cuenta, pregúntate: ¿puedo señalarlos uno por uno y terminar?",
      "Por ejemplo, en «5 manzanas» sí: señalas 1, 2, 3, 4, 5. En «el bus 20» no, porque no hay veinte buses.",
    ],
    ojo: "El número de un bus, de un piso o de un teléfono es un nombre, no una cantidad.",
  },
  "1|¿En cuál el número dice el ORDEN?": {
    pista: "Busca el que dice en qué PUESTO va, no cuántos hay.",
    pasos: [
      "Cuando el número dice el puesto, casi siempre se lee distinto: primero, segundo, quinto.",
      "Por eso se escribe con esa bolita: 1º, 2º, 5º.",
      "«Quedó de 5º» habla de UN niño y de su puesto. «Tiene 5 años» habla de una cantidad.",
    ],
    ojo: "Ser el 5º no significa que haya cinco. Significa que hay cuatro adelante.",
  },
  "1|¿En cuál el número es una MEDIDA?": {
    pista: "Busca el número que viene con una unidad de medida: metros, kilos, minutos.",
    pasos: [
      "Cuando el número mide, siempre lo acompaña una palabra que dice CON QUÉ se midió.",
      "Metros para el largo, kilos para el peso, minutos para el tiempo.",
      "Si el número va solo o con cosas contables (3 primos, 5 sillas), no está midiendo: está contando.",
    ],
    ojo: "Busca la unidad. Sin unidad, el número no está midiendo.",
  },
  "1|Al bus se suben 3 niños. Para saber cuántos hay ahora:": {
    pista: "Fíjate si en la historia algo LLEGA o algo SE VA. Eso decide la operación.",
    pasos: [
      "Lee la historia y busca el verbo: subirse, meter, llegar, regalar, echar.",
      "Si algo llega o se agrega, la cantidad crece: se suma.",
      "Si algo se va, se pierde o se come, la cantidad baja: se resta.",
    ],
    ojo: "No todas las historias de este tema se suman. Lee qué pasó antes de decidir.",
  },
  "1|De la caja se pierden 4 crayolas. Para saber cuántas quedan:": {
    pista: "Fíjate si en la historia algo LLEGA o algo SE VA. Eso decide la operación.",
    pasos: [
      "Busca el verbo de la historia: perderse, irse, comerse, bajarse… o llegar y echar.",
      "Si algo desaparece, quedan menos: se resta.",
      "Si algo aparece, hay más: se suma.",
    ],
    ojo: "Ojo con esta: aquí también hay historias en las que la cantidad crece.",
  },

  /* ============ TEMA 2 · Contar y calcular de varias maneras ============ */
  "2|¿Cuántos dieces necesitas para armar 30?": {
    pista: "Un diez es un montón de diez. Cuenta cuántos montones completos caben.",
    pasos: [
      "Los números se arman con montones de diez y con unos sueltos.",
      "Para saber cuántos dieces hay en 30, cuenta de 10 en 10: 10, 20, 30. Contaste 3.",
      "Y al revés: 4 dieces y 2 unos se escriben poniendo primero los dieces y después los unos.",
    ],
    ojo: "4 dieces y 2 unos no se escribe 402. El 4 ya está diciendo que son cuarenta.",
  },
  "2|En 2, 4, 6, 8... todos los números son:": {
    pista: "Mira los números de la lista y busca qué tienen TODOS en común, no solo el primero.",
    pasos: [
      "Una conjetura es darse cuenta de algo que se repite siempre.",
      "Mira la lista entera, no un número suelto. ¿En qué terminan? ¿Se pueden repartir en dos montones iguales?",
      "Los que se reparten en dos montones iguales son pares; los que dejan uno suelto son impares.",
    ],
    ojo: "Que el primero cumpla no basta: la regla tiene que valer para todos.",
  },

  /* ============ TEMA 3 · Los dieces y los unos ========================= */
  "3|¿Qué número tiene 5 decenas y 2 unidades?": {
    pista: "El número de dieces se escribe primero, y el de unos, de segundo.",
    pasos: [
      "En un número de dos cifras, la de la izquierda dice cuántos DIECES hay.",
      "La de la derecha dice cuántos UNOS sueltos quedan.",
      "Por ejemplo, 5 decenas y 2 unidades se escribe 52: primero el 5, después el 2.",
    ],
    ojo: "No se escriben pegados como 502, ni se suman como 5 + 2 = 7. El 5 vale cincuenta.",
  },
  "3|El número 34 tiene:": {
    pista: "Lee el número de izquierda a derecha: la primera cifra son los dieces.",
    pasos: [
      "Tapa la última cifra con el dedo. Lo que queda son los dieces.",
      "Destapa: esa última cifra son los unos sueltos.",
      "Por ejemplo, en 34: el 3 son 3 dieces (treinta) y el 4 son 4 unos.",
    ],
    ojo: "El orden importa. 34 y 43 tienen las mismas cifras y no valen lo mismo.",
  },
  "3|El número 70 tiene:": {
    pista: "Un cero en los unos quiere decir que no sobró ninguno suelto.",
    pasos: [
      "Los números que terminan en 0 son dieces exactos: no quedó ningún uno suelto.",
      "Por ejemplo, 70 son 7 dieces y 0 unos.",
      "Por eso se cuentan de 10 en 10: 10, 20, 30… y siempre caen justo.",
    ],
    ojo: "70 no son 7 unidades. El 0 está diciendo que el 7 son dieces.",
  },
  "3|¿Cuál pareja suma 10?": {
    pista: "Prueba cada pareja: cuenta desde el primer número hasta ver si llegas justo a 10.",
    pasos: [
      "Las parejas que suman 10 hay que aprendérselas, porque se usan todo el tiempo.",
      "Son: 1 y 9, 2 y 8, 3 y 7, 4 y 6, y 5 con 5.",
      "Fíjate que cuando una sube, la otra baja: si tienes más de una, necesitas menos de la otra.",
    ],
    ojo: "Revisa todas las parejas antes de elegir: varias se parecen y solo una da justo 10.",
  },
  "3|Diez más que 63 es:": {
    pista: "Diez más o diez menos cambia SOLO la cifra de los dieces. La de los unos queda igual.",
    pasos: [
      "Sumar diez es agregar un montón de diez completo, no unos sueltos.",
      "Por eso la última cifra no se mueve: si tenías 63, sigues teniendo 3 unos.",
      "Lo que cambia es la primera: 6 dieces pasan a ser 7. Queda 73.",
    ],
    ojo: "Diez más no es ponerle un cero. 63 y diez más es 73, no 630.",
  },
  "3|¿Cuál pareja suma 20?": {
    pista: "Suma cada pareja y compárala con el número que te piden. Solo una da justo.",
    pasos: [
      "Empieza por el número más grande de la pareja y cuéntale el otro hacia adelante.",
      "Por ejemplo, para 15 y 5: empiezas en 15 y cuentas 5 más: 16, 17, 18, 19, 20.",
      "Si te pasas o te quedas corto, esa pareja no es.",
    ],
    ojo: "Aquí no siempre piden 20. Lee primero a qué número tiene que llegar la pareja.",
  },

  /* ============ TEMA 4 · Qué se puede medir ============================ */
  "4|¿Cuál grupo tiene MÁS estrellas?": {
    pista: "Todas las filas arrancan en el mismo sitio: la que llega más lejos es la que tiene más.",
    pasos: [
      "Los tres grupos tienen el mismo dibujo y empiezan alineados, así que se pueden comparar de un vistazo.",
      "La fila que llega más lejos es la que tiene más.",
      "Si no se ve claro, cuenta cada fila tocando los dibujos con el dedo.",
    ],
    ojo: "Fíjate en el número de la fila, no en cuál grupo está de primero.",
  },
  "4|¿Cuál grupo tiene MENOS?": {
    pista: "El que tiene MENOS es el número más pequeño. Compáralos de a dos.",
    pasos: [
      "Como todos los grupos son de lo mismo, se comparan los números directamente.",
      "Ve de a dos y quédate siempre con el más pequeño.",
      "El que gane todas las comparaciones es el que tiene menos.",
    ],
    ojo: "Aquí piden MENOS. Contestar con el número más grande es el error de siempre.",
  },
  "4|¿Qué se puede medir de una cuerda?": {
    pista: "Se puede medir lo que tiene MÁS o MENOS. Lo que solo tiene un nombre, no.",
    pasos: [
      "Medir es poner un número: 3 metros, 2 kilos, 5 minutos.",
      "Pregúntate: ¿esto puede tener más o menos? El largo sí, el peso sí, la duración sí.",
      "El nombre y el color no: una cuerda no tiene «más nombre» que otra.",
    ],
    ojo: "Que algo se pueda ver o decir no significa que se pueda medir.",
  },
  "4|¿Qué se puede medir de una caja de jugo?": {
    pista: "Cuando algo es un recipiente, lo que se mide es CUÁNTO LE CABE adentro.",
    pasos: [
      "Las cosas huecas —una botella, una olla, un salón— guardan otras cosas adentro.",
      "Eso que les cabe se llama capacidad, y se mide llenándolas.",
      "Se mide con lo que quepa: vasos de agua, pocillos de arroz, niños en un salón.",
    ],
    ojo: "La marca, el color o el dibujo del envase no son cosas que se midan.",
  },
  "4|¿Cuál es el MÁS CORTO?": {
    pista: "Imagínalos todos juntos, uno al lado del otro. Ahí se ve cuál sobresale.",
    pasos: [
      "Para comparar el largo o el alto, imagina los objetos puestos uno al lado del otro.",
      "Ordénalos de mentiras, del más pequeño al más grande.",
      "El que te piden es el que queda en una de las dos puntas de esa fila.",
    ],
    ojo: "Fíjate bien si piden el MÁS o el MENOS antes de contestar.",
  },
  "4|¿Cuál pesa MÁS?": {
    pista: "Imagina que los cargas en las manos. El que te hunde el brazo pesa más.",
    pasos: [
      "El peso no se ve: se siente. Imagina que levantas cada cosa.",
      "Casi siempre, si es de lo mismo, la más grande pesa más: un balde de agua pesa más que un vaso de agua.",
      "Ordénalos de mentiras del más liviano al más pesado y elige la punta que te piden.",
    ],
    ojo: "Grande no siempre es pesado, pero cuando son de lo MISMO, sí.",
  },
  "4|¿Con qué sabes cuánto PESA una fruta?": {
    pista: "Cada instrumento sirve para una sola cosa. Fíjate qué te están pidiendo medir.",
    pasos: [
      "La balanza pesa. El metro y la regla miden el largo. El reloj mide el tiempo.",
      "Lee la pregunta y subraya con el dedo qué piden: ¿pesa, mide o dura?",
      "Elige el instrumento que sirve para eso.",
    ],
    ojo: "Con una regla no se puede pesar, por grande que sea la regla.",
  },
  "4|¿Con qué sabes cuánto DURA un juego?": {
    pista: "Cuando la pregunta dice CUÁNTO DURA o QUÉ DÍA, lo que se mide es tiempo.",
    pasos: [
      "El tiempo corto —un juego, una clase— se mide con un reloj.",
      "El tiempo largo —los días, las semanas— se mira en un calendario.",
      "Ni la balanza ni la regla sirven: el tiempo no pesa ni tiene largo.",
    ],
    ojo: "Un reloj y un calendario miden los dos el tiempo, pero uno corto y el otro largo.",
  },
  "4|¿Con qué sabes cuánta agua CABE en una jarra?": {
    pista: "Para saber cuánto CABE, se llena con algo más pequeño y se cuenta cuántos entraron.",
    pasos: [
      "La capacidad se mide llenando: vasos para el agua, pocillos para el arroz.",
      "Se cuenta cuántos vasos o pocillos entraron, y ese número es la medida.",
      "Cuidado: si la pregunta cambia y pide el LARGO, entonces sí es una regla.",
    ],
    ojo: "Una de estas tres preguntas no es de capacidad. Léela bien antes de contestar.",
  },
  "4|¿Quién caminó MÁS?": {
    pista: "Si los dos midieron con lo mismo, el que dio más pasos recorrió más.",
    pasos: [
      "Cuando se mide con pasos o baldosas, el número dice cuánto se recorrió.",
      "Como la unidad es la misma para todos, se pueden comparar los números directamente.",
      "Más pasos es más camino; menos pasos es menos camino.",
    ],
    ojo: "Esto solo vale si los pasos son iguales. Con pasos distintos, los números no se pueden comparar.",
  },

  /* ============ TEMA 5 · Medir con lo que tengas ======================= */
  "5|La mesa mide 4 cuartas. ¿Con qué la mediste?": {
    pista: "La medida te dice el instrumento: si dice cuartas, mediste con la mano.",
    pasos: [
      "Para medir no siempre hace falta una regla: sirve la mano, el pie o cualquier objeto repetido.",
      "Una cuarta es la mano abierta, del pulgar al meñique.",
      "El nombre de la medida delata con qué se midió: pasos con los pies, cuartas con la mano.",
    ],
    ojo: "La unidad tiene que servir para lo que se mide: con un reloj no se mide una mesa.",
  },
  "5|¿Cuál dura MÁS?": {
    pista: "Piensa cuánto tarda cada cosa de verdad, y ordénalas de la más corta a la más larga.",
    pasos: [
      "Ordena las opciones por su duración: un parpadeo, un aplauso, un recreo, una clase, un día.",
      "Algunas son de un segundo y otras de horas: la diferencia es enorme.",
      "Elige la punta que te piden, la que dura más o la que dura menos.",
    ],
    ojo: "Lee si piden MÁS o MENOS. Aquí no siempre piden lo mismo.",
  },
  "5|La caja pesa 8 fichas y el libro 5 fichas. ¿Cuál pesa más?": {
    pista: "Aquí no se compara a ojo: se compara lo que dio cada medida.",
    pasos: [
      "Mira cuántas unidades dio cada cosa y compara esos dos números.",
      "El que dio más unidades es el que pesa más, o el que lleva más.",
      "Pero eso solo vale si las dos se midieron con la MISMA unidad.",
    ],
    ojo: "Ocho fichas y ocho tapas no se pueden comparar: el número es igual y la unidad no.",
  },
  "5|Mira las dos cintas, medidas en cuartas. ¿Cómo son?": {
    pista: "Mira las dos barras del dibujo: la más larga es la que mide más.",
    pasos: [
      "Las dos cosas están medidas con la misma unidad, así que se pueden comparar.",
      "Mira el dibujo: la barra más larga es la que mide más, y la más corta la que mide menos.",
      "Si las dos barras llegan hasta el mismo punto, miden lo mismo.",
    ],
    ojo: "Esto solo funciona porque las dos se midieron con lo MISMO.",
  },
  "5|Cada jarra llenó estos vasos. ¿Cuál jarra tenía MÁS agua?": {
    pista: "El que llenó más vasos es el que tiene más adentro.",
    pasos: [
      "Para comparar cuánto le cabe a dos recipientes, se llenan los dos con lo mismo.",
      "Se cuenta cuántos vasos o pocillos salieron de cada uno.",
      "El que dio más vasos es el que tenía más, aunque por fuera parezca más pequeño.",
    ],
    ojo: "No se compara por el tamaño de afuera: se compara por lo que le cupo.",
  },
  "5|¿Cuántos cm más largo es el lápiz azul que el rojo?": {
    pista: "Para saber cuánto MÁS mide uno que otro, se resta la medida pequeña de la grande.",
    pasos: [
      "Mira las dos barras y fíjate cuál es la más larga.",
      "La pregunta es cuánto le sobra a esa por encima de la otra.",
      "Eso se averigua restando: la medida grande menos la pequeña.",
    ],
    ojo: "Aquí no se suman las dos medidas. Se busca la diferencia entre ellas.",
  },
  "5|Mide en cuartas. ¿Cabe la caja en el estante?": {
    pista: "Compara las dos medidas: si lo que entra mide más que el espacio, no cabe.",
    pasos: [
      "Mira cuánto mide el espacio y cuánto mide la cosa que quieres meter.",
      "Si la cosa mide menos, cabe y además sobra.",
      "Si mide más, no cabe. Y si miden exactamente igual, entra justo, sin sobrar nada.",
    ],
    ojo: "Hay tres respuestas posibles, no dos: cabe con espacio, entra justo, o no cabe.",
  },
  "5|Si mides el salón con pasos GRANDES, das:": {
    pista: "Piensa: con una unidad más grande hacen falta menos veces para cubrir lo mismo.",
    pasos: [
      "El objeto no cambia de tamaño: lo que cambia es con qué lo mides.",
      "Si la unidad es grande —pasos largos, cuartas grandes— necesitas pocas para cubrirlo.",
      "Si la unidad es pequeña —cuadraditos, pasos cortos— necesitas muchas más.",
    ],
    ojo: "Es al revés de lo que parece: unidad más grande, número más pequeño.",
  },

  /* ============ TEMA 6 · Las figuras y sus formas ====================== */
  "6|¿Cuántos lados tiene un triángulo?": {
    pista: "Cuenta los lados de la figura tocándolos con el dedo, uno por uno, dando la vuelta.",
    pasos: [
      "Un lado es cada rayita recta que forma la figura.",
      "Cuéntalos dando la vuelta completa y sin repetir ninguno.",
      "El triángulo tiene 3 y el rectángulo tiene 4.",
    ],
    ojo: "En estas figuras hay tantas puntas como lados: si cuentas 3 lados, hay 3 puntas.",
  },
  "6|¿Con cuántos palitos haces un triángulo?": {
    pista: "Cada palito es un lado. Cuenta cuántos lados necesita la figura.",
    pasos: [
      "Para armar una figura con palitos, necesitas un palito por cada lado.",
      "El triángulo tiene 3 lados: 3 palitos. El cuadrado tiene 4: 4 palitos.",
      "Y si juntas dos cuadrados iguales uno al lado del otro, queda una figura más larga que alta: un rectángulo.",
    ],
    ojo: "Con menos palitos que lados la figura no cierra, y una figura abierta no es una figura.",
  },
  "6|¿Cuántos lados tiene un cuadrado?": {
    pista: "Cuenta tocando con el dedo. Y fíjate si la figura tiene rayitas rectas o no tiene ninguna.",
    pasos: [
      "El cuadrado tiene 4 lados iguales y 4 esquinas, una en cada punta.",
      "En estas figuras siempre hay tantas esquinas como lados.",
      "El círculo es distinto: es una sola línea curva, sin lados rectos y sin esquinas.",
    ],
    ojo: "El círculo no tiene 1 lado: no tiene ninguno, porque un lado es una rayita recta.",
  },
  "6|Tiene 3 lados y 3 puntas. Es un:": {
    pista: "Cuenta los lados que menciona la descripción y busca la figura que los tenga.",
    pasos: [
      "La descripción te da las pistas: cuántos lados, cuántas puntas, si son rectos o curvos.",
      "3 lados y 3 puntas solo lo cumple el triángulo.",
      "4 lados con dos más largos es el rectángulo; sin lados rectos ni puntas, el círculo.",
    ],
    ojo: "El cuadrado y el rectángulo tienen los dos 4 lados. Los diferencia si son todos iguales o no.",
  },
  "6|Tiene 4 lados iguales y 4 puntas. Es un:": {
    pista: "La descripción dice cuántos lados y cómo son. Eso alcanza para saber cuál es.",
    pasos: [
      "4 lados IGUALES es el cuadrado; si dos son más largos, es el rectángulo.",
      "3 lados iguales es el triángulo.",
      "Y lo que rueda y no tiene puntas es el círculo, porque es todo curvo.",
    ],
    ojo: "La palabra «iguales» es la que decide entre cuadrado y rectángulo.",
  },
  "6|¿Cuál de estas cosas tiene las esquinas en punta?": {
    pista: "Pasa el dedo por el borde de mentiras: si da la vuelta sin frenar, es curvo.",
    pasos: [
      "Un borde curvo se sigue con el dedo sin tropezar con ninguna esquina.",
      "Un borde recto va derecho y se frena en una esquina.",
      "Los platos, las monedas y los anillos son curvos; las reglas, los libros y las mesas son rectos.",
    ],
    ojo: "Mírale el borde, no el tamaño ni para qué sirve el objeto.",
  },
  "6|Una pelota tiene forma de:": {
    pista: "Piensa si el objeto rueda para todos lados o si tiene caras planas.",
    pasos: [
      "La esfera es redonda por todas partes y rueda para cualquier lado: una pelota, una naranja.",
      "El cubo tiene caras planas y no rueda.",
      "Cuidado: la cara de un reloj se VE como un círculo plano, y una pelota es una esfera.",
    ],
    ojo: "El círculo es plano, como un dibujo. La esfera es un cuerpo que se puede agarrar.",
  },
  "6|Un dado tiene forma de:": {
    pista: "Cuéntale las caras de mentiras: ¿son todas cuadradas, o unas más largas?",
    pasos: [
      "El cubo tiene 6 caras cuadradas, todas iguales: por eso un dado es un cubo.",
      "El prisma también tiene 6 caras, pero unas más largas que otras: una caja de zapatos.",
      "El cono tiene una punta arriba y una base redonda: un gorro de cumpleaños.",
    ],
    ojo: "El cubo y el prisma se parecen. Lo que los distingue es si todas las caras son iguales.",
  },
  "6|Una caja de galletas tiene forma de:": {
    pista: "Si tiene dos tapas redondas y rueda como un rodillo, es un cilindro.",
    pasos: [
      "El cilindro tiene dos tapas redondas iguales y un tubo entre las dos: una lata, un rollo de papel.",
      "Rueda, pero solo para un lado, no como una pelota.",
      "La caja de galletas es distinta: tiene caras planas y esquinas, así que es un prisma.",
    ],
    ojo: "Aquí no todos son cilindros. Míralo bien antes de contestar.",
  },

  /* ============ TEMA 7 · Dónde están las cosas ========================= */
  "7|El perro está DEBAJO de la mesa. Entonces la mesa está:": {
    pista: "Ponte en el lugar del otro objeto: lo que está debajo de algo tiene ese algo encima.",
    pasos: [
      "Estar encima y estar debajo son la misma situación vista desde los dos lados.",
      "Si el perro está debajo de la mesa, desde el perro la mesa se ve arriba.",
      "Lo mismo con dentro: si el gato está dentro de la caja, la caja lo rodea por todos lados.",
    ],
    ojo: "Si los dos estuvieran debajo del otro, alguno tendría que estar en dos sitios a la vez.",
  },
  "7|Dos caminos al parque, medidos en pasos. ¿Cuál es MÁS LARGO?": {
    pista: "Los dos caminos están medidos con lo mismo. Compara los dos números.",
    pasos: [
      "Mira las dos barras del dibujo: cada una es un camino.",
      "La barra más larga es el camino más largo, y la más corta el camino más corto.",
      "Si las dos miden igual, da lo mismo por dónde te vayas.",
    ],
    ojo: "Lee si piden el MÁS largo o el MÁS corto: es lo único que cambia.",
  },
  "7|Desde tu casa, en pasos. ¿Cuál queda MÁS CERCA?": {
    pista: "Más cerca es el número más pequeño de pasos; más lejos es el más grande.",
    pasos: [
      "Los pasos o las cuadras dicen cuánto hay que caminar hasta cada lugar.",
      "Menos pasos es más cerca. Más pasos es más lejos.",
      "Como los dos se midieron desde tu casa y con lo mismo, se pueden comparar.",
    ],
    ojo: "Cerca y lejos son al revés en los números: el más cerca es el número más pequeño.",
  },
  "7|Un camino de 3 cuadras es ___ que uno de 6 cuadras.": {
    pista: "Compara los dos números de cuadras y di cómo es el primero comparado con el segundo.",
    pasos: [
      "La frase compara el primer camino CON el segundo, en ese orden.",
      "Si el primer número es más pequeño, el primer camino es más corto.",
      "Si los dos números son iguales, los caminos son igual de largos.",
    ],
    ojo: "Lee en qué orden están. Cambiar el orden cambia la respuesta.",
  },
  "7|Lápiz a la derecha, borrador a la izquierda. Coges el lápiz con:": {
    pista: "Levanta de verdad la mano con la que escribes y ubícate desde ahí.",
    pasos: [
      "Tu derecha y tu izquierda van contigo: dependen de para dónde estés mirando.",
      "Lo que está a tu derecha se alcanza con la mano derecha.",
      "Y siempre son dos: si una es la derecha, la otra es la izquierda.",
    ],
    ojo: "La derecha de quien está al frente tuyo es tu izquierda. Por eso hay que ubicarse en uno mismo.",
  },
  "7|Vas caminando y das media vuelta. Ahora vas:": {
    pista: "Haz el giro con el cuerpo, despacio, y fíjate para dónde quedas mirando.",
    pasos: [
      "Media vuelta te deja mirando justo para el lado contrario: vuelves por donde viniste.",
      "Un cuarto de giro a la derecha te deja mirando a la derecha.",
      "Una vuelta completa te deja mirando para donde ya ibas: es como no haber girado.",
    ],
    ojo: "Media vuelta y vuelta completa suenan parecido y dejan en lados opuestos.",
  },
  "7|En el plano, el colegio está debajo de tu casa. Para llegar:": {
    pista: "En un plano, lo que está arriba en el papel se alcanza subiendo.",
    pasos: [
      "Un plano es el dibujo de un lugar visto desde arriba.",
      "Lo que aparece arriba en el dibujo queda hacia allá; lo de abajo, hacia acá.",
      "Para llegar, te mueves en la misma dirección en la que está dibujado.",
    ],
    ojo: "Moverse al contrario de como está en el plano te aleja en vez de acercarte.",
  },
  "7|Estás en la puerta. El tablero está al frente. Para llegar:": {
    pista: "Piensa qué es lo PRIMERO que tendrías que hacer para arrancar hacia allá.",
    pasos: [
      "Un recorrido se arma por pasos, y la pregunta es por el primero.",
      "Mira dónde estás parado y hacia dónde queda lo que buscas.",
      "El primer paso es moverte en esa dirección: al frente, cruzando, o hasta el fondo.",
    ],
    ojo: "Quedarse quieto o irse para el otro lado no acerca a ninguna parte.",
  },
  "7|El parque queda más lejos que la tienda. Llegar al parque toma:": {
    pista: "Más lejos es más camino, y más camino es más tiempo caminando.",
    pasos: [
      "Si dos lugares están a distinta distancia, llegar a ellos toma distinto tiempo.",
      "Al más lejano se demora más; al más cercano, menos.",
      "Y si están a la misma distancia, llegar toma el mismo tiempo.",
    ],
    ojo: "Esto vale si vas igual de rápido a los dos lados.",
  },
  "7|¿Cuál explicación sirve para llegar a un lugar?": {
    pista: "Una buena indicación dice CUÁNTO avanzar y PARA DÓNDE girar.",
    pasos: [
      "Para llegar a un sitio hay que saber dos cosas: cuánto caminar y hacia dónde.",
      "«Camina 2 cuadras y gira» tiene las dos: un número y una dirección.",
      "«Queda por ahí» o «es una casa bonita» no sirven: no dicen ni cuánto ni para dónde.",
    ],
    ojo: "Describir cómo es el lugar no ayuda a llegar si no dices el camino.",
  },

  /* ============ TEMA 8 · Lo que cambia cuando algo cambia ============== */
  "8|Un vaso tenía 2 bolas. Ahora tiene 5. ¿Qué pasó?": {
    pista: "Compara el número de antes con el de ahora: ¿subió o bajó?",
    pasos: [
      "Mira cuánto había antes y cuánto hay ahora.",
      "Si ahora hay más, es porque alguien agregó.",
      "Si ahora hay menos, es porque alguien quitó, se comió o se llevó.",
    ],
    ojo: "Las cosas no cambian de cantidad solas: si hay más o menos, alguien hizo algo.",
  },
  "8|Tenías 10 dulces. Ahora tienes 6. Entonces:": {
    pista: "Además de mirar si subió o bajó, cuenta CUÁNTO cambió de uno a otro.",
    pasos: [
      "Primero fíjate si la cantidad subió o bajó.",
      "Después cuenta cuánto: desde el número pequeño hasta el grande.",
      "Ese número es lo que ganaste, lo que te falta o lo que quitaron.",
    ],
    ojo: "El cambio no es ninguno de los dos números: es la diferencia entre ellos.",
  },
  "8|Un grupo tiene 4 bolas y el otro tiene 4 bolas. Son:": {
    pista: "Compara los dos números y fíjate en el ORDEN en que los nombra la frase.",
    pasos: [
      "Si los dos números son iguales, los grupos tienen la misma cantidad.",
      "Si son distintos, el del número más grande tiene más.",
      "Fíjate cuál se nombró primero y cuál segundo, porque la respuesta los llama así.",
    ],
    ojo: "Saber cuál tiene más no basta: hay que decir si es el primero o el segundo.",
  },
  "8|3 patos y 3 patos con gorra. ¿En qué se diferencian?": {
    pista: "Los dos grupos tienen lo mismo en cantidad. Busca en qué se ven distintos.",
    pasos: [
      "Dos cosas se pueden diferenciar en la cantidad o en cómo son.",
      "Aquí la cantidad es la misma, así que la diferencia está en otra parte.",
      "Mírales el tamaño, si tienen algo puesto, o si están llenos o vacíos.",
    ],
    ojo: "Si hay la misma cantidad en los dos, la diferencia NO puede ser la cantidad.",
  },
  "8|¿En qué se diferencian estos dos grupos?": {
    pista: "Las dos filas del dibujo son del mismo objeto. Mira cuál llega más lejos.",
    pasos: [
      "Los dos grupos tienen el mismo dibujo, del mismo color y del mismo tamaño.",
      "Entonces la única diferencia posible es cuántos hay en cada uno.",
      "La fila que llega más lejos es la que tiene más.",
    ],
    ojo: "Si son del mismo color y forma, la diferencia no puede ser el color ni la forma.",
  },
  "8|Sacas agua de la jarra para llenar vasos. En la jarra:": {
    pista: "Si sacas de un sitio queda menos allí; si echas, queda más.",
    pasos: [
      "Lo que sale de un lugar tiene que salir de algún lado: del que lo tenía.",
      "Sacar agua de la jarra deja menos agua en la jarra.",
      "Echarle agua al balde deja más agua en el balde.",
    ],
    ojo: "El agua no desaparece ni aparece: cambia de sitio.",
  },
  "8|Suben más personas al bus. Los puestos libres:": {
    pista: "Ojo: aquí no preguntan por las personas, preguntan por los puestos LIBRES.",
    pasos: [
      "En un bus hay un número fijo de puestos: unos ocupados y otros libres.",
      "Si suben más personas, ocupan puestos, así que quedan menos libres.",
      "Si se bajan, dejan puestos, así que quedan más libres.",
    ],
    ojo: "Cuando una cosa sube, la otra baja. Lee bien por cuál de las dos preguntan.",
  },
  "8|Mientras más crece un árbol, queda:": {
    pista: "Piensa qué le pasa a lo que está alrededor cuando la cosa se hace más grande.",
    pasos: [
      "Cuando algo crece, ocupa más espacio del que ocupaba antes.",
      "Un árbol que crece queda más alto; un globo que se infla queda más grande.",
      "Y la ropa, que no creció, le queda más apretada al niño que sí creció.",
    ],
    ojo: "La ropa no encogió: fue el niño el que creció.",
  },
  "8|Si caminas más rápido, llegas:": {
    pista: "Piensa en el reloj: ir más rápido gasta menos tiempo.",
    pasos: [
      "Si vas más rápido por el mismo camino, gastas menos tiempo y llegas antes.",
      "Si vas más despacio, gastas más tiempo y llegas después.",
      "Y si el camino es más largo, aunque vayas igual de rápido, te demoras más.",
    ],
    ojo: "Más rápido y más tiempo no van juntos: cuando una sube, la otra baja.",
  },

  /* ============ TEMA 9 · El signo = ==================================== */
  "9|El signo = dice que los dos lados:": {
    pista: "El signo = es una balanza: dice que los dos lados pesan lo mismo.",
    pasos: [
      "El signo = no significa «aquí va la respuesta». Significa «vale lo mismo que».",
      "En 3 + 2 = 5 está diciendo que 3 + 2 y 5 son la misma cantidad escrita de dos maneras.",
      "Por eso solo se escribe = cuando los dos lados valen igual.",
    ],
    ojo: "Es el error más común de todos: creer que = es la orden de calcular.",
  },
  "9|Mira las dos igualdades. ¿A qué más es igual 3 + 4?": {
    pista: "Las dos igualdades comparten un número. Ese número es el puente entre las dos.",
    pasos: [
      "La primera igualdad dice cuánto vale la suma de la izquierda.",
      "La segunda dice que ese mismo resultado vale igual que otra suma.",
      "Entonces las dos sumas valen lo mismo, aunque nunca las hayan escrito juntas.",
    ],
    ojo: "Si dos cosas valen igual que una tercera, valen igual entre ellas.",
  },
  "9|En 4 + ? = 4 + 6, el número que falta es:": {
    pista: "Si los dos lados tienen el mismo número repetido, el que falta también es igual al que sobra.",
    pasos: [
      "Mira los dos lados y busca el número que se repite en los dos.",
      "Si ese número está en los dos lados, se equilibra solo y no hay que hacerle nada.",
      "Entonces lo que falta tiene que ser igual al número que quedó del otro lado.",
    ],
    ojo: "Aquí no hay que sumar nada: basta con comparar los dos lados.",
  },

  /* ============ TEMA 10 · Contar para poder responder ================== */
  "10|Cada chocolate vale por 1 niño. ¿Cuántos lo quieren?": {
    pista: "Cada dibujo vale 1 niño. Cuenta los dibujos, uno por uno.",
    pasos: [
      "En un pictograma, cada dibujo representa a alguien o a algo.",
      "Aquí cada dibujo es un niño, así que la cantidad de dibujos es la cantidad de niños.",
      "Cuéntalos tocándolos con el dedo para no repetir ni saltarte ninguno.",
    ],
    ojo: "No hay que sumar ni multiplicar: cada dibujo vale exactamente uno.",
  },
  "10|Cada dibujo vale por 1 perro. ¿Cuántos perros hay?": {
    pista: "Cada dibujo vale 1. Cuéntalos tocándolos con el dedo.",
    pasos: [
      "Un pictograma cuenta con dibujos en vez de con números.",
      "Como cada dibujo vale 1, la respuesta es cuántos dibujos hay.",
      "Cuenta despacio y toca cada uno para no contar ninguno dos veces.",
    ],
    ojo: "Contar de dos en dos aquí da el doble: cada dibujo es uno, no dos.",
  },
  "10|En una tabla de conteo, las rayitas sirven para:": {
    pista: "Una rayita es una anotación: cada vez que pasa algo, haces una.",
    pasos: [
      "La tabla de conteo sirve para ir anotando mientras cuentas, sin perder la cuenta.",
      "Cada vez que alguien vota o que aparece algo, haces UNA rayita.",
      "Al final cuentas las rayitas y ese número es el total.",
    ],
    ojo: "Cada rayita vale uno. Cinco rayitas son cinco, no cinco grupos.",
  },
  "10|En una encuesta de mascota favorita se cuenta:": {
    pista: "En una encuesta se cuenta CUÁNTOS eligieron cada respuesta.",
    pasos: [
      "Una encuesta empieza con una pregunta y varias respuestas posibles.",
      "Cada persona elige una, y lo que se anota es cuántas personas eligieron cada cual.",
      "Al final se compara: la que más eligieron es la favorita del grupo.",
    ],
    ojo: "No se cuenta el tamaño ni la edad de nadie: se cuentan las respuestas.",
  },
  "10|Para saber la fruta preferida del salón, preguntas a:": {
    pista: "Si quieres saber lo que piensa el curso entero, tienes que preguntarle al curso entero.",
    pasos: [
      "Una encuesta habla del grupo al que se le preguntó, no de otro.",
      "Si le preguntas a todo el curso, el resultado dice lo que piensa el curso.",
      "Si le preguntas solo a dos, el resultado dice lo que piensan esos dos y nada más.",
    ],
    ojo: "Preguntarle a pocos no está mal: lo que está mal es creer que eso habla de todos.",
  },
  "10|Votamos el color favorito. ¿Cuál ganó?": {
    pista: "El que ganó es el de la barra más larga. Mira el dibujo antes de contar.",
    pasos: [
      "Cada barra muestra cuántos votos tuvo cada opción.",
      "La barra más larga es la que más votos tuvo: esa ganó.",
      "Si no se ve claro, mira el número que hay al final de cada barra.",
    ],
    ojo: "No importa cuál te guste más a ti: la que gana es la que más votos sacó.",
  },
  "10|Votamos el color favorito. ¿Cuál tuvo menos?": {
    pista: "El que tuvo menos es el de la barra MÁS CORTA.",
    pasos: [
      "Cada barra dice cuántos votos tuvo esa opción.",
      "La barra más corta es la que menos votos sacó.",
      "Compara las tres y quédate con la más pequeña.",
    ],
    ojo: "Aquí piden la que tuvo MENOS. Contestar con la ganadora es el error de siempre.",
  },
  "10|Votamos el color. ¿Cuántos niños votaron en total?": {
    pista: "El total son todos los votos juntos: hay que sumar las tres barras.",
    pasos: [
      "Cada barra dice cuántos votaron por esa opción.",
      "Como cada niño votó una sola vez, todos los votos juntos son todos los niños.",
      "Súmalos de a dos: primero dos barras, y a ese resultado le sumas la tercera.",
    ],
    ojo: "El total no es la barra más larga: es la suma de todas.",
  },
  "10|¿Cuántos niños MÁS prefieren mango que papaya?": {
    pista: "«Cuántos MÁS» pregunta por la diferencia: se resta la barra corta de la larga.",
    pasos: [
      "Mira las dos barras que te nombran y fíjate cuál es más larga.",
      "La pregunta es cuánto le sobra a la larga por encima de la corta.",
      "Eso se averigua restando el número pequeño del grande.",
    ],
    ojo: "No es cuántos votaron en total: es cuántos de diferencia hay entre las dos.",
  },

  /* ===== Las del reparto: evidencias que no tenían casi nada ========== */
  "1|¿Qué cuenta muestra el dibujo?": {
    pista: "El dibujo trae dos montones y el signo entre ellos. Cuenta cada montón por aparte.",
    pasos: [
      "Los dos montones aparecen uno después del otro: primero uno, y después llega el segundo.",
      "Cuenta cuántos hay en el primero y cuántos en el segundo, sin juntarlos todavía.",
      "Como el segundo LLEGA, es una suma: se escribe el primero, el signo +, y el segundo.",
    ],
    ojo: "Fíjate en el orden. Primero va el montón que ya estaba, no el que llegó.",
  },
  "1|¿Qué cuenta muestra el dibujo? Los grises ya se fueron.": {
    pista: "Cuenta TODOS los que ves, incluidos los apagados. Los apagados son los que se van.",
    pasos: [
      "El dibujo muestra cuántos había: cuéntalos todos, también los que se apagaron.",
      "Los apagados son los que se van, así que esos son los que se quitan.",
      "Como se van, es una resta: primero cuántos había, después cuántos se van.",
    ],
    ojo: "Si cuentas solo los encendidos te da lo que QUEDA, no la cuenta que hay que escribir.",
  },
  "1|Dos jugadores tienen las camisetas 7 y 9. Sumarlas da:": {
    pista: "Pregúntate si esos números cuentan cosas. Si son nombres, sumarlos no da nada.",
    pasos: [
      "Una camiseta, una casa o un teléfono usan el número como NOMBRE: dicen cuál es, no cuántos hay.",
      "Los nombres no se suman. Sumar la casa 20 y la casa 30 no da la casa 50 ni nada parecido.",
      "Solo se pueden sumar los números que cuentan cosas del mismo tipo.",
    ],
    ojo: "Que dos cosas tengan número no significa que se puedan sumar.",
  },
  "1|Metiste 3 goles y después 2. Sumarlos te dice:": {
    pista: "Si los dos números cuentan lo MISMO, sumarlos tiene sentido y dice cuánto hay en total.",
    pasos: [
      "Aquí los dos números cuentan lo mismo: goles y goles, monedas y monedas, personas y personas.",
      "Cuando cuentan lo mismo, juntarlos sí significa algo: el total.",
      "Por eso la respuesta habla de la cantidad, no del nombre ni de la hora ni del precio.",
    ],
    ojo: "Suma solo cosas del mismo tipo. Tres goles y dos monedas no se suman.",
  },
  "2|Sin hacer la cuenta, 18 + 19 está cerca de:": {
    pista: "Redondea cada número al diez más cercano y suma esos, que es mucho más fácil.",
    pasos: [
      "Estimar no es hacer la cuenta exacta: es saber por dónde va a caer el resultado.",
      "Mira cada número y pregúntate a qué diez está más cerca: 19 está pegado a 20, y 21 también.",
      "Con los dieces la cuenta sale de cabeza, y el resultado de verdad queda ahí cerquita.",
    ],
    ojo: "No hay que hacer la cuenta exacta. Si te pusiste a sumar de uno en uno, te pasaste de trabajo.",
  },
  "6|Para armar un cohete, ¿qué forma va abajo del cono?": {
    pista: "Piensa en la forma del objeto de verdad y con qué cuerpo se parece cada pedazo.",
    pasos: [
      "Los objetos del mundo están hechos de cuerpos geométricos pegados.",
      "La punta que termina en pico es un cono; el tubo largo con dos tapas redondas es un cilindro.",
      "Lo redondo por todas partes es una esfera, y lo de caras planas y esquinas, un cubo o una pirámide.",
    ],
    ojo: "Mira qué forma tiene el PEDAZO que falta, no la del objeto entero.",
  },
  "8|Pasas agua de la jarra al vaso. ¿Qué pasa?": {
    pista: "Lo que sale de un lado entra al otro: fíjate que siempre cambian DOS cosas, no una.",
    pasos: [
      "El agua no aparece ni desaparece: se cambia de sitio.",
      "Entonces donde estaba queda menos, y donde llegó hay más. Las dos cosas cambian a la vez.",
      "Y cambian en la misma cantidad: lo que baja en la jarra es justo lo que sube en el vaso.",
    ],
    ojo: "Contestar «solo baja en la jarra» se queda a mitad: el agua tuvo que irse para algún lado.",
  },
  "9|Un lado es 3 + algo y el otro 4 + otra cosa. ¿Cuántas parejas sirven?": {
    pista: "No busques UNA respuesta: mira si cambiando un lado puedes arreglar el otro.",
    pasos: [
      "Los dos lados tienen que valer lo mismo, pero nadie dijo cuánto.",
      "Si eliges un número para un hueco, siempre puedes elegir el del otro para que empaten.",
      "Por eso no hay una sola solución: hay muchísimas, y todas valen.",
    ],
    ojo: "Que haya varias respuestas correctas no significa que la pregunta esté mala.",
  },
  "9|La caja pesa igual que 3 libros, y 3 libros igual que 6 vasos.": {
    pista: "Las dos frases comparten algo. Ese algo del medio es el puente entre las puntas.",
    pasos: [
      "La primera frase compara la primera cosa con la del medio, y son iguales.",
      "La segunda compara la del medio con la última, y también son iguales.",
      "Si las dos puntas valen igual que la del medio, valen igual entre ellas.",
    ],
    ojo: "No hace falta comparar las puntas directamente: la del medio ya lo dijo.",
  },
  "9|La cinta roja es más larga que la azul, y la azul que la verde.": {
    pista: "Ponlas en fila de mayor a menor siguiendo las dos frases, y mira quién queda de primera.",
    pasos: [
      "La primera frase te dice quién le gana a quién entre las dos primeras.",
      "La segunda hace lo mismo con la del medio y la última.",
      "Armando la fila queda claro: la primera le gana a la del medio, y la del medio a la última.",
    ],
    ojo: "Aquí no son iguales sino que una le gana a la otra, pero la cadena funciona igual.",
  },
  "10|5 niños quieren fresa. En el pictograma dibujas:": {
    pista: "Sin escala, cada dibujo vale UNO. Tantos dibujos como cosas hay.",
    pasos: [
      "Un pictograma sin escala cambia cada cosa por un dibujo, uno por uno.",
      "Si cinco niños quieren fresa, dibujas cinco fresas: ni una, ni diez.",
      "Y cada dato va en su propia fila, con su nombre al lado, para poder comparar las filas.",
    ],
    ojo: "No se dibuja el niño Y la fresa: sería contar dos veces lo mismo.",
  },

  /* ===== Las del reparto: evidencias que no tenían casi nada ========== */
  "3|Armas 47 con fichas de 10 y de 1. ¿Cuál usa MENOS fichas?": {
    pista: "Usa la mayor cantidad posible de fichas de diez. Cada una te ahorra diez de uno.",
    pasos: [
      "El mismo número se puede armar de muchas maneras, y todas valen lo mismo.",
      "Pero no todas usan la misma cantidad de fichas: mientras más de diez uses, menos fichas necesitas.",
      "Por eso la respuesta es la que aprovecha todos los dieces que caben, y deja solo los unos sueltos.",
    ],
    ojo: "Todas las opciones arman el mismo número. La pregunta no es cuánto, es con cuántas fichas.",
  },
  "4|Cajas iguales con algodón, arroz y plastilina. ¿Cuál pesa más?": {
    pista: "Grande no es lo mismo que pesado. Piensa de qué está hecha cada una.",
    pasos: [
      "Dos cosas del mismo tamaño pueden pesar muy distinto, según de qué estén hechas.",
      "El algodón y el icopor son muy livianos: ocupan mucho y casi no pesan.",
      "La plastilina, el arroz y el metal son pesados: en poquito espacio hay mucho peso.",
    ],
    ojo: "Una caja chiquita puede pesar más que una grande. El tamaño no decide el peso.",
  },
};
