"use client";

import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { makePaymentIntent } from "@/services/payment";
import { IMakePaymentIntent, IMyBookingDetail } from "@/types/api_index";
import CheckoutForm from "../components/CheckoutForm";
import { useRouter, useSearchParams } from "next/navigation";
import { getGuestBookingByID } from "@/services/booking";
import Image from "next/image";
import Footer from "@/components/Footer";
import PaymentNavBar from "../components/PaymentNavBar";
import { BiError } from "react-icons/bi";
import { Button } from "@/components/ui/button";

export default function Payment({
  params,
}: {
  params: {
    totalamount: string;
    bargainid: number;
    rentaltransactionid: number;
  };
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState();
  const [paymentSessionNotAllowed, setPaymentSessionNotAllowed] =
    useState<boolean>(false);
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

          if (
            bookingDetail.data.ori_bargain_status_id === 6 ||
            bookingDetail.data.ori_bargain_status_id === 5 ||
            bookingDetail.data.ori_bargain_status_id === 3 ||
            bookingDetail.data.ori_bargain_status_id === 1 ||
            bookingDetail.data.ori_bargain_status_id === 0
          ) {
            setPaymentSessionNotAllowed(true);
          } else {
            setPaymentSessionNotAllowed(false);
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
              setClientSecret(
                createPaymentIntent.data.paymentIntent.toString(),
              );
              setPaymentIntentData(createPaymentIntent);
            } else {
              throw new Error("Something went wrong. Please try again.");
            }
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
      <div className="flex min-h-[700px] flex-col items-center justify-center gap-10 px-8 py-10 lg:px-20">
        <div className="mb-5 mt-10 flex items-center justify-center gap-2">
          <div className="relative h-16 w-16 md:h-20 md:w-20">
            <Image
              alt="ppcar logo"
              src="/logos/logo-colored.svg"
              fill={true}
              objectFit="cover"
            />
          </div>
          <h1 className="visible pt-2 text-[45px] font-bold leading-none text-brandprimary">
            PPCar
          </h1>
        </div>
        <h2 className="animate-pulse text-lg font-bold">
          Payment Initializing ...
        </h2>
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

  if (paymentSessionNotAllowed) {
    return (
      <div>
        <PaymentNavBar />
        <div className="flex min-h-[700px] flex-col items-center justify-center gap-8 px-8 py-10 lg:px-20">
          <BiError className="animate-pulse text-[80px] text-red-500" />
          <h1 className="max-w-[280px] text-center text-lg font-bold">
            Payment Session not available for this booking. Please go back to
            your booking and pay.
          </h1>
          <Button
            className="w-full max-w-[280px] bg-brandprimary"
            onClick={() => {
              router.push("/mybooking");
            }}
          >
            Go to My Booking
          </Button>
        </div>
        <Footer />
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
