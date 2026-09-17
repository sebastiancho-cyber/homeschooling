import type { Metadata, Viewport } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";

// Fredoka: redonda, de trazo grueso, con el aire de rótulo de juguete. Lleva los
// títulos, los números y todos los botones — lo que el niño mira y toca.
const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Nunito: la misma familia de formas redondas pero pensada para leer. Lleva los
// enunciados y el texto corrido, donde Fredoka cansaría.
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Aprende en Casa",
  description:
    "El currículo colombiano (MEN) convertido en juego diario. Matemáticas de 1º a 11º para aprender en casa.",
};

export const viewport: Viewport = {
  // La barra del navegador toma el color del lienzo: la app se siente app.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f6ff" },
    { media: "(prefers-color-scheme: dark)", color: "#131426" },
  ],
  // El ejercicio ocupa la pantalla completa; hay que poder pintar bajo el notch.
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${fredoka.variable} ${nunito.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
