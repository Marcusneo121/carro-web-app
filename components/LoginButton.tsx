import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import Image from "next/image";
import { ILoginJWTData } from "@/types/api_index";
import { Separator } from "./ui/separator";

const LoginButton = () => {
  const getTokenCookies = Cookies.get("JWT_TOKEN");
  const getLoginDataCookies = Cookies.get("USER_LOGIN_DATA");
  const [profileImageURL, setProfileImageURL] = useState<string>();
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();

  useEffect(() => {
    if (getLoginDataCookies !== undefined) {
      const parsedUserData: ILoginJWTData = JSON.parse(getLoginDataCookies);

      if (
        parsedUserData.data.profile.profile_image !== "-" &&
        parsedUserData.data.profile.profile_image !== null
      ) {
        console.log("is not null");
        console.log(parsedUserData.data.profile.profile_image);
        setProfileImageURL(parsedUserData.data.profile.profile_image);
      } else {
        console.log("is null");
        setProfileImageURL("-");
        if (
          parsedUserData.data.profile.first_name !== "-" &&
          parsedUserData.data.profile.first_name !== null
        ) {
          setFirstName(parsedUserData.data.profile.first_name);
          setLastName(parsedUserData.data.profile.last_name);
        } else {
          setFirstName("-");
          setLastName("-");
        }
      }
    }
  }, []);

  return (
    <div>
      {getLoginDataCookies === undefined && getTokenCookies === undefined ? (
        <Button
          asChild
          variant="outline"
          className="rounded-full border-2 bg-transparent px-10 py-6 text-lg font-bold text-white hover:text-brandprimary"
        >
          <Link href="/login">LOGIN</Link>
        </Button>
      ) : (
        <div className="flex flex-col items-center justify-center gap-12 lg:flex-row">
          <Link href="/cars">
            <h3
              className="relative inline cursor-pointer text-lg font-bold text-white before:absolute before:-bottom-1 before:block before:h-[2px] 
before:w-full before:origin-bottom-right before:scale-x-0 before:bg-white 
before:transition before:duration-300 before:ease-in-out hover:font-extrabold hover:before:origin-bottom-left hover:before:scale-x-100"
            >
              BROWSE CAR
            </h3>
          </Link>
          {/* Desktop view */}
          <div className="max-lg:hidden">
            {profileImageURL === "-" ? (
              <h2 className="cursor-pointer rounded-full bg-white p-4 text-lg font-bold text-black hover:bg-indigo-500 hover:text-white">
                {firstName?.slice(0, 1)}
                {lastName?.slice(0, 1)}
              </h2>
            ) : (
              <Image
                alt="user profile image"
                width={55}
                height={55}
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                className="rounded-full object-contain"
              />
            )}
          </div>

          {/* Mobile view */}
          <div className="flex flex-col items-center lg:hidden">
            <Separator orientation="horizontal" className="mb-8 w-20" />
            <div className="max-w-[60px]">
              {profileImageURL === "-" ? (
                <h2 className="max-w-[60px] cursor-pointer rounded-full bg-white p-4 text-lg font-bold text-black hover:bg-indigo-500 hover:text-white">
                  {firstName?.slice(0, 1)}
                  {lastName?.slice(0, 1)}
                </h2>
              ) : (
                <Image
                  alt="user profile image"
                  width={55}
                  height={55}
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                  className="rounded-full object-contain"
                />
              )}
            </div>

            {/* Login function */}
            <div className="mt-6 flex flex-col items-center justify-center gap-4">
              <Link href="/">
                <h3
                  className="relative inline cursor-pointer text-base font-medium text-gray-300 before:absolute before:-bottom-1 before:block before:h-[2px] 
            before:w-full before:origin-bottom-right before:scale-x-0 before:bg-gray-300
            before:transition before:duration-300 before:ease-in-out hover:font-extrabold hover:before:origin-bottom-left hover:before:scale-x-100"
                >
                  VIEW PROFILE
                </h3>
              </Link>
              <Link href="/">
                <h3
                  className="relative inline cursor-pointer text-base font-bold tracking-wider text-red-300 before:absolute before:-bottom-1 before:block before:h-[2px] 
            before:w-full before:origin-bottom-right before:scale-x-0 before:bg-red-300
            before:transition before:duration-300 before:ease-in-out hover:font-extrabold hover:before:origin-bottom-left hover:before:scale-x-100"
                >
                  LOGOUT
                </h3>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginButton;
