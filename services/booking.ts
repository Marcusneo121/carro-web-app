import {
  IBargaining,
  IMyBooking,
  IMyBookingDetail,
  INormalApiResponse,
  IUpdateBargaining,
  MyBookings,
} from "@/types/api_index";
import Cookies from "js-cookie";
const baseUrl = process.env.BASE_URL;

export const getGuestBookings = async (): Promise<MyBookings> => {
  try {
    const tokenCookies = Cookies.get("JWT_TOKEN");
    const res = await fetch(`${baseUrl}/rent/bargain/user/guest`, {
      method: "GET",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${tokenCookies}`,
      },
    });
    const bookings = await res.json();
    return bookings;
  } catch (error) {
    throw new Error("Something went wrong! Please try again!");
  }
};

export const getGuestBookingByID = async (
  id: string,
): Promise<IMyBookingDetail> => {
  try {
    const tokenCookies = Cookies.get("JWT_TOKEN");
    const res = await fetch(`${baseUrl}/rent/bargain/user/guest/${id}`, {
      method: "GET",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${tokenCookies}`,
      },
    });
    const bookingData = await res.json();
    return bookingData;
  } catch (error) {
    throw new Error("Something went wrong! Please try again!");
  }
};

export const bargainingCar = async (
  bargainingData: IBargaining,
): Promise<INormalApiResponse> => {
  try {
    const tokenCookies = Cookies.get("JWT_TOKEN");
    const res = await fetch(`${baseUrl}/rent/bargaining`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenCookies}`,
      },
      body: JSON.stringify(bargainingData),
    });
    const bargaining = await res.json();
    return bargaining;
  } catch (error) {
    throw new Error("Something went wrong! Please try again!");
  }
};

export const updateBargaining = async (
  updateBargainingData: IUpdateBargaining,
): Promise<INormalApiResponse> => {
  try {
    const tokenCookies = Cookies.get("JWT_TOKEN");
    const res = await fetch(`${baseUrl}/rent/bargain/guest/action`, {
      method: "PATCH",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenCookies}`,
      },
      body: JSON.stringify(updateBargainingData),
    });
    const updateBargaining = await res.json();
    return updateBargaining;
  } catch (error) {
    throw new Error("Something went wrong! Please try again!");
  }
};
