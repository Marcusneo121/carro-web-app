import Image from "next/image";

const Footer = () => {
  return (
    <div>
      <div className="bg-greyishbackground px-20 py-14 max-lg:px-10">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <Image
              alt="carro logo"
              src="/logos/logo-colored.png"
              width={60}
              height={20}
              objectFit="cover"
            />
            <h1 className="text-brandprimary visible pt-2 text-[35px] font-bold leading-none max-xl:hidden">
              TREVO
            </h1>
          </div>
          <p className="max-w-[350px] text-sm">
            CARRO is a Malaysian trusted peer to peer car sharing platform where
            Guests can rent any car that fits the needs and wants for the trips
            they are going to, from the nearest Hosts in the TREVO community.
          </p>
        </div>
      </div>
      <div className="bg-brandprimary flex justify-center py-3 font-bold text-white">
        From Malaysia with Innovation, Passion & ❤️️
      </div>
    </div>
  );
};

export default Footer;
