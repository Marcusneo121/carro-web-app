"use client";

import { getCarByID } from "@/services/cars";
import { useEffect, useState } from "react";
import { ICar, ICarDetail } from "@/types/api_index";
import CarDetailListing from "../../components/CarDetails";

export default function CarDetails({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [carData, setCarData] = useState<ICarDetail>();

  const fetchCarDetails = async () => {
    setIsLoading(true);
    try {
      const carDetails = await getCarByID(params.id);
      // console.log(carDetails);
      if (carDetails.status === "ok") {
        setCarData(carDetails);

        // const ownerDetails = fetchCarOwnerDetails


      } else {
        throw new Error("Something went wrong.");
      }
    } catch (error: any) {
      setError(error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchCarDetails();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-[700px] items-center justify-center px-8 py-10 lg:px-20">
        Loading...
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
      {carData && (
        <div className="flex flex-col items-center">
          <CarDetailListing car={carData} />
        </div>
      )}
      {/* <h1 className="mb-5 text-2xl font-bold md:mb-10 md:text-3xl">
        All Available Cars
      </h1> */}
      {/* <div>{carData?.data?.car_name}</div> */}
      {/* {errorData !== "" && <div>Something went wrong</div>}
      {isLoading && <div>Loading...</div>}
      {carData && (
        <div>
          <CarDetailListing car={carData} />
        </div>
      )} */}
    </div>
  );
}
