import React from "react";
import { BookCard } from "./BookCard";

export function CardView({ books }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-2 py-8">
            {books.map(book =>
                <BookCard book={book} key={book._id} />
            )}
        </div>
    )
}