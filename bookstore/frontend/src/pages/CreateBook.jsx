import React from "react";
import { useState, useEffect } from "react";
import { Spinner } from "../components/Spinner";
import { BackButton } from "../components/BackButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function CreateBook() {
    const [bookTitle, setBookTitle] = useState("");
    const [bookAuthor, setBookAuthor] = useState("");
    const [bookpublishedYear, setBookPublishedYear] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);

        axios.post(
            `http://localhost:8080/books`,
            {
                title: bookTitle,
                author: bookAuthor,
                publishedYear: bookpublishedYear
            }
        )
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
                <div className="flex p-6 mb-20 gap-x-6 bg-gray-100">
                    <BackButton />
                    <h3 className="text-3xl">
                        Create Book
                    </h3>
                </div>
                <div>
                    {
                        isLoading ?
                            <div className="h-[60vh] items-center flex justify-center p-8"><Spinner /></div> :

                            <form
                                className="mx-auto rounded border-2 border-sky-500 py-4 px-6 w-fit shadow"
                                onSubmit={handleSubmit}
                            >
                                <div className="flex flex-col py-3">
                                    <label htmlFor="bookTitle">Title</label>
                                    <input type="text" id="bookTitle" value={bookTitle} className="rounded px-2 py-1 text-sm border-1 border-gray-400 w-65 focus:outline-none focus:shadow"
                                        onChange={(e => setBookTitle(e.target.value))} />
                                </div>

                                <div className="flex flex-col py-3">
                                    <label htmlFor="bookAuthor">Author</label>
                                    <input
                                        type="text"
                                        id="bookTitle"
                                        value={bookAuthor}
                                        className="rounded px-2 py-1 text-sm border-1 border-gray-400 w-65 focus:outline-none focus:shadow"
                                        onChange={(e => setBookAuthor(e.target.value))}
                                    />
                                </div>

                                <div className="flex flex-col py-3">
                                    <label htmlFor="publishedYear">Published Year</label>
                                    <input
                                        type="number"
                                        id="publishedYear"
                                        value={bookpublishedYear}
                                        className="rounded px-2 py-1 text-sm border-1 border-gray-400 w-65 focus:outline-none focus:shadow"
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