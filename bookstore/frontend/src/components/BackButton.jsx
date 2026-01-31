import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function BackButton() {
  return (
    <Link
      to="/"
      className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-all flex items-center gap-2 font-medium shadow-md"
    >
      <ArrowLeft size={20} />
      <span>Back</span>
    </Link>
  );
}
