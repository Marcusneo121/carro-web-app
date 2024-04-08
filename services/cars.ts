"use client";

import {
  IBookedCar,
  IBooking,
  ICar,
  ICarDetail,
  ICarOwner,
  ICars,
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
