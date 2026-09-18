/* En qué estado está el proyecto, ahora mismo.

     node contenido/estado.mjs

   Se corre ANTES de pedirle nada al usuario y antes de dar por sentado nada de
   la base. Dice tres cosas:

     1. Qué configuración hay y cuál falta — sin imprimir ningún valor.
     2. Si la base contesta.
     3. Qué grados están sembrados, y si lo sembrado coincide con lo que
        producen los generadores hoy.

   Existe por un error concreto: el token de la Management API vivía en el chat
   de cada sesión y se perdía al terminarla, así que cada siembra empezaba
   pidiéndolo otra vez. Una sesión que corra esto sabe en diez segundos qué le
   falta, y si no le falta nada, no pregunta. */

import { readFileSync, existsSync, readdirSync, unlinkSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { execFileSync } from "child_process";

const AQUI = dirname(fileURLToPath(import.meta.url));
const RAIZ = join(AQUI, "..");

const ok = (t) => `  ✓ ${t}`;
const mal = (t) => `  ✗ ${t}`;
const duda = (t) => `  · ${t}`;

/* ---------- 1. La configuración ---------------------------------------- */
const ENV = existsSync(join(RAIZ, ".env.local"))
  ? Object.fromEntries(
      readFileSync(join(RAIZ, ".env.local"), "utf-8")
        .split(/\r?\n/)
        .filter((l) => l.includes("=") && !l.trimStart().startsWith("#"))
        .map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()]),
    )
  : {};

const CLAVES = [
  ["NEXT_PUBLIC_SUPABASE_URL", "leer la base"],
  ["NEXT_PUBLIC_SUPABASE_ANON_KEY", "leer la base"],
  ["SUPABASE_PAT", "APLICAR migraciones"],
];

console.log("Configuración (.env.local)");
let faltaAlgo = false;
for (const [clave, para] of CLAVES) {
  const hay = Boolean(ENV[clave] || process.env[clave]);
  if (hay) {
    // Nunca el valor: solo que está y cuánto mide, que basta para ver un pegado a medias.
    const v = ENV[clave] || process.env[clave];
    console.log(ok(`${clave} — ${v.length} caracteres · sirve para ${para}`));
  } else {
    faltaAlgo = true;
    console.log(mal(`${clave} — FALTA · hace falta para ${para}`));
    if (clave === "SUPABASE_PAT") {
      console.log("      se saca en https://supabase.com/dashboard/account/tokens");
      console.log("      y se pega UNA vez al final de .env.local; no se vuelve a pedir");
    }
  }
}

/* ---------- 2. ¿Contesta la base? --------------------------------------- */
const U = ENV.NEXT_PUBLIC_SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const K = ENV.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const pedir = async (q) => {
  const r = await fetch(`${U}/rest/v1/${q}`, { headers: { apikey: K, Authorization: `Bearer ${K}` } });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
};

console.log("\nLa base");
let viva = false;
if (!U || !K) {
  console.log(mal("no se puede ni intentar: faltan las llaves públicas"));
} else {
  try {
    await pedir("subjects?select=slug&limit=1");
    viva = true;
    console.log(ok("contesta"));
  } catch (e) {
    console.log(mal(`no contesta (${e.message})`));
  }
}

/* ---------- 3. ¿Qué hay sembrado, y está al día? ------------------------ */
/* Se corre cada generador a un nombre desechable para saber qué produciría
   HOY, y se compara con lo que hay. Si no coinciden, lo sembrado está viejo:
   manda el generador, siempre. */
function loQueProduce(grado) {
  const dir = join(AQUI, `matematicas-${grado}`);
  if (!existsSync(dir)) return null;
  try {
    const salida = execFileSync(
      process.execPath,
      [join(dir, "generar.js"), `9999_estado_descartable`],
      { cwd: RAIZ, encoding: "utf-8", stdio: ["ignore", "pipe", "pipe"] },
    );
    const m = salida.match(/evidencias: (\d+) \| ranuras: (\d+) \| ejercicios: (\d+)/);
    return m ? { ev: +m[1], ranuras: +m[2], ex: +m[3] } : null;
  } catch {
    return { roto: true };
  } finally {
    // El diagnóstico no deja basura: la migración desechable se borra siempre,
    // haya ido bien o mal.
    for (const f of [
      join(RAIZ, "supabase", "migrations", "9999_estado_descartable.sql"),
      join(dir, "9999_estado_descartable.body.json"),
    ]) {
      try {
        if (existsSync(f)) unlinkSync(f);
      } catch {}
    }
  }
}

const grados = readdirSync(AQUI)
  .filter((d) => /^matematicas-\d+$/.test(d))
  .map((d) => Number(d.split("-")[1]))
  .sort((a, b) => a - b);

console.log("\nGrados");
for (const grado of grados) {
  const gen = loQueProduce(grado);
  if (!gen) {
    console.log(duda(`grado ${grado}: no se pudo leer el generador`));
    continue;
  }
  if (gen.roto) {
    console.log(mal(`grado ${grado}: el generador NO pasa su propio control de calidad`));
    continue;
  }
  if (!viva) {
    console.log(duda(`grado ${grado}: el generador produce ${gen.ex} ejercicios · la base no se pudo consultar`));
    continue;
  }
  const dbas = await pedir(`dbas?select=id,tipo&grade=eq.${grado}`);
  const ev = dbas.length
    ? await pedir(`learning_evidences?select=id&dba_id=in.(${dbas.map((d) => d.id).join(",")})&limit=5000`)
    : [];
  const ex = ev.length
    ? await pedir(`exercises?select=id&evidence_id=in.(${ev.map((e) => e.id).join(",")})&limit=9000`)
    : [];
  const repasos = dbas.filter((d) => d.tipo === "repaso").length;
  const alDia = ex.length === gen.ex && ev.length === gen.ev;
  const linea =
    `grado ${grado}: base ${ex.length} ejercicios / ${ev.length} evidencias / ${repasos} repasos · ` +
    `generador ${gen.ex} / ${gen.ev}`;
  console.log(alDia ? ok(`${linea} — al día`) : mal(`${linea} — SIN SEMBRAR o desactualizado`));
  if (!alDia) {
    const tiene = Boolean(ENV.SUPABASE_PAT || process.env.SUPABASE_PAT);
    console.log(
      tiene
        ? "      se siembra con: node contenido/aplicar.mjs <migración>"
        : "      falta SUPABASE_PAT para poder sembrarlo",
    );
  }
}

console.log(
  faltaAlgo
    ? "\nFalta configuración. Está dicho arriba dónde va: no hay que preguntarle nada a nadie."
    : "\nNo falta configuración.",
);
