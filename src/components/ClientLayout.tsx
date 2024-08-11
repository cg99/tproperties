"use client";

import { SessionProvider } from "next-auth/react";
import { GoogleAnalytics } from '@next/third-parties/google';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className={inter.className}>
        <Header />
        {children}
        <Footer />
        <GoogleAnalytics gaId="G-XYZ" />
      </div>
    </SessionProvider>
  );
}
