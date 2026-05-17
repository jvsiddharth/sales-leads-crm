"use client";

import { useEffect, useState } from "react";

import { motion, type Variants } from "framer-motion";

import { useQuery } from "@tanstack/react-query";

import { useAuthStore } from "../store/auth.store";

import FilterBar from "../components/FilterBar";
import LeadsTable from "../components/LeadsTable";
import Pagination from "../components/Pagination";
import LeadFormModal from "../components/LeadFormModal";
import DeleteLeadDialog from "../components/DeleteLeadDialog";

import useDebounce from "../hooks/useDebounce";

import { getLeads } from "../services/lead.service";

import {
  type LeadSource,
  type LeadStatus,
  type LeadSort,
  type Lead,
} from "../types/lead.types";

const containerVariants: Variants = {
  hidden: { opacity: 0 },

  show: {
    opacity: 1,

    transition: {
      staggerChildren: 0.1,

      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,

    y: 15,

    filter: "blur(4px)",
  },

  show: {
    opacity: 1,

    y: 0,

    filter: "blur(0px)",

    transition: {
      duration: 0.8,

      ease: "easeInOut",
    },
  },
};

const exportToCsv = (
  data: Lead[]
) => {
  if (!data.length) return;

  const headers = [
    "Identity",
    "Contact Vector",
    "Status",
    "Origin",
    "Timestamp",
  ];

  const csvRows = data.map(
    (lead) =>
      `"${lead.name}","${lead.email}","${lead.status}","${lead.source}","${new Date(
        lead.createdAt
      ).toISOString()}"`
  );

  const csvContent = [
    headers.join(","),

    ...csvRows,
  ].join("\n");

  const blob = new Blob(
    [csvContent],
    {
      type: "text/csv;charset=utf-8;",
    }
  );

  const url =
    URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.setAttribute(
    "href",
    url
  );

  link.setAttribute(
    "download",
    `smart_crm_export_${Date.now()}.csv`
  );

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
};

function ThemeToggle() {
  const [isDark, setIsDark] =
    useState(false);

  useEffect(() => {
    const savedTheme =
      localStorage.getItem(
        "theme"
      );

    const prefersDark =
      window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

    if (
      savedTheme === "dark" ||
      (!savedTheme &&
        prefersDark)
    ) {
      setIsDark(true);

      document.documentElement.classList.add(
        "dark"
      );
    } else {
      setIsDark(false);

      document.documentElement.classList.remove(
        "dark"
      );
    }
  }, []);

  function toggleTheme() {
    setIsDark(!isDark);

    if (!isDark) {
      document.documentElement.classList.add(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "dark"
      );
    } else {
      document.documentElement.classList.remove(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "light"
      );
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center border border-[#111111]/20 bg-white transition-colors hover:border-[#111111] dark:border-white/20 dark:bg-[#111111] dark:hover:border-white"
    >
      <span className="text-[10px] font-bold uppercase tracking-widest text-[#111111] transition-colors dark:text-white">
        {isDark
          ? "LHT"
          : "DRK"}
      </span>
    </button>
  );
}

export default function DashboardPage() {
  const { user, logout } =
    useAuthStore();

  const [isCreateOpen, setIsCreateOpen] =
    useState(false);

  const [editingLead, setEditingLead] =
    useState<Lead | null>(null);

  const [deletingLeadId, setDeletingLeadId] =
    useState<string | null>(null);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState<
      LeadStatus | ""
    >("");

  const [source, setSource] =
    useState<
      LeadSource | ""
    >("");

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  const [sort, setSort] =
    useState<LeadSort>(
      "latest"
    );

  const debouncedSearch =
    useDebounce(search, 300);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    debouncedSearch,
    status,
    source,
    sort,
  ]);

  const {
    data,
    isLoading,
  } = useQuery({
    queryKey: [
      "leads",
      currentPage,
      debouncedSearch,
      status,
      source,
      sort,
    ],

    queryFn: () =>
      getLeads({
        page: currentPage,

        search:
          debouncedSearch,

        status,

        source,

        sort,
      }),
  });

  return (
    <main
      className="min-h-screen bg-[#F4F4F0] p-4 text-[#111111] transition-colors duration-300 selection:bg-[#FF3E00] selection:text-[#F4F4F0] dark:bg-[#0a0a0a] dark:text-[#F4F4F0] md:p-8 lg:p-12"
      style={{
        fontFamily:
          "'Outfit', sans-serif",
      }}
    >
      <ThemeToggle />

      <motion.div
        variants={
          containerVariants
        }
        initial="hidden"
        animate="show"
        className="mx-auto flex max-w-[1400px] flex-col gap-12 md:gap-20"
      >
        <motion.div
          variants={
            itemVariants
          }
          className="flex items-center justify-between border-b border-[#111111]/10 pb-4 transition-colors duration-300 dark:border-white/10"
        >
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 animate-pulse bg-[#FF3E00]" />

            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#111111]/60 transition-colors dark:text-white/60">
              System Active //
              Smart CRM
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden flex-col text-right md:flex">
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#111111]/40 transition-colors dark:text-white/40">
                Active User
              </span>

              <span className="text-[11px] font-bold uppercase tracking-widest text-[#111111] transition-colors dark:text-white">
                {user?.name ||
                  "GUEST"}
              </span>
            </div>

            <button
              onClick={logout}
              className="group border border-[#111111]/20 bg-transparent px-4 py-2 transition-colors duration-300 hover:border-[#FF3E00] hover:bg-[#FF3E00] dark:border-white/20 dark:hover:border-[#FF3E00] dark:hover:bg-[#FF3E00]"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#111111] transition-colors duration-300 group-hover:text-[#F4F4F0] dark:text-white">
                Terminate
              </span>
            </button>
          </div>
        </motion.div>

        <motion.header
          variants={itemVariants}
          className="flex flex-col justify-between gap-10 border-b border-[#111111]/15 pb-10 transition-colors duration-300 dark:border-white/15 md:flex-row md:items-end"
        >
          <div className="max-w-3xl">
            <h1
              className="text-5xl font-bold uppercase leading-[0.85] tracking-tighter transition-colors md:text-7xl lg:text-8xl"
              style={{
                fontFamily:
                  "'Syne', sans-serif",
              }}
            >
              Lead
              <br />
              Intelligence
            </h1>
          </div>

          <div className="flex gap-8 md:gap-16">
            <div className="flex flex-col">
              <span className="mb-3 text-xs font-bold uppercase tracking-widest text-[#111111]/50 transition-colors dark:text-white/50">
                Total Volume
              </span>

              <span
                className="text-5xl font-medium tracking-tighter transition-colors md:text-6xl"
                style={{
                  fontFamily:
                    "'Syne', sans-serif",
                }}
              >
                {(
                  data
                    ?.pagination
                    .total || 0
                ) < 10
                  ? `0${
                      data
                        ?.pagination
                        .total || 0
                    }`
                  : data
                      ?.pagination
                      .total || 0}
              </span>
            </div>

            <div className="hidden w-[1px] bg-[#111111]/15 transition-colors duration-300 dark:bg-white/15 md:block" />

            <div className="flex flex-col">
              <span className="mb-3 text-xs font-bold uppercase tracking-widest text-[#111111]/50 transition-colors dark:text-white/50">
                Active Filters
              </span>

              <span
                className="text-5xl font-medium tracking-tighter text-[#FF3E00] transition-colors md:text-6xl"
                style={{
                  fontFamily:
                    "'Syne', sans-serif",
                }}
              >
                {
                  [
                    status,
                    source,
                    search,
                  ].filter(Boolean)
                    .length
                }
              </span>
            </div>
          </div>
        </motion.header>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12"
        >
          <div className="flex flex-col gap-6 lg:col-span-3 lg:sticky lg:top-12">
            <div className="border border-[#111111]/10 bg-white p-6 transition-all duration-300 hover:border-[#111111]/30 dark:border-white/10 dark:bg-[#111111] dark:hover:border-white/30 md:p-8">
              <h3 className="mb-8 border-b border-[#111111]/10 pb-4 text-xs font-bold uppercase tracking-[0.15em] text-[#111111]/70 transition-colors duration-300 dark:border-white/10 dark:text-white/70">
                Control Panel
              </h3>

              <FilterBar
                search={search}
                status={status}
                source={source}
                sort={sort}
                onSearchChange={(
                  event
                ) =>
                  setSearch(
                    event.target
                      .value
                  )
                }
                onStatusChange={(
                  event
                ) =>
                  setStatus(
                    event.target
                      .value as
                      | LeadStatus
                      | ""
                  )
                }
                onSourceChange={(
                  event
                ) =>
                  setSource(
                    event.target
                      .value as
                      | LeadSource
                      | ""
                  )
                }
                onSortChange={(
                  event
                ) =>
                  setSort(
                    event.target
                      .value as LeadSort
                  )
                }
              />
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-9">
            <div className="overflow-hidden border border-[#111111]/10 bg-white transition-all duration-300 hover:border-[#111111]/30 dark:border-white/10 dark:bg-[#111111] dark:hover:border-white/30">
              <div className="flex flex-col gap-4 border-b border-[#111111]/10 bg-[#F4F4F0]/30 p-6 transition-colors duration-300 dark:border-white/10 dark:bg-[#0a0a0a]/50 sm:flex-row sm:items-center sm:justify-between md:px-8">
                <h2 className="text-sm font-bold uppercase tracking-[0.15em] transition-colors">
                  Data Registry
                </h2>

                <div className="flex items-center gap-4">
                  <div className="hidden text-xs font-medium uppercase tracking-widest text-[#111111]/50 transition-colors dark:text-white/50 sm:block">
                    Showing{" "}
                    {data
                      ?.leads
                      .length || 0}{" "}
                    Entries
                  </div>

                  {user?.role ===
                    "admin" && (
                    <button
                      onClick={() =>
                        setIsCreateOpen(
                          true
                        )
                      }
                      className="border border-[#111111] bg-[#111111] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-white transition hover:border-[#FF3E00] hover:bg-[#FF3E00] dark:border-white dark:bg-white dark:text-black"
                    >
                      Add Lead
                    </button>
                  )}

                  <button
                    onClick={() =>
                      exportToCsv(
                        data
                          ?.leads ||
                          []
                      )
                    }
                    className="group border border-[#111111] bg-[#111111] px-4 py-2 transition-colors duration-300 hover:border-[#FF3E00] hover:bg-[#FF3E00] dark:border-white dark:bg-[#F4F4F0] dark:hover:border-[#FF3E00] dark:hover:bg-[#FF3E00]"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#F4F4F0] transition-colors duration-300 group-hover:text-[#F4F4F0] dark:text-[#111111] dark:group-hover:text-white">
                      Export CSV
                    </span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto p-0">
                {isLoading ? (
                  <div className="flex h-64 items-center justify-center">
                    <p className="text-sm font-medium uppercase tracking-widest text-[#111111]/50 dark:text-white/50">
                      Loading
                      registry...
                    </p>
                  </div>
                ) : (
                  <div className="min-w-[850px]">
                    <LeadsTable
                    leads={
                      data?.leads || []
                    }
                    onEdit={(lead) =>
                      setEditingLead(lead)
                    }
                    onDelete={(id) =>
                      setDeletingLeadId(id)
                    }
                  />
                  </div>
                )}
              </div>

              <div className="flex justify-end border-t border-[#111111]/10 bg-[#F4F4F0]/30 p-4 transition-colors duration-300 dark:border-white/10 dark:bg-[#0a0a0a]/50 md:px-8">
                <Pagination
                  currentPage={
                    currentPage
                  }
                  totalPages={
                    data
                      ?.pagination
                      .pages || 1
                  }
                  onPageChange={
                    setCurrentPage
                  }
                />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {user?.role ===
        "admin" && (
        <LeadFormModal
          open={isCreateOpen}
          onClose={() =>
            setIsCreateOpen(
              false
            )
          }
        />
      )}

      <LeadFormModal
        open={Boolean(
          editingLead
        )}
        onClose={() =>
          setEditingLead(null)
        }
        lead={editingLead}
      />

      {user?.role ===
        "admin" &&
        deletingLeadId && (
          <DeleteLeadDialog
            open={Boolean(
              deletingLeadId
            )}
            onClose={() =>
              setDeletingLeadId(
                null
              )
            }
            leadId={
              deletingLeadId
            }
          />
        )}
    </main>
  );
}