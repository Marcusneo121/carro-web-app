"use client";

import { getAllCars } from "@/services/cars";
import CarList from "../components/CarList";
import { useEffect, useState } from "react";
import { ICars } from "@/types/api_index";

export default function Car() {
  const [carData, setCarData] = useState<ICars>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getAllCars().then((data) => {
      setCarData(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="min-h-[800px] px-8 py-10 lg:px-20">
      <h1 className="mb-5 text-2xl font-bold md:mb-10 md:text-3xl">
        All Available Cars
      </h1>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {carData === undefined ? (
            <div>Error...</div>
          ) : (
            <div>
              <CarList cars={carData.data} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
