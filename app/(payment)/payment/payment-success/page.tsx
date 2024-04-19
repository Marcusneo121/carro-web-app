"use client";

import React from "react";
import PaymentNavBar from "../../components/PaymentNavBar";
import { BiError } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { useRouter, useSearchParams } from "next/navigation";
import { AiOutlineFileDone } from "react-icons/ai";

const PaymentSuccess = ({
  params,
}: {
  params: {
    redirect_status: string;
    payment_intent: string;
    payment_intent_client: string;
  };
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramsData = new URLSearchParams(searchParams);
  const transactionID = paramsData.get("payment_intent");
  return (
    <div>
      <PaymentNavBar />
      <div className="flex min-h-[700px] flex-col items-center justify-center gap-8 px-8 py-10 lg:px-20">
        <AiOutlineFileDone className="animate-pulse text-[80px] text-green-500" />
        <div className="flex flex-col items-center justify-center">
          <h1 className="max-w-[280px] text-center text-xl font-bold">
            Payment Succesful!
          </h1>
          <h1 className="max-w-[350px] text-center text-lg font-medium">
            Wish you a safe journey & enjoy your ride.
          </h1>
        </div>
        <div>
          <h1 className="text-center text-sm font-bold">Reference ID : </h1>
          <h1 className="text-sm font-bold text-brandprimary">
            <span>{transactionID}</span>
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
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
