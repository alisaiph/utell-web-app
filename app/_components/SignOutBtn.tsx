"use client";

import { LogOut } from "lucide-react";
import signOut from "../_lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignOutBtn() {
  const router = useRouter();

  function handleSignOut() {
    signOut();
    router.refresh(); // so the session state is updated on the client
  }
  return (
    <button className="cursor-pointer" onClick={handleSignOut}>
      <LogOut color="#FCBF49" size={45} />
    </button>
  );
}
