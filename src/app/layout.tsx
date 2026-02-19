import type { Metadata } from "next";
import { Header } from "@/components/layout";
import "./globals.css";

export const metadata: Metadata = {
  title: "NextHub",
  description: "A fullstack project and issue tracking hub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 antialiased">
        <Header />
        <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
