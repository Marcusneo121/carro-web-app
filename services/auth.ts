import { IEmailUsernameCheckProps, ILoginJWTData, ILoginProps } from "@/types/api_index";
import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = process.env.BASE_URL;
const MAX_AGE = 7;

export const login = async (loginData: ILoginProps): Promise<ILoginJWTData> => {
  try {
    const res = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data.");
    }

    const successData: ILoginJWTData = await res.json();

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

    // const newTodo = await res.json();
    // return newTodo;

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