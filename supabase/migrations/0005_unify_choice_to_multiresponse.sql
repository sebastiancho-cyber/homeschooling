-- Unifica la interacción: todas las preguntas de opción se convierten a
-- multiple_response (checkboxes + Comprobar), aunque tengan una sola respuesta
-- correcta. De paso corrige un 'Balón' que quedó mal codificado al insertarse.

update exercises set type = 'multiple_response', config = '{"options":["El número 10 en una camiseta de fútbol","5 manzanas en la mesa","El piso 3 de un edificio"],"correctIndices":[1]}'::jsonb where id = '518e79ea-c580-4f68-9c6a-a040171d22df';
update exercises set type = 'multiple_response', config = '{"options":["Un lápiz","Una regla de 30 cm","Una goma de borrar"],"correctIndices":[1]}'::jsonb where id = 'b5163de1-9639-41e5-9100-e19feef954ac';
update exercises set type = 'multiple_response', config = '{"options":["5 estrellas","8 estrellas"],"correctIndices":[1]}'::jsonb where id = 'f96ddc3a-31aa-4b5a-b6dd-67c68e5c9d31';
update exercises set type = 'multiple_response', config = '{"options":["Círculo","Cuadrado","Triángulo"],"correctIndices":[0]}'::jsonb where id = 'c33bb8f8-d3d6-4565-8a57-c389a91cb8b5';
update exercises set type = 'multiple_response', config = '{"options":["Girar a la izquierda","Caminar hacia adelante"],"correctIndices":[1]}'::jsonb where id = '40407840-1914-46c5-a707-6cb885b65d84';
update exercises set type = 'multiple_response', config = '{"options":["3 decenas y 4 unidades","4 decenas y 3 unidades","3 decenas y 4 decenas"],"correctIndices":[0]}'::jsonb where id = '78d0a3d5-4041-4020-8e6c-f2af932b76dd';
update exercises set type = 'multiple_response', config = '{"options":["Rojo","Azul","Verde"],"correctIndices":[1]}'::jsonb where id = 'be0df7e7-6a3c-4d4f-b06d-69ec1e964dc1';
update exercises set type = 'multiple_response', config = '{"options":["La tienda","El parque"],"correctIndices":[0]}'::jsonb where id = '8aee3195-369b-4e3d-b62c-59e64b0b6649';
update exercises set type = 'multiple_response', config = '{"options":["Círculo","Triángulo","Cuadrado"],"correctIndices":[1]}'::jsonb where id = '0377f9d8-a6ed-473a-81e9-5419c9527c18';
update exercises set type = 'multiple_response', config = '{"options":["Se quitaron canicas","Se agregaron canicas","No cambió nada"],"correctIndices":[1]}'::jsonb where id = 'd8d8717c-19d4-45b4-8349-b07ed6cf06d2';

-- Corrige la codificación de 'Balón' (config existente ya tenía correctIndices).
update exercises set config = jsonb_set(config, '{options,0}', '"Balón"') where prompt like 'Selecciona TODAS%';
