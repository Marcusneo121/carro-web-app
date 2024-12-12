import type { Metadata } from "next";
import { Nunito as FontSans } from "next/font/google";
import "./globals.css";

import { CookiesProvider } from "next-client-cookies/server";
import { cn } from "@/lib/utils";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "PPCar",
  description: "Malaysia's Biggest Car Sharing Marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        {/* <NavBar /> */}
        <CookiesProvider>{children}</CookiesProvider>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
