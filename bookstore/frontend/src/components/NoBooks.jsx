import { BookOpen, Link, Plus } from "lucide-react";

export function NoBooks() {
  return (
    <div className="text-center py-16 bg-white rounded-2xl shadow-md">
      <BookOpen size={64} className="mx-auto text-gray-300 mb-4" />
      <p className="text-xl text-gray-500 mb-2">No books in inventory</p>
      <p className="text-gray-400 mb-6">Start by adding your first book</p>
      <Link
        to="/books/create"
        className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 
        to-purple-600 text-white px-6 py-3 rounded-lg font-semibold 
        hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md"
      >
        <Plus size={20} />
        Add Your First Book
      </Link>
    </div>
  );
}
