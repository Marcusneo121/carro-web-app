import { getCookie } from "@/app/actions";
import { DividerHorizontalIcon } from "@radix-ui/react-icons";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
// import { cookies } from "next/headers";
import { useCookies } from "next-client-cookies";

const NewLoginButton = () => {
  const cookiesStore = useCookies();
  const getTokenCookies = cookiesStore.get("JWT_TOKEN");
  const getLoginDataCookies = cookiesStore.get("USER_LOGIN_DATA");

  console.log(getTokenCookies);

  return (
    <div>
      {getLoginDataCookies === undefined && getTokenCookies === undefined ? (
        <Button
          asChild
          variant="outline"
          className="rounded-full border-2 bg-transparent px-10 py-6 text-lg font-bold text-white hover:text-brandprimary"
        >
          <Link href="/login-new">LOGIN</Link>
        </Button>
      ) : (
        <div className="flex flex-col items-center justify-center gap-12 lg:flex-row"></div>
      )}
    </div>
  );
};

export default NewLoginButton;
