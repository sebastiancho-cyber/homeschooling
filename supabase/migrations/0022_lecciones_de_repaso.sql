-- Dos lecciones de repaso: la prueba de que todo lo anterior está integrado.
--
-- Hasta ahora la ruta iba tema por tema y nunca preguntaba nada mezclado. Un
-- niño podía aprobar los diez temas sin haber tenido que decidir NUNCA, frente
-- a una pregunta, de cuál de todos se trataba. Y decidir eso es media
-- matemática: en un examen de verdad nadie avisa qué tema viene.
--
-- Las dos estaciones nuevas no son DBA y no tienen ejercicios propios: toman
-- preguntas de los temas que repasan. Eso importa más de lo que parece. Si un
-- ejercicio se corrige, el repaso queda corregido solo; si se duplicara el
-- contenido, tarde o temprano el repaso preguntaría la versión vieja.
--
--   Repaso 1 · va después del tema 5 y repasa del 1 al 5.
--   Repaso 2 · cierra la ruta y repasa del 6 al 10.

alter table dbas add column if not exists tipo text not null default 'dba';
alter table dbas add column if not exists orden smallint;
alter table dbas add column if not exists repasa smallint[];
alter table dbas add column if not exists ranuras smallint;

alter table dbas drop constraint if exists dbas_tipo_check;
alter table dbas add constraint dbas_tipo_check check (tipo in ('dba', 'repaso'));

-- `orden` separa el lugar en la ruta del número del DBA, que hasta ahora eran
-- lo mismo. Los temas van de diez en diez para que quepan repasos en medio.
update dbas set orden = num * 10 where orden is null;

insert into dbas (subject_id, grade, num, enunciado, titulo, resumen, tipo, orden, repasa, ranuras)
select s.id, 1, 11,
  'Repaso acumulativo de los DBA 1 a 5: usos de los números, estrategias de conteo y cálculo, sistema de numeración decimal, atributos medibles y medición.',
  'Repaso: lo que llevas',
  'Aquí se mezcla todo lo de los cinco primeros temas. Nadie te dice de qué se trata cada pregunta: eso lo tienes que ver tú. Es la parte que de verdad muestra si lo aprendiste.',
  'repaso', 55, array[1, 2, 3, 4, 5]::smallint[], 10
from subjects s
where s.slug = 'matematicas'
  and not exists (
    select 1 from dbas d where d.subject_id = s.id and d.grade = 1 and d.num = 11);

insert into dbas (subject_id, grade, num, enunciado, titulo, resumen, tipo, orden, repasa, ranuras)
select s.id, 1, 12,
  'Repaso acumulativo de los DBA 6 a 10: geometría, posición y trayectorias, cambio y variación, el signo igual, y organización de datos.',
  'Repaso: todo el año',
  'La última estación mezcla los cinco temas finales: figuras, dónde están las cosas, lo que cambia, el signo igual y las votaciones. Si pasas esta, pasaste el año.',
  'repaso', 105, array[6, 7, 8, 9, 10]::smallint[], 10
from subjects s
where s.slug = 'matematicas'
  and not exists (
    select 1 from dbas d where d.subject_id = s.id and d.grade = 1 and d.num = 12);

do $$
declare n_rep int; n_sin_orden int; n_mal int;
begin
  select count(*) into n_rep from dbas d
    join subjects s on s.id = d.subject_id and s.slug = 'matematicas'
   where d.grade = 1 and d.tipo = 'repaso';
  select count(*) into n_sin_orden from dbas where orden is null;
  -- Un repaso sin temas que repasar armaría una lección vacía.
  select count(*) into n_mal from dbas
   where tipo = 'repaso' and (repasa is null or array_length(repasa, 1) is null or ranuras is null);
  if n_rep <> 2 then raise exception 'repasos del grado 1: % (esperados 2)', n_rep; end if;
  if n_sin_orden <> 0 then raise exception '% temas sin orden en la ruta', n_sin_orden; end if;
  if n_mal <> 0 then raise exception '% repasos sin temas que repasar', n_mal; end if;
end $$;
