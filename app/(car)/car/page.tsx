"use client";

import { getAllCars } from "@/services/cars";
import CarList from "../components/CarList";
import { useEffect, useLayoutEffect, useState } from "react";
import { ICars } from "@/types/api_index";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Car() {
  const [carData, setCarData] = useState<ICars>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState();

  const fetchAllCars = async () => {
    setIsLoading(true);
    try {
      const getAllCarsData = await getAllCars();

      if (getAllCarsData.status === "ok") {
        setCarData(getAllCarsData);
      } else {
        throw new Error("Something went wrong.");
      }
    } catch (error: any) {
      setError(error);
    }

    setIsLoading(false);
  };

  // useLayoutEffect(() => {
  //   getAllCars().then((data) => {
  //     setCarData(data);
  //     setIsLoading(false);
  //   });
  // }, []);

  useEffect(() => {
    fetchAllCars();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-[700px] items-center justify-center px-8 py-10 lg:px-20">
        <AiOutlineLoading3Quarters className="animate-spin text-[60px] text-brandprimary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[700px] items-center justify-center px-8 py-10 lg:px-20">
        Something went wrong! Please try again.
      </div>
    );
  }

  return (
    <div className="min-h-[800px] px-8 py-10 lg:px-20">
      <h1 className="mb-5 text-2xl font-bold md:mb-10 md:text-3xl">
        All Available Cars
      </h1>

      {carData && (
        <div>
          <CarList cars={carData.data} />
        </div>
      )}

      {/* {isLoading ? (
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
      )} */}
    </div>
  );
}
