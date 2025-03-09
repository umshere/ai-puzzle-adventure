import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import ThemeProvider from "@/components/ThemeProvider";

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
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
