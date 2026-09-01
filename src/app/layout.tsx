import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Segoe UI Variable es la fuente de las apps del portal (Teoría Musical incluida); en equipos
// sin Segoe (la mayoría de móviles) cae a Inter, que se declara aquí, y de ahí al stack del
// sistema. Mismo criterio que cmc/apps/web/tailwind.config.ts.
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aprende en Casa",
  description: "Currículo colombiano (MEN) en formato de práctica diaria, empezando por Matemáticas.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
