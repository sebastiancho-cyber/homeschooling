# Cómo se elaboran los ejercicios

Estas reglas salieron de armar el grado 1 de Matemáticas completo y de
equivocarnos muchas veces en el camino. Cada una dice **por qué** existe,
casi siempre nombrando el error que la hizo necesaria: una regla sin su motivo
se rompe apenas estorba.

Aplican a cualquier grado y a cualquier área. El grado 1 es el ejemplo
trabajado: su generador vive en [`contenido/matematicas-1/`](../contenido/),
que tiene su propio README con el manual de la herramienta. El contenido se
sembró con `supabase/migrations/0023_sin_fugas.sql` y las estaciones de repaso
con `supabase/migrations/0022_lecciones_de_repaso.sql`.

## Las diez que más importan

Si solo vas a leer una parte, que sea esta. Cada una tiene su sección.

1. **Un tema es un DBA del MEN**, completo y sin mezclar. (§1)
2. **Cada evidencia del DBA, entre 2 y 4 ranuras.** Eso decide el largo de la
   lección, no un número redondo. (§1)
3. **Tres versiones por ranura**, con respuestas distintas entre sí. (§1)
4. **Las últimas ranuras salen del ejemplo oficial del DBA**, que es la tarea
   de verdad. (§1)
5. **Corto no es lo mismo que sin contexto.** Si al recortar la pregunta deja de
   significar algo, el recorte estaba mal. (§2)
6. **El distractor sale del error típico**, y tiene que ser algo que un niño
   pueda creer. (§3)
7. **Que no se pueda acertar sin saber.** Es la sección más larga y la que más
   errores evita: eco, molde, longitud, concordancia, opciones equivalentes y
   el patrón numérico. (§4)
8. **El dibujo se deriva del contenido, nunca se etiqueta a mano**, y no se pone
   donde regale la respuesta. (§5)
9. **Ninguna pregunta queda muda**: al fallar, el niño tiene que poder leer por
   qué. (§6)
10. **Lo automático no reemplaza leerlo.** Un revisor independiente encontró en
    el grado 1 las DOS fugas de mayor alcance, y las dos eran invisibles
    ejercicio por ejercicio: solo se ven mirando el banco entero. (§4, §9)

---

## 1. La forma: tema → ranura → versión

| | |
|---|---|
| **Tema** | Un DBA del MEN. Ni uno inventado, ni dos juntados. Es una estación de la ruta. |
| **Ranura** | Una de las preguntas de la lección. Diez o algunas más. |
| **Versión** | Una de las 3 redacciones de esa pregunta. La app sortea una. |

**Un tema es un DBA, completo y sin mezclar.** La ruta es el currículo oficial;
si un tema fuera media cosa o dos cosas, la ruta dejaría de ser auditable contra
el documento del MEN, que es justamente lo que le da valor a la app frente a un
juego cualquiera.

**Cada evidencia del DBA, entre 2 y 4 ranuras.** Esta es la regla que decide el
largo de la lección, y reemplaza a la que había antes —"diez ranuras por tema"—
porque aquella medía lo fácil y no lo que importa. Con ella el grado 1 llegó a
tener **dos evidencias sin una sola pregunta**, cinco con una, y el tema 9
dedicando **siete de sus diez ranuras a la misma**: siete veces *"¿qué número
falta?"* seguidas. Eso no es una lección, es una plana.

- **Menos de dos no mide, roza.** Una evidencia con una sola pregunta se cubre
  de nombre.
- **Más de cuatro acapara.** La lección se vuelve la misma pregunta repetida y
  las demás evidencias se quedan sin sitio.
- **El largo sale de ahí:** diez casi siempre, y más cuando el DBA trae tantas
  evidencias que con diez alguna se quedaría corta. El grado 1 tiene siete temas
  de diez ranuras, dos de once y uno de doce: los que necesitaban más sitio.

La escala de estrellas no se entera, porque va por porcentaje y no por conteo:
todo bien → 3, desde 80 % → 2, desde 60 % → 1.

**Tres versiones por ranura.** Una lección se repite —al reprobarla, o para
subir estrellas—. Con una sola versión, el niño termina recordando *"la de la
derecha"* en vez de sumar. Tres alcanzan para que repetir no sea recordar.

**Cada ranura declara a qué evidencia responde.** La evidencia es la
clasificación curricular del MEN: dice qué mide el ejercicio, y es lo que
permite auditar la cobertura en vez de suponerla.

