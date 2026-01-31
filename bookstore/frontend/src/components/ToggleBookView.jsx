import { LayoutGrid, Table } from "lucide-react";

export function ToggleBookView({displayType, setDisplayType}) {
  return (
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
  );
}
