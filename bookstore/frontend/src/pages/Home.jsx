import React from "react";
import { Spinner } from "../components/Spinner";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdDeleteOutline, MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { BookCard } from "./BookCard";
import axios from "axios";
import { DeleteModal } from "./DeleteModal";

export function Home() {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [displayType, setDisplayType] = useState("table");

    useEffect(() => {
        setIsLoading(true);
        axios.get(
            "http://localhost:8080/books"
        ).then(
            (res) => {
                console.log(res);
                setBooks(res.data.books);
                setIsLoading(false);
            }
        ).catch(
            (err) => {
                console.log(err);
                setIsLoading(true);
            }
        )
    }, [])

    return (
        <div className="p-4 px-8">
            <div className="flex justify-between items-center py-4 px-6">
                <div className="text-4xl font-sans py-4">Books List</div>

                <div className="px-4 flex gap-x-4">
                    <button
                        className="px-4 py-2 bg-sky-400 text-white hover:bg-white hover:text-sky-600 hover:outline hover:outline-sky-600 cursor-pointer rounded-lg"
                        onClick={() => setDisplayType("table")}
                    >
                        Table
                    </button>
                    <button
                        className="px-4 py-2 bg-sky-400 text-white hover:bg-white hover:text-sky-600 hover:outline hover:outline-sky-600 cursor-pointer rounded-lg"
                        onClick={() => setDisplayType("card")}
                    >
                        Card
                    </button>
                </div>
                <Link to={"/books/create"}>
                    <MdOutlineAddBox className="text-4xl text-sky-500" />
                </Link>
            </div>
            <div className="">
                {
                    isLoading ?
                        <div className="h-[60vh] items-center flex justify-center p-8"><Spinner /></div> :
                        (
                            displayType === "table" ?
                                <BookTable books={books} /> :
                                <BookCards books={books} />
                        )
                }
            </div>
        </div>
    )
}


function BookTable({ books }) {
    const [deleteBookId, setDeleteBookId] = useState(0);

    function deleteBook(id) {
        axios
            .post(`http://localhost:8080/books/delete/${id}`)
            .then(res => {
                console.log(res);
                setDeleteBookId(0);
                window.location.reload();
            })
            .catch(err => {
                console.error(err);
                alert("Some error occurred while deleting the book record")
            })

    }


    return (
        <>
            <table className="w-full border-separate border-spacing-2 p-4">
                <thead>
                    <tr>
                        <th className="border border-slate-600 rounded-md p-1">No</th>
                        <th className="border border-slate-600 rounded-md p-1">Title</th>
                        <th className="border border-slate-600 rounded-md max-md:hidden p-1">Author</th>
                        <th className="border border-slate-600 rounded-md max-md:hidden p-1">Published Year</th>
                        <th className="border border-slate-600 rounded-md">Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book, index) =>
                        <tr key={book._id}>
                            <td className="border border-slate-600 rounded-md text-center p-1">{index + 1}</td>
                            <td className="border border-slate-600 rounded-md text-center p-1">{book.title}</td>
                            <td className="border border-slate-600 rounded-md text-center max-md:hidden p-1">{book.author}</td>
                            <td className="border border-slate-600 rounded-md text-center max-md:hidden p-1">{book.publishedYear}</td>
                            <td className="border border-slate-600 rounded-md text-center p-1">
                                <div className="flex justify-center items-center gap-x-4">
                                    <Link to={`books/show/${book._id}`}>
                                        <BsInfoCircle className="text-xl text-slate-900 hover:-translate-y-0.5" />
                                    </Link>
                                    <Link to={`books/edit/${book._id}`}>
                                        <AiOutlineEdit className="text-xl text-blue-700" />
                                    </Link>

                                    <MdDeleteOutline
                                        className="text-xl text-red-500 cursor-pointer"
                                        onClick={() => setDeleteBookId(book._id)}
                                    />
                                </div>
                            </td>
                        </tr>
                    )}

                </tbody>
            </table>
            {
                deleteBookId !== 0 &&
                <DeleteModal
                    onClose={() => setDeleteBookId(0)}
                    deleteBook={() => deleteBook(deleteBookId)}
                />
            }
        </>
    )
}

function BookCards({ books }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-2 py-8">
            {books.map(book =>
                <BookCard book={book} key={book._id} />
            )}
        </div>
    )
}