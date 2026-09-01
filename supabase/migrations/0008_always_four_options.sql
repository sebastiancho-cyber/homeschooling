-- 'Siempre 4 respuestas': los 3 true_false pasan a multiple_choice genuino de 4
-- alternativas, y se agrega una cuarta opción a los 10 que tenían menos.

update exercises set type = 'multiple_choice', prompt = 'Si llenas más vasos de agua desde la misma jarra, ¿qué le pasa al agua que queda en la jarra?', config = '{"options":["Aumenta","Disminuye","Sigue igual","Se congela"],"correctIndex":1}'::jsonb where id = '9abf8859-52eb-4f2b-a3cf-870996219347';
update exercises set type = 'multiple_choice', prompt = '¿Cuánto es 4 + 1?', config = '{"options":["2 + 3","3 + 3","1 + 1","5 + 5"],"correctIndex":0,"operation":"Si 4 + 1 = 5 y 5 = 2 + 3..."}'::jsonb where id = '1a75167a-7963-474a-a11b-1e4e28079be4';
update exercises set type = 'multiple_choice', prompt = '¿Cuál de estos pesa MÁS?', config = '{"options":["Una gota de agua","Un balde lleno de agua","Una pluma","Un grano de arroz"],"correctIndex":1}'::jsonb where id = '316b7334-cb85-449c-b68c-b39e2e29d1f5';

update exercises set config = jsonb_set(config, '{options}', (config->'options') || '["Un número de teléfono"]'::jsonb) where id = '518e79ea-c580-4f68-9c6a-a040171d22df';
update exercises set config = jsonb_set(config, '{options}', (config->'options') || '["Una moneda"]'::jsonb) where id = 'b5163de1-9639-41e5-9100-e19feef954ac';
update exercises set config = jsonb_set(config, '{options}', (config->'options') || '["6 estrellas","3 estrellas"]'::jsonb) where id = 'f96ddc3a-31aa-4b5a-b6dd-67c68e5c9d31';
update exercises set config = jsonb_set(config, '{options}', (config->'options') || '["Rectángulo"]'::jsonb) where id = 'c33bb8f8-d3d6-4565-8a57-c389a91cb8b5';
update exercises set config = jsonb_set(config, '{options}', (config->'options') || '["Girar a la derecha","Detenerte"]'::jsonb) where id = '40407840-1914-46c5-a707-6cb885b65d84';
update exercises set config = jsonb_set(config, '{options}', (config->'options') || '["34 unidades y 0 decenas"]'::jsonb) where id = '78d0a3d5-4041-4020-8e6c-f2af932b76dd';
update exercises set config = jsonb_set(config, '{options}', (config->'options') || '["Ninguno"]'::jsonb) where id = 'be0df7e7-6a3c-4d4f-b06d-69ec1e964dc1';
update exercises set config = jsonb_set(config, '{options}', (config->'options') || '["Están a la misma distancia","No se puede saber"]'::jsonb) where id = '8aee3195-369b-4e3d-b62c-59e64b0b6649';
update exercises set config = jsonb_set(config, '{options}', (config->'options') || '["Rectángulo"]'::jsonb) where id = '0377f9d8-a6ed-473a-81e9-5419c9527c18';
update exercises set config = jsonb_set(config, '{options}', (config->'options') || '["Se rompieron"]'::jsonb) where id = 'd8d8717c-19d4-45b4-8349-b07ed6cf06d2';
