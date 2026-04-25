# Neon Setup Complete 🎉

## What's Been Set Up

Your Next.js application is now connected to **Neon Postgres** with **Drizzle ORM** on **Vercel**.

### Connection Details

- **Organization**: org-billowing-grass-31071111
- **Project**: little-thunder-81378061
- **Region**: Asia Pacific (Southeast 1)
- **Connection String**: Stored securely in `.env.local`

### Project Structure

```
src/
├── db.ts              # Drizzle client with Vercel connection pooling
└── schema.ts          # Database schema definitions

drizzle/
└── migrations/        # Version-controlled SQL migrations

drizzle.config.ts     # Drizzle ORM configuration

app/api/users/        # Example API route using Drizzle
```

## Database Schema

### Tables Created

1. **users** - User accounts with username, email, profile info
2. **properties** - Property listings owned by users
3. **rooms** - Individual rooms within properties
4. **bookings** - Room reservations with check-in/check-out dates
5. **reviews** - User reviews and ratings for rooms

### Relationships

- Properties belong to users (ownerId)
- Rooms belong to properties (propertyId)
- Bookings reference rooms and guests (roomId, guestId)
- Reviews reference rooms and guests (roomId, guestId)

## Quick Start: Using the Database

### 1. Insert Data

```typescript
import { db } from "@/db";
import { usersTable } from "@/schema";

const newUser = await db
  .insert(usersTable)
  .values({
    username: "john_doe",
    email: "john@example.com",
    name: "John Doe",
  })
  .returning();
```

### 2. Query Data

```typescript
import { db } from "@/db";
import { usersTable } from "@/schema";

const allUsers = await db.select().from(usersTable);
```

### 3. Update Data

```typescript
import { db } from "@/db";
import { usersTable } from "@/schema";
import { eq } from "drizzle-orm";

await db
  .update(usersTable)
  .set({ name: "Jane Doe" })
  .where(eq(usersTable.id, 1));
```

### 4. Use in API Routes

Check `app/api/users/route.ts` for a working example.

## Next Steps

### Immediate

- [ ] Test your API routes with the example user endpoint
- [ ] Add More tables as needed based on your requirements
- [ ] Generate new migrations: `npx drizzle-kit generate`

### Data Management

- Use [Neon Console](https://console.neon.tech) to browse your database
- Use the Neon VSCode extension (installed via `neon init`) for quick queries
- Create development branches for testing: `npx neonctl branches create --name dev`

### Production

- Connection pooling is automatically handled via `@vercel/functions`
- SSL is configured for secure connections
- Scale-to-zero: Neon will automatically suspend idle computes

## Useful Commands

```bash
# Generate new migrations after schema changes
npx drizzle-kit generate

# Push migrations manually (if needed)
npx drizzle-kit migrate

# Open Neon console
npx neonctl project browse

# Create a development branch
npx neonctl branches create --name dev
```

## Documentation

- [Drizzle ORM Docs](https://orm.drizzle.team)
- [Neon Docs](https://neon.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

## Support

- Neon Feedback: feedback@neon.tech
- Drizzle Support: https://discord.gg/yfjzuUZct7

---

**Setup completed on**: April 25, 2026
**Neon Org**: org-billowing-grass-31071111
**Neon Project**: little-thunder-81378061
