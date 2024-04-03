"use client";

import { getAllCars } from "@/services/cars";
import CarList from "../components/CarList";

const Cars = async () => {
  const cars = await getAllCars();

  return (
    <div className="h-full p-10">
      <div className="my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">All Carro Cars</h1>
      </div>
      <CarList cars={cars.data} />
    </div>
  );
};

export default Cars;
