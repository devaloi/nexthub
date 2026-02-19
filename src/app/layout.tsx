import type { Metadata } from "next";
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
