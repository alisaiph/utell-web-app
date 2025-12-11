import { betterAuth } from "better-auth";
import { username } from "better-auth/plugins";
import { Pool } from "pg";
import { generateUsername } from "./data-service";
import { redirect } from "next/navigation";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const auth = betterAuth({
  database: pool,
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
              const { rowCount } = await pool.query(
                'SELECT 1 FROM "user" WHERE username = $1 LIMIT 1',
                [newUsername]
              );

              // if unique
              if (rowCount === 0) {
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
