import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RootLayoutClient from "@/components/RootLayoutClient";

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
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
