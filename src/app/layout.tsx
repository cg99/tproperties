import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: "TProperties",
  description: "Find properties near transport",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="text-gray-800 bg-white">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
