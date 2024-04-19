import {
  IConfirmPayment,
  IConfirmPaymentData,
  ICreatePaymentIntent,
  IMakePaymentIntent,
} from "@/types/api_index";
import Cookies from "js-cookie";
const baseUrl = process.env.BASE_URL;

export const makePaymentIntent = async (
  createPaymentIntentData: ICreatePaymentIntent,
): Promise<IMakePaymentIntent> => {
  try {
    const tokenCookies = Cookies.get("JWT_TOKEN");
    const res = await fetch(`${baseUrl}/payment/make-payment-intent`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenCookies}`,
      },
      body: JSON.stringify(createPaymentIntentData),
    });
    const paymentIntentData = await res.json();
    return paymentIntentData;
  } catch (error) {
    throw new Error("Something went wrong! Please try again!");
  }
};

export const confirmPayment = async (
  confirmData: IConfirmPaymentData,
): Promise<IConfirmPayment> => {
  try {
    const tokenCookies = Cookies.get("JWT_TOKEN");
    const res = await fetch(`${baseUrl}/payment/confirm-payment`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenCookies}`,
      },
      body: JSON.stringify(confirmData),
    });
    const confirmPayment = await res.json();
    return confirmPayment;
  } catch (error) {
    throw new Error("Something went wrong! Please try again!");
  }
};
