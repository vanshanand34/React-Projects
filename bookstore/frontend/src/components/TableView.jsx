import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { Star, DollarSign } from "lucide-react";

export function TableView({ books }) {
    const renderStars = (rating) => {
        return (
            <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        size={14}
                        className={i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                ))}
                <span className="ml-1 text-xs text-gray-600">{rating.toFixed(1)}</span>
            </div>
        );
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                            <th className="px-4 py-4 text-left text-sm font-semibold">No</th>
                            <th className="px-4 py-4 text-left text-sm font-semibold">Title</th>
                            <th className="px-4 py-4 text-left text-sm font-semibold hidden md:table-cell">Author</th>
                            <th className="px-4 py-4 text-left text-sm font-semibold hidden lg:table-cell">Genre</th>
                            <th className="px-4 py-4 text-left text-sm font-semibold">Price</th>
                            <th className="px-4 py-4 text-left text-sm font-semibold hidden md:table-cell">Stock</th>
                            <th className="px-4 py-4 text-left text-sm font-semibold hidden lg:table-cell">Rating</th>
                            <th className="px-4 py-4 text-center text-sm font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book, index) => (
                            <tr
                                key={book._id}
                                className="border-b border-gray-100 hover:bg-indigo-50 transition-colors"
                            >
                                <td className="px-4 py-4 text-sm text-gray-600">
                                    {index + 1}
                                </td>
                                <td className="px-4 py-4">
                                    <div className="font-semibold text-gray-800">{book.title}</div>
                                    <div className="text-xs text-gray-500 md:hidden">{book.author}</div>
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-700 hidden md:table-cell">
                                    {book.author}
                                </td>
                                <td className="px-4 py-4 hidden lg:table-cell">
                                    <span className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-semibold">
                                        {book?.genre || ""}
                                    </span>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="flex items-center gap-1 text-green-600 font-bold">
                                        <DollarSign size={14} />
                                        <span>{(book.price || 0).toFixed(2)}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-4 hidden md:table-cell">
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${book.stock > 10 ? 'bg-green-100 text-green-800' :
                                        book.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                        {book.stock || 0}
                                    </span>
                                </td>
                                <td className="px-4 py-4 hidden lg:table-cell">
                                    {renderStars(book.rating || 0)}
                                </td>
                                <td className="px-4 py-4">
                                    <div className="flex justify-center items-center gap-2">
                                        <Link
                                            to={`/books/details/${book._id}`}
                                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                        >
                                            <BsInfoCircle className="text-lg" />
                                        </Link>
                                        <Link
                                            to={`/books/edit/${book._id}`}
                                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                        >
                                            <AiOutlineEdit className="text-lg" />
                                        </Link>
                                        <Link
                                            to={`/books/delete/${book._id}`}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <MdOutlineDelete className="text-lg" />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}