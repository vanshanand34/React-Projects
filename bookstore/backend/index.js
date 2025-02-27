import mongoose from "mongoose";
// import { Book } from "./models/bookModels";
import express from "express";
import { mongoDBUrl, PORT } from "./config.js";
import { Book } from "./models/bookModels.js";

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    console.log("GET request received");
    console.log('Server is running');
    return res.status(200).send("Welcome to mern stack boo project");
})

app.listen(PORT, () => {
    console.log(`App is listening at port number ${PORT}`)
})

// Route for creating new book record
app.post('/books', async (request, response) => {
    try {
        if (!request.body?.title || !request.body?.author || !request.body?.publishedYear) {
            return response.status(400).send("Send all the required fields: title, author, publishedYear");
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishedYear: request.body.publishedYear
        }
        const book = await Book.create(newBook);
        return response.status(201).send(book);

    } catch (err) {
        console.log(err);
        return response.status(500).send(`message : ${err.message}`);
    }
})

//Route for fetching all books
app.get('/books', async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json(
            {
                "count": books.length,
                "books": books
            }
        );
    } catch (err) {
        console.log(err);
        return response.status(500).send(`message: ${err.message}`)
    }
})


mongoose
    .connect(mongoDBUrl)
    .then(
        () => {
            console.log('Connected to DB');
        }
    ).catch(
        (err) => {
            console.log("Error connecting to DB", err);
        }
    )