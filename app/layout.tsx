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

const SITE_URL = "https://www.psifernandapires.com.br";
const SITE_TITLE = "Fernanda Pires | Psicóloga & Neuropsicóloga";
const SITE_DESCRIPTION = "Cuidando da sua saúde mental com avaliação neuropsicológica, TCC, Terapia do Esquema, TDAH e TEA. Atendimento presencial em João Monlevade/MG e online para todo o Brasil.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
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
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: SITE_TITLE,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/perfil.webp",
        width: 1200,
        height: 1440,
        alt: "Fernanda Pires - Psicóloga e Neuropsicóloga",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/perfil.webp"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Psychologist",
  name: "Fernanda Pires",
  image: `${SITE_URL}/perfil.webp`,
  url: SITE_URL,
  telephone: "+5531995631699",
  email: "psifernandapires@gmail.com",
  description: SITE_DESCRIPTION,
  identifier: "CRP 04/63320",
  address: {
    "@type": "PostalAddress",
    addressLocality: "João Monlevade",
    addressRegion: "MG",
    addressCountry: "BR",
  },
  areaServed: "BR",
  sameAs: ["https://instagram.com/psi.fernandapires"],
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans text-stone-800 bg-[#FAF6F0]">
        {children}
      </body>
    </html>
  );
}

