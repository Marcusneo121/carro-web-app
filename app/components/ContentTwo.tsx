import HomeContentTwoTab from "@/components/HomeContentTwoTab";
import Image from "next/image";

const ContentTwo = () => {
  return (
    <div className="mx-20 my-10 flex flex-col items-center justify-center max-lg:mx-10">
      <div className="bg-brandprimary flex w-full items-center justify-center rounded-3xl px-12 py-10">
        <div className="flex flex-col gap-10 max-lg:items-center lg:flex-row">
          <Image
            alt="carro logo"
            src="/screenshots/desktop.png"
            width={280}
            height={20}
            objectFit="cover"
          />

          <div>
            <div className="text-3xl font-bold text-white">How to CARRO</div>
            {/* <div className="mt-4 w-[510px]"> */}
            <div className="mt-4">
              <HomeContentTwoTab />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentTwo;
