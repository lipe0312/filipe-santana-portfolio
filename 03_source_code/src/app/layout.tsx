import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Inter } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/TopBar";
import GlobalCursor from "@/components/GlobalCursor";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Filipe Santana | Portfolio",
  description: "Portfolio showcasing Filipe Santana's projects and work",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${inter.variable}`}>
      <body className="font-sans">
        {/* Film grain — fixed viewport overlay, cinematic texture across all sections */}
        <div aria-hidden="true" className="grain-overlay" />
        <GlobalCursor />
        <LanguageProvider>
          <TopBar />
          <div className="relative flex flex-col min-h-screen overflow-x-hidden">
            {children}
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