**Las últimas ranuras salen del EJEMPLO OFICIAL del DBA.** Cada DBA del MEN
viene con un ejemplo, y ese ejemplo es la tarea de verdad. La pregunta que uno
escribe sin mirarlo suele ser su sombra de reconocimiento:

| DBA | Lo que pide el ejemplo del MEN | Lo que preguntábamos |
|---|---|---|
| 1 | que el niño **proponga** preguntas que se resuelven con una suma | *"¿Cuál número dice CUÁNTOS hay?"* |
| 2 | explorar qué hace la tecla `=` al presionarla varias veces | nada: no existía |
| 3 | armar **$47** con billetes de $1 y $10 de varias maneras | *"¿Qué número tiene 5 decenas y 2 unidades?"* |
| 4 | llenar cajas para que **la más pequeña pese más** | *"¿Cuál pesa MÁS?"* |
| 8 | un dispensador: **qué DOS magnitudes cambian** a la vez | *"En la jarra queda…"* |
| 9 | llenar cadenas que den igual e **indagar otras soluciones** | *"¿Qué número falta?"* |

No todo lo que pide el ejemplo cabe en una selección múltiple —proponer y
construir, no—, pero casi siempre hay una versión que sí: *"¿cuántas parejas
sirven?"* mide lo mismo que *"indaga otras soluciones"*, y se puede contestar
tocando una ficha.

**La ruta lleva además LECCIONES DE REPASO.** Una a la mitad y otra al cierre.
Sin ellas, un niño puede aprobar los diez temas sin haber tenido que decidir
nunca, frente a una pregunta, de cuál se trataba — y decidir eso es media
matemática, porque en un examen de verdad nadie avisa qué tema viene.

Un repaso **no es un DBA y no tiene preguntas propias**: toma las de los temas
que repasa, dos de cada uno. Copiarlas sería más fácil y dejaría el repaso
preguntando la versión vieja el día que se corrija un ejercicio.

Eso obliga a separar el lugar en la ruta del número del DBA: `orden` va de diez
en diez para que quepan repasos en medio sin renumerar nada. En la base, un
repaso es una fila con `tipo = 'repaso'`, la lista de temas que repasa y cuántas
ranuras arma.

**El orden de las ranuras es una rampa de dificultad, no el orden del
documento.** Va de lo concreto a lo abstracto. El orden en que el MEN lista las
evidencias es una clasificación, no una secuencia de enseñanza: ordenar por él
ponía la pregunta más abstracta de tercera. En la base esto es
`order_in_lesson`, y es lo que manda dentro de una lección.

---

## 2. El enunciado

**Se lo dice un personaje, no lo muestra una pantalla.** El enunciado sale de un
globo de diálogo. Se escribe como se habla: *"Tienes 7 dulces. Regalas 2."*, no
*"Dada una colección de 7 elementos…"*.

**Corto, pero nunca sin contexto.** Esta regla nació de un error concreto: se
puso un tope de 70 caracteres y el recorte dejó preguntas como *"¿Qué color
ganó?"* — ganó *qué*. Son niños: necesitan poco lenguaje, pero si se les quita
todo rastro de contexto no entienden nada. **Corto no es lo mismo que sin
contexto.** El tope existe para que quepa en el globo, no para exprimir el
sentido. Si un enunciado necesita una frase más para significar algo, lleva esa
frase.

**Todo lo que el enunciado nombra tiene que estar en pantalla.** *"¿Cuántos
clips más largo es el segundo lápiz?"* nombraba dos lápices que no existían en
ninguna parte. Si la pregunta se refiere a algo, ese algo se dibuja, se lista o
se nombra en la misma pregunta.

**La premisa va antes que la pregunta.** El globo se lee primero y la tarjeta de
operación aparece debajo. Un enunciado que empieza por *"Entonces…"* obliga al
niño a leer al revés.

**Español colombiano, sin voseo.** *"Tienes", "prueba", "cuentas"*. Nada de
*"tenés"* ni de españolismos.

---

## 3. Las opciones

**Siempre cuatro, todas distintas**, del mismo tipo y de largo parecido. Una
opción mucho más larga que las otras se delata sola.

**El distractor sale del error típico, no de un número al azar.** Es lo que
convierte una opción equivocada en información: si el niño la marca, se sabe qué
le pasó. Los del grado 1:

