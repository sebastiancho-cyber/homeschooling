-- El contexto del grado 2: de qué se trata cada tema, y las dos estaciones de
-- repaso.
--
-- El enunciado oficial del MEN está escrito para docentes: "Interpreta, propone
-- y resuelve problemas aditivos (de composición, transformación y relación)…"
-- Un niño de siete años no lo entiende, y su acudiente tampoco tiene por qué.
-- El título y el resumen son la traducción, sin perder de qué se trata. El
-- enunciado oficial se queda donde está: es lo que hace auditable la ruta.
--
-- Y las dos estaciones de repaso, igual que en el grado 1: no son DBA y no
-- tienen preguntas propias, toman las de los temas que repasan. Copiarlas
-- dejaría el repaso preguntando la versión vieja el día que se corrija un
-- ejercicio.
--
--   Repaso 1 · va después del tema 5 y repasa del 1 al 5.
--   Repaso 2 · cierra la ruta y repasa del 6 al 11.

update dbas d set titulo = t.titulo, resumen = t.resumen
from (values
  (1, 'Problemas de juntar, quitar y repetir',
   'No todos los problemas se resuelven igual. Unos piden juntar dos cantidades, otros quitarle a una, y otros repetir algo varias veces. Aquí aprendes a leer la situación y a decidir cuál de las cuatro operaciones te está pidiendo antes de hacer ninguna cuenta.'),
  (2, 'Varias maneras de sacar la cuenta',
   'Para sumar 48 + 31 no hay una sola manera. Puedes hacerlo por columnas, puedes redondear para saber por dónde va, o puedes contar de a montones. Aquí practicas esas maneras, y también a estimar: saber más o menos cuánto da, antes de calcularlo.'),
  (3, 'Comparar y ordenar números',
   'Con números de tres cifras ya no sirve contar para comparar: hay que mirar las cifras por orden, empezando por la de más a la izquierda. Y hay algo más: si a dos números les haces lo mismo, el que era mayor sigue siendo mayor. Eso se puede usar.'),
  (4, 'Qué se mide y con qué',
   'De una papaya se mide el peso, de una mesa el largo, de una canción cuánto dura. Cada cosa se mide con un instrumento distinto, y dos medidas solo se pueden comparar si están hechas con la misma unidad. Aquí también aprendes a estimar antes de medir.'),
  (5, 'Medir con lo que tengas, y leer la hora',
   'Se puede medir con pasos, cuartas o baldosas, siempre que la unidad no cambie de tamaño. Y se aprende a leer el reloj de manecillas: la corta dice la hora, la larga los minutos. Con eso ya puedes saber cuánto duró algo.'),
  (6, 'Figuras planas y cuerpos',
   'Un cuadrado se dibuja en una hoja; un cubo se agarra y se llena. Las caras de un cuerpo son figuras planas, y por ahí se relacionan los dos mundos. Aquí aprendes a describir una cosa por sus partes: lados, caras, aristas y puntas.'),
  (7, 'Líneas, posiciones y recorridos',
   'Dos líneas pueden ir juntas sin tocarse nunca, o cruzarse dejando esquinas parejas. Eso tiene nombre: paralelas y perpendiculares. Y sirve para algo práctico: explicarle a alguien cómo llegar a un sitio sin que se pierda.'),
  (8, 'Cadenas de números y el camino de vuelta',
   'Entra un número, pasa por unos pasos y sale otro. Lo interesante viene cuando te dan la salida y te piden la entrada: para devolverte hay que cambiar cada paso por el contrario. Sumar se deshace restando, y restar se deshace sumando.'),
  (9, 'Lo que falta: números y operaciones',
   'A veces falta un número y a veces falta el signo. Para encontrarlo se usa lo que ya sabes de las operaciones, y también se vale probar: cada intento te dice para qué lado moverte. Un mismo número se puede escribir de muchas maneras.'),
  (10, 'Datos, tablas y pictogramas',
   'Cuando hay muchos datos, un dibujo vale por varios: por eso los pictogramas llevan una escala escrita debajo. Leerlos bien es contar los dibujos y aplicar lo que vale cada uno. Y sirve para lo importante: comprobar si lo que dice un informe es cierto.'),
  (11, 'Lo seguro, lo imposible y lo que depende',
   'Hay cosas que pasan siempre, otras que no pueden pasar, y la mayoría que dependen. Aquí aprendes a distinguirlas, y a usar lo que has visto para predecir: saber lanzar aviones mejora tus opciones de ganar, pero no te asegura nada.')
) as t(num, titulo, resumen)
where d.num = t.num
  and d.grade = 2
  and d.subject_id = (select id from subjects where slug = 'matematicas');

insert into dbas (subject_id, grade, num, enunciado, titulo, resumen, tipo, orden, repasa, ranuras)
select s.id, 2, 12,
  'Repaso acumulativo de los DBA 1 a 5: problemas aditivos y multiplicativos, estrategias de cálculo y estimación, sistema de numeración decimal, características medibles y procesos de medición.',
  'Repaso: lo que llevas',
  'Aquí se mezcla todo lo de los cinco primeros temas. Nadie te dice de qué se trata cada pregunta: eso lo tienes que ver tú. Es la parte que de verdad muestra si lo aprendiste.',
  'repaso', 55, array[1, 2, 3, 4, 5]::smallint[], 10
from subjects s
where s.slug = 'matematicas'
  and not exists (
    select 1 from dbas d where d.subject_id = s.id and d.grade = 2 and d.num = 12);

insert into dbas (subject_id, grade, num, enunciado, titulo, resumen, tipo, orden, repasa, ranuras)
select s.id, 2, 13,
  'Repaso acumulativo de los DBA 6 a 11: geometría de figuras y cuerpos, posición y desplazamientos, patrones y valores desconocidos, secuencias y operaciones faltantes, organización de datos, y posibilidad de ocurrencia.',
  'Repaso: todo el año',
  'La última estación mezcla los seis temas finales: figuras y cuerpos, líneas y recorridos, cadenas de números, lo que falta, los pictogramas y lo que puede pasar. Si pasas esta, pasaste el año.',
  'repaso', 115, array[6, 7, 8, 9, 10, 11]::smallint[], 10
from subjects s
where s.slug = 'matematicas'
  and not exists (
    select 1 from dbas d where d.subject_id = s.id and d.grade = 2 and d.num = 13);

do $$
declare n_sin_titulo int; n_repasos int; n_temas int;
begin
  select count(*) into n_sin_titulo from dbas d
    join subjects s on s.id = d.subject_id and s.slug = 'matematicas'
   where d.grade = 2 and d.titulo is null;
  select count(*) into n_repasos from dbas d
    join subjects s on s.id = d.subject_id and s.slug = 'matematicas'
   where d.grade = 2 and d.tipo = 'repaso';
  select count(*) into n_temas from dbas d
    join subjects s on s.id = d.subject_id and s.slug = 'matematicas'
   where d.grade = 2 and d.tipo = 'dba';
  if n_sin_titulo <> 0 then raise exception '% temas del grado 2 se quedaron sin título', n_sin_titulo; end if;
  if n_repasos <> 2 then raise exception 'repasos del grado 2: % (esperados 2)', n_repasos; end if;
  if n_temas <> 11 then raise exception 'temas del grado 2: % (esperados 11)', n_temas; end if;
end $$;
