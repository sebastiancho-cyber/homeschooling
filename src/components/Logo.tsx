// La marca: una casita. El producto se llama "Aprende en Casa" y el nombre ya
// dice qué es — el logo solo tiene que hacerlo reconocible de un vistazo.
export function Logo({ size = 44 }: { size?: number }) {
  return (
    <span
      className="btn3d shrink-0 rounded-2xl bg-grass"
      style={{
        width: size,
        height: size,
        ["--btn-edge" as string]: "var(--grass-deep)",
        ["--btn-depth" as string]: "4px",
      }}
      aria-hidden
    >
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none">
        <path
          d="M3 11.2 12 4l9 7.2"
          stroke="white"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.5 10.6V19a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-8.4"
          stroke="white"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M10 20v-4.2h4V20" stroke="white" strokeWidth="2.4" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
