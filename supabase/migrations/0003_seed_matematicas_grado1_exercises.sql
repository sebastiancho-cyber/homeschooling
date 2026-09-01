-- Seed: evidencias de aprendizaje + ejercicios, Matemáticas Grado 1º (piloto).
do $$
declare v_subject_id uuid; v_dba_id uuid; v_evidence_id uuid; v_num int;
begin
  select id into v_subject_id from subjects where slug = 'matematicas';

  select id into v_dba_id from dbas where subject_id = v_subject_id and grade = 1 and num = 1;
  insert into learning_evidences (dba_id, num, texto) values (v_dba_id, 1, 'Reconoce en sus actuaciones cotidianas posibilidades de uso de los números.') returning id into v_evidence_id;
  insert into exercises (evidence_id, type, prompt, config, order_in_evidence) values (v_evidence_id, 'multiple_choice', '¿Cuál de estos números indica una CANTIDAD?', '{"options":["El número 10 en una camiseta de fútbol","5 manzanas en la mesa","El piso 3 de un edificio"],"correctIndex":1}'::jsonb, 1);

  select id into v_dba_id from dbas where subject_id = v_subject_id and grade = 1 and num = 1;
  insert into learning_evidences (dba_id, num, texto) values (v_dba_id, 2, 'Interpreta y resuelve problemas de juntar, quitar y completar, que involucren la cantidad de elementos de una colección.') returning id into v_evidence_id;
  insert into exercises (evidence_id, type, prompt, config, order_in_evidence) values (v_evidence_id, 'numeric_input', 'Tienes 4 manzanas. Regalas 1. ¿Cuántas manzanas te quedan?', '{"correctAnswer":3}'::jsonb, 1);

  select id into v_dba_id from dbas where subject_id = v_subject_id and grade = 1 and num = 2;
  insert into learning_evidences (dba_id, num, texto) values (v_dba_id, 1, 'Realiza conteos (de uno en uno, de dos en dos, etc.) iniciando en cualquier número.') returning id into v_evidence_id;
  insert into exercises (evidence_id, type, prompt, config, order_in_evidence) values (v_evidence_id, 'numeric_input', 'Cuenta de 2 en 2: 4, 6, 8, ¿qué número sigue?', '{"correctAnswer":10}'::jsonb, 1);

  select id into v_dba_id from dbas where subject_id = v_subject_id and grade = 1 and num = 2;
  insert into learning_evidences (dba_id, num, texto) values (v_dba_id, 2, 'Describe y resuelve situaciones variadas con las operaciones de suma y resta en problemas cuya estructura puede ser a + ? = c.') returning id into v_evidence_id;
  insert into exercises (evidence_id, type, prompt, config, order_in_evidence) values (v_evidence_id, 'numeric_input', '3 + ? = 7. ¿Cuál es el número que falta?', '{"correctAnswer":4}'::jsonb, 1);

  select id into v_dba_id from dbas where subject_id = v_subject_id and grade = 1 and num = 3;
  insert into learning_evidences (dba_id, num, texto) values (v_dba_id, 1, 'Realiza composiciones y descomposiciones de números de dos dígitos en términos de la cantidad de dieces y de unos que los conforman.') returning id into v_evidence_id;
  insert into exercises (evidence_id, type, prompt, config, order_in_evidence) values (v_evidence_id, 'multiple_choice', 'El número 34 tiene...', '{"options":["3 decenas y 4 unidades","4 decenas y 3 unidades","3 decenas y 4 decenas"],"correctIndex":0}'::jsonb, 1);

  select id into v_dba_id from dbas where subject_id = v_subject_id and grade = 1 and num = 3;
  insert into learning_evidences (dba_id, num, texto) values (v_dba_id, 2, 'Halla los números correspondientes a tener diez más o diez menos que una cantidad determinada.') returning id into v_evidence_id;
  insert into exercises (evidence_id, type, prompt, config, order_in_evidence) values (v_evidence_id, 'numeric_input', '¿Cuánto es 10 más que 25?', '{"correctAnswer":35}'::jsonb, 1);

  select id into v_dba_id from dbas where subject_id = v_subject_id and grade = 1 and num = 4;
  insert into learning_evidences (dba_id, num, texto) values (v_dba_id, 1, 'Compara y ordena objetos de acuerdo con atributos como altura, peso, intensidades de color, entre otros.') returning id into v_evidence_id;
  insert into exercises (evidence_id, type, prompt, config, order_in_evidence) values (v_evidence_id, 'multiple_choice', '¿Cuál de estos objetos es más largo?', '{"options":["Un lápiz","Una regla de 30 cm","Una goma de borrar"],"correctIndex":1}'::jsonb, 1);

  select id into v_dba_id from dbas where subject_id = v_subject_id and grade = 1 and num = 4;
  insert into learning_evidences (dba_id, num, texto) values (v_dba_id, 2, 'Compara y ordena colecciones según la cantidad de elementos.') returning id into v_evidence_id;
  insert into exercises (evidence_id, type, prompt, config, order_in_evidence) values (v_evidence_id, 'multiple_choice', '¿Cuál grupo tiene MÁS elementos: 5 estrellas o 8 estrellas?', '{"options":["5 estrellas","8 estrellas"],"correctIndex":1}'::jsonb, 1);

  select id into v_dba_id from dbas where subject_id = v_subject_id and grade = 1 and num = 5;
  insert into learning_evidences (dba_id, num, texto) values (v_dba_id, 1, 'Mide longitudes con diferentes instrumentos y expresa el resultado en unidades estandarizadas o no estandarizadas comunes.') returning id into v_evidence_id;
  insert into exercises (evidence_id, type, prompt, config, order_in_evidence) values (v_evidence_id, 'numeric_input', 'Un lápiz mide 3 clips de longitud y otro mide 5 clips. ¿Cuántos clips más largo es el segundo lápiz?', '{"correctAnswer":2}'::jsonb, 1);

  select id into v_dba_id from dbas where subject_id = v_subject_id and grade = 1 and num = 5;
  insert into learning_evidences (dba_id, num, texto) values (v_dba_id, 2, 'Compara objetos a partir de su longitud, masa, capacidad y duración de eventos.') returning id into v_evidence_id;
  insert into exercises (evidence_id, type, prompt, config, order_in_evidence) values (v_evidence_id, 'true_false', 'Un balde lleno de agua pesa más que una sola gota de agua.', '{"correctAnswer":true}'::jsonb, 1);

  select id into v_dba_id from dbas where subject_id = v_subject_id and grade = 1 and num = 6;
  insert into learning_evidences (dba_id, num, texto) values (v_dba_id, 1, 'Identifica objetos a partir de las descripciones verbales que hacen de sus características geométricas.') returning id into v_evidence_id;
  insert into exercises (evidence_id, type, prompt, config, order_in_evidence) values (v_evidence_id, 'multiple_choice', '¿Qué figura se parece a un balón de fútbol?', '{"options":["Círculo","Cuadrado","Triángulo"],"correctIndex":0}'::jsonb, 1);

  select id into v_dba_id from dbas where subject_id = v_subject_id and grade = 1 and num = 6;
  insert into learning_evidences (dba_id, num, texto) values (v_dba_id, 2, 'Agrupa objetos de su entorno de acuerdo con las semejanzas y las diferencias en la forma y en el tamaño.') returning id into v_evidence_id;
  insert into exercises (evidence_id, type, prompt, config, order_in_evidence) values (v_evidence_id, 'multiple_choice', 'Tiene 3 lados y 3 puntas. ¿Qué figura es?', '{"options":["Círculo","Triángulo","Cuadrado"],"correctIndex":1}'::jsonb, 1);

  select id into v_dba_id from dbas where subject_id = v_subject_id and grade = 1 and num = 7;
  insert into learning_evidences (dba_id, num, texto) values (v_dba_id, 1, 'Da orientaciones espaciales verbalmente o de otras formas para llegar a un lugar específico, utilizando expresiones de lateralidad.') returning id into v_evidence_id;
  insert into exercises (evidence_id, type, prompt, config, order_in_evidence) values (v_evidence_id, 'multiple_choice', 'Caminas hacia adelante y luego giras a la izquierda. ¿Qué hiciste primero?', '{"options":["Girar a la izquierda","Caminar hacia adelante"],"correctIndex":1}'::jsonb, 1);

  select id into v_dba_id from dbas where subject_id = v_subject_id and grade = 1 and num = 7;
  insert into learning_evidences (dba_id, num, texto) values (v_dba_id, 2, 'Mide distancias reales entre varios lugares, con pasos y otras medidas, identificando la distancia -cerca o lejos- entre dichos lugares.') returning id into v_evidence_id;
  insert into exercises (evidence_id, type, prompt, config, order_in_evidence) values (v_evidence_id, 'multiple_choice', 'La tienda está a 10 pasos de tu casa y el parque está a 25 pasos. ¿Qué lugar está más cerca?', '{"options":["La tienda","El parque"],"correctIndex":0}'::jsonb, 1);

  select id into v_dba_id from dbas where subject_id = v_subject_id and grade = 1 and num = 8;
  insert into learning_evidences (dba_id, num, texto) values (v_dba_id, 1, 'Identifica y nombra diferencias entre objetos o grupos de objetos.') returning id into v_evidence_id;
  insert into exercises (evidence_id, type, prompt, config, order_in_evidence) values (v_evidence_id, 'multiple_choice', 'Un vaso tenía 2 canicas y ahora tiene 5. ¿Qué pasó?', '{"options":["Se quitaron canicas","Se agregaron canicas","No cambió nada"],"correctIndex":1}'::jsonb, 1);

  select id into v_dba_id from dbas where subject_id = v_subject_id and grade = 1 and num = 8;
  insert into learning_evidences (dba_id, num, texto) values (v_dba_id, 2, 'Establece relaciones de dependencia entre magnitudes.') returning id into v_evidence_id;
  insert into exercises (evidence_id, type, prompt, config, order_in_evidence) values (v_evidence_id, 'true_false', 'Entre más vasos llenes de agua desde una misma jarra, menos agua va quedando en la jarra.', '{"correctAnswer":true}'::jsonb, 1);

  select id into v_dba_id from dbas where subject_id = v_subject_id and grade = 1 and num = 9;
  insert into learning_evidences (dba_id, num, texto) values (v_dba_id, 1, 'Propone números que satisfacen una igualdad con sumas y restas.') returning id into v_evidence_id;
  insert into exercises (evidence_id, type, prompt, config, order_in_evidence) values (v_evidence_id, 'numeric_input', '2 + 3 = 1 + ?. ¿Qué número falta?', '{"correctAnswer":4}'::jsonb, 1);

  select id into v_dba_id from dbas where subject_id = v_subject_id and grade = 1 and num = 9;
  insert into learning_evidences (dba_id, num, texto) values (v_dba_id, 2, 'Argumenta sobre el uso de la propiedad transitiva en un conjunto de igualdades.') returning id into v_evidence_id;
  insert into exercises (evidence_id, type, prompt, config, order_in_evidence) values (v_evidence_id, 'true_false', 'Si 4 + 1 = 5 y 5 = 2 + 3, entonces 4 + 1 = 2 + 3.', '{"correctAnswer":true}'::jsonb, 1);

  select id into v_dba_id from dbas where subject_id = v_subject_id and grade = 1 and num = 10;
  insert into learning_evidences (dba_id, num, texto) values (v_dba_id, 1, 'Lee la información presentada en tablas de conteo y/o pictogramas sin escala (1 a 1).') returning id into v_evidence_id;
  insert into exercises (evidence_id, type, prompt, config, order_in_evidence) values (v_evidence_id, 'numeric_input', 'En el pictograma, cada dibujo de helado representa 1 niño. Hay 4 helados de chocolate dibujados. ¿Cuántos niños prefieren chocolate?', '{"correctAnswer":4}'::jsonb, 1);

  select id into v_dba_id from dbas where subject_id = v_subject_id and grade = 1 and num = 10;
  insert into learning_evidences (dba_id, num, texto) values (v_dba_id, 2, 'Comunica los resultados respondiendo preguntas tales como: ¿cuál es el dato que más se repite?') returning id into v_evidence_id;
  insert into exercises (evidence_id, type, prompt, config, order_in_evidence) values (v_evidence_id, 'multiple_choice', 'En una encuesta de color favorito: Rojo=3 votos, Azul=5 votos, Verde=2 votos. ¿Cuál color ganó?', '{"options":["Rojo","Azul","Verde"],"correctIndex":1}'::jsonb, 1);

end $$;
