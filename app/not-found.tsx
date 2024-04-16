"use client";

import Footer from "@/components/Footer";
import PaymentNavBar from "./(payment)/components/PaymentNavBar";
import { BiError } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import animationNotFound from "../public/lottie/404-not-found.json";

export default function NotFound() {
  const router = useRouter();

  return (
    <div>
      <PaymentNavBar />
      <div className="flex min-h-[700px] flex-col items-center justify-center gap-8 px-8 py-10 lg:px-20">
        {/* <BiError className="animate-pulse text-[120px] text-red-500" /> */}
        <Lottie
          animationData={animationNotFound}
          loop={true}
          className="w-[300px] md:w-[500px]"
        />
        <h2 className="max-w-[350px] text-center text-2xl font-bold">
          Oops! Page not found.
        </h2>
        {/* <p className="text-lg font-bold">Could not find this page.</p> */}
        <Button
          className="text-md w-full max-w-[300px] bg-brandprimary font-bold"
          onClick={() => {
            router.push("/car");
          }}
        >
          Back to home
        </Button>
      </div>
      <Footer />
    </div>
  );
}
