"use client";

import SocialLoginBtn from "../_components/SocialLoginBtn";
import GoogleLogo from "../_components/svg/GoogleLogo";
import FacebookLogo from "../_components/svg/FacebookLogo";
import { signInGoogle } from "../_lib/auth-client";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export default function page() {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="flex flex-col md:flex-row gap-5 justify-between bg-bg-light rounded-4xl p-5">
        <div className="flex flex-col items-center justify-center gap-8 px-15 order-2 md:order-2">
          <div>
            <h2 className="text-3xl font-semibold pb-1">Welcome back</h2>
            <h3 className="text-lg font-medium">Please enter your details</h3>
          </div>

          {/* FORM */}
          <form action="" className="flex flex-col gap-3 w-full">
            <input
              className="border-2 border-bg-dark rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-utell-yellow"
              type="email"
              name="email"
              inputMode="email"
              placeholder="Email"
            />
            <input
              className="border-2 border-bg-dark rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-utell-yellow"
              type="password"
              name="password"
              placeholder="Password"
            />
            <input
              className="bg-utell-yellow font-semibold text-white rounded-xl p-3 cursor-pointer"
              type="submit"
              value="Login"
            />
          </form>

          {/* DIVIDER */}

          <div className="w-full flex flex-col items-center gap-2">
            <Separator />
            <p className="text-utell-daccent text-sm text-center">
              Or login using social app
            </p>
          </div>

          {/* SOCIAL LOGIN */}
          <div className="flex gap-3">
            <SocialLoginBtn handleClick={signInGoogle}>
              <GoogleLogo />
            </SocialLoginBtn>

            <SocialLoginBtn handleClick={signInGoogle}>
              <FacebookLogo />
            </SocialLoginBtn>
          </div>
        </div>

        {/* IMAGE */}
        <div className="w-full h-40 md:h-150 aspect-5/6 relative overflow-hidden rounded-2xl order-1 md:order-3">
          <Image
            src={"/images/login-img.webp"}
            fill
            alt="Login image"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