| Situación | Distractor | Qué error delata |
|---|---|---|
| `4 + 5 = ?` | `1` | restó en vez de sumar |
| `10 − 4 = ?` | `14` | sumó en vez de restar |
| cualquier cálculo | `±1` del resultado | se le corrió el conteo |
| `5 decenas y 2 unidades` | `502` | escribió los dígitos pegados |
| `5 decenas y 2 unidades` | `7` | sumó los dígitos |
| `52` | `25` | invirtió el valor posicional |
| `Diez más que 63` | `630` | "más diez" como "ponerle un cero" |
| `4 + ? = 9` | `13` | sumó los dos números dados |

**Ningún distractor puede ser defendible.** *"¿Qué se puede medir de una
piedra?"* tenía *"Su edad"* como opción incorrecta — y la edad de una piedra sí
se mide. El niño que sabe de más no puede quedar castigado.

**La correcta se escribe siempre de primera en la fuente.** Barajar es trabajo
del servidor (`shuffleExerciseOptions`), nunca del cliente: si el azar corriera
al dibujar en el navegador, el HTML del servidor y el del cliente no
coincidirían. Ese error ya se cometió, y el síntoma fue que la respuesta salía
siempre en las posiciones 1 y 2.

**Las tres versiones de una ranura no pueden contestarse con la misma
palabra.** Había ranuras cuyas tres versiones se respondían *"Sumo"*. Repetir
esa lección enseñaba la palabra, no la matemática: exactamente lo que las tres
versiones existen para evitar. Si la ranura mide "reconocer cuándo se suma", sus
versiones mezclan situaciones que suben y que bajan.

**Ninguna ranura repite otra de otro tema.** *"¿Cuánto le falta a 6 para llegar
a 10?"* estaba idéntica en dos lecciones. Diez temas distintos tienen que
sentirse como diez cosas distintas.

---

## 4. Que no se pueda acertar sin saber

Esta es la sección que más errores va a evitarle a los grados que siguen, y la
que más nos costó: un detector encontró 54 fugas, y un árbitro que revisó el
banco por su cuenta encontró otras tantas, **incluida la más grave, que el
detector no sabía ver**.

Una **fuga** es cualquier cosa en la forma de la pregunta que deje acertar sin
saber la materia. No hay que imaginar a un niño haciendo trampa: estas pistas se
aprovechan solas, sin darse cuenta, y lo que miden es la habilidad de leer el
molde de una pregunta. Peor todavía, castigan al niño que sí estudió, porque el
que no estudió empata con él.

### La fuga más grave: el patrón numérico

No se ve mirando un ejercicio. Se ve mirando el banco entero.

Las opciones de cálculo salían del resultado, el error típico, y el resultado
±1. Ordenadas de menor a mayor eso deja **tres números seguidos con la correcta
en el medio** y un número lejano aparte. Una sola regla —*descarto el raro y
marco el del medio*— resolvía noventa y cuatro ejercicios sin hacer una cuenta.

La cura no es quitar el distractor del error típico, que es el que diagnostica:
es dejar de poner la correcta siempre en el mismo sitio. Los dos vecinos salen
de una lista de moldes que se elige con los propios operandos, así que varía
entre ejercicios y no varía entre corridas.

**Cómo se mide, y es la única manera de verlo:** sobre todos los ejercicios de
cálculo del grado, ordenar las cuatro opciones y anotar en qué posición quedó la
correcta. Si una posición se lleva más de la mitad, hay patrón. Lo mismo con "¿hay
un número claramente suelto que se pueda descartar de un vistazo?".

| | antes | después |
|---|---|---|
| la correcta cae en la misma posición | 100 % | 47 % |
| hay un número suelto descartable | 100 % | 21 % |

### La otra que solo se ve en el conjunto: las opciones que nunca ganan

*"No se puede saber"* aparecía 12 veces en el grado 1, *"No se sabe"* 11 y *"No
cambió nada"* 6. **Ninguna era nunca la respuesta.** Son 55 ejercicios en los que
el niño se lleva una opción gratis en cuanto se da cuenta — y se da cuenta la
primera tarde.

Pasa sin querer: uno escribe *"No se puede saber"* como relleno cuando no se le
ocurre un cuarto distractor, y nunca lo pone de correcto porque las preguntas
están diseñadas para tener respuesta.

