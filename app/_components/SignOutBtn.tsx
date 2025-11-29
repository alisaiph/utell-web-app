"use client";

import { LogOut } from "lucide-react";
import signOut from "../_lib/auth-client";

export default function SignOutBtn() {
  return (
    <button className="cursor-pointer" onClick={() => signOut()}>
      <LogOut color="#FCBF49" size={45} />
    </button>
  );
}
