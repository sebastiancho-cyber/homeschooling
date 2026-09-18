/* Qué le dice la app al niño cuando falla una operación.

   Es el que encontró que tres ejercicios del grado 1 explicaban con números
   negativos —"a 42 le faltan −32 para llegar a 10"—, algo que ningún chequeo
   automático puede ver: la explicación era sintácticamente correcta y
   pedagógicamente absurda. Antes de sembrar un grado, se pasan por aquí las
   formas de operación nuevas y se LEEN.

     node contenido/probar-ayuda.mjs "247 + 135 = ?" "3 × 4 = ?"

   Se corre desde la raíz del repositorio (necesita resolver TypeScript). */
import { readFileSync } from "fs";
import ts from "typescript";

const src = readFileSync("src/lib/ayuda.ts", "utf8");
const js = ts.transpileModule(src, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText;
const mod = await import("data:text/javascript;base64," + Buffer.from(js).toString("base64"));

const ops = process.argv.slice(2);
if (!ops.length) {
  console.error('uso: node contenido/probar-ayuda.mjs "4 + 5 = ?" ...');
  process.exit(1);
}
for (const op of ops) {
  const a = mod.ayudaPara(op);
  console.log("── " + op);
  if (!a) {
    console.log("   (la app NO la sabe explicar: esa ranura necesita ayuda escrita)");
    continue;
  }
  console.log("   pista: " + a.pista);
  a.pasos.forEach((p) => console.log("   · " + p));
  if (a.ojo) console.log("   ojo:  " + a.ojo);
}
