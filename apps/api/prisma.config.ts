import { defineConfig } from "prisma/config";
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.join(__dirname, ".env");

console.log("Prisma config dir:", __dirname);
console.log("Looking for .env at:", envPath);
console.log(".env exists:", fs.existsSync(envPath));

dotenv.config({ path: envPath });

console.log("DATABASE_URL loaded:", !!process.env.DATABASE_URL);

export default defineConfig({
  schema: path.join(__dirname, "prisma/schema.prisma"),
  migrations: {
    path: path.join(__dirname, "prisma/migrations"),
  },
  datasource: {
    url: process.env.DATABASE_URL || "",
  },
});