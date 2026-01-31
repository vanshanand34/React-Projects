import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Plus, LayoutGrid, Table } from "lucide-react";
import { Spinner } from "../components/Spinner";
import { TableView } from "../components/TableView";
import { CardView } from "../components/CardView";
import { StatisticCards } from "../components/StatisticCards";
import { NoBooks } from "../components/NoBooks";
import { AddBook } from "../components/AddBook";
import { ToggleBookView } from "../components/ToggleBookView";

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
              <ToggleBookView
                displayType={displayType}
                setDisplayType={setDisplayType}
              />

              {/* Add Book Button */}
              <AddBook />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Statistics Cards */}
        {!isLoading && books.length > 0 && (
          <StatisticCards
            booksLength={books.length}
            totalInventory={totalInventory}
            totalValue={totalValue}
            avgRating={avgRating}
          />
        )}

        {/* Content */}
        <div>
          {isLoading ? (
            <div className="h-[60vh] items-center flex justify-center p-8">
              <Spinner />
            </div>
          ) : books.length === 0 ? (
            <NoBooks />
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
