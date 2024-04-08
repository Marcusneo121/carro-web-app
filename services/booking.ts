import { MyBookings } from "@/types/api_index";
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
