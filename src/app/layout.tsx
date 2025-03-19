import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Covenant Chapel International",
  description: "Experience divine worship reimagined for the digital age",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className={`${inter.className} h-full`}>
        <div className="relative min-h-screen">
          {/* Gradient overlay for hero sections */}
          <div className="absolute top-0 left-0 right-0 h-[100px] bg-gradient-to-b from-black via-black/50 to-transparent z-10 pointer-events-none" />

          <Header />
          <main className="pt-16">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
