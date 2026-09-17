/* Las figuras geométricas, dibujadas.

   El tema 6 preguntaba "¿cuántos lados tiene un triángulo?" sin que apareciera
   un triángulo. Así el niño que sabe la PALABRA acierta y el que sabe contar
   lados no tiene qué contar: eso mide vocabulario, no geometría.

   Dos usos, y son distintos:

     · Como ilustración del enunciado, cuando lo que se mide es CONTAR
       (lados, puntas, esquinas). Ahí el dibujo es el ejercicio.
     · Como opción, cuando lo que se mide es RECONOCER a partir de una
       descripción. Ahí las cuatro opciones son figuras y el niño tiene que
       aplicarle la descripción a cada una, en vez de escoger una palabra.

   Las esquinas van EN PUNTA, sin redondear. En el resto de la app redondeamos
   todo, pero aquí la esquina es el dato que se cuenta: un triángulo de puntas
   romas deja de servir para contar puntas. */

export const FIGURAS = [
  "triángulo",
  "cuadrado",
  "rectángulo",
  "círculo",
  "cubo",
  "esfera",
  "cilindro",
  "cono",
  "prisma",
  "pirámide",
] as const;

export type NombreFigura = (typeof FIGURAS)[number];

/** Reconoce el nombre de una figura en un texto de opción o de enunciado.
 *  Sirve para DERIVAR el dibujo del contenido en vez de etiquetarlo a mano. */
export function figuraDe(texto: string): NombreFigura | null {
  const t = texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
  for (const f of FIGURAS) {
    const sin = f.normalize("NFD").replace(/[̀-ͯ]/g, "");
    // Se ancla al principio para que "Prisma rectangular" no cuente como
    // "rectángulo", que es una figura plana y distinta.
    if (t === sin || t.startsWith(sin + " ") || t.startsWith(sin + "s")) return f;
  }
  return null;
}

/* Los tres tonos de un cuerpo: la cara de frente, la de arriba (más clara,
   como si la luz cayera de allá) y la del lado (más oscura). Es lo que hace
   que un cubo se vea cubo y no un cuadrado con rayas. */
type Paleta = { frente: string; arriba: string; lado: string };
const PALETA: Paleta = {
  frente: "rgb(var(--sky))",
  arriba: "rgb(var(--bubble))",
  lado: "rgb(var(--sky-deep))",
};

function Plana({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
      {children}
    </svg>
  );
}

const BORDE = { stroke: "rgb(var(--ink))", strokeWidth: 3, strokeLinejoin: "round" as const };

function Dibujo({ nombre }: { nombre: NombreFigura }) {
  const { frente, arriba, lado } = PALETA;

  switch (nombre) {
    /* -------------------------------------------------------------- planas */
    case "triángulo":
      return (
        <Plana>
          <polygon points="50,12 90,84 10,84" fill={frente} {...BORDE} />
        </Plana>
      );
    case "cuadrado":
      return (
        <Plana>
          <rect x="16" y="16" width="68" height="68" fill={frente} {...BORDE} />
        </Plana>
      );
    case "rectángulo":
      // Más ancho que alto, y a ojo: si se pareciera a un cuadrado, la
      // pregunta de "cuál tiene dos lados más largos" no tendría respuesta.
      return (
        <Plana>
          <rect x="6" y="28" width="88" height="44" fill={frente} {...BORDE} />
        </Plana>
      );
    case "círculo":
      return (
        <Plana>
          <circle cx="50" cy="50" r="38" fill={frente} {...BORDE} />
        </Plana>
      );

    /* ------------------------------------------------------------- cuerpos */
    case "cubo":
      return (
        <Plana>
          <polygon points="22,36 50,20 78,36 50,52" fill={arriba} {...BORDE} />
          <polygon points="22,36 50,52 50,84 22,68" fill={frente} {...BORDE} />
          <polygon points="78,36 78,68 50,84 50,52" fill={lado} {...BORDE} />
        </Plana>
      );
    case "prisma":
      // El mismo cuerpo que el cubo pero alargado: es exactamente lo que los
      // distingue, y por eso se dibujan con la misma construcción.
      return (
        <Plana>
          <polygon points="10,38 44,20 90,36 56,54" fill={arriba} {...BORDE} />
          <polygon points="10,38 56,54 56,80 10,64" fill={frente} {...BORDE} />
          <polygon points="90,36 90,62 56,80 56,54" fill={lado} {...BORDE} />
        </Plana>
      );
    case "esfera":
      return (
        <Plana>
          <circle cx="50" cy="52" r="36" fill={frente} {...BORDE} />
          {/* El brillo es lo que la separa del círculo plano. */}
          <ellipse cx="38" cy="38" rx="11" ry="7" fill={arriba} opacity="0.85" transform="rotate(-28 38 38)" />
        </Plana>
      );
    case "cilindro":
      return (
        <Plana>
          <path d="M22 28 v44 a28 12 0 0 0 56 0 v-44" fill={frente} {...BORDE} />
          <ellipse cx="50" cy="28" rx="28" ry="12" fill={arriba} {...BORDE} />
        </Plana>
      );
    case "cono":
      return (
        <Plana>
          <path d="M50 12 L78 74 a28 12 0 0 1 -56 0 Z" fill={frente} {...BORDE} />
          <path d="M22 74 a28 12 0 0 0 56 0" fill="none" {...BORDE} />
        </Plana>
      );
    case "pirámide":
      // Como el cono, pero con base cuadrada y aristas rectas: es justo lo que
      // los distingue, y a esta edad se confunden todo el tiempo.
      return (
        <Plana>
          <polygon points="50,10 84,70 50,84" fill={lado} {...BORDE} />
          <polygon points="50,10 16,70 50,84" fill={frente} {...BORDE} />
          <polygon points="16,70 50,58 84,70 50,84" fill={arriba} {...BORDE} />
        </Plana>
      );
  }
}

export function Figura({ nombre, size = 116 }: { nombre: NombreFigura; size?: number }) {
  return (
    <span
      className="rec-aparecer block shrink-0"
      style={{ width: size, height: size }}
      role="img"
      aria-label={nombre}
    >
      <Dibujo nombre={nombre} />
    </span>
  );
}

/** La versión pequeña que va dentro de un botón de opción. */
export function FiguraEnOpcion({ nombre }: { nombre: NombreFigura }) {
  return (
    <span className="block h-11 w-11 shrink-0" aria-hidden>
      <Dibujo nombre={nombre} />
    </span>
  );
}
