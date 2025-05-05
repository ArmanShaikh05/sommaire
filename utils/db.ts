import { neon } from "@neondatabase/serverless";

export const getDbConnection = async() => {
  if (!process.env.DATABASE_URL) {
    throw new Error("Database url is not defined");
  }
  const sql = neon(process.env.DATABASE_URL);
  return sql;
};
