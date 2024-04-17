import { Button } from "@/components/ui/button";
import React, { useRef, useState } from "react";
import ImageUploadFileInput from "./ImageUploadFileInput";
import { AddHostCarData } from "@/types/api_index";
import { Separator } from "@/components/ui/separator";

const CarImagePage = () => {
  const exterior1 = React.useRef<HTMLInputElement>(null);
  const exterior2 = React.useRef<HTMLInputElement>(null);
  const exterior3 = React.useRef<HTMLInputElement>(null);
  const interior1 = React.useRef<HTMLInputElement>(null);
  const interior2 = React.useRef<HTMLInputElement>(null);

  const [carData, setCarData] = useState<AddHostCarData | undefined>();

  return (
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
              <h1 className="font-bold leading-none max-md:text-sm">
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
              />
              <ImageUploadFileInput
                placeholder={"Exterior 2"}
                onClick={() => {
                  exterior2.current?.click();
                }}
                ref={exterior2}
                carData={carData}
                setCarData={setCarData}
              />
              <ImageUploadFileInput
                placeholder={"Exterior 3"}
                onClick={() => {
                  exterior3.current?.click();
                }}
                ref={exterior3}
                carData={carData}
                setCarData={setCarData}
              />
            </div>
          </div>

          <Separator className="mb-[30px] mt-[30px] bg-gray-300 md:mb-[50px] md:mt-[55px]" />
          <div>
            <div className="mb-2 ml-1">
              <h1 className="font-bold leading-none max-md:text-sm">
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
              />
              <ImageUploadFileInput
                placeholder={"Interior 2"}
                onClick={() => {
                  interior2.current?.click();
                }}
                ref={interior2}
                carData={carData}
                setCarData={setCarData}
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
  );
};

export default CarImagePage;
