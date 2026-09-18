/* La siembra de un grado: revisar, escribir el SQL, y no dejar nada a medias.

   Un grado entero se reconstruye de una sola vez —se borran sus ejercicios y
   sus evidencias y se vuelven a insertar— dentro de UNA transacción que termina
   comprobando lo que quedó. Si algo no cuadra, la transacción revienta y la
   base se queda exactamente como estaba. No hay manera de aplicar media
   siembra, y por eso una migración nunca se reescribe: cada siembra es una
   migración nueva y las viejas se quedan como historia. */

const fs = require("fs");
const crypto = require("crypto");
const { revisar, DERIVABLES } = require("./calidad.js");

/** Un uuid estable a partir de un texto. Mismo texto, mismo identificador.
 *  Es lo que hace que dos corridas del generador den el MISMO SQL y que al
 *  revisar un cambio se vea solo lo que cambió de verdad, en vez de
 *  trescientas líneas de identificadores nuevos. */
function uuidDe(semilla) {
  const h = crypto.createHash("sha1").update(semilla).digest("hex");
  return [h.slice(0, 8), h.slice(8, 12), "5" + h.slice(13, 16), "8" + h.slice(17, 20), h.slice(20, 32)].join("-");
}

const q = (s) => "'" + String(s).replace(/'/g, "''") + "'";

/**
 * @param area      el slug de la materia en `subjects` ("matematicas").
 * @param grado     el número de grado.
 * @param DBAS      el contenido: { [num]: { evidencias: [], slots: [] } }.
 * @param AYUDAS    las explicaciones escritas, por `${dba}|${primer enunciado}`.
 * @param EXCEPCIONES los falsos positivos revisados, con su motivo.
 * @param visualPara  el ilustrador del grado.
 * @param figurasDeOpciones  íd.
 * @param migracion   nombre del archivo que se va a escribir.
 * @param dir         la carpeta del grado (__dirname del que llama).
 * @param encabezado  el comentario que abre la migración: qué trae esta siembra.
 * @param derivables / limites  se le pasan tal cual al control de calidad.
 */
function sembrar({
  area,
  grado,
  DBAS,
  AYUDAS,
  EXCEPCIONES,
  visualPara,
  figurasDeOpciones,
  migracion,
  dir,
  encabezado = "",
  derivables,
  limites,
}) {
  const derivablesUsadas = derivables ?? DERIVABLES;
  const { errores, avisos, totalEv, totalSlots, totalEx, maxP, maxO, medida } = revisar({
    DBAS, AYUDAS, EXCEPCIONES, visualPara, derivables, limites,
  });

  if (errores.length) {
    console.error("NO se genera nada. Problemas encontrados:");
    for (const e of errores) console.error("  -", e);
    process.exit(1);
  }

  let conVisual = 0;
  let conAyuda = 0;
  let conFiguras = 0;

  let sql = `${encabezado}
do $$
declare v_subject uuid;
begin
  select id into v_subject from subjects where slug = '${area}';
  delete from exercises where evidence_id in (
    select le.id from learning_evidences le join dbas d on d.id = le.dba_id
    where d.subject_id = v_subject and d.grade = ${grado});
  delete from learning_evidences where dba_id in (
    select id from dbas where subject_id = v_subject and grade = ${grado});
end $$;

`;

  for (const dbaNum of Object.keys(DBAS).map(Number).sort((a, b) => a - b)) {
    const { evidencias, slots } = DBAS[dbaNum];
    const ids = evidencias.map((_, i) => uuidDe(`${area}|${grado}|dba${dbaNum}|ev${i + 1}`));
    sql += `-- ===== DBA ${dbaNum}: ${evidencias.length} evidencias · ${slots.length} ranuras · ${slots.length * 3} ejercicios =====\n`;
    evidencias.forEach((texto, i) => {
      sql += `insert into learning_evidences (id, dba_id, num, texto) select ${q(ids[i])}::uuid, d.id, ${i + 1}, ${q(texto)} from dbas d join subjects s on s.id = d.subject_id and s.slug = '${area}' where d.grade = ${grado} and d.num = ${dbaNum};\n`;
    });
    slots.forEach((slot, pos) => {
      slot.v.forEach((v) => {
        const config = { options: v.o, correctIndex: v.c };
        const ilustracion = visualPara(v);
        if (v.op && !(ilustracion && ilustracion.quitarOp)) config.operation = v.op;
        /* El dibujo ocupó el lugar de la línea, pero la línea sigue siendo algo
           que la app sabe explicar: se manda aparte. Así una cadena numérica se
           ve como cajas y flechas y de todos modos trae sus pasos derivados,
           que cambian con los números. */
        if (v.op && ilustracion && ilustracion.quitarOp && derivablesUsadas.some((re) => re.test(v.op))) {
          config.ayudaOp = v.op;
        }
        if (ilustracion) {
          config.visual = ilustracion.vis;
          conVisual++;
        }
        // Si las cuatro opciones son figuras, se dibujan las cuatro: así el niño
        // le aplica la descripción a las formas en vez de escoger una palabra.
        const figuras = figurasDeOpciones(v);
        if (figuras) {
          config.figuras = figuras;
          conFiguras++;
        }
        // La ayuda escrita es por RANURA: las tres versiones de una ranura
        // conceptual miden la misma idea, así que comparten la explicación.
        // Las que tienen operación no la llevan: esas se derivan en la app.
        const escrita = AYUDAS[`${dbaNum}|${slot.v[0].p}`];
        if (escrita) {
          config.ayuda = escrita;
          conAyuda++;
        }
        sql += `insert into exercises (evidence_id, type, prompt, config, order_in_lesson) values (${q(ids[slot.e - 1])}::uuid, 'multiple_choice', ${q(v.p)}, ${q(JSON.stringify(config))}::jsonb, ${pos + 1});\n`;
      });
    });
    sql += "\n";
  }

  sql += `do $$
declare n_ev int; n_ex int; n_malas int; n_ranuras int; n_mudos int;
begin
  select count(*) into n_ev from learning_evidences le join dbas d on d.id = le.dba_id
    join subjects s on s.id = d.subject_id and s.slug = '${area}' where d.grade = ${grado};
  select count(*) into n_ex from exercises e join learning_evidences le on le.id = e.evidence_id
    join dbas d on d.id = le.dba_id join subjects s on s.id = d.subject_id and s.slug = '${area}'
    where d.grade = ${grado};
  select count(*) into n_malas from exercises e join learning_evidences le on le.id = e.evidence_id
    join dbas d on d.id = le.dba_id join subjects s on s.id = d.subject_id and s.slug = '${area}'
    where d.grade = ${grado} and (jsonb_array_length(e.config->'options') <> 4
      or (select count(distinct v) from jsonb_array_elements_text(e.config->'options') v) <> 4
      or length(e.prompt) > 70);
  -- Toda ranura de toda lección tiene que tener exactamente 3 versiones: es lo
  -- que sostiene que repetir no sea memorizar.
  select count(*) into n_ranuras from (
    select d.num, e.order_in_lesson from exercises e
      join learning_evidences le on le.id = e.evidence_id
      join dbas d on d.id = le.dba_id
      join subjects s on s.id = d.subject_id and s.slug = '${area}'
    where d.grade = ${grado} group by d.num, e.order_in_lesson having count(*) <> 3) t;
  -- Ningún ejercicio puede quedar mudo: o trae la ayuda escrita, o trae una
  -- operación de la cual la app deriva los pasos. Un ejercicio sin ninguna de
  -- las dos solo sabe decirle al niño que se equivocó.
  select count(*) into n_mudos from exercises e
    join learning_evidences le on le.id = e.evidence_id
    join dbas d on d.id = le.dba_id
    join subjects s on s.id = d.subject_id and s.slug = '${area}'
   where d.grade = ${grado}
     and e.config->'ayuda' is null
     and e.config->'operation' is null
     and e.config->'ayudaOp' is null;
  if n_ev <> ${totalEv} then raise exception 'evidencias: % (esperadas ${totalEv})', n_ev; end if;
  if n_ex <> ${totalEx} then raise exception 'ejercicios: % (esperados ${totalEx})', n_ex; end if;
  if n_malas <> 0 then raise exception '% ejercicios mal formados', n_malas; end if;
  if n_ranuras <> 0 then raise exception '% ranuras que no tienen 3 versiones', n_ranuras; end if;
  if n_mudos <> 0 then raise exception '% ejercicios sin ayuda ni operación', n_mudos; end if;
end $$;
`;

  const out = dir + "/../../supabase/migrations/" + migracion + ".sql";
  fs.writeFileSync(out, sql, "utf-8");
  fs.writeFileSync(dir + "/" + migracion + ".body.json", JSON.stringify({ query: sql }), "utf-8");
  console.log(`evidencias: ${totalEv} | ranuras: ${totalSlots} | ejercicios: ${totalEx}`);
  console.log(`con ilustración: ${conVisual} de ${totalEx}`);
  console.log(`con figuras en las opciones: ${conFiguras}`);
  console.log(`con ayuda escrita: ${conAyuda} de ${totalEx} (${Object.keys(AYUDAS).length} ranuras)`);
  console.log(`enunciado más largo: ${maxP} car. | opción más larga: ${maxO} car.`);
  if (avisos.length) {
    console.log(`
Para mirar (${avisos.length}), no impiden sembrar:`);
    for (const a of avisos) console.log("  · " + a);
  }
  if (medida) {
    console.log(`· cálculo: ${medida.n} ejercicios · la correcta cae en la misma posición como máximo el ${Math.round(medida.peor * 100)} %`);
    console.log(`· con un número suelto descartable: ${Math.round(medida.conSuelto * 100)} %`);
  }
}

module.exports = { sembrar, uuidDe };
