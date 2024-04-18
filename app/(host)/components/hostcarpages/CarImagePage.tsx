"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import ImageUploadFileInput from "./ImageUploadFileInput";
import { AddHostCarData } from "@/types/api_index";
import { Separator } from "@/components/ui/separator";
import NextPreviousSubmitButton from "../NextPreviousSubmitButton";
import { toast } from "react-hot-toast";

interface NextPreviousSubmitButtonProps {
  page: number;
  setPage: (currPage: any) => void;
  carData: AddHostCarData | undefined;
  setCarData: (carData: AddHostCarData) => void;
}

const CarImagePage: React.FC<NextPreviousSubmitButtonProps> = ({
  page,
  setPage,
  carData,
  setCarData,
}) => {
  const exterior1 = React.useRef<HTMLInputElement>(null);
  const exterior2 = React.useRef<HTMLInputElement>(null);
  const exterior3 = React.useRef<HTMLInputElement>(null);
  const interior1 = React.useRef<HTMLInputElement>(null);
  const interior2 = React.useRef<HTMLInputElement>(null);

  //   const [carData, setCarData] = useState<AddHostCarData | undefined>();

  useEffect(() => {
    console.log(carData);
  });

  const onSubmit = async () => {
    if (
      carData?.carMainPic !== undefined &&
      carData.carImageOne !== undefined &&
      carData.carImageTwo !== undefined &&
      carData.carImageThree !== undefined &&
      carData.carImageFour !== undefined
    ) {
      console.log("car images are not null");
      setPage((currPage: any) => currPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      toast.error("Please ensure all images are selected.", {
        duration: 2000,
      });
      console.log("car images some is null");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* <form onSubmit={onSubmit}> */}
      <div className="w-full rounded-2xl bg-slate-50 px-6 py-6">
        <div className="mb-5 ml-1">
          <h1 className="text-lg font-extrabold leading-none text-brandprimary">
            Upload photo
          </h1>
          <h2 className="text-md mt-1 text-slate-400">
            Get the best shots of your car that will make heads turn.
          </h2>
        </div>
        <div>
          <div className="py-2 md:py-6">
            <div>
              <div className="mb-2 ml-1">
                <h1
                  className="font-bold leading-none max-md:text-sm"
                  //   onClick={() => {
                  //     console.log(carData?.carMainPic);
                  //     console.log(carData?.carImageOne);
                  //     console.log(carData?.carImageTwo);
                  //   }}
                >
                  Exterior
                </h1>
                <h2 className="text-xs text-slate-400">
                  You need to upload 3 exterior photos.
                </h2>
              </div>
              <div className="mt-4 flex w-full gap-5">
                <ImageUploadFileInput
                  placeholder={"Exterior 1"}
                  onClick={() => {
                    exterior1.current?.click();
                  }}
                  ref={exterior1}
                  carData={carData}
                  setCarData={setCarData}
                  onClickForClose={() => {
                    setCarData({ ...carData, carMainPic: undefined });
                  }}
                  identifier={"ext1"}
                />
                <ImageUploadFileInput
                  placeholder={"Exterior 2"}
                  onClick={() => {
                    exterior2.current?.click();
                  }}
                  ref={exterior2}
                  carData={carData}
                  setCarData={setCarData}
                  onClickForClose={() => {
                    setCarData({ ...carData, carImageOne: undefined });
                  }}
                  identifier={"ext2"}
                />
                <ImageUploadFileInput
                  placeholder={"Exterior 3"}
                  onClick={() => {
                    exterior3.current?.click();
                  }}
                  ref={exterior3}
                  carData={carData}
                  setCarData={setCarData}
                  onClickForClose={() => {
                    setCarData({ ...carData, carImageTwo: undefined });
                  }}
                  identifier={"ext3"}
                />
              </div>
            </div>

            <Separator className="mb-[30px] mt-[30px] bg-gray-300 md:mb-[50px] md:mt-[55px]" />
            <div>
              <div className="mb-2 ml-1">
                <h1
                  className="font-bold leading-none max-md:text-sm"
                  //   onClick={() => {
                  //     console.log(carData?.carImageThree);
                  //     console.log(carData?.carImageFour);
                  //   }}
                >
                  Interior
                </h1>
                <h2 className="text-xs text-slate-400">
                  You need to upload 2 interior photos.
                </h2>
              </div>
              <div className="mt-4 flex w-full gap-5 ">
                <ImageUploadFileInput
                  placeholder={"Interior 1"}
                  onClick={() => {
                    interior1.current?.click();
                  }}
                  ref={interior1}
                  carData={carData}
                  setCarData={setCarData}
                  onClickForClose={() => {
                    setCarData({ ...carData, carImageThree: undefined });
                  }}
                  identifier={"int1"}
                />
                <ImageUploadFileInput
                  placeholder={"Interior 2"}
                  onClick={() => {
                    interior2.current?.click();
                  }}
                  ref={interior2}
                  carData={carData}
                  setCarData={setCarData}
                  onClickForClose={() => {
                    setCarData({ ...carData, carImageFour: undefined });
                  }}
                  identifier={"int2"}
                />
              </div>
            </div>
          </div>

          {/* <Button
          onClick={() => {
            // hiddenFileInput.current?.click();
          }}
        >
          Upload{" "}
          <input
            type="file"
            // ref={hiddenFileInput}
            style={{ display: "none" }}
          />
        </Button> */}
        </div>
      </div>
      <NextPreviousSubmitButton
        page={page}
        setPage={setPage}
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
        onNextAction={() => {
          return true;
        }}
        onNextCustom={() => onSubmit()}
      />
      {/* </form> */}
    </div>
  );
};

export default CarImagePage;
