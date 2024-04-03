"use client";

import React from "react";
import { ICar } from "@/types/api_index";
import Car from "./Car";

interface CarListProps {
  cars: ICar[];
}

const CarList: React.FC<CarListProps> = ({ cars }) => {
  return (
    <div className="overflow-x-auto">
      {cars === undefined ? (
        <div>
          <h1>No Result.</h1>
        </div>
      ) : (
        <div>
          <table className="table">
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
          </table>
        </div>
      )}
    </div>
  );
};

export default CarList;
