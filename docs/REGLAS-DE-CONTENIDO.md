# Cómo se elaboran los ejercicios

Estas reglas salieron de armar el grado 1 completo y de equivocarnos varias
veces en el camino. Cada una dice **por qué** existe, casi siempre nombrando el
error que la hizo necesaria: una regla sin su motivo se rompe apenas estorba.

Aplican a cualquier grado y a cualquier área. El grado 1 de Matemáticas es el
ejemplo trabajado; el generador que lo produce está en la carpeta de trabajo de
la sesión y la migración que lo sembró es
`supabase/migrations/0019_geometria_visible.sql`.

---

## 1. La forma: tema → ranura → versión

| | |
|---|---|
| **Tema** | Un DBA del MEN. Ni uno inventado, ni dos juntados. Es una estación de la ruta. |
| **Ranura** | Una de las 10 preguntas de la lección. |
| **Versión** | Una de las 3 redacciones de esa pregunta. La app sortea una. |

**Un tema es un DBA, completo y sin mezclar.** La ruta es el currículo oficial;
si un tema fuera media cosa o dos cosas, la ruta dejaría de ser auditable contra
el documento del MEN, que es justamente lo que le da valor a la app frente a un
juego cualquiera.

**Diez ranuras por tema.** La lección son diez preguntas: es lo que alcanza a
medir sin cansar a un niño, y hace que la escala de estrellas se lea sola
(10/10 → 3 estrellas, 8-9 → 2, 6-7 → 1).

**Tres versiones por ranura.** Una lección se repite —al reprobarla, o para
subir estrellas—. Con una sola versión, el niño termina recordando *"la de la
derecha"* en vez de sumar. Tres alcanzan para que repetir no sea recordar.

**Cada ranura declara a qué evidencia de aprendizaje del DBA responde**, y
**todas las evidencias del DBA tienen que quedar cubiertas** por al menos una
ranura. La evidencia es la clasificación curricular: dice qué mide el ejercicio.

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

## 4. El dibujo

Ver `src/components/Ilustracion.tsx`.

**Solo donde enseña.** `6` es un símbolo que hay que descifrar; seis helados
apareciendo uno a uno es algo que se *cuenta*. Donde el dibujo no añade nada, no
va nada. En el grado 1 ilustran 66 de 300.

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

## 5. La explicación

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

En el grado 1: 74 ranuras escritas (222 ejercicios) y 26 derivadas (78).

---

## 6. El rango numérico

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

## 7. El control de calidad

Corre **dos veces**: en el generador, antes de escribir el SQL, y otra vez
dentro de la transacción de la migración. Si algo no cumple, no se genera nada y
la migración se revierte entera.

En el generador (aborta sin escribir):

- 10 ranuras por tema, 3 versiones por ranura.
- 4 opciones, todas distintas, ninguna vacía.
- La correcta está de primera.
- La evidencia declarada existe en ese DBA.
- Las 3 versiones son distintas **y** no se contestan con la misma palabra.
- La aritmética de la línea de operación da lo que marca la opción correcta.
- Ningún enunciado pasa del largo del globo.
- Ninguna resta da negativo.

En la migración (`do $$ … raise exception … $$;`):

- El total de evidencias y de ejercicios es el esperado.
- Ninguna ranura quedó con un número de versiones distinto de 3.
- Ningún ejercicio quedó mal formado.

Poner las comprobaciones **dentro** de la transacción es lo que hace que una
migración mala no deje la base a medias.

---

## 8. El procedimiento

1. Sacar del texto oficial el DBA y sus evidencias, **literales**. No se
   reescriben ni se resumen: son la trazabilidad con el MEN.
2. Escribir el generador del grado — un archivo, que es la única fuente de
   verdad. Produce el `.sql` **y** el cuerpo JSON de la petición.
3. Correrlo. Si se queja, se corrige el contenido; nunca el chequeo.
4. Aplicar la migración por la Management API (`curl --data-binary "@archivo"`,
   que evita que se corrompan las tildes y las comillas).
5. **Jugar el grado completo en el navegador.** Los tres errores de dibujo de
   arriba pasaron los chequeos automáticos y solo se vieron jugando.

---

## 9. Lo que todavía no sabemos hacer

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