**La cura no es quitarlas: es que a veces SEAN la respuesta.** Y resulta que eso
es de lo mejor que se puede preguntar. Saber cuándo los datos no alcanzan para
decidir es matemática de verdad, y es de lo poco que una selección múltiple mide
bien. En el grado 1 hay ahora una cuerda medida y otra sin medir, una iglesia a
2 cuadras contra un parque a 5 *pasos* —que no se pueden comparar—, dos grupos
idénticos, y un frasco al que le echaron y le sacaron lo mismo.

**El chequeo:** una opción con palabras que aparezca cuatro veces o más tiene que
ser la correcta al menos una vez. Los números se excluyen: que un número se
repita entre distractores y nunca le toque ser la respuesta es casualidad, no un
patrón que alguien pueda aprender.

### Las otras cinco familias, que sí se ven una por una

**1. Eco.** Una palabra del enunciado aparece en la correcta y en ninguna otra.

> *"¿Cuál número dice CUÁNTO MIDE?"* → **«Mide 3 metros»**

El niño empareja "MIDE" con "Mide" y gana. Tres arreglos, por orden de
preferencia:

- **Nombrar la categoría, no el verbo**: *"¿En cuál el número es una MEDIDA?"*.
- **Poner la palabra delatora también en un distractor**. Si la pregunta habla de
  goles, que otra opción hable de goles.
- **Nombrar las dos caras del contraste en el enunciado**. Para la lateralidad no
  se puede evitar decir "derecha"; lo que se hace es decir también "izquierda":
  *"Lápiz a la derecha, borrador a la izquierda. Coges el lápiz con:"*.

**2. Molde.** Las tres incorrectas comparten una forma y la correcta tiene otra:
es la única sin artículo, la única con un número, la única palabra entre tres
cifras, la única frase completa entre tres truncadas. Se elige por la forma sin
leer el contenido. **Las cuatro opciones se escriben con el mismo molde.**

**3. Longitud.** La correcta es visiblemente la más larga —porque es la más
completa, o la que junta dos ideas— y las otras tres son cortas. Se nota sin
leerlas. **Las cuatro de largo parecido.**

**4. Concordancia.** El enunciado termina en *"…y encima una:"* y de las cuatro
figuras solo dos son femeninas: las otras dos se caen antes de mirar ninguna
forma. **El enunciado no debe pedir género ni número.** Se cierra en neutro:
*"…¿qué forma lleva encima?"*.

**5. Opciones que dicen lo mismo.** Si dos opciones significan lo mismo, ninguna
puede ser la correcta —no puede haber dos— así que el niño las descarta juntas.
Con un distractor absurdo más, la pregunta se contesta con **una sola opción
viva** y cero materia. Pasaba en cuatro ranuras del grado 1:

> *"Para saber cuántos quedan:"* · Resto · Sumo · **Cuento hacia atrás** · No hago nada

"Resto" y "Cuento hacia atrás" son lo mismo; "No hago nada" no lo marca nadie.
Queda "Sumo" contra la correcta, y "Sumo" es obviamente falso.

De la misma familia: una opción que es la negación de la otra (*"Dice X"* /
*"No dice X"*) deja al niño sabiendo que la respuesta es una de esas dos.

### Y el distractor absurdo

*"El agua se congela"*, *"Se vuelven sillas"*, *"Nunca"*. Nadie los marca, así
que la pregunta tiene tres opciones y no cuatro. **Un distractor tiene que ser
algo que un niño pueda creer.** Si no se te ocurre por qué alguien lo marcaría,
no sirve.

### Los detectores

Seis corren ejercicio por ejercicio y una fuga nueva no deja generar: eco,
concordancia, longitud, molde, símbolo exclusivo y opciones equivalentes. Más
dos que se miden sobre el banco completo: el patrón numérico y las opciones que
nunca ganan.

**Los falsos positivos se anotan, no se apagan.** Van a un archivo de excepciones
con el motivo escrito, una por una. La clave incluye el enunciado y la respuesta,
así que si el ejercicio cambia la excepción caduca y el detector vuelve a hablar.
En el grado 1 son seis excepciones para 312 ejercicios: se leen en un minuto.

**Cada detector se prueba contra casos conocidos antes de creerle.** Dos de los
nuestros se equivocaban al principio: uno daba por iguales *"3 decenas y 4
unidades"* y *"4 decenas y 3 unidades"* (no lo son), y otro daba por iguales
*"Baja en la jarra y sube en el vaso"* y la misma frase al revés (tampoco). La
prueba de "las mismas palabras en otro orden" acabó limitada a las
enumeraciones, que es donde el orden de verdad no importa.

