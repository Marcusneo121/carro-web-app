"use client";

import { getHostBookings } from "@/services/booking";
import { MyBookings } from "@/types/api_index";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import MyHostingList from "../components/MyHostingList";

export default function MyHost() {
  const [hostingData, setHostingData] = useState<MyBookings>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState();

  const fetchAllBookings = async () => {
    setIsLoading(true);
    try {
      const getAllGuestBooking = await getHostBookings();

      if (getAllGuestBooking.status === "ok") {
        setHostingData(getAllGuestBooking);
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
        My hostings
      </h1>

      {hostingData &&
        (hostingData.data.length === 0 ? (
          <div>No guest yet!</div>
        ) : (
          <div>
            <MyHostingList hostings={hostingData.data} />
          </div>
        ))}
    </div>
  );
}
