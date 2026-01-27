import React from "react";
import { useState, useEffect } from "react";
import { Spinner } from "../components/Spinner";
import { BackButton } from "../components/BackButton";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { BookOpen, AlertTriangle } from "lucide-react";

export function DeleteBook() {
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:8080/books/${id}`)
      .then((res) => {
        console.log(res);
        setBook(res.data.book);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Error loading book data", { variant: "error" });
        setIsLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    setIsDeleting(true);

    axios
      .delete(`http://localhost:8080/books/delete/${id}`)
      .then(() => {
        setIsDeleting(false);
        navigate("/");
        enqueueSnackbar("Book deleted successfully", { variant: "success" });
      })
      .catch((err) => {
        console.log(err);
        setIsDeleting(false);
        enqueueSnackbar("Error deleting book, please try again!", {
          variant: "error",
        });
      });
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center gap-4">
              <BackButton />
              <div className="flex items-center gap-3">
                <BookOpen size={32} />
                <h3 className="text-2xl md:text-3xl font-bold">Delete Book</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-8">
          {isLoading ? (
            <div className="h-[60vh] items-center flex justify-center p-8">
              <Spinner />
            </div>
          ) : book ? (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-red-500 h-2"></div>

              {/* Warning Section */}
              <div className="bg-red-50 border-b border-red-100 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-red-100 p-3 rounded-full">
                    <AlertTriangle size={28} className="text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-red-900">
                      Confirm Deletion
                    </h2>
                    <p className="text-red-700 text-sm">
                      This action cannot be undone
                    </p>
                  </div>
                </div>
              </div>

              {/* Book Details */}
              <div className="p-8">
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete this book from your inventory?
                </p>

                <div className="bg-gray-50 rounded-lg p-6 mb-6 space-y-4">
                  <div className="flex justify-between items-start border-b border-gray-200 pb-3">
                    <span className="text-sm font-semibold text-gray-600">
                      Title:
                    </span>
                    <span className="text-sm text-gray-900 font-medium text-right max-w-xs">
                      {book.title}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                    <span className="text-sm font-semibold text-gray-600">
                      Author:
                    </span>
                    <span className="text-sm text-gray-900">{book.author}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                    <span className="text-sm font-semibold text-gray-600">
                      Genre:
                    </span>
                    <span className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-semibold">
                      {book.genre}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                    <span className="text-sm font-semibold text-gray-600">
                      Price:
                    </span>
                    <span className="text-sm font-bold text-green-600">
                      ${book.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                    <span className="text-sm font-semibold text-gray-600">
                      Stock:
                    </span>
                    <span className="text-sm text-gray-900 font-semibold">
                      {book.stock}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-600">
                      Rating:
                    </span>
                    <span className="text-sm text-gray-900">
                      {book.rating.toFixed(1)} ⭐
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="flex-1 bg-red-600 text-white py-4 rounded-lg font-semibold hover:bg-red-700 transition-all shadow-md hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed text-lg"
                  >
                    {isDeleting ? "Deleting..." : "Yes, Delete Book"}
                  </button>
                  <button
                    onClick={() => navigate("/")}
                    disabled={isDeleting}
                    className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-lg font-semibold hover:bg-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl shadow-md">
              <BookOpen size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-xl text-gray-500">Book not found</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
