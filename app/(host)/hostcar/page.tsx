"use client";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import React, { useState } from "react";
import CarDetailsPage from "../components/hostcarpages/CarDetailsPage";
import { IoCarOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import PriceLocationPage from "../components/hostcarpages/PriceLocationAvailabilityPage";
import CarImagePage from "../components/hostcarpages/CarImagePage";
import NextPreviousSubmitButton from "../components/NextPreviousSubmitButton";
import HostCarConfirmationPage from "../components/hostcarpages/HostCarConfirmationPage";

const HostPage = () => {
  const [page, setPage] = useState<number>(0);
  const PageDisplay = () => {
    if (page === 0) {
      return <CarDetailsPage />;
    } else if (page === 1) {
      return <PriceLocationPage />;
    } else if (page === 2) {
      return <CarImagePage />;
    } else {
      return <HostCarConfirmationPage />;
    }
  };

  return (
    <div className="flex min-h-[800px] items-center justify-center px-8 py-10 lg:px-20">
      <div className="flex w-[550px] flex-col gap-3 max-sm:w-[350px]">
        <div className="ml-1 flex items-center justify-start gap-2">
          <IoCarOutline className="text-3xl text-brandprimary" />
          <h2 className="text-2xl font-extrabold text-brandprimary">
            Share & Host your car
          </h2>
        </div>
        <div>{PageDisplay()}</div>
        {/* <CarDetailsPage /> */}
        {/* <PriceLocationPage /> */}
        <NextPreviousSubmitButton page={page} setPage={setPage} />
      </div>
    </div>
  );
};

export default HostPage;
