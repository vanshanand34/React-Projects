import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { mongoDBUrl, PORT } from "./config.js";
import booksRouter from "./routes/booksRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  console.log("Server is running");
  return res.status(200).send("Welcome to mern stack book store project");
});

app.use("/books", booksRouter);

mongoose
  .connect(mongoDBUrl)
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`App is listening at port number ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to DB", err);
  });
