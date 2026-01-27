import { configDotenv } from "dotenv";

configDotenv();

export const mongoDBUrl = `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@vanshproject.z0naq.mongodb.net/books-collection?retryWrites=true&w=majority&appName=VanshProject`;

export const PORT = 8080;
