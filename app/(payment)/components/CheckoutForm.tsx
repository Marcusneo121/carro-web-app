"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { confirmPayment } from "@/services/payment";
import { IMakePaymentIntent, IMyBookingDetail } from "@/types/api_index";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type CheckoutFormProps = {
  bargainID: number;
  rentalTransactionID: number;
  paymentIntentData: IMakePaymentIntent;
  bookingDetail: IMyBookingDetail;
};

export default function CheckoutForm({
  bargainID,
  rentalTransactionID,
  paymentIntentData,
}: CheckoutFormProps) {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setMessage(null);

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      setMessage(
        "Something went wrong setting up payment. Please refresh this page and try again.",
      );
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      // confirmParams: {
      //   // Make sure to change this to your payment completion page
      //   return_url: `${window.location.origin}/payment/payment-success`,
      // },
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message || "Card/Validation Error, Please try again.");
      } else {
        setMessage("An unexpected error occured.");
      }
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      const confirmPaymentProcess = await confirmPayment({
        payment_transaction_id: paymentIntentData.data.payment_transaction_id,
        bargain_id: bargainID,
        rental_transaction_id: rentalTransactionID,
        stripe_customer_id: paymentIntentData.data.customer.toString(),
      });

      if (confirmPaymentProcess.status === "ok") {
        router.push(
          `/payment/payment-success?redirect_status=${paymentIntent.status}&payment_intent=${paymentIntent.id}&payment_intent_client=${paymentIntent.client_secret}`,
        );
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    }

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <div className="mb-5 mt-10 flex items-center justify-center gap-2">
        <div className="relative h-16 w-16 md:h-20 md:w-20">
          <Image
            alt="carro logo"
            src="/logos/logo-colored.png"
            fill={true}
            objectFit="cover"
          />
        </div>
        <h1 className="visible pt-2 text-[45px] font-bold leading-none text-brandprimary">
          CARRO
        </h1>
      </div>
      <PaymentElement id="payment-element" />
      <Button
        disabled={isProcessing || !stripe || !elements}
        id="submit"
        className="mt-5 w-full rounded-lg bg-brandprimary"
      >
        {isProcessing ? "Processing ... " : "Pay now"}
      </Button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