### Lo que ninguna máquina ve

Hay que leerlo. Un árbitro que lea el banco entero encuentra cosas que ningún
detector: que *"Resto"* y *"Cuento hacia atrás"* dicen lo mismo con otras
palabras, que un distractor es defendible, que una premisa es falsa. **El paso de
revisión humana no es opcional y no lo reemplaza el generador.**

---

## 5. El dibujo

Ver `src/components/Ilustracion.tsx`.

**Solo donde enseña.** `6` es un símbolo que hay que descifrar; seis helados
apareciendo uno a uno es algo que se *cuenta*. Donde el dibujo no añade nada, no
va nada. En el grado 1 llevan dibujo 77 de 312, y 19 más lo llevan en las opciones.

**El dibujo se DERIVA del ejercicio, nunca se etiqueta a mano.** Con cientos de
ejercicios, etiquetarlos uno por uno garantiza que algún día el dibujo deje de
corresponder al enunciado. Derivándolo, cambiar el ejercicio cambia el dibujo
solo. La derivación vive en `visualPara()` dentro del generador.

**El dibujo modela la situación; no reemplaza el cálculo cuando el cálculo es la
destreza.** *"Luis tiene 4 carritos. Le dan 3"* lleva dibujo: el dibujo es el
modelo de "juntar". *"¿Cuánto es 4 + 5?"* no lo lleva: ahí la cuenta es lo que
se mide, y dibujarla la regala. La regla no es *"toda suma lleva dibujo"*, es
*"toda situación lleva dibujo"*.

**El dibujo no puede contradecir el texto.** Tres errores reales, los tres
detectados solo cuando se dibujó:

- *"Cada helado es un niño. ¿Cuántos quieren fresa?"* — un helado genérico no
  puede mostrar el sabor. Ahora el icono **es** el sabor (🍓 🍫 🍌).
- *"Tres manos abiertas, cuenta de 5 en 5"* dibujaba **quince manos**. Ahora son
  *"4 platos con 5 uvas cada uno"*: el montón y lo que se cuenta son la misma
  cosa.
- La barra rotulada **"Rojo"** salía **azul**, porque el color lo repartía el
  turno en la paleta. Si la barra se llama Rojo, la barra es roja.

**Los ocho tipos existentes.** Un tipo nuevo se agrega solo si sirve a varias
ranuras; una animación por ejercicio no se mantiene.

| Tipo | Qué muestra |
|---|---|
| `contar` | objetos que aparecen uno a uno — conteo, pictogramas |
| `juntar` | dos montones que se unen, el segundo **después** del primero |
| `grupos` | montones iguales — contar de 2 en 2, de 5 en 5 |
| `quitar` | los que se van se apagan — restas |
| `comparar` | varias colecciones con nombre, alineadas para verlas sin contar |
| `decenas` | columnas de diez + unidades sueltas — valor posicional |
| `barras` | datos, votaciones y medidas que se comparan |
| `figura` | una figura plana o un cuerpo, para contarle lados o esquinas |

**A veces el dibujo va en las OPCIONES, no en el enunciado.** Es la diferencia
entre *escoger la palabra "triángulo"* y *mirar cuál de estos tiene 3 lados*. El
tema 6 era vocabulario disfrazado de geometría —diez de diez preguntas sin que
apareciera una sola forma— y esto es lo que lo vuelve geometría.

Lo que decide dónde va el dibujo es **si regala la respuesta**:

- *"¿Cuántos lados tiene un rectángulo?"* → la figura va en el **enunciado**. No
  regala nada: contar los lados *es* el ejercicio.
- *"Tiene 4 lados y 2 son más largos. Es un:"* → las figuras van en las
  **opciones**. Dibujar un rectángulo arriba sería dar la respuesta.

Y se dibujan **las cuatro opciones o ninguna**: si una sola se quedara sin
dibujo, el dibujo mismo sería la pista. Las figuras se barajan **con** su
opción; si se quedaran quietas, el niño vería un triángulo rotulado "círculo".

**Las esquinas de una figura NO se redondean.** En el resto de la app se
redondea todo, pero aquí la esquina es el dato que se cuenta: un triángulo de
puntas romas deja de servir para contar puntas.

