import React from "react";
import Image from "next/image";
import Cookies from "js-cookie";

import { Separator } from "@/components/ui/separator";
import { ILogoutProps } from "@/types/api_index";
import { logoutUser } from "@/services/auth";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
const CarUserAction = dynamic(() => import("./CarUserAction"), { ssr: false });

const CarNavBar = () => {
  return (
    <div className="bg-brandprimary px-10 py-4 md:py-8">
      <div className="flex items-center justify-between">
        {/* Logo section */}
        <div className="flex items-center gap-3">
          <div className="relative h-16 w-16 md:h-16 md:w-16">
            <Image
              alt="ppcar logo"
              src="/logos/logo-white.svg"
              fill={true}
              objectFit="cover"
            />
          </div>
          <h1 className="visible pt-2 text-[40px] font-bold leading-none text-white max-xl:hidden">
            PPCar
          </h1>
        </div>

        {/* User Actions */}
        <div>
          <CarUserAction />
        </div>
      </div>
    </div>
  );
};

export default CarNavBar;
