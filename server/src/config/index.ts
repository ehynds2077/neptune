export const configuration = {
  ACCESS_SECRET: process.env.ACCESS_SECRET || "",
  REFRESH_SECRET: process.env.REFRESH_SECRET || "",

  DB_HOST: process.env.DB_HOST || "",
  DB_PORT: parseInt(process.env.DB_PORT as string) || 5432,

  POSTGRES_USER: process.env.POSTGRES_USER || "",
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || "",
  POSTGRES_DB: process.env.POSTGRES_DB || "",

  PROD: process.env.PROD || false,
  DATABASE_URL: process.env.DATABASE_URL || "",
  NODE_ENV: process.env.NODE_ENV || "development",
};
