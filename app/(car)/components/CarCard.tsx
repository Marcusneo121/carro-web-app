"use client";

import React from "react";
import { ICar } from "@/types/api_index";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface CarProps {
  car: ICar;
}

const CarCard = ({ car }: CarProps) => {
  const router = useRouter();
  return (
    <div className="group flex flex-col items-center justify-center rounded-3xl bg-primaryblue-100 px-10 py-4 hover:bg-white hover:shadow-md">
      {/* <div className="relative h-[160px] w-[350px] px-2">
        <Image
          alt="car pic"
          // width={55}
          // height={55}
          fill={true}
          objectFit="cover"
          style={{ objectFit: "cover" }}
          src={car.car_main_pic}
          className="rounded-2xl"
        />
      </div> */}
      <div className="relative w-full pt-[45%]">
        <Image
          src={car.car_main_pic}
          alt="car pic"
          objectFit="cover"
          fill
          className="left-0 top-0 h-full w-full rounded-2xl object-cover"
          unoptimized={true} 
        />
      </div>
      <div className="mt-5 flex w-full flex-col">
        <h2 className="text-2xl font-extrabold">{car.car_name}</h2>
        <h3 className="mt-1 w-max rounded-lg border-2 px-3 text-xl font-semibold text-slate-400">
          {car.car_plate}
        </h3>
        <h3 className="mt-1 w-max rounded-lg text-lg font-semibold">
          <span className="text-2xl font-bold">RM {car.price}</span> /day
        </h3>
      </div>
      <Button
        type="button"
        className="invisible mb-1 mt-2 w-full rounded-full bg-primaryblue font-bold group-hover:visible"
        onClick={() => {
          router.push(`car/${car.id}`);
        }}
      >
        VIEW MORE
      </Button>
    </div>
  );
};

export default CarCard;
