"use client";

import { ICars } from "@/types/api_index";
import Cookies from "js-cookie";

const baseUrl = process.env.BASE_URL;
const getTokenCookies = Cookies.get("JWT_TOKEN");
const getLoginDataCookies = Cookies.get("USER_LOGIN_DATA");

export const getAllCars = async (): Promise<ICars> => {
  const res = await fetch(`${baseUrl}/car`, {
    method: "GET",
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${getTokenCookies}`,
    },
  });
  const cars = await res.json();
  return cars;
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