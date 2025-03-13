import React from "react";
import axios from "axios";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";


import { Spinner } from "../components/Spinner";
import { TableView } from "./TableView";
import { CardView } from "./CardView";

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
            <div className="flex justify-between items-center py-4 px-6 bg-gray-100">
                <div className="text-lg md:text-4xl font-sans py-4">Books List</div>

                <div className="px-4 flex gap-x-4">
                    <button
                        className="px-2 py-1 md:px-4 md:py-2 text-sm lg:text-lg bg-sky-400 text-white hover:bg-white hover:text-sky-600 hover:outline hover:outline-sky-600 cursor-pointer rounded-lg"
                        onClick={() => setDisplayType("table")}
                    >
                        Table
                    </button>
                    <button
                        className="px-2 py-1 md:px-4 md:py-2 text-sm lg:text-lg bg-sky-400 text-white hover:bg-white hover:text-sky-600 hover:outline hover:outline-sky-600 cursor-pointer rounded-lg"
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
                                <TableView books={books} /> :
                                <CardView books={books} />
                        )
                }
            </div>
        </div>
    )
}
