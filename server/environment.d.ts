declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REFRESH_SECRET: string;
      ACCESS_SECRET: string;

      DB_HOST: string;
      DB_PORT: number;

      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_DB: string;

      REDIS_HOST: string;
      REDIS_PORT: number;
    }
  }
}
