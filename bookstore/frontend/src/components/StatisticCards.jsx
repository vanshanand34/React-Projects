export function StatisticCards({
  booksLength,
  totalInventory,
  totalValue,
  avgRating,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-indigo-500">
        <p className="text-gray-600 text-xs font-semibold mb-1">Total Books</p>
        <p className="text-2xl font-bold text-gray-800">{booksLength}</p>
      </div>
      <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-green-500">
        <p className="text-gray-600 text-xs font-semibold mb-1">
          Total Inventory
        </p>
        <p className="text-2xl font-bold text-gray-800">{totalInventory}</p>
      </div>
      <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-purple-500">
        <p className="text-gray-600 text-xs font-semibold mb-1">Total Value</p>
        <p className="text-2xl font-bold text-gray-800">
          ${totalValue.toFixed(2)}
        </p>
      </div>
      <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-yellow-500">
        <p className="text-gray-600 text-xs font-semibold mb-1">Avg Rating</p>
        <p className="text-2xl font-bold text-gray-800">{avgRating} ⭐</p>
      </div>
    </div>
  );
}
