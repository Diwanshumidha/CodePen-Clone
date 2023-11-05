import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const lato = Lato({
  subsets: ["latin"],
  weight: ["700", "400"],
  variable: "--lato-font",
});

export const metadata: Metadata = {
  title: "Create new codepen",
  description: "A simple codepen clone with amazing features",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={lato.className}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
