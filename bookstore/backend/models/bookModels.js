// Backend Book Model Update
// File: models/bookModel.js

import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        genre: {
            type: String,
            required: true,
            enum: ['Fiction', 'Non-Fiction', 'Self-Help', 'Mystery', 'Science Fiction', 'Biography', 'Romance', 'Thriller']
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        stock: {
            type: Number,
            required: true,
            min: 0,
            default: 0
        },
        rating: {
            type: Number,
            required: true,
            min: 0,
            max: 5,
            default: 0
        }
    },
    {
        timestamps: true,
    }
);

export const Book = mongoose.model('Book', bookSchema);

/* 
CHANGES MADE TO THE BOOK MODEL:
================================

OLD FIELDS (REMOVED):
- publishedYear: Number

NEW FIELDS (ADDED):
- genre: String (enum with predefined categories)
- price: Number (with minimum value validation)
- stock: Number (inventory quantity, default 0)
- rating: Number (0-5 scale for customer ratings)

The model now focuses on inventory management rather than bibliographic data.
This allows for better tracking of:
- Product pricing and value
- Stock levels and availability
- Customer satisfaction through ratings
- Product categorization through genres
*/