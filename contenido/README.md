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
  nucleo/                  la maquinaria, compartida por TODOS los grados y áreas
    calculo.js             los moldes de los distractores y las formas aditivas
    ilustraciones.js       de qué ejercicio sale qué dibujo
    calidad.js             todos los chequeos
    sembrar.js             arma el SQL y lo escribe
  fugas.js                 los detectores de respuestas que se delatan
  estado.mjs               qué falta y qué está sembrado — se corre PRIMERO
  aplicar.mjs              manda las migraciones a la base
  probar-ayuda.mjs         qué le dice la app al niño cuando falla
  matematicas-1/
    generar.js             ~40 líneas: junta las piezas
    dbas.js                EL CONTENIDO del grado
    ayudas.js              las explicaciones escritas
    excepciones.js         los falsos positivos revisados, con su motivo
  matematicas-2/           los mismos cuatro archivos
```

**La división es la que importa.** Un grado son cuatro archivos y tres de ellos
son contenido. La maquinaria no se copia nunca: si se copiara, el día que un
detector necesite un arreglo habría que aplicarlo en cada grado de cada área, o
no quedaría aplicado. Ya nos pasó con los moldes de los distractores, y costó un
banco entero.

## Sembrar un grado

```bash
node contenido/matematicas-1/generar.js 0025_lo_que_sea
```

Escribe dos archivos:

- `supabase/migrations/0025_lo_que_sea.sql` — la migración, que se commitea.
- `contenido/matematicas-1/0025_lo_que_sea.body.json` — el cuerpo de la
  petición, que no se commitea (está en el `.gitignore` de esta carpeta).

Y se aplican con `aplicar.mjs`, en orden y deteniéndose en la primera que falle:

```bash
node contenido/aplicar.mjs 0025_contexto 0026_lo_que_sea
```

**El token se guarda UNA vez en `.env.local` y no se vuelve a pedir:**

```
SUPABASE_PAT=sbp_...
```

Ese archivo ya guarda las llaves del proyecto, está en el `.gitignore` y no se
sube. Antes el token vivía en el chat de una sesión y se perdía al terminarla,
así que había que pedirlo otra vez cada vez: eso es lo que esto cierra.

El SQL viaja dentro de un JSON armado en memoria, porque pasarlo por la línea de
comandos corrompe las tildes y las comillas. Al terminar, el script vuelve a
leer la base con la misma llave pública que usa la aplicación y dice qué quedó:
las aserciones de adentro comprueban la transacción, pero no que la app vea lo
que creemos que ve.

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
identificadores nuevos. Y es la prueba de que un cambio en el núcleo no movió el
contenido: se regenera la migración vigente y el `git diff` tiene que salir
vacío.

**El generador reconstruye el grado entero**: borra sus ejercicios y sus
evidencias y los vuelve a insertar, todo dentro de una transacción con
comprobaciones al final. No hay manera de aplicar media siembra. Por eso las
migraciones no se reescriben: cada siembra es una migración nueva, y las viejas
se quedan como están aunque su contenido ya no sea el vigente.

## Para el grado siguiente

Se crea `matematicas-N/` con sus cuatro archivos y **no se copia nada del
núcleo**. `generar.js` es el de cualquier otro grado cambiando el número; el
trabajo de verdad está en `dbas.js` y en `ayudas.js`.

Lo que hay que mirar sí o sí:

- **El rango numérico** (§7 de las reglas). Cambia en cada grado.
- **Las formas de operación nuevas.** Si el grado trae una que la app no sabe
  explicar —una multiplicación, una división— hay que agregarla en DOS sitios a
  la vez: `ayudaPara()` en `src/lib/ayuda.ts` y la lista `DERIVABLES` de
  `nucleo/calidad.js`. La lista es un espejo de la función; si se mueve una sin
  la otra, el chequeo deja pasar ejercicios que en la app salen mudos.
- **El vocabulario del dibujo.** `ilustrador()` acepta iconos propios del grado:
  `ilustrador([[/canica/i, "🔴"]])`. Lo demás ya está.
- **Los moldes de los distractores** solo fabrican enteros no negativos. Un
  grado con fracciones o decimales necesita moldes nuevos en `nucleo/calculo.js`
  —no en su carpeta— y con la misma exigencia: que la correcta no caiga siempre
  en el mismo sitio al ordenar.
