"use client";

import React, { Suspense } from "react";
import { ICar } from "@/types/api_index";
// const Car = dynamic(() => import("./Car"), { ssr: false });

import Car from "./Car";
import dynamic from "next/dynamic";
import CarCard from "./CarCard";

interface CarListProps {
  cars: ICar[];
}

const CarList: React.FC<CarListProps> = ({ cars }) => {
  // const carData = [...cars, ...cars, ...cars];

  return (
    <div className="">
      {cars === undefined ? (
        <div>
          <h1>No Result.</h1>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-10 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-4">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
          {/* <div>testing</div>
          <div>testing</div>
          <div>testing</div>
          <div>testing</div>
          <div>testing</div> */}
          {/* <table className="table">
            <thead>
              <tr>
                <th>Car Image</th>
                <th>Car Name</th>
                <th>Engine Capacity</th>
                <th>Year Made</th>
                <th>Color</th>
                <th>Car Plate</th>
                <th>Seat</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <Car key={car.id} car={car} />
              ))}
            </tbody>
          </table> */}
        </div>
      )}
    </div>
  );
};

export default CarList;
