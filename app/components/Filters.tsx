export const Filters = () => (
  <div className="p-3 border border-gray-300 rounded">
    <h3 className="mb-2 font-semibold">Filters</h3>
    <input
      type="text"
      placeholder="Search..."
      className="p-1 w-full mb-2 border border-gray-300 rounded"
    />
    <button className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600">
      Apply Filters
    </button>
  </div>
);
