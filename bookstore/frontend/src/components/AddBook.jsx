import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

export function AddBook() {
  return (
    <Link
      to="/books/create"
      className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold 
      hover:bg-indigo-50 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
    >
      <Plus size={20} />
      <span className="hidden sm:inline">Add Book</span>
    </Link>
  );
}
