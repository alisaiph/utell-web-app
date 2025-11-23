import Image from "next/image";

export default function PropertyPics() {
  return (
    <div className="flex h-100 flex-row gap-8">
      <div className="relative rounded-2xl flex-1 min-w-60 overflow-hidden">
        <Image
          src={"/images/property-card-img.webp"}
          fill
          alt="pic"
          className="object-cover"
        ></Image>
      </div>

      <div className="flex flex-1 flex-col gap-8">
        <div className="relative rounded-2xl flex-1 overflow-hidden">
          <Image
            src={"/images/property-card-img.webp"}
            fill
            alt="pic"
            className="object-cover"
          ></Image>
        </div>

        <div className="flex flex-1 min-w-100 gap-8">
          <div className="relative rounded-2xl flex-1 overflow-hidden">
            <Image
              src={"/images/property-card-img.webp"}
              fill
              alt="pic"
              className="object-cover"
            ></Image>
          </div>

          <div className="relative rounded-2xl flex-1 overflow-hidden">
            <Image
              src={"/images/property-card-img.webp"}
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
