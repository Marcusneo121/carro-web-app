import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

interface CarDetailCarouselProps {
  carImages: string[];
}

const CarDetailsCarousel = ({ carImages }: CarDetailCarouselProps) => {
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
            <div className="relative w-full pt-[55%]">
              <Image
                src={image}
                alt="car pic"
                objectFit="cover"
                fill
                className="left-0 top-0 h-full w-full rounded-2xl object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CarDetailsCarousel;
