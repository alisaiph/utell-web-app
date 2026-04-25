import { betterAuth } from "better-auth";
import { username } from "better-auth/plugins";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { db } from "@/db";
import { user as userTable } from "@/auth-schema";
import { generateUsername } from "./data-service";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import * as authSchema from "@/auth-schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: authSchema,
  }),
  secret: process.env.BETTER_AUTH_SECRET as string,

  emailAndPassword: {
    enabled: true,
  },
  plugins: [username()],

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  databaseHooks: {
    // added hook to set default username
    user: {
      create: {
        before: async (user) => {
          // check if unique in user table
          for (let i = 0; i < 12; i++) {
            const newUsername = generateUsername();
            try {
              const existingUser = await db
                .select()
                .from(userTable)
                .where(eq(userTable.username, newUsername))
                .limit(1);

              // if unique
              if (existingUser.length === 0) {
                return { data: { ...user, username: newUsername } };
              }
            } catch (error) {
              console.error("Username not unique:", error);
            }
          }

          // if not unique, add timestamp + short id
          const fallback = `user${Date.now().toString(36).slice(-6)}`;
          return { data: { ...user, username: fallback } };
        },
      },
    },
  },

  user: {
    additionalFields: {
      onboardCompleted: {
        type: "boolean",
        defaultValue: false,
        required: false,
      },
    },
  },
});
