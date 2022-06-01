export const configuration = {
  JWT_SECRET: process.env.JWT_SECRET || "",

  DB_HOST: process.env.DB_HOST || "",
  DB_PORT: parseInt(process.env.DB_PORT as string) || 5432,

  POSTGRES_USER: process.env.POSTGRES_USER || "",
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || "",
  POSTGRES_DB: process.env.POSTGRES_DB || "",
};
