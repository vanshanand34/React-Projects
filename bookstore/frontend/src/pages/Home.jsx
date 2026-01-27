import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Plus, LayoutGrid, Table } from "lucide-react";
import { Spinner } from "../components/Spinner";
import { TableView } from "../components/TableView";
import { CardView } from "../components/CardView";

export function Home() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [displayType, setDisplayType] = useState("card");

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:8080/books")
      .then((res) => {
        console.log(res);
        setBooks(res.data.books);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  const totalInventory = books.reduce((sum, book) => sum + book.stock, 0);
  const totalValue = books.reduce(
    (sum, book) => sum + book.price * book.stock,
    0,
  );
  const avgRating =
    books.length > 0
      ? (
          books.reduce((sum, book) => sum + book.rating, 0) / books.length
        ).toFixed(1)
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <BookOpen size={36} />
              <div>
                <h1 className="text-3xl font-bold">Book Inventory Manager</h1>
                <p className="text-indigo-100 text-sm">
                  Manage your inventory efficiently
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* View Toggle */}
              <div className="flex gap-2 bg-white/20 backdrop-blur-sm rounded-lg p-1">
                <button
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                    displayType === "table"
                      ? "bg-white text-indigo-600 shadow-md"
                      : "text-white hover:bg-white/20"
                  }`}
                  onClick={() => setDisplayType("table")}
                >
                  <Table size={18} />
                  <span className="hidden sm:inline">Table</span>
                </button>
                <button
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                    displayType === "card"
                      ? "bg-white text-indigo-600 shadow-md"
                      : "text-white hover:bg-white/20"
                  }`}
                  onClick={() => setDisplayType("card")}
                >
                  <LayoutGrid size={18} />
                  <span className="hidden sm:inline">Card</span>
                </button>
              </div>

              {/* Add Book Button */}
              <Link
                to="/books/create"
                className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <Plus size={20} />
                <span className="hidden sm:inline">Add Book</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Statistics Cards */}
        {!isLoading && books.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-indigo-500">
              <p className="text-gray-600 text-xs font-semibold mb-1">
                Total Books
              </p>
              <p className="text-2xl font-bold text-gray-800">{books.length}</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-green-500">
              <p className="text-gray-600 text-xs font-semibold mb-1">
                Total Inventory
              </p>
              <p className="text-2xl font-bold text-gray-800">
                {totalInventory}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-purple-500">
              <p className="text-gray-600 text-xs font-semibold mb-1">
                Total Value
              </p>
              <p className="text-2xl font-bold text-gray-800">
                ${totalValue.toFixed(2)}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-yellow-500">
              <p className="text-gray-600 text-xs font-semibold mb-1">
                Avg Rating
              </p>
              <p className="text-2xl font-bold text-gray-800">{avgRating} ⭐</p>
            </div>
          </div>
        )}

        {/* Content */}
        <div>
          {isLoading ? (
            <div className="h-[60vh] items-center flex justify-center p-8">
              <Spinner />
            </div>
          ) : books.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-md">
              <BookOpen size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-xl text-gray-500 mb-2">
                No books in inventory
              </p>
              <p className="text-gray-400 mb-6">
                Start by adding your first book
              </p>
              <Link
                to="/books/create"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md"
              >
                <Plus size={20} />
                Add Your First Book
              </Link>
            </div>
          ) : displayType === "table" ? (
            <TableView books={books} />
          ) : (
            <CardView books={books} />
          )}
        </div>
      </div>
    </div>
  );
}
