import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fernanda Pires | Psicóloga & Neuropsicóloga",
  description: "Cuidando da sua saúde mental com avaliação neuropsicológica, TCC, Terapia do Esquema, TDAH e TEA. Atendimento presencial em João Monlevade/MG e online para todo o Brasil.",
  keywords: [
    "Fernanda Pires",
    "Psicóloga",
    "Neuropsicóloga",
    "Avaliação Neuropsicológica",
    "TCC",
    "Terapia Cognitivo-Comportamental",
    "Terapia do Esquema",
    "TDAH",
    "TEA",
    "João Monlevade",
    "Psicologia Online"
  ],
  authors: [{ name: "Fernanda Pires" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${cormorant.variable} ${dmSans.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-stone-800 bg-[#FAF6F0]">
        {children}
      </body>
    </html>
  );
}

