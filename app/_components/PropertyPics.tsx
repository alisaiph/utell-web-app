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
    <Carousel className="w-full rounded-lg overflow-hidden">
      <CarouselContent>
        {images.map((img) => (
          <CarouselItem key={img.key} className="basis-1/2">
            <div className="relative h-100 w-full rounded-lg overflow-hidden">
              <Image
                src={img.url || "/images/placeholder.webp"}
                fill
                alt="pic"
                className="object-cover"
              ></Image>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
