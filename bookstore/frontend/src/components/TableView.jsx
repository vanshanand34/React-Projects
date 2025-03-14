import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdDeleteOutline, MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import axios from "axios";
import { DeleteModal } from "./modals/DeleteModal";


export function TableView({ books }) {
    const [deleteBookId, setDeleteBookId] = useState(0);

    const tableStyle = "border border-slate-600 rounded-md p-1";
    const tableStyleHidden = `${tableStyle} max-md:hidden`;

    const tableCellStyle = "border border-slate-600 rounded-md text-center p-1";
    const tableCellStyleHidden = `${tableCellStyle} max-md:hidden`;

    useEffect( () => {
        
        function handleKeyEvent(e){
            e.preventDefault();
            console.log(e);
            if( e.key == "Escape" ){
                setDeleteBookId(0);
            }
        }

        window.addEventListener('keydown', handleKeyEvent);

    })

    return (
        <>
            <table className="w-full border-separate border-spacing-2 p-4 text-xs md:text-base">
                <thead className="text-sm md:text-base">
                    <tr>
                        <th className={tableStyle}>No</th>
                        <th className={tableStyle}>Title</th>
                        <th className={tableStyleHidden}>Author</th>
                        <th className={tableStyleHidden}>Published Year</th>
                        <th className={tableStyle}>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book, index) =>
                        <tr key={book._id}>
                            <td className={tableCellStyle}>{index + 1}</td>
                            <td className={tableCellStyle}>{book.title}</td>
                            <td className={tableCellStyleHidden}>{book.author}</td>
                            <td className={tableCellStyleHidden}>{book.publishedYear}</td>
                            <td className={tableCellStyle}>
                                <div className="flex justify-center items-center gap-x-1 md:gap-x-4">

                                    <Link to={`books/show/${book._id}`}>
                                        <BsInfoCircle
                                            className="md:text-xl text-slate-900 hover:-translate-y-0.5"
                                        />
                                    </Link>

                                    <Link to={`books/edit/${book._id}`}>
                                        <AiOutlineEdit
                                            className="md:text-xl text-blue-700 hover:-translate-y-0.5"
                                        />
                                    </Link>

                                    <MdDeleteOutline
                                        className="md:text-xl text-red-500 cursor-pointer hover:-translate-y-0.5"
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
                    bookId={deleteBookId}
                />
            }
        </>
    )
}