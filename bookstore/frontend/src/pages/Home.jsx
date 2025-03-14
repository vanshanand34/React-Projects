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

    const activeStyle = "outline-white shadow-lg bg-sky-100";
    const inActiveStyle = "outline hover:outline-white hover:shadow-lg hover:bg-sky-100";

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
            <div className="flex justify-between items-center py-4 mb-18 pl-6 bg-sky-300">
                <div className="text-lg md:text-4xl font-sans py-4">Books List</div>

                <div className="flex gap-x-2 md:gap-x-4">
                    <button
                        className={`px-2 py-1 md:px-4 md:py-2 text-sm lg:text-lg cursor-pointer rounded-lg ${displayType == "table" ? activeStyle : inActiveStyle}`}
                        onClick={() => setDisplayType("table")}
                    >
                        Table
                    </button>
                    <button
                        className={`px-2 py-1 md:px-4 md:py-2 text-sm lg:text-lg cursor-pointer rounded-lg ${displayType == "card" ? activeStyle : inActiveStyle}`}
                        onClick={() => setDisplayType("card")}
                    >
                        Card
                    </button>
                </div>
                <Link to={"/books/create"} className="pr-6 text-white">
                    <MdOutlineAddBox className="text-4xl text-white hover:text-gray-100" />
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
