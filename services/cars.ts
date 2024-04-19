"use client";

import {
  IAddHostCarData,
  IBookedCar,
  IBooking,
  ICar,
  ICarDetail,
  ICarOwner,
  ICars,
  INormalApiResponse,
} from "@/types/api_index";
import Cookies from "js-cookie";

const baseUrl = process.env.BASE_URL;
// const getTokenCookies = Cookies.get("JWT_TOKEN");
// const getLoginDataCookies = Cookies.get("USER_LOGIN_DATA");

export const getAllCars = async (): Promise<ICars> => {
  const tokenCookies = Cookies.get("JWT_TOKEN");
  const res = await fetch(`${baseUrl}/car`, {
    method: "GET",
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${tokenCookies}`,
    },
  });
  const cars = await res.json();

  return cars;
};

export const getCarByID = async (id: string): Promise<ICarDetail> => {
  try {
    const tokenCookies = Cookies.get("JWT_TOKEN");
    const res = await fetch(`${baseUrl}/car/${id}`, {
      method: "GET",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${tokenCookies}`,
      },
    });
    const car = await res.json();
    return car;
  } catch (error) {
    throw new Error("Something went wrong! Please try again!");
  }
};

export const getCarOwnerByID = async (id: string): Promise<ICarOwner> => {
  try {
    const tokenCookies = Cookies.get("JWT_TOKEN");
    const res = await fetch(`${baseUrl}/user/${id}`, {
      method: "GET",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${tokenCookies}`,
      },
    });
    const owner = await res.json();
    return owner;
  } catch (error) {
    throw new Error("Something went wrong! Please try again!");
  }
};

export const bookCar = async (bookingData: IBooking): Promise<IBookedCar> => {
  try {
    const tokenCookies = Cookies.get("JWT_TOKEN");
    const res = await fetch(`${baseUrl}/rent/booking`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenCookies}`,
      },
      body: JSON.stringify(bookingData),
    });
    const booking = await res.json();
    return booking;
  } catch (error) {
    throw new Error("Something went wrong! Please try again!");
  }
};

export const addCar = async (
  carData: IAddHostCarData,
): Promise<INormalApiResponse> => {
  try {
    if (carData === undefined) {
      throw new Error("Something went wrong! Please try again!");
    }

    const newFormData = new FormData();
    newFormData.set("car_name", carData.carName!);
    newFormData.set("color", carData.color!);
    newFormData.set("engine_capacity", carData.engineCapacity!);
    newFormData.set("year_made", carData.yearMade!);
    newFormData.set("seat", carData.seat!);
    newFormData.set("location", carData.location!);
    newFormData.set("car_main_pic", carData.carMainPic!);
    newFormData.set("car_image_one", carData.carImageOne!);
    newFormData.set("car_image_two", carData.carImageTwo!);
    newFormData.set("car_image_three", carData.carImageThree!);
    newFormData.set("car_image_four", carData.carImageFour!);
    newFormData.set("car_plate", carData.carPlate!);
    newFormData.set("price", carData.price!);
    newFormData.set("available_from_date", carData.availableFromDate!);
    newFormData.set("available_to_date", carData.availableToDate!);
    newFormData.set(
      "is_electric",
      carData.isElectric === true ? "true" : "false",
    );

    const tokenCookies = Cookies.get("JWT_TOKEN");
    const res = await fetch(`${baseUrl}/car`, {
      method: "POST",
      cache: "no-store",
      headers: {
        // "Content-Type":
        //   "multipart/form-data; boundary=<calculated when request is sent>",
        // "Content-Type": "application/json",
        Authorization: `Bearer ${tokenCookies}`,
      },
      body: newFormData,
      // body: JSON.stringify({
      //   car_name: carData.carName,
      //   color: carData.color,
      //   engine_capacity: carData.engineCapacity,
      //   year_made: carData.yearMade,
      //   seat: carData.seat,
      //   location: carData.location,
      //   car_main_pic: newFormData.get("car_main_pic"),
      //   car_image_one: carData.carImageOne,
      //   car_image_two: carData.carImageTwo,
      //   car_image_three: carData.carImageThree,
      //   car_image_four: carData.carImageFour,
      //   car_plate: carData.carPlate,
      //   price: carData.price,
      //   available_from_date: carData.availableFromDate,
      //   available_to_date: carData.availableToDate,
      //   is_electric: carData.isElectric,
      // }),
    });
    const carDataAdd = await res.json();
    return carDataAdd;
  } catch (error) {
    throw new Error("Something went wrong! Please try again!");
  }
};

// body: JSON.stringify({
//   car_name: carData.carName,
//   color: carData.color,s
//   engine_capacity: carData.engineCapacity,
//   year_made: carData.yearMade,
//   seat: carData.seat,
//   location: carData.location,
//   car_main_pic: carData.carMainPic,
//   car_image_one: carData.carImageOne,
//   car_image_two: carData.carImageTwo,
//   car_image_three: carData.carImageThree,
//   car_image_four: carData.carImageFour,
//   car_plate: carData.carPlate,
//   price: carData.price,
//   available_from_date: carData.availableFromDate,
//   available_to_date: carData.availableToDate,
//   is_electric: carData.isElectric,
// }),

// export const fetchCars = async (): Promise<ICarsProps> => {
//   try {
//     // await new Promise((resolve) => setTimeout(resolve, 1000));

//     // console.log(getTokenCookies?.toString());
//     const res = await fetch(`${baseUrl}/car`, {
//       cache: "no-store",
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${getTokenCookies?.toString()}`,
//       },
//     });

//     const carsData: Promise<ICarsProps> = await res.json();

//     return carsData;
//   } catch (error) {
//     throw new Error("Something went wrong! Please try again!");
//   }
// };
