@AGENTS.md

# Aprende en Casa

App tipo Duolingo para familias colombianas que educan en casa. La ruta es el
currículo oficial del MEN: cada tema es un DBA, con sus evidencias de
aprendizaje literales. **El objetivo no es entretener, es que un niño que juegue
pueda demostrar que está preparado para el sistema escolar colombiano.** Eso
sube el listón de todo lo que se escriba aquí.

## Antes de preguntarle nada al usuario

```bash
node contenido/estado.mjs
```

Dice qué configuración hay, si la base contesta, y qué grados están sembrados o
desactualizados. **Si algo falta, ahí dice dónde va** — no hay que preguntarlo.

Esta regla existe por un error real: el token de la Management API vivía en el
chat de cada sesión y se perdía al terminarla, así que cada siembra empezaba
pidiéndolo otra vez. Un secreto que hace falta para trabajar va en `.env.local`
(que está en el `.gitignore`), no en una conversación.

## La ley del contenido

**El contenido no se escribe en la base: se genera.** La base es el RESULTADO de
correr el generador. Si alguna vez la base y el generador no coinciden, manda el
generador.

- **`docs/REGLAS-DE-CONTENIDO.md`** — cómo se escribe un ejercicio. Diez
  secciones, cada una con el error que la hizo necesaria. Arriba trae **las once
  que más importan**: eso es lo que se lee para arrancar un grado nuevo.
- **`contenido/`** — la herramienta, con su propio README. El núcleo es uno solo
  y **no se copia nunca**: un grado son cuatro archivos y tres son contenido.

Tres cosas que se rompen fácil si no se saben:

- Si el generador se queja, **se corrige el contenido, nunca el chequeo.** Un
  falso positivo se anota en `excepciones.js` con su motivo; el detector no se
  apaga.
- Correrlo dos veces da el mismo SQL byte a byte. Esa es la prueba de que un
  cambio en el núcleo no movió el contenido: se regenera la migración vigente y
  el `git diff` tiene que salir vacío.
- Las migraciones son historia y **no se reescriben**. Cada siembra es una
  migración nueva.

## Verificar

- `npx tsc --noEmit` y `npx eslint src` — hay 3 errores preexistentes en los
  efectos que leen `localStorage`; cualquier otro es nuevo.
- `node contenido/probar-ayuda.mjs "247 + 135 = ?"` — qué le dice la app al niño
  cuando falla. Encontró que tres ejercicios explicaban con números negativos, y
  ningún chequeo automático puede ver eso.
- **Un dibujo se verifica midiéndolo, no mirándolo.** Cajas y ángulos desde la
  consola del navegador: cinco de cada doce marcas de los relojes estaban fuera
  de la esfera y en una captura parecían parte del diseño.
