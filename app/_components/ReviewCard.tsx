import Image from "next/image";

export default function ReviewCard() {
  return (
    <div className="flex flex-col bg-white rounded-xl p-10 gap-5">
      <div className="flex gap-4 items-center">
        <div className="relative rounded-xl w-15 aspect-square overflow-hidden">
          <Image
            src={"/images/avatar-img.png"}
            fill
            alt="avatar"
            className="object-cover"
          ></Image>
        </div>

        <p className="font-bold text-md">Alifulhu</p>
      </div>

      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since.
      </p>

      <p className="text-utell-laccent text-right">03 March 2025</p>
    </div>
  );
}
