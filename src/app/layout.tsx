import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Giorgio Dettmar · Full-Stack Developer",
  description:
    "Full-Stack Developer in Ausbildung aus Hannover. Next.js, TypeScript, Azure DevOps und Docker. Eigene Produkte und Kunden-Projekte.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${geist.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
