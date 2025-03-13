import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";

export function BackButton({destination = '/'}) {
    return (
        <div className="flex">
            <Link to={destination} className="px-3 pt-2 text-white rounded bg-sky-600 w-fit text-2xl">
                <BsArrowLeft />
            </Link>
        </div>
    )
}