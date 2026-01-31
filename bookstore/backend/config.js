import { configDotenv } from "dotenv";

configDotenv();

export const mongoDBUrl = process.env.MONGODB_URL;

export const PORT = 8080;
