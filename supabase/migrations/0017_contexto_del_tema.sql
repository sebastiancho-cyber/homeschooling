-- Cada tema necesita poder explicarse.
--
-- Hasta ahora el único texto del tema era `enunciado`: el del MEN, literal.
-- Sirve para que un adulto compruebe la alineación curricular, y es ilegible
-- para un niño de seis años ("Utiliza las características posicionales del
-- Sistema de Numeración Decimal"). Se agregan dos textos más:
--
--   titulo  — cómo se llama el tema para el niño.
--   resumen — de qué se trata, en el idioma del niño, con el error típico
--             dicho de frente cuando lo hay.
--
-- Los tres conviven: el niño lee el resumen, el acudiente lee el enunciado.

alter table dbas add column if not exists titulo text;
alter table dbas add column if not exists resumen text;

update dbas d set titulo = v.titulo, resumen = v.resumen
from (values
  (1,
   'Para qué sirven los números',
   'Un número no siempre dice cuántos hay. El 3 de un bus dice qué ruta es, el 3 de una fila dice el puesto, y 3 galletas sí dice cuántas. Aquí aprendes a ver para qué se está usando cada número, y a decidir cuándo hay que sumar y cuándo restar.'),
  (2,
   'Contar y calcular de varias maneras',
   'Contar de uno en uno sirve, pero es lento. Si las cosas están en parejas puedes contar de 2 en 2, y si están en montones de cinco, de 5 en 5. Aquí practicas esas maneras y las usas para sumar y para restar.'),
  (3,
   'Los dieces y los unos',
   'Un número de dos cifras se arma con montones de diez y unidades sueltas: 52 son 5 dieces y 2 unos. Cuando entiendes eso, sumar o restar 10 es mover un diez entero y ya no toca contar de uno en uno.'),
  (4,
   'Qué se puede medir',
   'De una cuerda se mide el largo, de una piedra el peso, de una canción cuánto dura. Pero no todo se mide: el nombre y el color, no. Aquí aprendes a ver qué se puede medir de cada cosa y a comparar cuál tiene más.'),
  (5,
   'Medir con lo que tengas',
   'Para medir no siempre se necesita una regla: sirven las cuartas, los pasos, los clips o los vasos. Lo importante es usar siempre la misma unidad. Y ojo con esto: si la unidad es más grande, el número que sale es más pequeño.'),
  (6,
   'Las figuras y sus formas',
   'Las figuras se reconocen por lo que tienen: lados, puntas, si son rectas o curvas. El triángulo tiene 3 lados, el cuadrado 4 iguales, el círculo ninguno. Las cosas del mundo también tienen forma: un dado es un cubo y una lata es un cilindro.'),
  (7,
   'Dónde están las cosas',
   'Encima, debajo, dentro, a la derecha. Para explicarle a alguien cómo llegar a un lugar no basta con decir "por allá": hay que decir cuántas cuadras y para dónde girar.'),
  (8,
   'Lo que cambia cuando algo cambia',
   'Si al bus se suben más personas, quedan menos puestos libres. Si el camino es más largo, te demoras más tiempo. Aquí aprendes a ver cómo una cosa cambia cuando cambia la otra.'),
  (9,
   'El signo = no quiere decir "la respuesta"',
   'Casi todo el mundo cree que el signo = significa "aquí va el resultado". No es así: significa que los dos lados valen lo mismo. Por eso 3 + 4 = 5 + 2 está bien escrito, aunque a la derecha no haya ningún resultado.'),
  (10,
   'Contar para poder responder',
   'Cuando quieres saber qué le gusta más al curso, le preguntas a todos y vas anotando. Con las rayitas o los dibujos armas una tabla, y mirándola puedes responder cuál ganó, cuál tuvo menos y cuántos votaron en total.')
) as v(num, titulo, resumen)
where d.num = v.num
  and d.grade = 1
  and d.subject_id = (select id from subjects where slug = 'matematicas');

do $$
declare n_sin int;
begin
  select count(*) into n_sin from dbas d
    join subjects s on s.id = d.subject_id and s.slug = 'matematicas'
   where d.grade = 1 and (d.titulo is null or d.resumen is null);
  if n_sin <> 0 then raise exception '% temas del grado 1 quedaron sin contexto', n_sin; end if;
end $$;
