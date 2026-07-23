import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "微光",
  description: "An interactive HTML-in-Canvas lighting experiment.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/cat.webp" as="image" />
      </head>
      <body>{children}</body>
    </html>
  );
}
