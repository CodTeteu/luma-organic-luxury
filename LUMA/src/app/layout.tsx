import type { Metadata } from "next";
import {
  Inter,
  Playfair_Display,
  Cormorant_Garamond,
  Lato,
  Montserrat,
  Pinyon_Script,
  Cinzel,
  Amatic_SC,
  Quicksand,
  Bodoni_Moda,
  Raleway,
  Great_Vibes,
  Space_Mono,
  Roboto
} from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

// Font configurations
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const cormorant = Cormorant_Garamond({ weight: ["300", "400", "600"], subsets: ["latin"], variable: "--font-cormorant" });
const lato = Lato({ weight: ["300", "400", "700"], subsets: ["latin"], variable: "--font-lato" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });
const pinyon = Pinyon_Script({ weight: "400", subsets: ["latin"], variable: "--font-pinyon" });
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel" });
const amatic = Amatic_SC({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-amatic" });
const quicksand = Quicksand({ subsets: ["latin"], variable: "--font-quicksand" });
const bodoni = Bodoni_Moda({ subsets: ["latin"], variable: "--font-bodoni" });
const raleway = Raleway({ subsets: ["latin"], variable: "--font-raleway" });
const greatVibes = Great_Vibes({ weight: "400", subsets: ["latin"], variable: "--font-great-vibes" });
const spaceMono = Space_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-space-mono" });
const roboto = Roboto({ weight: ["300", "400", "700"], subsets: ["latin"], variable: "--font-roboto" });

export const metadata: Metadata = {
  title: "LUMA | Sites Exclusivos para Casamentos",
  description: "Estúdio de Tecnologia para Casamentos. Sites exclusivos com identidade visual fiel, RSVP Ativo via WhatsApp e Lista de Presentes com PIX direto.",
  keywords: "casamento, site casamento, RSVP, lista de presentes, wedding, site personalizado, cerimonialista, LUMA",
  openGraph: {
    title: "LUMA | Sites Exclusivos para Casamentos",
    description: "Não alugue um template. Contrate um Estúdio Digital para o seu Casamento.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`
        antialiased bg-[#F7F5F0] text-[#3E4A3F]
        ${inter.variable} ${playfair.variable} ${cormorant.variable} 
        ${lato.variable} ${montserrat.variable} ${pinyon.variable} 
        ${cinzel.variable} ${amatic.variable} ${quicksand.variable} 
        ${bodoni.variable} ${raleway.variable} ${greatVibes.variable} 
        ${spaceMono.variable} ${roboto.variable}
      `}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

