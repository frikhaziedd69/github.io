import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

// In development, if DATABASE_URL isn't provided we fall back to an in-memory
// mock. This allows the app to run locally without needing a PostgreSQL
// instance. The mock implements just enough of the drizzle interface for
// `storage.createInquiry` (which only calls `.insert(...).values(...).returning()`).

function createMockDb() {
  type AnyObj = Record<string, any>;
  const data: AnyObj[] = [];
  return {
    insert: (_table: any) => ({
      values: (row: AnyObj) => ({
        returning: () => {
          const entry = { ...row, id: data.length + 1, createdAt: new Date() };
          data.push(entry);
          return [entry];
        },
      }),
    }),
  } as any;
}

let dbInstance: any;
let pool: any;

if (!process.env.DATABASE_URL) {
  if (process.env.NODE_ENV === "development") {
    console.warn(
      "DATABASE_URL not set; using in-memory mock database (development only).",
    );
    dbInstance = createMockDb();
  } else {
    throw new Error(
      "DATABASE_URL must be set. Did you forget to provision a database?",
    );
  }
} else {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
  dbInstance = drizzle(pool, { schema });
}

export { pool };
export const db = dbInstance;
