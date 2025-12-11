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
  const { displayUsername, username } = user;

  return (
    <div className="flex flex-col gap-5">
      <Link href={`/user/${username}`}>
        <div className="flex items-center justify-center gap-8 bg-white rounded-2xl p-5">
          <div className="relative rounded-xl w-20 aspect-square overflow-hidden">
            <Image
              src={"/images/avatar-img.png"}
              fill
              alt="avatar"
              className="object-cover"
            ></Image>
          </div>

          <div className="text-md w-70">
            <p className="font-semibold">{`${
              contactPhone || contactEmail ? "Managed by " : ""
            } ${displayUsername || username}`}</p>

            <p className="font-semibold text-utell-daccent mb-1">{`${username}`}</p>

            {(contactPhone || contactEmail) && (
              <div className="flex items-center gap-3">
                <p>View profile</p>
                <ArrowRight color="#fcbf49" size={25} />
              </div>
            )}
          </div>
        </div>
      </Link>

      {(contactPhone || contactEmail) && (
        <div className="flex items-center justify-between bg-white rounded-2xl py-5 px-12 shadow-lg">
          <div className="flex items-center gap-3 text-md">
            <Smartphone size={20} />
            <p>{contactPhone}</p>
          </div>

          <div className="flex items-center gap-3 text-md">
            <Mail size={20} />
            <p>{contactEmail}</p>
          </div>
        </div>
      )}
    </div>
  );
}
