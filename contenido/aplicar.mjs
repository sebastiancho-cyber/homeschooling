/* Aplica migraciones contra la base, por la Management API.

     SUPABASE_PAT=sbp_... node contenido/aplicar.mjs 0025_contexto_del_grado_2 0026_matematicas_grado2

   El token sale del entorno y no se guarda en ninguna parte. Si falta, el
   script se detiene antes de tocar nada.

   Por qué no se usa `curl` a pelo: el cuerpo de la petición es un JSON con el
   SQL adentro, y pasar el SQL por la línea de comandos corrompe las tildes y
   las comillas. Aquí se arma el JSON en memoria y se manda tal cual.

   Las migraciones van EN ORDEN y se detiene en la primera que falle. Cada una
   trae sus propias comprobaciones dentro de la transacción, así que una que
   falle se revierte entera: no hay manera de dejar la base a medias. */

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const AQUI = dirname(fileURLToPath(import.meta.url));
const RAIZ = join(AQUI, "..");
const PROYECTO = "nkvarwwrldhablqxtywu";

const token = process.env.SUPABASE_PAT;
if (!token) {
  console.error("Falta SUPABASE_PAT en el entorno. No se tocó nada.");
  console.error('  PowerShell:  $env:SUPABASE_PAT = "sbp_..."');
  console.error("  bash:        export SUPABASE_PAT=sbp_...");
  process.exit(1);
}

const migraciones = process.argv.slice(2);
if (!migraciones.length) {
  console.error("uso: node contenido/aplicar.mjs 0025_nombre 0026_otro");
  process.exit(1);
}

for (const nombre of migraciones) {
  const ruta = join(RAIZ, "supabase", "migrations", `${nombre}.sql`);
  let sql;
  try {
    sql = readFileSync(ruta, "utf-8");
  } catch {
    console.error(`No existe ${ruta}`);
    process.exit(1);
  }

  process.stdout.write(`${nombre} … `);
  const r = await fetch(`https://api.supabase.com/v1/projects/${PROYECTO}/database/query`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query: sql }),
  });
  const texto = await r.text();

  if (!r.ok) {
    console.log("FALLÓ");
    console.error(`  HTTP ${r.status}: ${texto.slice(0, 600)}`);
    console.error("  La transacción se revirtió: la base quedó como estaba.");
    process.exit(1);
  }
  console.log(`ok (${(sql.length / 1024).toFixed(0)} kB)`);
}

/* Y se comprueba desde fuera lo que quedó. Las aserciones de adentro ya
   corrieron, pero esto mira la base con los mismos ojos con que la mira la
   aplicación: si aquí sale otra cosa, es que la app no ve lo que creemos. */
const env = Object.fromEntries(
  readFileSync(join(RAIZ, ".env.local"), "utf-8")
    .split(/\r?\n/)
    .filter(Boolean)
    .map((l) => [l.slice(0, l.indexOf("=")), l.slice(l.indexOf("=") + 1)]),
);
const U = env.NEXT_PUBLIC_SUPABASE_URL;
const K = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const pedir = async (q) =>
  (await fetch(`${U}/rest/v1/${q}`, { headers: { apikey: K, Authorization: `Bearer ${K}` } })).json();

console.log("\nLo que quedó en la base:");
for (const grado of [1, 2]) {
  const dbas = await pedir(`dbas?select=id,num,tipo,titulo&grade=eq.${grado}&order=orden`);
  if (!Array.isArray(dbas)) {
    console.log(`  grado ${grado}: no se pudo leer`, dbas);
    continue;
  }
  const temas = dbas.filter((d) => d.tipo === "dba");
  const repasos = dbas.filter((d) => d.tipo === "repaso");
  const sinTitulo = dbas.filter((d) => !d.titulo).length;
  const ev = await pedir(
    `learning_evidences?select=id,dba_id&dba_id=in.(${dbas.map((d) => d.id).join(",")})&limit=5000`,
  );
  const ex = await pedir(
    `exercises?select=id&evidence_id=in.(${ev.map((e) => e.id).join(",")})&limit=5000`,
  );
  console.log(
    `  grado ${grado}: ${temas.length} temas · ${repasos.length} repasos · ${ev.length} evidencias · ${ex.length} ejercicios` +
      (sinTitulo ? ` · ⚠ ${sinTitulo} sin título` : ""),
  );
}
