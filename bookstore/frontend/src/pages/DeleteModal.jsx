import React from "react";
import axios from "axios";

export function DeleteModal({ bookId, onClose }) {

    function deleteBook() {
        axios
            .post(`http://localhost:8080/books/delete/${bookId}`)
            .then(res => {
                console.log(res);
                window.location.reload();
            })
            .catch(err => {
                console.error(err);
                alert("Some error occurred while deleting the book record")
            })
        onClose();

    }

    return (
        <div className="fixed bg-black/60 top-0 bottom-0 left-0 right-0  flex justify-center items-center z-50">
            <div className="p-2 w-[60vw] md:w-[40vw] text-xs lg:text-lg rounded-lg bg-white border border-sky-400 ">
                <div className="flex justify-end gap-2 border-b-1 border-gray-400">
                    <div className="text-red-500 text-2xl cursor-pointer px-2" onClick={onClose}>&times;</div>
                </div>
                <div className="text-center p-6 text-xl">
                    Are you sure you want to delete this book record?
                </div>
                <div className="flex justify-center items-center p-2 gap-x-4">
                    <button className="px-3 py-1 bg-red-300 rounded cursor-pointer" onClick={deleteBook}>Yes</button>
                    <button className="px-3 py-1 bg-sky-400 rounded cursor-pointer" onClick={onClose}>No</button>
                </div>
            </div>
        </div>
    )
}