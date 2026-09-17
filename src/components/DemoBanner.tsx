// Cuando la base no responde la app sigue de pie con contenido de muestra. Eso
// solo es honesto si se dice: este aviso es la diferencia entre "degradarse con
// gracia" y "mentir". Va en ámbar, no en rojo — no es un error del usuario.
export function DemoBanner() {
  return (
    <div
      className="card3d mb-6 flex items-start gap-3 border-sun px-4 py-3"
      style={{ ["--depth" as string]: "var(--sun-deep)" }}
      role="status"
    >
      <span aria-hidden className="text-lg leading-none">
        ⚠️
      </span>
      <p className="font-sans text-xs font-bold leading-relaxed text-ink-muted">
        <span className="text-ink">Contenido de muestra.</span> No hay conexión con la base de
        datos, así que esto no es el currículo real. Si el proyecto de Supabase está pausado, hay
        que reactivarlo desde su panel.
      </p>
    </div>
  );
}
