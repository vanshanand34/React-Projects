import React from "react";
import { useState, useEffect } from "react";
import { Spinner } from "../components/Spinner";
import { BackButton } from "../components/BackButton";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { BookOpen } from "lucide-react";

export function EditBook() {
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookGenre, setBookGenre] = useState("");
  const [bookPrice, setBookPrice] = useState("");
  const [bookStock, setBookStock] = useState("");
  const [bookRating, setBookRating] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const genres = [
    "Fiction",
    "Non-Fiction",
    "Self-Help",
    "Mystery",
    "Science Fiction",
    "Biography",
    "Romance",
    "Thriller",
  ];

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`http://localhost:8080/books/${id}`)
      .then((res) => {
        console.log(res);
        const book = res.data.book;
        setBookTitle(book.title);
        setBookAuthor(book.author);
        setBookGenre(book.genre);
        setBookPrice(book.price);
        setBookStock(book.stock);
        setBookRating(book.rating);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Error loading book data", { variant: "error" });
        setIsLoading(false);
      });
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();

    // Validate all fields
    if (!bookTitle.trim()) {
      enqueueSnackbar("Please enter a book title", { variant: "warning" });
      return;
    }
    if (!bookAuthor.trim()) {
      enqueueSnackbar("Please enter an author name", { variant: "warning" });
      return;
    }
    if (!bookGenre) {
      enqueueSnackbar("Please select a genre", { variant: "warning" });
      return;
    }
    if (!bookPrice || parseFloat(bookPrice) <= 0) {
      enqueueSnackbar("Please enter a valid price", { variant: "warning" });
      return;
    }
    if (!bookStock || parseInt(bookStock) < 0) {
      enqueueSnackbar("Please enter a valid stock quantity", {
        variant: "warning",
      });
      return;
    }
    if (
      !bookRating ||
      parseFloat(bookRating) < 0 ||
      parseFloat(bookRating) > 5
    ) {
      enqueueSnackbar("Please enter a valid rating between 0 and 5", {
        variant: "warning",
      });
      return;
    }

    setIsLoading(true);

    const data = {
      title: bookTitle.trim(),
      author: bookAuthor.trim(),
      genre: bookGenre,
      price: parseFloat(bookPrice),
      stock: parseInt(bookStock),
      rating: parseFloat(bookRating),
    };

    axios
      .put(`http://localhost:8080/books/edit/${id}`, data)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        navigate("/");
        enqueueSnackbar("Book Modified successfully", { variant: "success" });
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        enqueueSnackbar(
          "Some error occurred while updating the record, please try again!",
          { variant: "error" },
        );
      });
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center gap-4">
              <BackButton />
              <div className="flex items-center gap-3">
                <BookOpen size={32} />
                <h3 className="text-2xl md:text-3xl font-bold">Edit Book</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-8">
          {isLoading ? (
            <div className="h-[60vh] items-center flex justify-center p-8">
              <Spinner />
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2"></div>

              <div className="p-8">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="bookTitle"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Title *
                      </label>
                      <input
                        type="text"
                        id="bookTitle"
                        value={bookTitle}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        onChange={(e) => setBookTitle(e.target.value)}
                        placeholder="Enter book title"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="bookAuthor"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Author *
                      </label>
                      <input
                        type="text"
                        id="bookAuthor"
                        value={bookAuthor}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        onChange={(e) => setBookAuthor(e.target.value)}
                        placeholder="Enter author name"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="bookGenre"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Genre *
                      </label>
                      <select
                        id="bookGenre"
                        value={bookGenre}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        onChange={(e) => setBookGenre(e.target.value)}
                        required
                      >
                        <option value="">Select a genre</option>
                        {genres.map((genre) => (
                          <option key={genre} value={genre}>
                            {genre}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="bookPrice"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Price ($) *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        id="bookPrice"
                        value={bookPrice}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        onChange={(e) => setBookPrice(e.target.value)}
                        placeholder="0.00"
                        min="0"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="bookStock"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Stock Quantity *
                      </label>
                      <input
                        type="number"
                        id="bookStock"
                        value={bookStock}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        onChange={(e) => setBookStock(e.target.value)}
                        placeholder="0"
                        min="0"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="bookRating"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Rating (0-5) *
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        id="bookRating"
                        value={bookRating}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        onChange={(e) => setBookRating(e.target.value)}
                        placeholder="0.0"
                        min="0"
                        max="5"
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={handleSubmit}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg text-lg"
                      type="submit"
                    >
                      Update Book
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
