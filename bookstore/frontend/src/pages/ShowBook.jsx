import React from "react";
import { BackButton } from "../components/BackButton";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "../components/Spinner";

export function ShowBook() {
    const [book, setBook] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setIsLoading(true);
        axios.get(
            `http://localhost:8080/books/${id}`
        ).then(
            (res) => {
                console.log(res);
                setBook(res.data.book);
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
        <>
            <div className="p-4">
                <div className="flex gap-x-6 p-4 pb-8">
                    <BackButton />
                    <h3 className="text-3xl">
                        Show Book
                    </h3>
                </div>
                <div>
                    {
                        isLoading ?
                            <div className="h-[60vh] items-center flex justify-center p-8"><Spinner /></div>
                            :
                            <div className="border border-blue-700 p-4 rounded-lg w-fit mx-auto">
                                <div className="p-2">
                                    <span className="text-gray-500 px-3 text-lg">ID :</span>
                                    <span>{book._id}</span>
                                </div>
                                <div className="p-2">
                                    <span className="text-gray-500 px-3 text-lg">Title :</span>
                                    <span>{book.title}</span>
                                </div>
                                <div className="p-2">
                                    <span className="text-gray-500 px-3 text-lg">Author :</span>
                                    <span>{book.author}</span>
                                </div>
                                <div className="p-2">
                                    <span className="text-gray-500 px-3 text-lg">Published Year :</span>
                                    <span>{book.publishedYear}</span>
                                </div>
                                <div className="p-2">
                                    <span className="text-gray-500 px-3 text-lg">Created At :</span>
                                    <span>{new Date(book.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>

                    }
                </div>
            </div>
        </>
    )
}