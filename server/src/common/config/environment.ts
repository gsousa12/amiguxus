const getEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Variável de ambiente obrigatória não definida: ${key}`);
  }
  return value;
};

const getEnvAsInt = (key: string, defaultValue: number): number => {
  const value = process.env[key];
  return value ? parseInt(value, 10) : defaultValue;
};

export const environment = {
  PORT: getEnvAsInt("PORT", 3000),
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL: getEnv("DATABASE_URL"),
  JWT_SECRET: getEnv("JWT_SECRET"),
  API_BASE_URL: getEnv("API_BASE_URL"),
  REDIS_HOST: process.env.REDIS_HOST || "localhost",
  REDIS_PORT: getEnvAsInt("REDIS_PORT", 6379),
  REDIS_PASSWORD: process.env.REDIS_PASSWORD || "",
  COOKIE_SECRET: getEnv("COOKIE_SECRET"),
  MINIO_ENDPOINT: process.env.MINIO_ENDPOINT || "http://localhost",
  MINIO_PORT: getEnvAsInt("MINIO_PORT", 9000),
  MINIO_ACCESS_KEY: getEnv("MINIO_ACCESS_KEY"),
  MINIO_SECRET_KEY: getEnv("MINIO_SECRET_KEY"),
  MINIO_BUCKET_NAME: getEnv("MINIO_BUCKET_NAME"),
  MINIO_PUBLIC_URL: getEnv("MINIO_PUBLIC_URL"),
};
