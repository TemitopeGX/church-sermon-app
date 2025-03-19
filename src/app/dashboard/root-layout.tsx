import { metadata, viewport } from "./layout-metadata";
import DashboardLayout from "./layout";

export { metadata, viewport };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
