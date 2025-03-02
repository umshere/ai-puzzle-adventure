import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Puzzle Adventure",
  description: "An AI-powered creative puzzle game leveraging Next.js, OpenRouter API, and free-tier services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
          {children}
        </main>
      </body>
    </html>
  );
}