**Un dibujo no puede desbordar el teléfono.** Una fila de objetos que se parte
en dos renglones deja de servir para comparar de un vistazo, que es justo para
lo que existe. Por eso el icono se achica según la fila más larga en vez de
envolverse.

**Sin archivos.** Emoji y CSS sobre marcado normal: nada que descargar, ningún
temporizador de JavaScript que pueda quedar corriendo. Con
`prefers-reduced-motion` se quita el movimiento pero **se conserva el estado
final**: la posición es información, no adorno.

---

## 6. La explicación

Ver `src/lib/ayuda.ts` (la derivada) y el mapa de ayudas escritas del generador.

**Ningún ejercicio puede quedar mudo.** Un niño que estudia en casa no tiene a
quién preguntarle: si falla y la app solo sabe decirle que falló, la app no
enseñó nada. Cada ejercicio trae su explicación o la deriva. Lo garantiza una
aserción dentro de la transacción de la migración.

**Al fallar, el juego se detiene.** Aparece la respuesta correcta con el
desarrollo, y no se avanza hasta que el niño toque "Entendido". Al acertar sí
sigue solo: ahí no hay nada que explicar y la fluidez importa.

**Dos niveles, y el orden es la regla.** Antes de responder solo se ve la
`pista`: el método en una línea, **sin el resultado**. Los `pasos`, con los
números resueltos, solo después. No es para evitar trampas —eso no es lo que nos
ocupa—: es que una respuesta regalada no enseña y una pista sí.

**Derivada por versión donde hay números; escrita por ranura donde hay una
idea.** La explicación de `7 − 2 = ?` sale sola de la operación y cambia cuando
cambian los números. La de *"¿cuál pesa más?"* hay que escribirla, y una sola
sirve para las tres versiones de la ranura, porque las tres miden la misma idea.
Por eso una explicación escrita **no puede nombrar los números de una versión
concreta**; cuando pone un ejemplo, dice "por ejemplo".

**Se explica como se enseña, no como se demuestra.** *"7 − 2 = 5"* no le enseña
nada a quien no supo hacerlo. *"Empieza en 7 y cuenta 2 hacia atrás: 6, 5"*, sí.

**El `ojo` nombra el error que la pregunta persigue.** Si una pregunta no
persigue ningún error concreto, probablemente no está midiendo nada.

En el grado 1: 85 ranuras escritas (255 ejercicios) y 19 derivadas (57).

---

## 7. El rango numérico

**Lo fija el propio DBA, no la costumbre.** El enunciado del DBA y sus
evidencias dicen hasta dónde llega el grado; se lee ahí antes de escribir nada.
Como referencia de arranque —siempre a contrastar contra el texto oficial—:

| Grado | Cálculo | Nota |
|---|---|---|
| 1 | 0–20; valor posicional hasta 99 | dos dígitos, sin llevar más allá del paso por el diez |
| 2 | hasta 999 | aditivos con reagrupación |
| 3 | hasta 9.999; multiplicación y división | |

**Un número fuera de rango solo se permite como distractor deliberado o como
código.** `502` está en el grado 1 porque es el error clásico de escribir
"5 decenas y 2 unidades"; `El teléfono 315` está porque el tema es justamente
que un número también sirve de código. Fuera de esos dos casos, un número
grande es un descuido.

---

## 8. El control de calidad

Corre **dos veces**: en el generador, antes de escribir el SQL, y otra vez
dentro de la transacción de la migración. Si algo no cumple, no se genera nada y
la migración se revierte entera.

En el generador (aborta sin escribir):

**De forma**
- Cada evidencia del DBA entre 2 y 4 ranuras, y la lección con 10 como mínimo.
- 3 versiones por ranura, distintas entre sí **y** con respuestas distintas.
- 4 opciones, todas distintas, ninguna vacía, ninguna de más de 36 caracteres.
- La correcta está de primera (el barajado es del servidor).
- La evidencia declarada existe en ese DBA.
- Ningún enunciado pasa del largo del globo.

**De contenido**
- La aritmética de la línea de operación da lo que marca la opción correcta.
- Ninguna resta da negativo.
- **Ninguna ranura queda muda**: o trae ayuda escrita, o trae una operación de
  una forma que la app sabe explicar.
- Ninguna ayuda escrita apunta a una ranura que ya no existe.

**De fugas** (sección 4)
- Eco léxico, concordancia, longitud, molde, símbolo exclusivo y opciones
  equivalentes, ejercicio por ejercicio.
