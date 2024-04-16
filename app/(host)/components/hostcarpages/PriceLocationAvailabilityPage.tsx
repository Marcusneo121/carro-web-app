import { Separator } from "@/components/ui/separator";
import React from "react";

const PriceLocationPage = () => {
  return (
    <div className="w-full rounded-2xl bg-slate-100">
      <div className="flex flex-col items-center gap-4 px-8 py-6">
        <div className="w-full">
          <div className="flex flex-col gap-2">
            <div>
              <h2 className="ml-1 font-bold">Price (per day)</h2>
              <h3 className="text-[11px] font-semibold italic text-slate-400">
                * Price should include tax. Tax will be deduct from the total
                amount.
              </h3>
            </div>
            <div className="ml-1 flex items-center gap-2">
              <h2 className="font-bold">RM</h2>
              <input className="inputBasic" placeholder="e.g. 128" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <h2 className="ml-1 font-bold">Location</h2>
              <h3 className="text-[11px] font-semibold italic text-slate-400">
                * Suggest locations that are popular like mall or building
              </h3>
              <h3 className="text-[11px] font-semibold italic text-slate-400">
                * Don't worry, you can decide pick up location with guest later
              </h3>
            </div>
            <input
              className="inputBasic"
              placeholder="e.g. Pavilion Bukit Bintang"
            />
          </div>
        </div>
        <Separator className="mb-[10px] mt-[30px] bg-gray-300" />
        <div className="flex w-full flex-col justify-start">
          <h2 className="mb-6 ml-1 text-lg font-bold">Availabiity</h2>
          <div className="flex flex-col gap-4">
            <div className="flex w-full flex-col gap-2">
              <h2 className="ml-1 text-sm font-bold">From</h2>
              <input
                type="datetime-local"
                id="bookingfromdate"
                name="bookingfromdate"
                className="signupInput text-md font-semibold max-sm:h-10 max-sm:text-base"
              />
            </div>
            <div className="flex w-full flex-col gap-2">
              <h2 className="ml-1 text-sm font-bold">Until</h2>
              <input
                type="datetime-local"
                id="bookingfromdate"
                name="bookingfromdate"
                className="signupInput text-md font-semibold max-sm:h-10 max-sm:text-base"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceLocationPage;
