import {
  IEmailUsernameCheckProps,
  ILoginJWTData,
  ILoginProps,
  IRegisterProps,
  ISignUpProps,
} from "@/types/api_index";
import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = process.env.BASE_URL;
const MAX_AGE = 7;

export const login = async (loginData: ILoginProps): Promise<ILoginJWTData> => {
  try {
    const res = await fetch(`${baseUrl}/login`, {
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    // if (!res.ok) {
    //   throw new Error("Failed to fetch data.");
    // }

    const successData: ILoginJWTData = await res.json();

    if (res.ok) {
      Cookies.set("JWT_TOKEN", successData.token.token.toString(), {
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
    return successData;
  } catch (error) {
    throw new Error("Something went wrong! Please try again!");
  }
  // const response = await axios({
  //   method: "post",
  //   baseURL: baseUrl,
  //   url: "/login",
  //   data: {
  //     username: "ok".toString(),
  //     password: "ok".toString(),
  //   },
  // });
  // const loginSucData = await response.data;
  // return loginSucData;
};

export const checkUsername = async (
  username: string,
): Promise<IEmailUsernameCheckProps> => {
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

    return checkingData;
  } catch (error) {
    throw new Error("Something went wrong! Please try again!");
  }
};

export const checkEmail = async (
  email: string,
): Promise<IEmailUsernameCheckProps> => {
  try {
    const res = await fetch(`${baseUrl}/register/checkEmail`, {
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });

    const checkingData: IEmailUsernameCheckProps = await res.json();

    return checkingData;
  } catch (error) {
    throw new Error("Something went wrong! Please try again!");
  }
};

export const userRegister = async (data: ISignUpProps): Promise<IRegisterProps> => {
  try {
    const res = await fetch(`${baseUrl}/register`, {
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isAdmin: false,
        username: data.username,
        email: data.email,
        password: data.password,
        first_name: data.firstName,
        last_name: data.lastName,
        address1: data.address1,
        address2: data.address2,
        address3: data.address3,
        poscode: data.poscode.toString(),
        city: data.city,
        state: data.state,
        age: data.age,
        phone_number: data.phoneNumber.toString(),
        date_of_birth: data.dateOfBirth.toISOString(),
        profile_image: data.profileImage,
      }),
    });

    const checkingData: IRegisterProps = await res.json();

    return checkingData;
  } catch (error) {
    throw new Error("Something went wrong! Please try again!");
  }
};

export const logoutUser = async (
  data: ISignUpProps,
): Promise<IRegisterProps> => {
  try {
    const res = await fetch(`${baseUrl}/register`, {
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isAdmin: false,
        username: data.username,
        email: data.email,
        password: data.password,
        first_name: data.firstName,
        last_name: data.lastName,
        address1: data.address1,
        address2: data.address2,
        address3: data.address3,
        poscode: data.poscode.toString(),
        city: data.city,
        state: data.state,
        age: data.age,
        phone_number: data.phoneNumber.toString(),
        date_of_birth: data.dateOfBirth.toISOString(),
        profile_image: data.profileImage,
      }),
    });

    const checkingData: IRegisterProps = await res.json();

    return checkingData;
  } catch (error) {
    throw new Error("Something went wrong! Please try again!");
  }
};
