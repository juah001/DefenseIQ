import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const globalForPrisma = globalThis as {
  prisma?: PrismaClient;
  pgPool?: pg.Pool;
};

const adapter = new PrismaPg({ connectionString });

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });

const pool =
  globalForPrisma.pgPool ??
  new Pool({
    connectionString,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
  globalForPrisma.pgPool = pool;
}

export async function query(text: string, params: unknown[] = []) {
  return pool.query(text, params);
}

export default prisma;