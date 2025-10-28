import React from "react";
import { 
  MdFirstPage, 
  MdLastPage, 
  MdKeyboardArrowLeft, 
  MdKeyboardArrowRight 
} from "react-icons/md";

const PaginationAdmin = ({
  currentPage,
  totalPages,
  perPage,
  onPageChange,
  onPerPageChange,
  hasNextPage,
  hasPrevPage,
  onNextPage,
  onPrevPage,
  onFirstPage,
  currentCursorPage,
}) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center gap-3">
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

      <div className="flex gap-2">
        {hasNextPage !== undefined || hasPrevPage !== undefined ? (
          <>
            {onFirstPage && (
              <button
                disabled={!hasPrevPage}
                onClick={onFirstPage}
                className={`flex items-center gap-1 px-3 py-2 border rounded-lg font-medium transition-all duration-200 ${
                  !hasPrevPage
                    ? "text-gray-400 cursor-not-allowed bg-gray-50"
                    : "text-gray-700 hover:bg-orange-500 hover:text-white shadow-sm hover:shadow-md"
                }`}
                title="Halaman Pertama"
              >
                <MdFirstPage className="text-lg" />
                <span className="hidden sm:inline">First</span>
              </button>
            )}
            <button
              disabled={!hasPrevPage}
              onClick={onPrevPage || (() => {})}
              className={`flex items-center gap-1 px-3 py-2 border rounded-lg font-medium transition-all duration-200 ${
                !hasPrevPage
                  ? "text-gray-400 cursor-not-allowed bg-gray-50"
                  : "text-gray-700 hover:bg-orange-500 hover:text-white shadow-sm hover:shadow-md"
              }`}
              title="Halaman Sebelumnya"
            >
              <MdKeyboardArrowLeft className="text-lg" />
              <span className="hidden sm:inline">Prev</span>
            </button>
            
            {/* Current Page Display */}
            <div className="flex items-center gap-1 mx-2">
              {hasPrevPage && (
                <button
                  onClick={onPrevPage || (() => {})}
                  className="min-w-[40px] h-10 border rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                  title={`Halaman ${(currentCursorPage || 1) - 1}`}
                >
                  {(currentCursorPage || 1) - 1}
                </button>
              )}
              <button
                className="min-w-[40px] h-10 border rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold shadow-md"
                disabled
                title={`Halaman ${currentCursorPage || 1} (Aktif)`}
              >
                {currentCursorPage || 1}
              </button>
              {hasNextPage && (
                <button
                  onClick={onNextPage || (() => {})}
                  className="min-w-[40px] h-10 border rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                  title={`Halaman ${(currentCursorPage || 1) + 1}`}
                >
                  {(currentCursorPage || 1) + 1}
                </button>
              )}
            </div>
            
            <button
              disabled={!hasNextPage}
              onClick={onNextPage || (() => {})}
              className={`flex items-center gap-1 px-3 py-2 border rounded-lg font-medium transition-all duration-200 ${
                !hasNextPage
                  ? "text-gray-400 cursor-not-allowed bg-gray-50"
                  : "text-gray-700 hover:bg-orange-500 hover:text-white shadow-sm hover:shadow-md"
              }`}
              title="Halaman Selanjutnya"
            >
              <span className="hidden sm:inline">Next</span>
              <MdKeyboardArrowRight className="text-lg" />
            </button>
          </>
        ) : (
          /* Traditional pagination */
          <>
            <button
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
              className={`flex items-center gap-1 px-3 py-2 border rounded-lg font-medium transition-all duration-200 ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed bg-gray-50"
                  : "text-gray-700 hover:bg-orange-500 hover:text-white shadow-sm hover:shadow-md"
              }`}
              title="Halaman Sebelumnya"
            >
              <MdKeyboardArrowLeft className="text-lg" />
              <span className="hidden sm:inline">Prev</span>
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => onPageChange(i + 1)}
                className={`min-w-[40px] h-10 border rounded-lg font-medium transition-all duration-200 ${
                  currentPage === i + 1
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-orange-500 hover:text-white shadow-sm hover:shadow-md"
                }`}
                title={`Halaman ${i + 1}`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => onPageChange(currentPage + 1)}
              className={`flex items-center gap-1 px-3 py-2 border rounded-lg font-medium transition-all duration-200 ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed bg-gray-50"
                  : "text-gray-700 hover:bg-orange-500 hover:text-white shadow-sm hover:shadow-md"
              }`}
              title="Halaman Selanjutnya"
            >
              <span className="hidden sm:inline">Next</span>
              <MdKeyboardArrowRight className="text-lg" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaginationAdmin;
