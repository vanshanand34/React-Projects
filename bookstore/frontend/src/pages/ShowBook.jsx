import axios from "axios";
import {
  BookOpen,
  Calendar,
  DollarSign,
  Package,
  Star,
  Tag,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BackButton } from "../components/BackButton";
import { Spinner } from "../components/Spinner";

export function ShowBook() {
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

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
        setIsLoading(false);
      });
  }, [id]);

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={20}
            className={
              i < Math.floor(rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }
          />
        ))}
        <span className="ml-2 text-lg font-semibold text-gray-700">
          {rating.toFixed(1)}
        </span>
      </div>
    );
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
                <h3 className="text-2xl md:text-3xl font-bold">Book Details</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          {isLoading ? (
            <div className="h-[60vh] items-center flex justify-center p-8">
              <Spinner />
            </div>
          ) : book ? (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2"></div>

              {/* Header Section */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                      {book.title}
                    </h1>
                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <User size={18} />
                      <span className="text-lg">by {book.author}</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <span className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full font-semibold">
                        <Tag size={16} />
                        {book.genre || ""}
                      </span>
                      {renderStars(book.rating || 0)}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
                    <p className="text-gray-600 text-sm mb-1">Price</p>
                    <div className="flex items-center gap-1">
                      <DollarSign size={28} className="text-green-600" />
                      <span className="text-4xl font-bold text-green-600">
                        {(book.price || 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Details Section */}
              <div className="p-8">
                <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-indigo-200">
                  Inventory Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <Package size={24} className="text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">
                        Stock Quantity
                      </p>
                      <p className="text-2xl font-bold text-gray-800">
                        {book.stock}
                      </p>
                      <span
                        className={`text-xs font-semibold ${
                          book.stock || 0 > 10
                            ? "text-green-600"
                            : book.stock || 0 > 0
                              ? "text-yellow-600"
                              : "text-red-600"
                        }`}
                      >
                        {book.stock || 0 > 10
                          ? "In Stock"
                          : book.stock || 0 > 0
                            ? "Low Stock"
                            : "Out of Stock"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="bg-indigo-100 p-3 rounded-lg">
                      <DollarSign size={24} className="text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total Value</p>
                      <p className="text-2xl font-bold text-gray-800">
                        ${(book.price || 0 * book.stock || 0).toFixed(2)}
                      </p>
                      <span className="text-xs text-gray-500">
                        {book.stock || 0} units x $
                        {(book.price || 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-indigo-200">
                  Record Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <BookOpen size={24} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Book ID</p>
                      <p className="text-sm font-mono text-gray-800 break-all">
                        {book._id}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <Calendar size={24} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Created At</p>
                      <p className="text-sm font-semibold text-gray-800">
                        {new Date(book.createdAt || "").toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )}
                      </p>
                    </div>
                  </div>
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
