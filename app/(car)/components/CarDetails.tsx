"use client";

import { ICar, ICarDetail, ICarOwner } from "@/types/api_index";
import React, { useState } from "react";
import CarDetailsCarousel from "./CarDetailsCarousel";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineDirectionsCarFilled, MdEventAvailable } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  dateFormatterGMT,
  stringToDateTime,
  timeExtractor,
} from "@/utils/utils";
import { BookingDialog } from "./BookingDialog";

interface CarDetailProps {
  car: ICarDetail;
  owner: ICarOwner;
}

const CarDetailListing: React.FC<CarDetailProps> = ({ car, owner }) => {
  const [bookingDialog, setBookingDialog] = useState<boolean>(false);
  const listOfCarImages = [
    car.data?.car_main_pic ?? "",
    car.data?.car_image_one ?? "",
    car.data?.car_image_two ?? "",
    car.data?.car_image_three ?? "",
    car.data?.car_image_four ?? "",
  ];

  const fromDate = dateFormatterGMT(car.data.available_from_date);
  const toDate = dateFormatterGMT(car.data.available_to_date);

  const fromTime = stringToDateTime(car.data.available_from_date);

  return (
    <div className="flex w-full flex-col items-center">
      {/* <div>{fromTime.toISOString()}</div>
      <input type="datetime-local" min={fromTime.toISOString()} /> */}
      {/* <div>
        {utcFromDate.format(fromDate).replaceAll("/", "-").replaceAll(",", "")}
      </div> */}
      <div className="">
        <CarDetailsCarousel carImages={listOfCarImages} />
      </div>
      <div className="w-[450px] max-sm:w-[350px]">
        <div className="my-4 flex w-full flex-col max-md:px-3">
          <h2 className="text-3xl font-extrabold">{car.data?.car_name}</h2>
          <h3 className="mt-1 w-max rounded-lg border-2 px-3 text-lg font-semibold text-slate-400">
            {car.data?.car_plate}
          </h3>
        </div>
        <div className="flex w-full flex-col gap-4 max-md:px-2">
          <div className="flex flex-col gap-1 rounded-2xl bg-slate-50 px-4 py-3 drop-shadow-sm">
            <div className="flex items-center justify-start gap-2">
              <IoLocationOutline className="text-2xl text-brandprimary" />
              <h2 className="text-xl font-bold text-brandprimary">Location</h2>
            </div>
            <div>{car.data?.location}</div>
          </div>
          <div className="flex flex-col gap-2 rounded-2xl bg-slate-50 px-4 py-3 drop-shadow-sm">
            <div className="flex items-center justify-start gap-2">
              <MdOutlineDirectionsCarFilled className="text-2xl text-brandprimary" />
              <h2 className="text-xl font-bold text-brandprimary">
                Car Description
              </h2>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-md font-bold">
                Year Made :{" "}
                <span className="text-md font-medium">
                  {car.data?.year_made}
                </span>
              </h2>
              <h2 className="text-md font-bold">
                {car.data?.is_electric
                  ? "Power Output (kW)"
                  : "Engine Capacity (CC)"}{" "}
                :{" "}
                <span className="text-md font-medium">
                  {car.data?.engine_capacity}
                </span>
              </h2>
              <h2 className="text-md font-bold">
                Color :{" "}
                <span className="text-md font-medium">{car.data?.color}</span>
              </h2>
              <h2 className="text-md font-bold">
                Seat Number :{" "}
                <span className="text-md font-medium">{car.data?.seat}</span>
              </h2>
            </div>
          </div>
          <div className="flex flex-col gap-2 rounded-2xl bg-slate-50 px-4 py-3 drop-shadow-sm">
            <div className="flex items-center justify-start gap-2">
              <MdEventAvailable className="text-2xl text-brandprimary" />
              <h2 className="text-xl font-bold text-brandprimary">
                Availability
              </h2>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-md font-bold">
                From : <span className="text-md font-medium">{fromDate}</span>
              </h2>
              <h2 className="text-md font-bold">
                Until : <span className="text-md font-medium">{toDate}</span>
              </h2>
            </div>
          </div>
          <div className="flex flex-col gap-2 rounded-2xl bg-slate-50 px-4 py-3 drop-shadow-sm">
            <div className="flex items-center justify-start gap-2">
              <FiUser className="text-2xl text-brandprimary" />
              <h2 className="text-xl font-bold text-brandprimary">
                Owner Contact
              </h2>
            </div>
            <div className="flex items-center gap-4">
              {owner.data.profile_image === "-" ? (
                <h2 className="flex h-[55px] w-[55px] cursor-pointer items-center justify-center rounded-full bg-slate-200 p-4 text-lg font-bold text-black hover:bg-indigo-500 hover:text-white">
                  {owner.data.first_name?.slice(0, 1)}
                  {owner.data.last_name?.slice(0, 1)}
                </h2>
              ) : (
                <div className="relative h-[50px] w-[50px]">
                  <Image
                    alt="user profile image"
                    // width={55}
                    // height={55}
                    fill={true}
                    objectFit="cover"
                    style={{ objectFit: "cover" }}
                    src={owner.data.profile_image ?? "/icons/profile.jpg"}
                    className="rounded-full"
                  />
                </div>
              )}
              <div>
                <h2 className="text-md font-bold">
                  {owner.data.first_name} {owner.data.last_name}
                </h2>
                <h2 className="text-md font-bold hover:text-brandprimary">
                  {owner.data.phone_number}
                </h2>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-end justify-between pl-1">
            <div>
              <h1 className="text-[20px] font-extrabold leading-none">
                RM {car.data.price}
              </h1>
              <h1 className="leading-none text-slate-600">per day</h1>
              <h1 className="mt-1 text-sm italic leading-none text-slate-500">
                *Insurance included
              </h1>
            </div>
            <div className="flex h-[60px] w-[150px]">
              <Button
                variant="secondary"
                className="text-md h-full w-[150px] rounded-xl font-bold hover:bg-brandprimary hover:font-extrabold hover:text-white"
                onClick={() => {
                  setBookingDialog(!bookingDialog);
                }}
              >
                Book Now
              </Button>
              <BookingDialog open={bookingDialog} setOpen={setBookingDialog} car={car}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  //   if (car === undefined) {
  //     return (
  //       <div className="">
  //         <h2>Undefined</h2>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div className="">
  //         <h2>{car.data?.car_name}</h2>
  //       </div>
  //     );
  //   }
};

export default CarDetailListing;
