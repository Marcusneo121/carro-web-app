import type { Metadata } from "next";
import { Nunito as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "@/app/globals.css";
import { CookiesProvider } from "next-client-cookies/server";
import { Toaster } from "react-hot-toast";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "PPCar",
  description: "PPCar Login",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={cn("bg-brandprimary font-sans antialiased", fontSans.variable)}
    >
      <CookiesProvider>{children}</CookiesProvider>
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            border: "2px solid #7878F1",
            padding: "16px",
          },
        }}
      />
    </div>
  );
}
