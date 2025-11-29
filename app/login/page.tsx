"use client";

import SocialLoginBtn from "../_components/SocialLoginBtn";
import { signInGoogle } from "../_lib/auth-client";

export default function page() {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <h2 className="text-3xl font-bold">Login</h2>

      <div className="flex flex-col gap-3 w-100">
        <SocialLoginBtn handleClick={signInGoogle}>
          Login with Google
        </SocialLoginBtn>

        <SocialLoginBtn handleClick={signInGoogle}>
          Login with Facebook
        </SocialLoginBtn>
      </div>

      <div className="flex justify-between items-center gap-4 w-100">
        <hr className="flex-1 border border-utell-laccent" />
        <p className="text-utell-daccent min-w-20 text-center">Or with email</p>
        <hr className="flex-1 border border-utell-laccent" />
      </div>
    </div>
  );
}
