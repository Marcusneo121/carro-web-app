"use client";

import { AddHostCarData } from "@/types/api_index";
import React, { useEffect, useState } from "react";
import NextPreviousSubmitButton from "../NextPreviousSubmitButton";
import { Separator } from "@/components/ui/separator";
import CarouselExteriorInterior from "./CarouselExteriorInterior";
import { dateFormatterGMT } from "@/utils/utils";

interface NextPreviousSubmitButtonProps {
  page: number;
  setPage: (currPage: any) => void;
  carData: AddHostCarData | undefined;
  setCarData: (carData: AddHostCarData) => void;
}

const HostCarConfirmationPage: React.FC<NextPreviousSubmitButtonProps> = ({
  page,
  setPage,
  carData,
  setCarData,
}) => {
  const [backDialog, setBackDialog] = useState<boolean>(false);
  const fromDate = dateFormatterGMT(carData?.availableFromDate);
  const toDate = dateFormatterGMT(carData?.availableToDate);

  useEffect(() => {
    console.log(carData);
  });

  const onSubmitBack = async () => {
    setBackDialog(true);
    // setPage((currPage: any) => currPage + 1);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full rounded-2xl bg-slate-50 px-6 py-6">
        <div className="mb-5 ml-1">
          <h2 className="mt-1 text-sm text-slate-400">
            Ensure all details about your car ar correct. But do not worry you
            can edit later.
          </h2>
          <div className="flex flex-col gap-3 py-2 md:py-6">
            <div className="">
              <h1 className="text-md font-bold leading-none">Brand & Model</h1>
              <h2 className="font-medium text-slate-500">{carData?.carName}</h2>
            </div>
            <div className="flex gap-4">
              <div className="">
                <h1 className="text-md font-bold leading-none">Color</h1>
                <h2 className="font-medium text-slate-500">{carData?.color}</h2>
              </div>
              <div className="">
                <h1 className="text-md font-bold leading-none">Year Made</h1>
                <h2 className="font-medium text-slate-500">
                  {carData?.yearMade}
                </h2>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="">
                <h1 className="text-md font-bold leading-none">Seat</h1>
                <h2 className="font-medium text-slate-500">
                  {carData?.seat} seat(s)
                </h2>
              </div>
              <div className="">
                <h1 className="text-md font-bold leading-none">
                  {carData?.isElectric === true
                    ? "Power Output(kW)"
                    : "Engine Capacity (cc)"}
                </h1>
                <h2 className="font-medium text-slate-500">
                  {carData?.yearMade}
                </h2>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="">
                <h1 className="text-md font-bold leading-none">Plate Number</h1>
                <h2 className="font-medium text-slate-500">
                  {carData?.carPlate}
                </h2>
              </div>
              <div className="">
                <h1 className="text-md font-bold leading-none">Price</h1>
                <h2 className="font-medium text-slate-500">
                  RM {carData?.price} /day
                </h2>
              </div>
            </div>
            <div className="">
              <h1 className="text-md font-bold leading-none">Location</h1>
              <h2 className="font-medium text-slate-500">
                {carData?.location}
              </h2>
            </div>
            <Separator className="mb-[20px] mt-[30px] bg-gray-300 md:mb-[20px] md:mt-[30px]" />
            <div className="">
              <h1 className="text-md font-bold leading-none">Available From</h1>
              <h2 className="font-medium text-slate-500">{fromDate}</h2>
            </div>
            <div className="mt-4">
              <h1 className="text-md font-bold leading-none">Until</h1>
              <h2 className="font-medium text-slate-500">{toDate}</h2>
            </div>
            <Separator className="mb-[30px] mt-[20px] bg-gray-300 md:mb-[20px] md:mt-[30px]" />
            <div className="">
              <h1 className="text-md font-bold leading-none">
                Exterior{" "}
                <span className="text-[10px] text-slate-500">
                  (Scroll to view)
                </span>
              </h1>
              <div className="pt-2">
                <CarouselExteriorInterior
                  carImages={[
                    carData?.carMainPic!,
                    carData?.carImageOne!,
                    carData?.carImageTwo!,
                  ]}
                />
              </div>
            </div>
            <div className="mt-10">
              <h1 className="text-md font-bold leading-none">
                Interior{" "}
                <span className="text-[10px] text-slate-500">
                  (Scroll to view)
                </span>
              </h1>
              <div className="pt-2">
                <CarouselExteriorInterior
                  carImages={[carData?.carImageThree!, carData?.carImageFour!]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <NextPreviousSubmitButton
        page={page}
        setPage={setPage}
        onSubmitAction={() => {
          console.log("It is submitting Page 1");
        }}
        onPreviousAction={() => {
          setCarData({
            ...carData,
            carMainPic: undefined,
            carImageOne: undefined,
            carImageTwo: undefined,
            carImageThree: undefined,
            carImageFour: undefined,
          });
          return true;
        }}
        // onPreviousCustom={() => onSubmitBack()}
      />
      {/* <HostCarConfirmationBackDialog
        open={backDialog}
        setOpen={setBackDialog}
      /> */}
    </div>
  );
};

export default HostCarConfirmationPage;
