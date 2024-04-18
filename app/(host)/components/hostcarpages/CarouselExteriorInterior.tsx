import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

interface CarouselExtIntProps {
  carImages: File[];
}

const CarouselExteriorInterior = ({ carImages }: CarouselExtIntProps) => {
  return (
    <Carousel
      className="w-full"
      plugins={[
        Autoplay({
          delay: 3000,
          stopOnInteraction: true,
          stopOnMouseEnter: true,
        }),
      ]}
    >
      <CarouselContent className="w-[450px] max-md:w-[330px] max-sm:w-[280px]">
        {carImages.map((image, index) => (
          <CarouselItem key={index}>
            <div className="relative w-full">
              <img
                alt="preview image"
                src={URL.createObjectURL(image)}
                className="left-0 top-0 h-full w-full rounded-2xl object-cover"
              />
              {/* <Image
                  src={image}
                  alt="car pic"
                  objectFit="cover"
                  fill
                  className="left-0 top-0 h-full w-full rounded-2xl object-cover"
                /> */}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  );
};

export default CarouselExteriorInterior;
