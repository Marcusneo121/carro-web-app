import { ICar, ICarDetail } from "@/types/api_index";
import React from "react";
import CarDetailsCarousel from "./CarDetailsCarousel";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineDirectionsCarFilled, MdEventAvailable } from "react-icons/md";

interface CarDetailProps {
  car: ICarDetail;
}

const CarDetailListing: React.FC<CarDetailProps> = ({ car }) => {
  const listOfCarImages = [
    car.data?.car_main_pic ?? "",
    car.data?.car_image_one ?? "",
    car.data?.car_image_two ?? "",
    car.data?.car_image_three ?? "",
    car.data?.car_image_four ?? "",
  ];

  return (
    <div className="mx-10 flex w-full flex-col items-center">
      <div className="">
        <CarDetailsCarousel carImages={listOfCarImages} />
      </div>
      <div className="w-[450px] max-sm:w-[350px]">
        <div className="my-4 flex w-full flex-col max-md:px-5">
          <h2 className="text-3xl font-extrabold">{car.data?.car_name}</h2>
          <h3 className="mt-1 w-max rounded-lg border-2 px-3 text-lg font-semibold text-slate-400">
            {car.data?.car_plate}
          </h3>
        </div>
        <div className="flex w-full flex-col gap-4 max-md:px-5">
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
                From :{" "}
                <span className="text-md font-medium">
                  {car.data?.available_from_date}
                </span>
              </h2>
              <h2 className="text-md font-bold">
                Until :{" "}
                <span className="text-md font-medium">
                  {car.data?.available_from_date}
                </span>
              </h2>
            </div>
          </div>
          <div>testing</div>
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
