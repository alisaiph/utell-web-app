import { nextCookies } from "better-auth/next-js";
import { createAuthClient } from "better-auth/react";
import { redirect } from "next/navigation";

export const authClient = createAuthClient({
  // plugins: [nextCookies()], // Enable cookie handling for Next.js
});

export async function signInGoogle() {
  const data = await authClient.signIn.social({
    provider: "google",
  });
  return data;
}

export default async function signOut() {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        redirect("/"); // redirect to login page
      },
    },
  });
}
