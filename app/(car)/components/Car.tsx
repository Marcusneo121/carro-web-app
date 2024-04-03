"use client";

import React from "react";
import Image from "next/image";
import { GiElectric } from "react-icons/gi";
import { ICar } from "@/types/api_index";

interface CarProps {
  car: ICar;
}

const Car: React.FC<CarProps> = ({ car }) => {
  return (
    <tr key={car.id}>
      <td>
        <Image
          src={car.car_main_pic}
          width={150}
          height={20}
          alt="Car image"
          className="rounded-2xl"
        />
      </td>
      <td>{car.car_name}</td>
      <td>
        <div className="flex justify-center gap-2">
          {car.engine_capacity}
          {car.is_electric === true ? (
            <GiElectric size={20} className="text-blue-500" />
          ) : null}
        </div>
      </td>
      <td>{car.year_made}</td>
      <td>{car.color}</td>
      <td>{car.car_plate}</td>
      <td>{car.seat}</td>
    </tr>
  );
};

export default Car;
