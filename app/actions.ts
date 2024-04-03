"use server";

import {
  IEmailUsernameCheckProps,
  ILoginJWTData,
  ILoginProps,
  ILogoutProps,
  IRegisterProps,
} from "@/types/api_index";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { ageFromDateOfBirthday } from "@/utils/utils";
import Cookies from "js-cookie";

const baseUrl = process.env.BASE_URL;
const MAX_AGE = 7;
const cookieStore = cookies();

export async function dummyServerActions(){
  console.log("dummy action");
}

export async function loginServerActions(
  loginData: ILoginProps,
): Promise<ILoginJWTData> {
  try {
    if (loginData.password == undefined && loginData.username == undefined) {
      return {
        status: "error",
        message: "Password or username is empty, please try again.",
      };
    }

    const res = await fetch(`${baseUrl}/login`, {
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const successData: ILoginJWTData = await res.json();

    if (res.ok) {
      if (successData.data !== undefined && successData.token !== undefined) {
        cookies().set("JWT_TOKEN", successData.token.token.toString(), {
          httpOnly: true,
          secure: true,
          expires: MAX_AGE,
          sameSite: "strict",
        });
        cookies().set("USER_LOGIN_DATA", successData.token.token.toString(), {
          httpOnly: true,
          secure: true,
          expires: MAX_AGE,
          sameSite: "strict",
        });
        Cookies.set("JWT_TOKEN", successData?.token?.token.toString() ?? "", {
          secure: true,
          sameSite: "strict",
          expires: MAX_AGE,
        });
        Cookies.set("USER_LOGIN_DATA", JSON.stringify(successData), {
          secure: true,
          sameSite: "strict",
          expires: MAX_AGE,
        });
      }
    }

    // console.log(successData);
    revalidatePath("/");

    return successData;
  } catch (error) {
    throw new Error("Something went wrong! Please try again!");
  }
}

export async function checkUsernameServerActions(
  username: string,
): Promise<IEmailUsernameCheckProps> {
  try {
    const res = await fetch(`${baseUrl}/register/checkUsername`, {
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
      }),
    });

    const checkingData: IEmailUsernameCheckProps = await res.json();

    console.log(checkingData);

    return checkingData;
  } catch (error) {
    throw new Error("Something went wrong! Please try again!");
  }
}

export async function checkEmailServerActions(
  email: string,
): Promise<IEmailUsernameCheckProps> {
  try {
    const res = await fetch(`${baseUrl}/register/checkUsername`, {
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email,
      }),
    });

    const checkingData: IEmailUsernameCheckProps = await res.json();

    console.log(checkingData);

    return checkingData;
  } catch (error) {
    throw new Error("Something went wrong! Please try again!");
  }
}

export async function registerServerActions(
  formData: FormData,
): Promise<IRegisterProps> {
  try {
    const res = await fetch(`${baseUrl}/register`, {
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isAdmin: false,
        username: formData.get("username") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        first_name: formData.get("firstname") as string,
        last_name: formData.get("lastname") as string,
        address1: (formData.get("address1") as string) ?? "-",
        address2: (formData.get("address2") as string) ?? "-",
        address3: (formData.get("address3") as string) ?? "-",
        poscode: formData.get("poscode") as string,
        city: formData.get("city") as string,
        state: formData.get("state") as string,
        age: ageFromDateOfBirthday(formData.get("age") as string),
        phone_number: formData.get("phonenumber") as string,
        date_of_birth: new Date(
          formData.get("dateofbirth") as string,
        ).toISOString(),
        profile_image: "-",
      }),
    });

    const checkingData: IRegisterProps = await res.json();

    console.log(checkingData);

    return checkingData;
  } catch (error) {
    throw new Error("Something went wrong! Please try again!");
  }
}

export async function logoutServerActions(): Promise<ILogoutProps> {
  try {
    if (cookieStore.has("JWT_TOKEN") === false) {
      throw new Error("JWT Token expired.");
    }

    const res = await fetch(`${baseUrl}/logout`, {
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookieStore.get("JWT_TOKEN")?.value.toString}`,
      },
    });

    const checkingData: ILogoutProps = await res.json();

    if (res.ok) {
      cookies().delete("JWT_TOKEN");
      cookies().delete("USER_LOGIN_DATA");

      console.log(checkingData);
    }

    revalidatePath("/");
    return checkingData;
  } catch (error) {
    throw new Error("Something went wrong! Please try again!");
  }
}

export async function checkHasCookie(cookieName: string): Promise<boolean> {
  const cookieCheck = cookieStore.has(cookieName);
  // console.log(cookieStore.getAll())
  // console.log(cookieStore.get('JWT_TOKEN')?.value);
  // console.log(cookieCheck);
  return cookieCheck;
}

export async function getCookie(cookieName: string): Promise<string | undefined> {
  const cookieGet = cookieStore.get(cookieName)?.value;
  // console.log(cookieStore.getAll())
  // console.log(cookieStore.get('JWT_TOKEN')?.value);
  // console.log(cookieCheck);
  return cookieGet;
}