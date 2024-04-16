"use client";

import { getGuestBookings } from "@/services/booking";
import { MyBookings } from "@/types/api_index";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import MyBookingList from "../components/MyBookingList";
import Lottie from "lottie-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import animationNothingHere from "../../../public/lottie/nothinghere.json";

export default function MyBooking() {
  const router = useRouter();
  const [bookingsData, setBookingsData] = useState<MyBookings>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState();

  const fetchAllBookings = async () => {
    setIsLoading(true);
    try {
      const getAllGuestBooking = await getGuestBookings();

      if (getAllGuestBooking.status === "ok") {
        setBookingsData(getAllGuestBooking);
      } else {
        throw new Error("Something went wrong.");
      }
    } catch (error: any) {
      setError(error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllBookings();
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
    <div className="min-h-[800px] px-8 py-10 lg:px-20">
      <h1 className="mb-5 text-2xl font-bold md:mb-10 md:text-3xl">
        My bookings
      </h1>

      {bookingsData &&
        (bookingsData.data.length === 0 ? (
          <div className="mt-[90px] flex flex-col items-center justify-center gap-8 px-8 py-10 md:mt-[90px] lg:px-20">
            <Lottie
              animationData={animationNothingHere}
              loop={true}
              className="w-[200px] md:w-[200px]"
            />
            <div>
              <h2 className="max-w-[350px] text-center text-2xl font-bold">
                No guest yet...
              </h2>
              <h2 className="font-seibold mt-2 max-w-[350px] text-center text-lg">
                But your guest is on the way !
              </h2>
            </div>

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
        ) : (
          <div>
            <MyBookingList bookings={bookingsData.data} />
          </div>
        ))}
    </div>
  );
}
