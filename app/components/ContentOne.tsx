import Image from "next/image";

const ContentOne = () => {
  return (
    <div className=" mx-20 flex flex-col items-center justify-center max-lg:mx-10">
      <div className="text-bigtextbrandcolor mb-8 mt-10 text-center text-4xl font-bold max-lg:px-10 max-lg:text-2xl">
        Benefits of CARRO Car Sharing?
      </div>
      <div className="bg-greyishbackground flex w-full flex-row items-center justify-around gap-10 rounded-3xl p-10 max-lg:flex-col">
        {/* Image */}
        <div>
          <Image
            alt="carro logo"
            src="/decorations/eco-friendly.png"
            width={280}
            height={20}
            objectFit="cover"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center">
          <div className="text-bigtextbrandcolor my-2 text-3xl font-bold max-lg:text-2xl">
            Be eco-friendly
          </div>
          <p className="text-smalltextbrandcolor w-[510px] text-[18px] font-medium max-lg:w-[260px] max-lg:text-[17px]">
            Sharing a car takes about 11 cars off the road; that means less
            carbon emissions, less pollution, and better air quality. By sharing
            a car, we are doing ourselves and the planet a favour.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContentOne;
