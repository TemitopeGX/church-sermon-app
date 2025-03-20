"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#030014] to-[#1a1a1a]">
      <main className="p-6 lg:p-8">{children}</main>
    </div>
  );
}
