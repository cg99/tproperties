import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: "Saas App",
  description: "Saas App Boilerplate",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="text-gray-800">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
