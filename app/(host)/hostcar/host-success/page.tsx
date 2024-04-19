"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { useRouter, useSearchParams } from "next/navigation";
import { AiOutlineFileDone } from "react-icons/ai";
import PaymentNavBar from "@/app/(payment)/components/PaymentNavBar";

const HostSuccess = () => {
  const router = useRouter();
  return (
    <div>
      {/* <PaymentNavBar /> */}
      <div className="flex min-h-[700px] flex-col items-center justify-center gap-8 px-8 py-10 lg:px-20">
        <AiOutlineFileDone className="animate-pulse text-[80px] text-green-500" />
        <div className="flex flex-col items-center justify-center">
          <h1 className="max-w-[280px] text-center text-xl font-bold">
            Car Added Succesfully!
          </h1>
          <h1 className="max-w-[350px] text-center text-lg font-medium">
            We will host your car and update you when someone is trying to rent.
          </h1>
        </div>

        <Button
          className="w-full max-w-[280px] bg-brandprimary"
          onClick={() => {
            router.push("/car");
          }}
        >
          Back to home
        </Button>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default HostSuccess;
