"use client";

import type { ChangeEvent } from "react";
import { type LeadSource, type LeadStatus, type LeadSort } from "../types/lead.types";

interface FilterBarProps {
  search: string;
  status: LeadStatus | "";
  source: LeadSource | "";
  sort: LeadSort | "";

  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onStatusChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  onSourceChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  onSortChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export default function FilterBar({
  search,
  status,
  source,
  sort,
  onSearchChange,
  onStatusChange,
  onSourceChange,
  onSortChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Search Block */}
      <div className="flex flex-col group w-full">
        <label className="text-[10px] font-bold tracking-widest uppercase text-[#111111]/50 dark:text-white/50 mb-2 transition-colors duration-300 group-focus-within:text-[#FF3E00] dark:group-focus-within:text-[#FF3E00]">
          Search Registry
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="ENTER NAME OR EMAIL..."
            value={search}
            onChange={onSearchChange}
            className="w-full border border-[#111111]/20 dark:border-white/20 bg-transparent p-4 text-sm font-medium text-[#111111] dark:text-white outline-none placeholder:text-[#111111]/30 dark:placeholder:text-white/30 hover:border-[#111111]/50 dark:hover:border-white/50 focus:border-[#FF3E00] dark:focus:border-[#FF3E00] focus:ring-1 focus:ring-[#FF3E00] transition-all duration-300 rounded-none uppercase"
          />
          {/* Brutalist Blinking Cursor Illusion for empty state */}
          {search === "" && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-2 bg-[#FF3E00]/40 animate-pulse pointer-events-none" />
          )}
        </div>
      </div>

      {/* Filters Container - Stacks vertically in the sidebar */}
      <div className="flex flex-col gap-6 w-full mt-2">
        
        {/* Status Dropdown */}
        <div className="flex flex-col group w-full">
          <label className="text-[10px] font-bold tracking-widest uppercase text-[#111111]/50 dark:text-white/50 mb-2 transition-colors duration-300 group-hover:text-[#111111] dark:group-hover:text-white truncate">
            Status
          </label>
          <div className="relative border border-[#111111]/20 dark:border-white/20 group-hover:border-[#111111]/50 dark:group-hover:border-white/50 transition-colors duration-300 bg-white dark:bg-[#0a0a0a]">
            <select
              value={status}
              onChange={onStatusChange}
              className="w-full appearance-none !bg-none bg-transparent p-4 pr-10 text-sm font-medium outline-none uppercase cursor-pointer rounded-none text-[#111111] dark:text-white truncate"
            >
              <option value="" className="dark:bg-[#111111]">All Status</option>
              <option value="new" className="dark:bg-[#111111]">New</option>
              <option value="contacted" className="dark:bg-[#111111]">Contacted</option>
              <option value="qualified" className="dark:bg-[#111111]">Qualified</option>
              <option value="lost" className="dark:bg-[#111111]">Lost</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center bg-white dark:bg-[#0a0a0a] pl-2">
              <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-[#111111] dark:border-t-white transition-colors duration-300" />
            </div>
          </div>
        </div>

        {/* Source Dropdown */}
        <div className="flex flex-col group w-full">
          <label className="text-[10px] font-bold tracking-widest uppercase text-[#111111]/50 dark:text-white/50 mb-2 transition-colors duration-300 group-hover:text-[#111111] dark:group-hover:text-white truncate">
            Source
          </label>
          <div className="relative border border-[#111111]/20 dark:border-white/20 group-hover:border-[#111111]/50 dark:group-hover:border-white/50 transition-colors duration-300 bg-white dark:bg-[#0a0a0a]">
            <select
              value={source}
              onChange={onSourceChange}
              className="w-full appearance-none !bg-none bg-transparent p-4 pr-10 text-sm font-medium outline-none uppercase cursor-pointer rounded-none text-[#111111] dark:text-white truncate"
            >
              <option value="" className="dark:bg-[#111111]">All Sources</option>
              <option value="website" className="dark:bg-[#111111]">Website</option>
              <option value="instagram" className="dark:bg-[#111111]">Instagram</option>
              <option value="referral" className="dark:bg-[#111111]">Referral</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center bg-white dark:bg-[#0a0a0a] pl-2">
               <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-[#111111] dark:border-t-white transition-colors duration-300" />
            </div>
          </div>
        </div>

        {/* Sort Dropdown - Inverts in Dark Mode */}
        <div className="flex flex-col group w-full pt-4 border-t border-[#111111]/10 dark:border-white/10 mt-2">
          <label className="text-[10px] font-bold tracking-widest uppercase text-[#111111]/50 dark:text-white/50 mb-2 transition-colors duration-300 group-hover:text-[#111111] dark:group-hover:text-white truncate">
            Sort By
          </label>
          <div className="relative border border-[#111111]/20 dark:border-[#F4F4F0] group-hover:border-[#111111]/50 dark:group-hover:border-white transition-colors duration-300 bg-[#111111] dark:bg-[#F4F4F0] text-[#F4F4F0] dark:text-[#111111]">
            <select
              value={sort}
              onChange={onSortChange}
              className="w-full appearance-none !bg-none bg-transparent p-4 pr-10 text-sm font-bold outline-none uppercase cursor-pointer rounded-none text-[#F4F4F0] dark:text-[#111111] truncate"
            >
              <option value="" className="bg-[#111111] dark:bg-[#F4F4F0] text-[#F4F4F0] dark:text-[#111111]">Sort: Default</option>
              <option value="newest" className="bg-[#111111] dark:bg-[#F4F4F0] text-[#F4F4F0] dark:text-[#111111]">Newest</option>
              <option value="oldest" className="bg-[#111111] dark:bg-[#F4F4F0] text-[#F4F4F0] dark:text-[#111111]">Oldest</option>
              <option value="name-asc" className="bg-[#111111] dark:bg-[#F4F4F0] text-[#F4F4F0] dark:text-[#111111]">A-Z</option>
              <option value="name-desc" className="bg-[#111111] dark:bg-[#F4F4F0] text-[#F4F4F0] dark:text-[#111111]">Z-A</option>
            </select>
             <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center bg-[#111111] dark:bg-[#F4F4F0] pl-2">
               <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-[#F4F4F0] dark:border-t-[#111111] transition-colors duration-300" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}