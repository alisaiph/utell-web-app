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
  contactPhone: string;
  contactEmail?: string | null;
}) {
  const user = await getUser(owner);
  const { displayUsername, username, image } = user;

  return (
    <div className="flex gap-5">
      <Link href={`/user/${username}`}>
        <div className="bg-bg-light flex items-center justify-center gap-4 rounded-2xl px-6 py-3">
          <div className="relative aspect-square w-15 overflow-hidden rounded-xl">
            <Image
              src={image ?? "/avatar-img.png"}
              fill
              alt="avatar"
              className="object-cover"
            ></Image>
          </div>

          <div className="text-md">
            <p className="font-semibold">{`${
              contactPhone || contactEmail ? "Managed by " : ""
            } ${displayUsername || username}`}</p>

            <p className="text-utell-daccent mb-1 font-semibold">{`${username}`}</p>
          </div>
        </div>
      </Link>

      {(contactPhone || contactEmail) && (
        <div className="bg-bg-light flex items-center justify-between gap-5 rounded-2xl px-6 py-3">
          <div className="text-md flex items-center gap-2">
            <Smartphone size={20} />
            <p>{contactPhone}</p>
          </div>

          {contactEmail && (
            <div className="text-md flex items-center gap-2">
              <Mail size={20} />
              <p>{contactEmail}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
