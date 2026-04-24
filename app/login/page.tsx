"use client";

import SocialLoginBtn from "../_components/SocialLoginBtn";
import GoogleLogo from "../_components/svg/GoogleLogo";
import FacebookLogo from "../_components/svg/FacebookLogo";
import { signInGoogle } from "../_lib/auth-client";
import Image from "next/image";

export default function page() {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="flex gap-5 justify-between bg-bg-light rounded-4xl p-5 max-w-250 w-full">
        <div className="flex flex-col items-center justify-center gap-8 px-10">
          <div>
            <h2 className="text-3xl font-semibold pb-1">Welcome back</h2>
            <h3 className="text-lg font-medium">Please enter your details</h3>
          </div>

          {/* FORM */}
          <form action="" className="flex flex-col gap-3 min-w-2xs">
            <input
              className="border-2 border-bg-dark rounded-xl p-3"
              type="email"
              name="email"
              placeholder="Email"
            />
            <input
              className="border-2 border-bg-dark rounded-xl p-3"
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
          <div className="flex items-center min-w-100">
            <hr className="flex-1 border border-bg" />
            <p className="font-semibold text-utell-daccent min-w-15 text-center">
              or
            </p>
            <hr className="flex-1 border border-bg" />
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
        <div className="w-full relative overflow-hidden rounded-2xl max-w-md min-w-70 h-150">
          <Image
            src={"/images/login-img.webp"}
            fill
            alt="Login image"
            className="object-cover rounded-3xl"
          />
        </div>
      </div>
    </div>
  );
}
