"use client";

import { getHostHostingByID } from "@/services/booking";
import { IMyBookingDetail } from "@/types/api_index";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import HostingDetailListing from "../../components/HostingDetail";

export default function HostingDetails({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [hostingDetail, setHostingDetail] = useState<IMyBookingDetail>();

  const fetchBookingDetails = async () => {
    setIsLoading(true);
    try {
      const bookingDetail = await getHostHostingByID(params.id);
      if (bookingDetail.status === "ok") {
        setHostingDetail(bookingDetail);
      } else {
        throw new Error("Something went wrong.");
      }
    } catch (error: any) {
      setError(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBookingDetails();
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
    <div className="min-h-[800px] px-8 py-5 lg:px-20">
      {hostingDetail && (
        <div className="flex flex-col items-center">
          <HostingDetailListing hosting={hostingDetail} />
        </div>
      )}
    </div>
  );
}
