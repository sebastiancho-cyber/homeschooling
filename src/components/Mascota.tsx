"use client";

/* La mascota. Una app infantil necesita alguien al otro lado: sin ella, la
   pantalla de ejercicio es un formulario con colores. Hace tres cosas y solo
   tres — mira, celebra y se desanima — porque un personaje que reacciona a todo
   termina siendo ruido.

   Está dibujada en SVG, no es una imagen: pesa nada, escala sin borrarse y
   cambia de color con los tokens del tema. */

export type Animo = "idle" | "happy" | "sad";

export function Mascota({ animo = "idle", size = 108 }: { animo?: Animo; size?: number }) {
  const cuerpo = animo === "sad" ? "var(--ink-faint)" : "var(--grape)";
  const cuerpoOscuro = animo === "sad" ? "var(--ink-muted)" : "var(--grape-deep)";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden
      className={
        animo === "happy" ? "rec-pop" : animo === "sad" ? "rec-shake" : "rec-float"
      }
    >
      {/* Orejas redondas, no en punta: unas orejas triangulares y oscuras leen
          como cuernos, y el personaje deja de ser amable. */}
      <circle cx="30" cy="36" r="15" fill={`rgb(${cuerpoOscuro})`} />
      <circle cx="90" cy="36" r="15" fill={`rgb(${cuerpoOscuro})`} />
      <circle cx="30" cy="36" r="7.5" fill="rgba(255,105,170,0.45)" />
      <circle cx="90" cy="36" r="7.5" fill="rgba(255,105,170,0.45)" />

      {/* Cuerpo */}
      <ellipse cx="60" cy="68" rx="44" ry="42" fill={`rgb(${cuerpo})`} />
      {/* La panza más clara da volumen sin necesidad de degradados. */}
      <ellipse cx="60" cy="78" rx="30" ry="27" fill="rgba(255,255,255,0.22)" />

      {/* Cachetes */}
      <ellipse cx="30" cy="76" rx="9" ry="6.5" fill="rgba(255,105,170,0.55)" />
      <ellipse cx="90" cy="76" rx="9" ry="6.5" fill="rgba(255,105,170,0.55)" />

      {animo === "happy" ? (
        <>
          {/* Ojos felices: dos arcos hacia arriba. */}
          <path
            d="M37 60 Q45 50 53 60"
            stroke="white"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M67 60 Q75 50 83 60"
            stroke="white"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Boca abierta, celebrando. */}
          <path d="M50 74 Q60 88 70 74 Z" fill="white" />
        </>
      ) : animo === "sad" ? (
        <>
          <circle cx="45" cy="60" r="8" fill="white" />
          <circle cx="75" cy="60" r="8" fill="white" />
          <circle cx="45" cy="63" r="4" fill={`rgb(var(--ink))`} />
          <circle cx="75" cy="63" r="4" fill={`rgb(var(--ink))`} />
          {/* Boca hacia abajo, pequeña: desanimada, no dramática. */}
          <path
            d="M52 82 Q60 76 68 82"
            stroke="white"
            strokeWidth="4.5"
            strokeLinecap="round"
            fill="none"
          />
        </>
      ) : (
        <>
          <circle cx="45" cy="60" r="10" fill="white" />
          <circle cx="75" cy="60" r="10" fill="white" />
          <circle cx="46" cy="61" r="5" fill={`rgb(var(--ink))`} />
          <circle cx="76" cy="61" r="5" fill={`rgb(var(--ink))`} />
          {/* El brillo del ojo: el detalle que lo hace "vivo". */}
          <circle cx="48.5" cy="58.5" r="1.8" fill="white" />
          <circle cx="78.5" cy="58.5" r="1.8" fill="white" />
          <path
            d="M52 78 Q60 85 68 78"
            stroke="white"
            strokeWidth="4.5"
            strokeLinecap="round"
            fill="none"
          />
        </>
      )}
    </svg>
  );
}
