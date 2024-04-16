"use client";

import { getHostBookings } from "@/services/booking";
import { MyBookings } from "@/types/api_index";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import MyHostingList from "../components/MyHostingList";
import Lottie from "lottie-react";
import animationMyRequest from "../../../public/lottie/myrequest.json";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function MyHost() {
  const router = useRouter();
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
    <div className="min-h-[800px] items-center px-8 py-10 lg:px-20">
      <h1 className="mb-5 text-2xl font-bold md:mb-10 md:text-3xl">
        My hostings
      </h1>

      {hostingData &&
        (hostingData.data.length === 0 ? (
          <div className="mt-[90px] flex flex-col items-center justify-center gap-8 px-8 py-10 md:mt-[150px] lg:px-20">
            <Lottie
              animationData={animationMyRequest}
              loop={true}
              className="w-[200px] md:w-[200px]"
            />
            <div>
              <h2 className="max-w-[350px] text-center text-2xl font-bold">
                No booking yet...
              </h2>
              <h2 className="font-seibold mt-2 max-w-[350px] text-center text-lg">
                Find a car, Book & Drive it !
              </h2>
            </div>

            {/* <p className="text-lg font-bold">Could not find this page.</p> */}
            <Button
              className="text-md w-full max-w-[300px] bg-brandprimary font-bold"
              onClick={() => {
                router.push("/car");
              }}
            >
              Book car now
            </Button>
          </div>
        ) : (
          <div>
            <MyHostingList hostings={hostingData.data} />
          </div>
        ))}
    </div>
  );
}
