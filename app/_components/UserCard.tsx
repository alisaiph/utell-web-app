import { ArrowRight, Mail, Smartphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getUser } from "../_lib/data-service";

export default async function UserCard({
  owner,
  contactPhone,
  contactEmail,
}: {
  owner: string;
  contactPhone?: number;
  contactEmail?: string;
}) {
  const user = await getUser(owner);
  const { displayUsername, username, image } = user;

  return (
    <div className="flex  gap-5">
      <Link href={`/user/${username}`}>
        <div className="flex items-center justify-center gap-4 bg-white rounded-2xl px-6 py-3">
          <div className="relative rounded-xl w-15 aspect-square overflow-hidden">
            <Image
              src={image}
              fill
              alt="avatar"
              className="object-cover"
            ></Image>
          </div>

          <div className="text-md">
            <p className="font-semibold">{`${
              contactPhone || contactEmail ? "Managed by " : ""
            } ${displayUsername || username}`}</p>

            <p className="font-semibold text-utell-daccent mb-1">{`${username}`}</p>
          </div>
        </div>
      </Link>

      {(contactPhone || contactEmail) && (
        <div className="flex items-center justify-between gap-5 bg-white rounded-2xl px-6 py-3">
          <div className="flex items-center gap-2 text-md">
            <Smartphone size={20} />
            <p>{contactPhone}</p>
          </div>

          <div className="flex items-center gap-2 text-md">
            <Mail size={20} />
            <p>{contactEmail}</p>
          </div>
        </div>
      )}
    </div>
  );
}
