"use client";

import { getCarByID, getCarOwnerByID } from "@/services/cars";
import { useEffect, useState } from "react";
import { ICar, ICarDetail, ICarOwner } from "@/types/api_index";
import CarDetailListing from "../../components/CarDetails";

export default function CarDetails({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [carData, setCarData] = useState<ICarDetail>();
  const [ownerData, setOwnerData] = useState<ICarOwner>();

  const fetchCarDetails = async () => {
    setIsLoading(true);
    try {
      const carDetails = await getCarByID(params.id);
      // console.log(carDetails);
      if (carDetails.status === "ok") {
        setCarData(carDetails);

        const ownerDetails = await getCarOwnerByID(
          carDetails.data.user_id.toString(),
        );

        if (ownerDetails.status === "ok") {
          setOwnerData(ownerDetails);
        } else {
          throw new Error("Something went wrong.");
        }
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
    <div className="min-h-[800px] px-8 py-5 lg:px-20">
      {carData && ownerData && (
        <div className="flex flex-col items-center">
          <CarDetailListing car={carData} owner={ownerData} />
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
