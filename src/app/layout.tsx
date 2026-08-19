import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Motor Clínico Cardiovascular",
  description: "Protótipo clínico com dados exclusivamente fictícios"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
