"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Cookies from "js-cookie";
import { Separator } from "@/components/ui/separator";
import { ILoginJWTData, ILogoutProps } from "@/types/api_index";
import { logoutUser } from "@/services/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MdOutlineClose } from "react-icons/md";
import { HiMenuAlt3 } from "react-icons/hi";
import { Transition } from "@headlessui/react";
import { toast } from "react-hot-toast";

const CarUserAction = () => {
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);
  const [profileImageURL, setProfileImageURL] = useState<string>();
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const router = useRouter();
  const getTokenCookies = Cookies.get("JWT_TOKEN");
  const getLoginDataCookies = Cookies.get("USER_LOGIN_DATA");

  const handleMobileNavOpen = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  async function logout() {
    // const logoutProcess = toast.promise(
    //   logoutUser(getTokenCookies || "-"),
    //   {
    //     loading: "Logging Out...",
    //     success: "Redirecting to home...",
    //     error: "Something went wrong! Please try again.",
    //   },
    //   {
    //     // success: {
    //     //   duration: 1500,
    //     //   icon: "🔥",
    //     // },
    //   },
    // );
    // logoutProcess
    //   .then((data) => {
    //     if (data.revoked === true) {
    //       router.push("/");
    //     } else {
    //       toast.error("Something went wrong! Please try again.");
    //       setIsLoggingOut(false);
    //     }
    //   })
    //   .catch((error) => {
    //     toast.error("Something went wrong! Please try again.");
    //     setIsLoggingOut(false);
    //   });

    setIsLoggingOut(true);
    toast.loading("Logging out...");

    try {
      const logoutProcess = await logoutUser(getTokenCookies || "-");
      if (logoutProcess.revoked === true) {
        toast.dismiss();
        toast.success("Redirecting to home...");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        router.push("/");
      } else {
        toast.dismiss();
        toast.error("Something went wrong! Please try again.");
        setIsLoggingOut(false);
        // dynamicDialogSetter(
        //   "Error",
        //   "Something went wrong. Please try again",
        //   true,
        // );
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong! Please try again.");
      setIsLoggingOut(false);
      // dynamicDialogSetter(
      //   "Error",
      //   "Something went wrong. Please try again",
      //   true,
      // );
    }
  }

  useEffect(() => {
    if (getLoginDataCookies !== undefined) {
      const parsedUserData: ILoginJWTData = JSON.parse(getLoginDataCookies);

      if (
        parsedUserData.data?.profile.profile_image !== "-" &&
        parsedUserData.data?.profile.profile_image !== null
      ) {
        console.log("is not null");
        console.log(parsedUserData.data?.profile.profile_image);
        setProfileImageURL(parsedUserData.data?.profile.profile_image);
      } else {
        console.log("is null");
        setProfileImageURL("-");
      }

      if (
        parsedUserData.data?.profile.first_name !== "-" &&
        parsedUserData.data?.profile.first_name !== null
      ) {
        console.log("is NAME not null");
        setFirstName(parsedUserData.data?.profile.first_name);
        setLastName(parsedUserData.data?.profile.last_name);
      } else {
        console.log("is NAME null");
        setFirstName("-");
        setLastName("-");
      }
    }
  }, []);

  return (
    <div className={`flex items-center justify-center`}>
      <div className="mr-20 mt-1 max-lg:hidden">
        <Link href="/" className="">
          <h3
            className="relative inline cursor-pointer text-lg font-bold text-white before:absolute before:-bottom-1 before:block before:h-[2px] 
            before:w-full before:origin-bottom-right before:scale-x-0 before:bg-white 
            before:transition before:duration-300 before:ease-in-out hover:font-extrabold hover:before:origin-bottom-left hover:before:scale-x-100"
          >
            HOST CAR
          </h3>
        </Link>
      </div>

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
          <div className="">
            {/* Desktop view */}
            <div className="max-lg:hidden">
              <Popover>
                <PopoverTrigger asChild>
                  {profileImageURL === "-" ? (
                    <h2 className="cursor-pointer rounded-full bg-white p-4 text-lg font-bold text-black hover:bg-indigo-500 hover:text-white">
                      {firstName?.slice(0, 1)}
                      {lastName?.slice(0, 1)}
                    </h2>
                  ) : (
                    <div className="relative h-[60px] w-[60px]">
                      <Image
                        alt="user profile image"
                        // width={55}
                        // height={55}
                        fill={true}
                        objectFit="cover"
                        style={{ objectFit: "cover" }}
                        src={profileImageURL ?? "/icons/profile.jpg"}
                        className="rounded-full"
                      />
                    </div>
                  )}
                </PopoverTrigger>
                <PopoverContent className="mr-10 mt-2 rounded-2xl border-0 shadow-2xl">
                  <div className="m-4 flex flex-col items-center justify-center gap-4">
                    <div className="flex w-full flex-col justify-start">
                      <h2 className="text-xl font-bold">
                        Hi, {firstName} {lastName}
                      </h2>
                      <Link href="/">
                        <h3
                          className="font-base relative inline cursor-pointer text-sm text-gray-500 before:absolute before:-bottom-1 before:block before:h-[2px] 
      before:w-full before:origin-bottom-right before:scale-x-0 before:bg-gray-500
      before:transition before:duration-300 before:ease-in-out hover:font-extrabold hover:before:origin-bottom-left hover:before:scale-x-100"
                        >
                          VIEW PROFILE
                        </h3>
                      </Link>
                    </div>
                    <Separator className="bg-gray-300" />
                    <h3
                      className="relative inline cursor-pointer text-base font-bold tracking-wider text-red-500 before:absolute before:-bottom-1 before:block before:h-[2px] 
      before:w-full before:origin-bottom-right before:scale-x-0 before:bg-red-500
      before:transition before:duration-300 before:ease-in-out hover:font-extrabold hover:before:origin-bottom-left hover:before:scale-x-100"
                      onClick={logout}
                    >
                      LOGOUT
                    </h3>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Mobile view */}
            <div className="flex flex-col items-center lg:hidden">
              <div className="visible lg:hidden">
                {isMobileNavOpen === true ? (
                  <MdOutlineClose
                    className="text-slate-50 hover:text-slate-200"
                    size={40}
                    onClick={handleMobileNavOpen}
                  />
                ) : (
                  <HiMenuAlt3
                    className="text-slate-50 hover:text-slate-200"
                    size={40}
                    onClick={handleMobileNavOpen}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <Transition
        show={isMobileNavOpen}
        enter="transition-opacity duration-200 ease-in-out"
        enterFrom="opacity-100"
        enterTo="opacity-100"
        leave="transition-opacity duration-300 ease-in-out"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className={`absolute left-0 top-24 z-50 flex h-full w-full flex-col items-center gap-10 bg-brandprimary pt-16`}
          //   className={`absolute z-10 flex h-full w-full min-w-96 items-start justify-center bg-gray-300 pt-10`}
        >
          <Link href="/">
            <h3
              className="relative inline cursor-pointer text-base font-bold text-gray-300 before:absolute before:-bottom-1 before:block before:h-[2px] 
            before:w-full before:origin-bottom-right before:scale-x-0 before:bg-gray-300
            before:transition before:duration-300 before:ease-in-out hover:font-extrabold hover:before:origin-bottom-left hover:before:scale-x-100"
            >
              HOST CAR
            </h3>
          </Link>
          <div className={`flex flex-col items-center gap-10`}>
            {profileImageURL === "-" ? (
              <h2 className="cursor-pointer rounded-full bg-white p-4 text-lg font-bold text-black hover:bg-indigo-500 hover:text-white">
                {firstName?.slice(0, 1)}
                {lastName?.slice(0, 1)}
              </h2>
            ) : (
              <div className="relative h-[50px] w-[50px]">
                <Image
                  alt="user profile image"
                  // width={55}
                  // height={55}
                  fill={true}
                  objectFit="cover"
                  style={{ objectFit: "cover" }}
                  src={profileImageURL ?? "/icons/profile.jpg"}
                  className="rounded-full"
                />
              </div>
            )}
            <div className="flex flex-col items-center justify-center">
              <Separator orientation="horizontal" className="mb-8 w-20" />
              <div className="mt-2 flex flex-col items-center justify-center gap-4">
                <Link href="/">
                  <h3
                    className="relative inline cursor-pointer text-base font-medium text-gray-300 before:absolute before:-bottom-1 before:block before:h-[2px] 
            before:w-full before:origin-bottom-right before:scale-x-0 before:bg-gray-300
            before:transition before:duration-300 before:ease-in-out hover:font-extrabold hover:before:origin-bottom-left hover:before:scale-x-100"
                  >
                    VIEW PROFILE
                  </h3>
                </Link>
                <Button
                  variant="link"
                  className="text-base font-bold tracking-wider text-red-300"
                  onClick={logout}
                  disabled={isLoggingOut}
                >
                  LOGOUT
                </Button>

                {/* <h3
                  className="relative inline cursor-pointer text-base font-bold tracking-wider text-red-300 before:absolute before:-bottom-1 before:block before:h-[2px] 
            before:w-full before:origin-bottom-right before:scale-x-0 before:bg-red-300
            before:transition before:duration-300 before:ease-in-out hover:font-extrabold hover:before:origin-bottom-left hover:before:scale-x-100"
                  onClick={logout}
                >
                  LOGOUT
                </h3> */}
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default CarUserAction;
