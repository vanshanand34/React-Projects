import React from "react";
import { useState, useEffect } from "react";
import { Spinner } from "../components/Spinner";
import { BackButton } from "../components/BackButton";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export function EditBook() {

    const [bookTitle, setBookTitle] = useState("");
    const [bookAuthor, setBookAuthor] = useState("");
    const [bookpublishedYear, setBookPublishedYear] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        setIsLoading(true);

        axios.get(`http://localhost:8080/books/${id}`)
            .then(
                (res) => {
                    console.log(res);
                    const book = res.data.book;
                    setBookTitle(book.title);
                    setBookAuthor(book.author);
                    setBookPublishedYear(book.publishedYear);
                    setIsLoading(false);
                }
            ).catch(
                (err) => {
                    console.log(err);
                    setIsLoading(true);
                }
            )
    }, [])

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);

        const data = {
            title: bookTitle,
            author: bookAuthor,
            publishedYear: bookpublishedYear
        };

        axios.put(`http://localhost:8080/books/edit/${id}`, data)
            .then(res => {
                console.log(res);
                setIsLoading(false);
                navigate('/');
            }).catch(err => {
                console.log(err);
                alert("Some error occurred while creating the record, please try again!")
                setIsLoading(false);
            })

    }


    return (
        <>
            <div className="p-4">
                <div className="flex p-4 pb-20 gap-x-6">
                    <BackButton />
                    <h3 className="text-3xl">
                        Edit Book
                    </h3>
                </div>

                <div>
                    {
                        isLoading ?
                            <div className="h-[60vh] items-center flex justify-center p-8"><Spinner /></div> :

                            <form
                                className="mx-auto rounded border-2 border-blue-500 py-4 px-6 w-fit shadow"
                                onSubmit={handleSubmit}
                            >
                                <div className="flex flex-col py-3">
                                    <label htmlFor="bookTitle">Title</label>
                                    <input type="text" id="bookTitle" value={bookTitle} className="rounded px-2 py-1 text-sm border-1 border-gray-400 w-75 focus:outline-none focus:shadow"
                                        onChange={(e => setBookTitle(e.target.value))} />
                                </div>

                                <div className="flex flex-col py-3">
                                    <label htmlFor="bookAuthor">Author</label>
                                    <input
                                        type="text"
                                        id="bookTitle"
                                        value={bookAuthor}
                                        className="rounded px-2 py-1 text-sm border-1 border-gray-400 w-75 focus:outline-none focus:shadow"
                                        onChange={(e => setBookAuthor(e.target.value))}
                                    />
                                </div>

                                <div className="flex flex-col py-3">
                                    <label htmlFor="publishedYear">Published Year</label>
                                    <input
                                        type="number"
                                        id="publishedYear"
                                        value={bookpublishedYear}
                                        className="rounded px-2 py-1 text-sm border-1 border-gray-400 w-75 focus:outline-none focus:shadow"
                                        onChange={(e => setBookPublishedYear(e.target.value))} />
                                </div>
                                <div className="pt-6 pb-4">
                                    <button className="outline-1 outline-sky-600 py-1 w-full hover:bg-sky-500 hover:outline-none hover:text-white cursor-pointer" type="submit">Save</button>
                                </div>
                            </form>
                    }
                </div>

            </div>
        </>
    )
}