import type { Metadata } from "next";
import { Anton, Archivo, Inter } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import MobileBar from "@/components/mobile-bar";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-display", display: "swap" });
const archivo = Archivo({ subsets: ["latin"], variable: "--font-head", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  title: "Boggs Pro Cut — Fort Wayne Landscaping, Hardscaping & Snow Removal",
  description:
    "One local crew, every season. Family-owned Fort Wayne landscaping, hardscaping and snow removal — designed, built, maintained. Free estimates across Allen County.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${anton.variable} ${archivo.variable} ${inter.variable}`}>
      <body className="bg-boggs-cream text-boggs-black font-body antialiased">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <MobileBar />
      </body>
    </html>
  );
}
