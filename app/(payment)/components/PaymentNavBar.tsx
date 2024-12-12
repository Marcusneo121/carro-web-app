import React from "react";
import Image from "next/image";
import Cookies from "js-cookie";

import { Separator } from "@/components/ui/separator";
import { ILogoutProps } from "@/types/api_index";
import { logoutUser } from "@/services/auth";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const PaymentNavBar = () => {
  return (
    <div className="bg-brandprimary px-4 py-4 md:py-8 md:px-14">
      <div className="flex items-center justify-between">
        {/* Logo section */}
        <div className="flex items-center gap-3 justify-center">
          <div className="relative h-14 w-14 md:h-16 md:w-16">
            <Image
              alt="PPCar logo"
              src="/logos/logo-white.svg"
              fill={true}
              objectFit="cover"
            />
          </div>
          <h1 className="visible pt-2 text-[35px] font-bold leading-none text-white">
            PPCar
          </h1>
        </div>
      </div>
    </div>
  );
};

export default PaymentNavBar;
