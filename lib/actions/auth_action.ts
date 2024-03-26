"use server";

import { ILoginJWTData, ILoginProps } from "@/types/api_index";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const baseUrl = process.env.BASE_URL;

export const loginAction = async (loginData: FormData) => {
    const {username,password} = Object.fromEntries(loginData);

  try {
    const res = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data.");
    }

  } catch (error) {
    throw new Error("Something went wrong! Please try again!");
  }
};
