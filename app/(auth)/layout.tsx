import type { Metadata } from "next";
import { Nunito as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "@/app/globals.css";
import AuthPageHeader from "./login/components/AuthPageHeader";
const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Carro",
  description: "Carro Login",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={cn(
        "h-screen bg-brandprimary font-sans antialiased",
        fontSans.variable,
      )}
    >
      <AuthPageHeader />
      {children}
    </div>
  );
}
