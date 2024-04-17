"use client";

import { Checkbox } from "@/components/ui/checkbox";
import React from "react";
import { IoCarOutline } from "react-icons/io5";

const CarDetailsPage = () => {
  return (
    <div className="w-full rounded-2xl bg-slate-50">
      <div className="px-8 py-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="ml-1 font-bold">Car Brand & Name</h2>
            <input className="inputBasic" placeholder="e.g. Perodua Myvi" />
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="ml-1 font-bold">Color</h2>
            <input className="inputBasic" placeholder="e.g. Yellow" />
          </div>

          <div className="ml-1 flex items-center space-x-2">
            <Checkbox
              id="isElectric"
              className="h-5 w-5 data-[state=checked]:border-brandprimary data-[state=checked]:bg-brandprimary "
            />
            <label
              htmlFor="terms2"
              className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Is Electric Car ?
            </label>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="ml-1 font-bold">Engine Capacity (cc)</h2>
            <input className="inputBasic" placeholder="e.g. 1.5" />
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="ml-1 font-bold">Year Made</h2>
            <input className="inputBasic" placeholder="e.g. 2024" />
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="ml-1 font-bold">Car Plate</h2>
            <input className="inputBasic" placeholder="e.g. ABC 1234" />
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="ml-1 font-bold">Seat</h2>
            <input className="inputBasic" placeholder="e.g. 5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPage;
