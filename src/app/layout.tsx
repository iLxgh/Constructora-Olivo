import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const neue = localFont({
  src: "../fonts/NeueMontreal-Medium.otf",
  variable: "--font-neue",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OLIVO Residence",
  description: "Guiding your path to a new home in Indonesia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${neue.variable} h-full antialiased`}>
      <body className="min-h-full">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
