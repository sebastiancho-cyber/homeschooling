-- Vuelve todo a multiple_choice de un solo clic (misma lógica que quiz-player.tsx de
-- Teoría Musical): revierte multiple_response, y convierte los numeric_input en
-- opción múltiple de 4 alternativas para que nunca haya que escribir con teclado.

update exercises set type = 'multiple_choice', config = '{"options":["El número 10 en una camiseta de fútbol","5 manzanas en la mesa","El piso 3 de un edificio"],"correctIndex":1}'::jsonb where id = '518e79ea-c580-4f68-9c6a-a040171d22df';
update exercises set type = 'multiple_choice', config = '{"options":["Un lápiz","Una regla de 30 cm","Una goma de borrar"],"correctIndex":1}'::jsonb where id = 'b5163de1-9639-41e5-9100-e19feef954ac';
update exercises set type = 'multiple_choice', config = '{"options":["5 estrellas","8 estrellas"],"correctIndex":1}'::jsonb where id = 'f96ddc3a-31aa-4b5a-b6dd-67c68e5c9d31';
update exercises set type = 'multiple_choice', config = '{"options":["Círculo","Cuadrado","Triángulo"],"correctIndex":0}'::jsonb where id = 'c33bb8f8-d3d6-4565-8a57-c389a91cb8b5';
update exercises set type = 'multiple_choice', config = '{"options":["Girar a la izquierda","Caminar hacia adelante"],"correctIndex":1}'::jsonb where id = '40407840-1914-46c5-a707-6cb885b65d84';
update exercises set type = 'multiple_choice', config = '{"options":["3 decenas y 4 unidades","4 decenas y 3 unidades","3 decenas y 4 decenas"],"correctIndex":0}'::jsonb where id = '78d0a3d5-4041-4020-8e6c-f2af932b76dd';
update exercises set type = 'multiple_choice', config = '{"options":["Rojo","Azul","Verde"],"correctIndex":1}'::jsonb where id = 'be0df7e7-6a3c-4d4f-b06d-69ec1e964dc1';
update exercises set type = 'multiple_choice', config = '{"options":["La tienda","El parque"],"correctIndex":0}'::jsonb where id = '8aee3195-369b-4e3d-b62c-59e64b0b6649';
update exercises set type = 'multiple_choice', config = '{"options":["Círculo","Triángulo","Cuadrado"],"correctIndex":1}'::jsonb where id = '0377f9d8-a6ed-473a-81e9-5419c9527c18';
update exercises set type = 'multiple_choice', config = '{"options":["Se quitaron canicas","Se agregaron canicas","No cambió nada"],"correctIndex":1}'::jsonb where id = 'd8d8717c-19d4-45b4-8349-b07ed6cf06d2';

update exercises set type = 'multiple_choice', prompt = '¿Cuál de estas figuras es REDONDA?', config = '{"options":["Balón","Libro","Caja","Ladrillo"],"correctIndex":0}'::jsonb where prompt like 'Selecciona TODAS%';

update exercises set type = 'multiple_choice', config = '{"options":["2","3","4","5"],"correctIndex":1}'::jsonb where type = 'numeric_input' and prompt = 'Tienes 4 manzanas. Regalas 1. ¿Cuántas manzanas te quedan?';
update exercises set type = 'multiple_choice', config = '{"options":["9","10","12","7"],"correctIndex":1}'::jsonb where type = 'numeric_input' and prompt = 'Cuenta de 2 en 2: 4, 6, 8, ¿qué número sigue?';
update exercises set type = 'multiple_choice', config = '{"options":["3","4","10","5"],"correctIndex":1}'::jsonb where type = 'numeric_input' and prompt = '3 + ? = 7. ¿Cuál es el número que falta?';
update exercises set type = 'multiple_choice', config = '{"options":["15","35","30","36"],"correctIndex":1}'::jsonb where type = 'numeric_input' and prompt = '¿Cuánto es 10 más que 25?';
update exercises set type = 'multiple_choice', config = '{"options":["1","2","3","8"],"correctIndex":1}'::jsonb where type = 'numeric_input' and prompt = 'Un lápiz mide 3 clips de longitud y otro mide 5 clips. ¿Cuántos clips más largo es el segundo lápiz?';
update exercises set type = 'multiple_choice', config = '{"options":["3","4","5","6"],"correctIndex":1}'::jsonb where type = 'numeric_input' and prompt = '2 + 3 = 1 + ?. ¿Qué número falta?';
update exercises set type = 'multiple_choice', config = '{"options":["3","4","5","8"],"correctIndex":1}'::jsonb where type = 'numeric_input' and prompt = 'En el pictograma, cada dibujo de helado representa 1 niño. Hay 4 helados de chocolate dibujados. ¿Cuántos niños prefieren chocolate?';
