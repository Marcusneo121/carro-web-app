"use client";

import React from "react";
import { IBooking, ICar, IMyBooking } from "@/types/api_index";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import BookingStatusBadge from "./BookingStatusBadge";

interface MyBookingProps {
  booking: IMyBooking;
}

const BookingCarCard = ({ booking }: MyBookingProps) => {
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
          src={booking.car_main_pic}
          alt="car pic"
          objectFit="cover"
          fill
          className="left-0 top-0 h-full w-full rounded-2xl object-cover"
        />
      </div>
      <div className="mt-5 flex w-full flex-row justify-between">
        <div>
          <h2 className="text-2xl font-extrabold">{booking.car_name}</h2>
          <h3 className="mt-1 w-max rounded-lg border-2 px-3 text-xl font-semibold text-slate-400">
            {booking.car_plate}
          </h3>
          <h3 className="mt-1 w-max rounded-lg text-lg font-semibold">
            <span className="text-2xl font-bold">
              RM {booking.bargain_amount}
            </span>{" "}
            /day
          </h3>
        </div>
        <BookingStatusBadge
          badgeID={booking.bargain_status_id}
          badgeType={booking.ori_bargain_name}
        />
      </div>
      <Button
        type="button"
        className="invisible mb-1 mt-2 w-full rounded-full bg-primaryblue font-bold group-hover:visible"
        onClick={() => {
          router.push(`mybooking/${booking.ori_bargain_id}`);
        }}
      >
        VIEW MORE
      </Button>
    </div>
  );
};

export default BookingCarCard;