- El patrón numérico y las opciones que nunca ganan, medidos sobre el banco
  completo del grado. Son las dos que no se ven mirando un ejercicio.

La de las ranuras mudas es la que más ha encontrado. Para saber si la app sabe
explicar una operación, el generador tiene la lista de formas que `ayudaPara()`
reconoce. Es un espejo, y por eso está anotado en los dos lados: si allá se
agrega una forma, aquí también. Sin él, `3 + 4 = 7 y 7 = 5 + 2` parecía
explicable —tiene operación— y no lo era: esa ranura estaba muda y no se vio
hasta que el chequeo la señaló.

La ayuda escrita se busca **por el enunciado de su primera versión**, no por la
posición de la ranura. Repartir las ranuras las mueve de sitio, y una ayuda que
se queda en la posición vieja no falla: miente, que es peor.

En la migración (`do $$ … raise exception … $$;`):

- El total de evidencias y de ejercicios es el esperado.
- Ninguna ranura quedó con un número de versiones distinto de 3.
- Ningún ejercicio quedó mal formado.
- Ningún ejercicio quedó sin ayuda y sin operación.

Poner las comprobaciones **dentro** de la transacción es lo que hace que una
migración mala no deje la base a medias.

---

## 9. El procedimiento

Sembrar un grado, en orden. Los pasos 6 y 7 no son opcionales: los tres errores
de dibujo y los cinco de contenido más graves del grado 1 pasaron todos los
chequeos automáticos.

1. **Sacar del texto oficial el DBA, sus evidencias y su EJEMPLO**, literales.
   No se reescriben ni se resumen. El ejemplo se lee antes de escribir la
   primera pregunta: es la tarea de verdad, y la pregunta que uno escribe sin
   mirarlo suele ser su sombra (sección 1).
2. **Repartir las ranuras** entre las evidencias, 2 a 4 cada una, antes de
   redactar nada. Es lo que decide el largo de la lección.
3. **Escribir el generador del grado** — un archivo, única fuente de verdad.
   Produce el `.sql` y el cuerpo JSON de la petición.
4. **Correrlo.** Si se queja, se corrige el contenido; **nunca el chequeo**. Si
   un chequeo señala un falso positivo, va a las excepciones con su motivo.
5. **Aplicar la migración** por la Management API
   (`curl --data-binary "@archivo"`, que evita que se corrompan las tildes).
6. **Jugar el grado completo en el navegador**, en pantalla de teléfono. Aquí
   aparecen los dibujos que se salen, el texto que no cabe y las preguntas que
   no se entienden aunque estén bien escritas.
7. **Pasarle el banco a un revisor independiente**, con el encargo de buscar
   defectos y no de confirmar que está bien. En el grado 1 encontró la fuga de
   mayor alcance de todas, que ningún detector veía porque no está en un
   ejercicio sino en el conjunto.

### Lo que NO se hace

- **No generar los ejercicios al vuelo.** Se probó y se descartó: uno curado que
  sale mal se arregla una vez y queda arreglado para todos; uno generado que
  sale mal es una fábrica de errores, y además rompe la coherencia con el
  dibujo, que se deriva del contenido.
- **No diseñar contra el niño que hace trampa.** Las fugas se cierran porque
  miden lo que no es, no porque alguien vaya a explotarlas a propósito.
- **No copiar preguntas de un tema a otro ni a un repaso.** Se referencian. Una
  copia se queda vieja el día que se corrige el original, y nadie se entera.
- **No inventar contenido pedagógico** que el DBA no pida, ni subir el rango
  numérico porque una pregunta quede más bonita.

---

## 10. Lo que todavía no sabemos hacer

Honestidad sobre los límites, para no fingir cobertura:

- **Pictogramas con escala** (1 dibujo = 5 niños). Aparecen desde el DBA 10 del
  grado 2. El tipo `contar` dibuja uno por uno y sería falso ahí.
- **Probabilidad** (DBA 11 de los grados 2 y 3). No hay ningún tipo de dibujo ni
  de interacción que la sostenga.
- **Evidencias de *crear*.** Varias piden que el niño *dibuje* o *construya* un
  pictograma. Una pregunta de selección múltiple no puede medir eso; hoy se
  cubren de lado, preguntando por lo que el niño tendría que haber decidido al
  construirlo.
- Los tipos `drag_sort` y `match_pairs` existen en la base y **no están
  implementados** en la app. Son el camino natural para lo anterior.
