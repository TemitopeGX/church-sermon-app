"use client";

import { AuthProvider } from "@/contexts/auth-context";
import InstallPrompt from "@/components/InstallPrompt";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";

export default function RootLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthProvider>{children}</AuthProvider>
      <InstallPrompt />
      <ServiceWorkerRegistration />
    </>
  );
}
