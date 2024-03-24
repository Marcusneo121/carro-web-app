import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="flex h-[460px] w-full items-start justify-center max-lg:h-[300px] max-md:mb-36">
      <div className="flex flex-col items-end justify-between max-lg:items-center lg:flex-row">
        <div className="flex flex-col gap-4 p-20 max-lg:items-center">
          <p className="text-bigtextbrandcolor w-[530px] text-center text-[50px] font-extrabold max-lg:text-[40px] max-md:w-[300px] lg:text-start">
            Malaysia's Largest Car Sharing Marketplace
          </p>
          <p className="text-smalltextbrandcolor w-[530px] text-[20px] font-medium max-lg:text-center max-md:w-[300px]">
            Book any car, from our peer to peer ride haring platform
          </p>
        </div>

        <div className="invisible grid h-[450px] grid-cols-1 grid-rows-1 lg:visible">
          <div className="bg-greyishbackground h-[450px] w-[375px] rounded-bl-[90px] rounded-br-3xl"></div>
          <div className="relative bottom-20 right-20 h-[200px] w-[540px]">
            <Image
              alt="carro logo"
              src="/decorations/highland_hd.png"
              fill={true}
              objectFit="cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

{
  /* <div className="absolute h-[400px] w-[500px] bg-slate-500"></div>
      <div className="relative h-[250px] w-[600px] ">
        <Image
          alt="carro logo"
          src="/decorations/highland_hd.png"
          fill={true}
          objectFit="cover"
        />
      </div> */
}
