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
import {TableView} from "./TableView";
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
                                <TableView books={books} /> :
                                <CardView books={books} />
                        )
                }
            </div>
        </div>
    )
}
