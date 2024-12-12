import Image from "next/image";

const Footer = () => {
  return (
    <div>
      {/* bg-greyishbackground */}
      <div className="bg-slate-50 px-20 py-14 max-lg:px-10">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <Image
              alt="ppcar logo"
              src="/logos/logo-colored.svg"
              width={60}
              height={20}
              objectFit="cover"
            />
            <h1 className="visible pt-2 text-[35px] font-bold leading-none text-brandprimary max-xl:hidden">
              PPCar
            </h1>
          </div>
          <p className="max-w-[350px] text-sm">
            PPCar is a Malaysian trusted peer to peer car sharing platform where
            Guests can rent any car that fits the needs and wants for the trips
            they are going to, from the nearest Hosts in the PPCar community.
          </p>
        </div>
      </div>
      <div className="flex justify-center bg-brandprimary py-3 font-bold text-white">
        From Malaysia with Innovation, Passion & ❤️️
      </div>
    </div>
  );
};

export default Footer;
