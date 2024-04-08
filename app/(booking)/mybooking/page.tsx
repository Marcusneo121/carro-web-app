"use client";

import { getGuestBookings } from "@/services/booking";
import { MyBookings } from "@/types/api_index";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import MyBookingList from "../components/MyBookingList";

export default function MyBooking() {
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
          <div>No booking yet!</div>
        ) : (
          <div>
            <MyBookingList bookings={bookingsData.data} />
          </div>
        ))}
    </div>
  );
}
