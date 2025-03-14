import React from "react";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";

export function BookModal({ book, onClose }) {
    return (
        <div className="fixed bg-black/60 top-0 bottom-0 left-0 right-0  flex justify-center items-center z-50">
            <div className="p-2 w-[80vw] md:w-[60vw] text-xs lg:text-lg rounded-lg bg-white border border-sky-400 ">
                <div className="flex justify-between gap-2">
                    <div className="bg-red-200 p-2">{book.publishedYear}</div>
                    <div className="text-red-500 text-2xl cursor-pointer px-2" onClick={onClose}>&times;</div>
                </div>
                <div className="p-2 text-gray-500">
                    {book._id}
                </div>
                <div className="flex justify-start items-center gap-x-4 p-2">
                    <PiBookOpenTextLight className="text-red-400 text-xl" />
                    <h3>{book.title}</h3>
                </div>
                <div className="flex justify-start items-center gap-x-4 p-2">
                    <BiUserCircle  className="text-red-400 text-xl" />
                    <h3>{book.author}</h3>
                </div>
                <div className="p-2">
                    Book Description
                </div>
                <div className="p-2">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti similique dolorem harum laborum beatae, quas ipsa quis architecto possimus ducimus nulla, molestias perferendis, est adipisci id ab quidem esse consequuntur rerum dolores culpa dicta. Excepturi, id sint maiores doloremque nisi quibusdam, assumenda quo obcaecati, magnam est iure. Obcaecati fugiat sint ea aperiam facilis dolorem labore ab quae error facere quod in magni excepturi assumenda, ad, commodi quasi laborum aliquam qui molestiae inventore? Libero, ipsam eveniet. Ad sit sed alias? Libero!
                </div>
            </div>
        </div>
    )
}