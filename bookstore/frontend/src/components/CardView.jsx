import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { Star, DollarSign, Package, Tag } from "lucide-react";

export function CardView({ books }) {
    const renderStars = (rating) => {
        return (
            <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        size={16}
                        className={i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                ))}
                <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
            </div>
        );
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map((book) => (
                <div 
                    key={book._id}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-200 flex flex-col"
                >
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2"></div>
                    
                    <div className="p-5 flex-1 flex flex-col">
                        {/* Header */}
                        <div className="mb-4">
                            <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-2">
                                {book.title}
                            </h3>
                            <p className="text-gray-600 text-sm">by {book.author}</p>
                        </div>

                        {/* Details */}
                        <div className="space-y-3 mb-4 flex-1">
                            <div className="flex items-center justify-between">
                                <span className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-semibold">
                                    <Tag size={12} />
                                    {book.genre}
                                </span>
                                {renderStars(book.rating)}
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1 text-gray-700">
                                    {/* <DollarSign size={18} className="text-green-600" /> */}
                                    <span className="font-bold text-xl text-green-600">
                                        ${book.price.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Package size={16} className="text-gray-500" />
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                        book.stock > 10 ? 'bg-green-100 text-green-800' :
                                        book.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>
                                        {book.stock}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 pt-4 border-t border-gray-100">
                            <Link
                                to={`/books/details/${book._id}`}
                                className="flex-1 bg-green-50 text-green-700 px-3 py-2 rounded-lg hover:bg-green-100 transition-colors flex items-center justify-center gap-2 font-medium text-sm"
                            >
                                <BsInfoCircle size={16} />
                                <span className="hidden sm:inline">View</span>
                            </Link>
                            <Link
                                to={`/books/edit/${book._id}`}
                                className="flex-1 bg-indigo-50 text-indigo-700 px-3 py-2 rounded-lg hover:bg-indigo-100 transition-colors flex items-center justify-center gap-2 font-medium text-sm"
                            >
                                <AiOutlineEdit size={16} />
                                <span className="hidden sm:inline">Edit</span>
                            </Link>
                            <Link
                                to={`/books/delete/${book._id}`}
                                className="flex-1 bg-red-50 text-red-700 px-3 py-2 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-2 font-medium text-sm"
                            >
                                <MdOutlineDelete size={16} />
                                <span className="hidden sm:inline">Delete</span>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}