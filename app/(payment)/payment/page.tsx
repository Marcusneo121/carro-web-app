"use client";

import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { makePaymentIntent } from "@/services/payment";
import { IMakePaymentIntent, IMyBookingDetail } from "@/types/api_index";
import CheckoutForm from "../components/CheckoutForm";
import { useSearchParams } from "next/navigation";
import { getGuestBookingByID } from "@/services/booking";

export default function Payment({
  params,
}: {
  params: {
    totalamount: string;
    bargainid: number;
    rentaltransactionid: number;
  };
}) {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState();
  const [stripePromise, setStripePromise] = useState<Stripe | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>();
  const [paymentIntentData, setPaymentIntentData] =
    useState<IMakePaymentIntent | null>();
  const [bookingDetail, setBookingDetail] = useState<IMyBookingDetail>();

  const paramsData = new URLSearchParams(searchParams);
  //   const totalamount = paramsData.get("totalamount");
  const bargainid = paramsData.get("bargainid");
  const rentaltransactionid = paramsData.get("rentaltransactionid");

  const createPaymentIntent = async () => {
    setIsLoading(true);
    try {
      //   console.log(totalamount + "  " + bargainid + "  " + rentaltransactionid);

      if (
        // totalamount !== null &&
        bargainid !== null &&
        rentaltransactionid !== null
      ) {
        const bookingDetail = await getGuestBookingByID(bargainid);
        if (bookingDetail.status === "ok") {
          setBookingDetail(bookingDetail);

          const totalAmountWithDay = (
            parseInt(bookingDetail.data.last_bargain_amount) *
            bookingDetail.data.days_of_rental
          ).toString();

          const createPaymentIntent: IMakePaymentIntent =
            await makePaymentIntent({
              total_amount: totalAmountWithDay,
              bargain_id: parseInt(bargainid),
              rental_transaction_id: parseInt(rentaltransactionid),
            });

          if (createPaymentIntent.status === "ok") {
            console.log(createPaymentIntent.data.publishableKey);

            setStripePromise(
              await loadStripe(
                createPaymentIntent.data.publishableKey.toString(),
              ),
            );
            setClientSecret(createPaymentIntent.data.paymentIntent.toString());
            setPaymentIntentData(createPaymentIntent);
          } else {
            throw new Error("Something went wrong. Please try again.");
          }
        } else {
          throw new Error("Something went wrong.");
        }
      } else {
        throw new Error("Something went wrong. Please try again.");
      }
    } catch (error: any) {
      setError(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    createPaymentIntent();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-[700px] items-center justify-center px-8 py-10 lg:px-20">
        <AiOutlineLoading3Quarters className="animate-spin text-[60px] text-brandprimary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[700px] items-center justify-center px-8 py-10 lg:px-20">
        Something went wrong! Please try again.
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center">
      {clientSecret &&
        stripePromise &&
        paymentIntentData &&
        bargainid &&
        rentaltransactionid &&
        bookingDetail && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm
              paymentIntentData={paymentIntentData}
              bargainID={parseInt(bargainid)}
              rentalTransactionID={parseInt(rentaltransactionid)}
              bookingDetail={bookingDetail}
            />
          </Elements>
        )}
    </div>
  );
}
