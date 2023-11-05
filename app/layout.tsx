import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CodePenLogo from "@/components/icons/CodePenSvg";

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
        <div className=" max-sm:hidden">{children}</div>
        <div className=" sm:hidden w-full h-screen px-4 text-center flex flex-col justify-center items-center">
          <CodePenLogo width={70} height={70} />
          <h1 className=" text-3xl">Codepen is Not Available At Mobile </h1>
        </div>
        <Footer />
      </body>
    </html>
  );
}
