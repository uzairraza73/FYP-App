import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Oncura AI",
  description: "Advanced AI Skin Cancer Detection",
};

import { ClientLayout } from "@/components/ClientLayout";
import { PageWrapper } from "@/components/PageWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full">
        <div className="app-container">
          <ClientLayout>
            <PageWrapper>
              {children}
            </PageWrapper>
          </ClientLayout>
        </div>
      </body>
    </html>
  );
}
