import React from "react";
import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { PiBookOpenTextLight } from "react-icons/pi"
import { BiShow, BiUserCircle } from "react-icons/bi"
import { BookModal } from "./BookModal";
import { useState } from "react";
import { DeleteModal } from "./DeleteModal";

export function BookCard({ book }) {
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    return (
        <div className="border border-gray-600 p-2 py-6 rounded-lg mx-auto shadow-lg">
            <div className="flex justify-between items-center pb-4 gap-x-4 text-sm md:text-md">
                <div className="text-gray-500">{book._id}</div>
                <button className="bg-red-200 rounded-lg px-2">{book.publishedYear}</button>
            </div>
            <div className="flex justify-start items-center gap-x-4 py-1">
                <PiBookOpenTextLight className="text-red-400 text-xl"/>
                <h3>{book.title}</h3>   
            </div>
            <div className="flex justify-start items-center gap-x-4 py-1">
                <BiUserCircle className="text-red-400 text-xl" />
                <h3>{book.author}</h3>
            </div>
            <div className="flex justify-around items-center pt-6">
                <BiShow 
                    className="text-xl text-sky-600 cursor-pointer"
                    onClick={() => setShowModal(true)}
                />
                <Link to={`books/show/${book._id}`}>
                    <BsInfoCircle className="text-md text-slate-900" />
                </Link>
                <Link to={`books/edit/${book._id}`}>
                    <AiOutlineEdit className="text-md text-blue-700" />
                </Link>

                    <MdDeleteOutline 
                        className="text-md text-red-500 cursor-pointer" 
                        onClick={() => setShowDeleteModal(true)}
                    />

            </div>

            {
                showModal && <BookModal book={book} onClose={() => setShowModal(false)} />
            }
            {
                showDeleteModal && <DeleteModal bookId={book._id} onClose={() => setShowDeleteModal(false)}/>
            }
        </div>
    )
}