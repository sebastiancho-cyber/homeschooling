/* ¿El sorteo prefiere de verdad lo que no se ha visto? */
import { readFileSync } from "fs";
import ts from "typescript";

/* exercises.ts habla con Supabase, que aquí no hace falta ni existe: se
   sustituye el import por un hueco y quedan las funciones de sorteo, que son
   las que se están probando. */
const src = readFileSync("src/lib/exercises.ts", "utf8").replace(
  'import { supabase } from "@/lib/supabase";',
  "const supabase = null;",
);
const js = ts.transpileModule(src, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText;
const { elegirVariantes, armarRepaso } = await import(
  "data:text/javascript;base64," + Buffer.from(js).toString("base64")
);

// Una lección de 3 ranuras con 3 versiones cada una.
const ejercicios = [];
for (let r = 1; r <= 3; r++) {
  for (let v = 1; v <= 3; v++) {
    ejercicios.push({ id: `r${r}v${v}`, grupo: `t1|${r}`, type: "multiple_choice", config: {} });
  }
}

const VUELTAS = 300;

// 1. Sin memoria: sale cualquiera, incluida la que ya se vio.
let repitioSinMemoria = 0;
for (let i = 0; i < VUELTAS; i++) {
  if (elegirVariantes(ejercicios).some((ex) => ex.id === "r1v1")) repitioSinMemoria++;
}

// 2. Con memoria: r1v1 vista, así que NO debería salir mientras haya otras.
const vistos = new Set(["r1v1"]);
let repitioConMemoria = 0;
for (let i = 0; i < VUELTAS; i++) {
  if (elegirVariantes(ejercicios, vistos).some((ex) => ex.id === "r1v1")) repitioConMemoria++;
}

// 3. Vistas las TRES de una ranura: tiene que volver a sortear entre todas.
//    Repasar es volver a pasar por lo mismo; quedarse sin pregunta sería peor.
const todas = new Set(["r1v1", "r1v2", "r1v3"]);
const salieron = new Set();
for (let i = 0; i < VUELTAS; i++) {
  for (const ex of elegirVariantes(ejercicios, todas)) if (ex.grupo === "t1|1") salieron.add(ex.id);
}

// 4. Lo mismo en el repaso, que es donde lo reportó el director.
let repasoRepitio = 0;
for (let i = 0; i < VUELTAS; i++) {
  if (armarRepaso(ejercicios, 3, vistos).some((ex) => ex.id === "r1v1")) repasoRepitio++;
}

const linea = (ok, t) => `${ok ? "✓" : "✗"} ${t}`;
console.log(linea(repitioSinMemoria > VUELTAS * 0.2, `sin memoria, la ya vista salió ${repitioSinMemoria} de ${VUELTAS} veces`));
console.log(linea(repitioConMemoria === 0, `con memoria, la ya vista salió ${repitioConMemoria} de ${VUELTAS} veces`));
console.log(linea(salieron.size === 3, `vistas las tres, vuelve a sortear entre las ${salieron.size}`));
console.log(linea(repasoRepitio === 0, `en el REPASO, la ya vista salió ${repasoRepitio} de ${VUELTAS} veces`));
