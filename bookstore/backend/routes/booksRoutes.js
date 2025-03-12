import express from "express";
import { Book } from "../models/bookModels.js";

const router = express.Router();

// Route for creating new book record

router.post('/', async (request, response) => {
    try {
        if (!request.body?.title || !request.body?.author || !request.body?.publishedYear) {
            return response.status(400).json({
                "error": "Send all the required fields: title, author, publishedYear"
            });
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
        return response.status(500).json({
            "error": err.message
        })
    }
})


//Route for fetching all books

router.get('/', async (request, response) => {
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
        return response.status(500).json({
            "error": err.message
        })
    }
})

// Route for fetching data of one particular book

router.get('/:id', async (request, response) => {
    const { id } = request.params;
    try {
        console.log("id = ", id);
        const book = await Book.findById(id);
        return response.status(200).json({
            "message": "Record Fetched successfully",
            "book": book
        })
    } catch (err) {
        console.log(err);
        return response.status(500).json({
            "error": err.message
        })
    }

})

// Route for updating a Book Record

router.put('/:id', async (request, response) => {
    const { id } = request.params;
    try {

        if (!request.body?.title || !request.body?.author || !request.body?.publishedYear) {
            return response.status(400).json({
                "error": "Send all the required fields: title, author, publishedYear"
            });
        }

        const book = await Book.findByIdAndUpdate(id, request.body);

        if (!book) {
            return response.status(400).json({
                "message": "Book Record not found"
            })
        }

        const updatedBook = await Book.findById(id);

        return response.status(200).json({
            "message": "Record Updated successfully",
            "book": updatedBook
        })

    } catch (err) {
        console.log(err);
        return response.status(500).json({
            "error": err.message
        })
    }

})

// Route for deleting a particular book record

router.post('/:id/delete', async (request, response) => {
    const { id } = request.params;

    try {
        const book = await Book.findByIdAndDelete(id);
        if (!book) {
            response.status(400).json({
                "error": "Book record not found"
            })
        }
        response.status(200).json({
            "message": "Book record deleted successfully"
        })

    } catch (err) {
        response.status(500).json({
            "error": err.message
        })
    }
})

export default router;