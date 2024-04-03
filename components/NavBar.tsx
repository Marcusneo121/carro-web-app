"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MdOutlineClose } from "react-icons/md";
import { HiMenuAlt3 } from "react-icons/hi";
import { Suspense, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
// import LoginButton from "./LoginButton";
import NewLoginButton from "./NewLoginButton";
const LoginButton = dynamic(() => import("./LoginButton"), { ssr: false });

const NavBar = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  // const [tokenCookies, setTokenCookies] = useState<string>();
  // const [loginDataCookies, setLoginDataCookies] = useState<string>();
  // const getTokenCookies = Cookies.get("JWT_TOKEN");
  // const getLoginDataCookies = Cookies.get("USER_LOGIN_DATA");
  // const router = useRouter();

  const handleMobileNavOpen = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  // const checkCookieLogin = (): boolean => {
  //   const getTokenCookies = Cookies.get("JWT_TOKEN");
  //   const getLoginDataCookies = Cookies.get("USER_LOGIN_DATA");
  //   if (getTokenCookies === undefined || getLoginDataCookies === undefined) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  // useEffect(() => {
  // for this the UX experience is not good, cuz it stuttering on Loading
  //   setTokenCookies(Cookies.get("JWT_TOKEN"));
  //   setLoginDataCookies(Cookies.get("USER_LOGIN_DATA"));
  // }, []);

  return (
    <div className="overflow-hidden">
      <div className="bg-brandprimary px-10 py-4 md:py-8 ">
        <div className="flex items-center justify-between">
          {/* Logo section */}
          <div className="flex items-center gap-5">
            {/* <Image
              alt="carro logo"
              width={75}
              height={75}
              src="/logos/logo-white.png"
              className="min-w-[80px] object-contain"
            /> */}
            <div className="relative h-16 w-16 md:h-20 md:w-20">
              <Image
                alt="carro logo"
                src="/logos/logo-white.png"
                fill={true}
                objectFit="cover"
              />
            </div>
            <h1 className="visible pt-2 text-[45px] font-bold leading-none text-white max-xl:hidden">
              CARRO
            </h1>
          </div>

          {/* Navlink section AND LOGIN button */}
          <div className="visible flex items-center gap-20 pr-4 max-lg:hidden">
            {/* Navlink */}
            <div className="flex gap-32">
              <Link href="/">
                <h3
                  className="relative inline cursor-pointer text-lg font-bold text-white before:absolute before:-bottom-1 before:block before:h-[2px] 
            before:w-full before:origin-bottom-right before:scale-x-0 before:bg-white 
            before:transition before:duration-300 before:ease-in-out hover:font-extrabold hover:before:origin-bottom-left hover:before:scale-x-100"
                >
                  HOST
                </h3>
              </Link>
              <Link href="/">
                <h3
                  className="relative inline cursor-pointer text-lg font-bold text-white before:absolute before:-bottom-1 before:block before:h-[2px] 
              before:w-full before:origin-bottom-right before:scale-x-0 before:bg-white 
            before:transition before:duration-300 before:ease-in-out hover:font-extrabold hover:before:origin-bottom-left hover:before:scale-x-100"
                >
                  GUEST
                </h3>
              </Link>
              <Link href="/">
                <h3
                  className="relative inline cursor-pointer text-lg font-bold text-white before:absolute before:-bottom-1 before:block before:h-[2px] 
            before:w-full before:origin-bottom-right before:scale-x-0 before:bg-white 
            before:transition before:duration-300 before:ease-in-out hover:font-extrabold hover:before:origin-bottom-left hover:before:scale-x-100"
                >
                  ABOUT US
                </h3>
              </Link>
            </div>

            {/* Login */}
            {/* <div>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-2 bg-transparent px-10 py-6 text-lg font-bold text-white hover:text-brandprimary "
              >
                <Link href="/login">LOGIN</Link>
              </Button>
            </div> */}
            {/* {loginDataCookies === undefined && tokenCookies === undefined ? (
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-2 bg-transparent px-10 py-6 text-lg font-bold text-white hover:text-brandprimary"
                  onClick={() => {
                    router.push("/login");
                  }}
                >
                  <Link href="/login">LOGIN</Link>
                </Button>
              ) : (
                <Link href="/cars">
                  <h3
                    className="relative inline cursor-pointer text-lg font-bold text-white before:absolute before:-bottom-1 before:block before:h-[2px] 
            before:w-full before:origin-bottom-right before:scale-x-0 before:bg-white 
            before:transition before:duration-300 before:ease-in-out hover:font-extrabold hover:before:origin-bottom-left hover:before:scale-x-100"
                  >
                    BROWSE CAR
                  </h3>
                </Link>
              )} */}

            {/* <Suspense>
              <NewLoginButton />
            </Suspense> */}
            <LoginButton />
          </div>

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

      <Transition
        show={isMobileNavOpen}
        enter="transition-opacity duration-200 ease-in-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300 ease-in-out"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className={`absolute z-10 flex h-full w-full items-start justify-center bg-brandprimary pt-16`}
          //   className={`absolute z-10 flex h-full w-full min-w-96 items-start justify-center bg-gray-300 pt-10`}
        >
          <div className={`flex flex-col items-center gap-10`}>
            <Link href="/">
              <h1 className="text-lg font-semibold text-white hover:font-bold hover:underline">
                HOST
              </h1>
            </Link>
            <Link href="/">
              <h1 className="text-lg font-semibold text-white hover:font-bold hover:underline">
                GUEST
              </h1>
            </Link>
            <Link href="/">
              <h1 className="text-lg font-semibold text-white hover:font-bold hover:underline">
                ABOUT US
              </h1>
            </Link>
            {/* <Suspense>
              <NewLoginButton />
            </Suspense> */}
            <LoginButton />
            {/* {loginDataCookies === undefined && tokenCookies === undefined ? (
              <div>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-2 bg-transparent px-6 py-6 text-base font-bold text-white hover:text-brandprimary"
                  onClick={handleMobileNavOpen}
                >
                  <Link href="/login">LOGIN</Link>
                </Button>
              </div>
            ) : (
              <>Logout</>
            )} */}
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default NavBar;
