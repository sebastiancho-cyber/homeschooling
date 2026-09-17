# El contenido

Aquí vive lo que produce los ejercicios. **No es una carpeta de apoyo: es la
fuente de verdad.** La base de datos es el resultado de correr esto; si alguna
vez hay que elegir entre lo que dice la base y lo que dice el generador, manda
el generador.

Las reglas de cómo se escribe un ejercicio están en
[`docs/REGLAS-DE-CONTENIDO.md`](../docs/REGLAS-DE-CONTENIDO.md). Esto es el
manual de la herramienta; aquello es el de la materia.

```
contenido/
  fugas.js                 los detectores, compartidos por todos los grados
  matematicas-1/
    generar.js             el grado entero: DBA, evidencias, ranuras y versiones
    ayudas.js              las explicaciones escritas
    excepciones.js         los falsos positivos revisados, con su motivo
```

## Sembrar un grado

```bash
node contenido/matematicas-1/generar.js 0024_lo_que_sea
```

Escribe dos archivos:

- `supabase/migrations/0024_lo_que_sea.sql` — la migración, que se commitea.
- `contenido/matematicas-1/0024_lo_que_sea.body.json` — el cuerpo de la
  petición, que no se commitea (está en el `.gitignore` de esta carpeta).

Y se aplica con la Management API:

```bash
curl -X POST "https://api.supabase.com/v1/projects/<ref>/database/query" \
  -H "Authorization: Bearer $SUPABASE_PAT" -H "Content-Type: application/json" \
  --data-binary "@contenido/matematicas-1/0024_lo_que_sea.body.json"
```

El `--data-binary "@archivo"` no es un capricho: pasar el SQL por la línea de
comandos corrompe las tildes y las comillas.

## Tres cosas que conviene saber antes de tocarlo

**Si el generador se queja, se corrige el contenido, nunca el chequeo.** Aborta
sin escribir nada, así que una migración a medias no existe. Cuando un chequeo
señala algo que después de mirarlo resulta ser un falso positivo, se anota en
`excepciones.js` con el motivo escrito — no se apaga el detector. La lista de
excepciones se lee en un minuto; un detector apagado no se vuelve a encender
nunca.

**Correrlo dos veces da exactamente el mismo SQL.** Los identificadores de las
evidencias salen del contenido, no de un sorteo. Eso es lo que permite comparar
dos corridas y ver solo lo que cambió de verdad, en vez de trescientas líneas de
identificadores nuevos.

**El generador reconstruye el grado entero**: borra sus ejercicios y sus
evidencias y los vuelve a insertar, todo dentro de una transacción con
comprobaciones al final. No hay manera de aplicar media siembra. Por eso las
migraciones no se reescriben: cada siembra es una migración nueva, y las viejas
se quedan como están aunque su contenido ya no sea el vigente.

## Para el grado siguiente

Se copia `matematicas-1/` a `matematicas-2/`, se vacía `generar.js` de
contenido y se deja su esqueleto: los ayudantes de cálculo, las reglas de
dibujo, el control de calidad. Lo que cambia es el `DBAS`, que es el contenido.

Lo que hay que ajustar sí o sí:

- El grado, en las consultas y en las comprobaciones.
- El rango numérico (§7 de las reglas).
- Las formas de operación que la app sabe explicar sola, si el grado trae
  alguna nueva: la lista del generador es un espejo de `ayudaPara()` en
  `src/lib/ayuda.ts` y las dos tienen que moverse juntas.
