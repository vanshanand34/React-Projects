import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export function BackButton() {
    const navigate = useNavigate();
    return (
        <div className="flex">
            <div
                onClick={() => navigate(-1)}
                className="px-3 pt-2 text-white rounded
                bg-sky-600 hover:bg-sky-800 w-fit md:text-2xl cursor-pointer"
            >
                <BsArrowLeft />
            </div>
        </div>
    )
}