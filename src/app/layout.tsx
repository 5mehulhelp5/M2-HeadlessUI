import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import { Suspense } from 'react';
import "./globals.css";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "M2 Headless Commerce",
  description: "Fast and lightning experience",
  icons:{
    icon:["/icon/favicon.ico"]
  }
};
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header/>
        <Navbar />
        <Suspense>
          <main>{children}</main>
        </Suspense>
        <Footer />
      </body>
    </html>
  );
}
