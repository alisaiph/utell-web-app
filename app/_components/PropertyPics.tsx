import Image from "next/image";

export default function PropertyPics({
  images,
}: {
  images: { imageUrl: string }[];
}) {
  return (
    <div className=" flex h-100 flex-row gap-8 bg-bg-light p-5 rounded-2xl">
      <div className="relative rounded-xl flex-1 min-w-60 overflow-hidden">
        <Image
          src={images[0]?.imageUrl || "/images/placeholder.webp"}
          fill
          alt="pic"
          className="object-cover"
        ></Image>
      </div>

      <div className="flex flex-1 flex-col gap-8">
        <div className="relative rounded-xl flex-1 overflow-hidden">
          <Image
            src={images[1]?.imageUrl || "/images/placeholder.webp"}
            fill
            alt="pic"
            className="object-cover"
          ></Image>
        </div>

        <div className="flex flex-1 min-w-100 gap-8">
          <div className="relative rounded-xl flex-1 overflow-hidden">
            <Image
              src={images[2]?.imageUrl || "/images/placeholder.webp"}
              fill
              alt="pic"
              className="object-cover"
            ></Image>
          </div>
        </div>
      </div>
    </div>
  );
}
