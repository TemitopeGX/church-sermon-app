"use client";

import { Inter } from "next/font/google";
import ClientLayout from "@/components/ClientLayout";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientLayout>
      <div className={inter.className}>{children}</div>
    </ClientLayout>
  );
}
