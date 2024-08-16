"use client";

import { SessionProvider } from "next-auth/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Determine if the current route is part of the dashboard
  const isDashboardRoute = pathname?.startsWith("/dashboard");

  return (
    <SessionProvider>
      <div className={inter.className}>
        {!isDashboardRoute && <Header />}
        {children}
        <Footer />
        <GoogleAnalytics gaId="G-XYZ" />
      </div>
    </SessionProvider>
  );
}
