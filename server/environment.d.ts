declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;

      DB_HOST: string;
      DB_PORT: number;

      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_DB: string;
    }
  }
}
