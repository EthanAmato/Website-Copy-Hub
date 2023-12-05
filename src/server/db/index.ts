import { drizzle } from "drizzle-orm/node-postgres";
import { Client, Pool } from "pg";
import { env } from "~/env.mjs";
import * as schema from "./schema";

const client = new Pool({
  connectionString: env.DATABASE_URL,
  
});

export const db = drizzle(client, {
  schema: schema,
});
