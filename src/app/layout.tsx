import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";

export const metadata = {
  title: "Church Sermon App",
  description: "Listen to sermons from our church",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
