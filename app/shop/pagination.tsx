import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1); // Go to the previous page
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1); // Go to the next page
    }
  };

  return (
    <div className="flex justify-center space-x-4 my-4">
      {/* Previous Page Button */}
      <button
        onClick={handlePrevPage}
        className="w-[60px] h-[60px] rounded-[10px] bg-[#FFF9E5] flex justify-center items-center"
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {/* Page Numbers */}
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`w-[60px] h-[60px] rounded-[10px] flex justify-center items-center ${
            currentPage === index + 1 ? 'bg-hamza' : 'bg-[#FFF9E5]'
          }`}
        >
          {index + 1}
        </button>
      ))}

      {/* Next Page Button */}
      <button
        onClick={handleNextPage}
        className="w-[60px] h-[60px] rounded-[10px] bg-[#FFF9E5] flex justify-center items-center"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
