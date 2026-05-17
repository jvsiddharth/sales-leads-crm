"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex w-full items-center justify-between border-t border-[#111111]/10 dark:border-white/10 bg-white dark:bg-[#111111] transition-colors duration-300">
      {/* Previous Action */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="group flex h-16 w-1/3 items-center justify-center border-r border-[#111111]/10 dark:border-white/10 transition-colors duration-300 hover:bg-[#111111] dark:hover:bg-white disabled:pointer-events-none disabled:bg-[#F4F4F0]/50 dark:disabled:bg-white/5"
      >
        <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#111111] dark:text-white group-hover:text-[#F4F4F0] dark:group-hover:text-[#111111] group-disabled:text-[#111111]/30 dark:group-disabled:text-white/30 transition-colors duration-300">
          &lt; Prev
        </span>
      </button>

      {/* Pagination Readout */}
      <div className="flex h-16 w-1/3 flex-col items-center justify-center text-center">
        <span className="text-[10px] font-bold tracking-widest uppercase text-[#111111]/50 dark:text-white/50 transition-colors duration-300">
          Index
        </span>
        <span className="font-bold tracking-wider text-[#111111] dark:text-white transition-colors duration-300" style={{ fontFamily: "'Syne', sans-serif" }}>
          {currentPage < 10 ? `0${currentPage}` : currentPage} 
          <span className="text-[#111111]/30 dark:text-white/30 mx-1 transition-colors duration-300">/</span> 
          {totalPages < 10 ? `0${totalPages}` : totalPages}
        </span>
      </div>

      {/* Next Action */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="group flex h-16 w-1/3 items-center justify-center border-l border-[#111111]/10 dark:border-white/10 transition-colors duration-300 hover:bg-[#FF3E00] dark:hover:bg-[#FF3E00] disabled:pointer-events-none disabled:bg-[#F4F4F0]/50 dark:disabled:bg-white/5"
      >
        <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#111111] dark:text-white group-hover:text-[#F4F4F0] dark:group-hover:text-white group-disabled:text-[#111111]/30 dark:group-disabled:text-white/30 transition-colors duration-300">
          Next &gt;
        </span>
      </button>
    </div>
  );
}