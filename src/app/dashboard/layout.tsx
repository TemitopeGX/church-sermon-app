import { metadata, viewport } from "./layout-metadata";
import ClientLayout from "./client-layout";

export { metadata, viewport };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ClientLayout>{children}</ClientLayout>;
}
