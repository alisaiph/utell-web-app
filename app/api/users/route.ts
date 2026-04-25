import { db } from "@/db";
import { usersTable } from "@/schema";
import { eq } from "drizzle-orm";

// GET /api/users - List all users
export async function GET() {
  try {
    const users = await db.select().from(usersTable);
    return Response.json({ users });
  } catch (error) {
    return Response.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

// POST /api/users - Create a new user
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, email, name } = body;

    if (!username || !email) {
      return Response.json(
        { error: "Username and email are required" },
        { status: 400 },
      );
    }

    const user = await db
      .insert(usersTable)
      .values({
        username,
        email,
        name,
      })
      .returning();

    return Response.json({ user: user[0] }, { status: 201 });
  } catch (error) {
    return Response.json({ error: "Failed to create user" }, { status: 500 });
  }
}
