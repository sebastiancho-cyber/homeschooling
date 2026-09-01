-- Separa la operación aritmética (se muestra grande y en negrilla, centrada) del
-- enunciado (instrucción corta arriba), en los ejercicios de cálculo del grado 1.

update exercises set prompt = '¿Cuál es el número que falta?', config = config || jsonb_build_object('operation', '3 + ? = 7') where prompt = '3 + ? = 7. ¿Cuál es el número que falta?';
update exercises set prompt = '¿Qué número falta?', config = config || jsonb_build_object('operation', '2 + 3 = 1 + ?') where prompt = '2 + 3 = 1 + ?. ¿Qué número falta?';
update exercises set prompt = 'Cuenta de 2 en 2. ¿Qué número sigue?', config = config || jsonb_build_object('operation', '4, 6, 8, ?') where prompt = 'Cuenta de 2 en 2: 4, 6, 8, ¿qué número sigue?';
update exercises set prompt = '¿Cuánto es?', config = config || jsonb_build_object('operation', '25 + 10 = ?') where prompt = '¿Cuánto es 10 más que 25?';
update exercises set prompt = 'Tienes 4 manzanas y regalas 1. ¿Cuántas te quedan?', config = config || jsonb_build_object('operation', '4 − 1 = ?') where prompt = 'Tienes 4 manzanas. Regalas 1. ¿Cuántas manzanas te quedan?';
update exercises set prompt = 'Un lápiz mide 3 clips y otro mide 5 clips. ¿Cuántos clips más largo es el segundo?', config = config || jsonb_build_object('operation', '5 − 3 = ?') where prompt = 'Un lápiz mide 3 clips de longitud y otro mide 5 clips. ¿Cuántos clips más largo es el segundo lápiz?';
