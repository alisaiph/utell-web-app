"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export default function PropertyPics({
  images,
}: {
  images: { url: string; key: string }[];
}) {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {images.map((img) => (
          <CarouselItem key={img.key} className="basis-full">
            <div className="relative h-100 w-full overflow-hidden rounded-lg">
              <Image
                src={img.url || "/images/placeholder.webp"}
                fill
                alt="pic"
                className="object-cover object-center"
              ></Image>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className={"hidden md:flex"} />
      <CarouselNext className={"hidden md:flex"} />
    </Carousel>
  );
}
