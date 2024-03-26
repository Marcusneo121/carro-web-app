import React from "react";
import Image from "next/image";

const AuthPageHeader = () => {
  return (
    <div className="bg-brandprimary px-10 max-md:pt-5 md:py-5">
      <div className="flex items-center justify-center gap-3 md:justify-start">
        <div className="relative h-14 w-14 md:h-20 md:w-20">
          <Image
            alt="carro logo"
            src="/logos/logo-white.png"
            fill={true}
            objectFit="cover"
          />
        </div>
        <h1 className="visible pt-2 text-3xl font-bold leading-none text-white md:text-5xl">
          CARRO
        </h1>
      </div>
    </div>
  );
};

export default AuthPageHeader;
