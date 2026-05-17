"use client";

import { useAuthStore } from "../store/auth.store";

import { type Lead } from "../types/lead.types";

interface LeadsTableProps {
  leads: Lead[];

  onEdit?: (
    lead: Lead
  ) => void;

  onDelete?: (
    id: string
  ) => void;
}

export default function LeadsTable({
  leads,
  onEdit,
  onDelete,
}: LeadsTableProps) {
  const { user } =
    useAuthStore();

  if (!leads.length) {
    return (
      <div className="flex flex-col items-center justify-center border-t border-[#111111]/10 dark:border-white/10 p-20 text-center bg-white dark:bg-[#111111] transition-colors duration-300">
        <div className="mb-4 h-2 w-2 bg-[#FF3E00] animate-pulse" />

        <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-[#111111] dark:text-white">
          System Alert:
          Null Return
        </h2>

        <p className="mt-2 text-xs font-medium tracking-widest text-[#111111]/50 dark:text-white/50 uppercase">
          No matching
          records found in
          registry.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white dark:bg-[#111111] transition-colors duration-300">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b-2 border-[#111111] dark:border-white">
            <th className="py-6 px-4 md:px-8 text-[10px] font-bold tracking-[0.15em] uppercase">
              Identity
            </th>

            <th className="py-6 px-4 text-[10px] font-bold tracking-[0.15em] uppercase">
              Contact
            </th>

            <th className="py-6 px-4 text-[10px] font-bold tracking-[0.15em] uppercase">
              Status
            </th>

            <th className="py-6 px-4 text-[10px] font-bold tracking-[0.15em] uppercase">
              Source
            </th>

            <th className="py-6 px-4 text-[10px] font-bold tracking-[0.15em] uppercase">
              Actions
            </th>

            <th className="py-6 px-4 md:px-8 text-right text-[10px] font-bold tracking-[0.15em] uppercase">
              Timestamp
            </th>
          </tr>
        </thead>

        <tbody>
          {leads.map(
            (lead) => (
              <tr
                key={lead._id}
                className="group border-b border-[#111111]/10 dark:border-white/10 hover:bg-[#F4F4F0]/50 dark:hover:bg-white/5 transition-colors duration-300"
              >
                <td className="py-5 px-4 md:px-8">
                  <span className="text-sm font-bold uppercase tracking-wide group-hover:text-[#FF3E00] transition-colors duration-300">
                    {
                      lead.name
                    }
                  </span>
                </td>

                <td className="py-5 px-4">
                  <span className="text-xs font-medium uppercase tracking-wider opacity-70">
                    {
                      lead.email
                    }
                  </span>
                </td>

                <td className="py-5 px-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    {
                      lead.status
                    }
                  </span>
                </td>

                <td className="py-5 px-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">
                    {
                      lead.source
                    }
                  </span>
                </td>

                <td className="py-5 px-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        onEdit?.(
                          lead
                        )
                      }
                      className="border border-[#111111]/20 dark:border-white/20 px-2 py-1 text-[9px] font-bold uppercase tracking-widest transition hover:border-[#FF3E00] hover:text-[#FF3E00]"
                    >
                      Edit
                    </button>

                    {user?.role ===
                      "admin" && (
                      <button
                        onClick={() =>
                          onDelete?.(
                            lead._id
                          )
                        }
                        className="border border-red-500/30 px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-red-500 transition hover:bg-red-500 hover:text-white"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </td>

                <td className="py-5 px-4 md:px-8 text-right">
                  <span className="text-[10px] font-bold tracking-widest opacity-40 uppercase">
                    {new Date(
                      lead.createdAt
                    )
                      .toLocaleDateString(
                        "en-US"
                      )
                      .replace(
                        /\//g,
                        "."
                      )}
                  </span>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}