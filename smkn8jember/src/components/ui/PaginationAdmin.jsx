import React from "react";

const PaginationAdmin = ({
  currentPage,
  totalPages,
  perPage,
  onPageChange,
  onPerPageChange,
}) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center gap-3">
      {/* Pilih jumlah data per halaman */}
      <div className="flex items-center gap-2 text-gray-700">
        <span>Tampilkan:</span>
        <select
          value={perPage}
          onChange={(e) => onPerPageChange(parseInt(e.target.value))}
          className="border w-16 rounded-md px-2 py-1 text-center"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <span>data</span>
      </div>

      {/* Navigasi Halaman */}
      <div className="flex gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={`px-3 py-1 border rounded-md ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "hover:bg-orange-500 hover:text-white"
          }`}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => onPageChange(i + 1)}
            className={`px-3 py-1 border rounded-md ${
              currentPage === i + 1
                ? "bg-orange-500 text-white"
                : "hover:bg-orange-500 hover:text-white"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className={`px-3 py-1 border rounded-md ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "hover:bg-orange-500 hover:text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationAdmin;
