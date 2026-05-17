import {
  useEffect,
} from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import {
  leadSchema,
  type LeadSchema,
} from "../schemas/lead.schema";

import {
  createLead,
  updateLead,
} from "../services/lead.service";

import type { Lead } from "../types/lead.types";

interface LeadFormModalProps {
  open: boolean;

  onClose: () => void;

  lead?: Lead | null;
}

export default function LeadFormModal({
  open,
  onClose,
  lead,
}: LeadFormModalProps) {
  const queryClient =
    useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<LeadSchema>({
    resolver:
      zodResolver(
        leadSchema
      ),
  });

  useEffect(() => {
    if (lead) {
      reset({
        name: lead.name,

        email: lead.email,

        status:
          lead.status,

        source:
          lead.source,
      });
    } else {
      reset({
        name: "",

        email: "",

        status: "new",

        source:
          "website",
      });
    }
  }, [lead, reset]);

  const mutation =
    useMutation({
      mutationFn: async (
        values: LeadSchema
      ) => {
        if (lead) {
          return updateLead(
            lead._id,
            values
          );
        }

        return createLead(
          values
        );
      },

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              "leads",
            ],
          }
        );

        toast.success(
          lead
            ? "Lead updated"
            : "Lead created"
        );

        onClose();

        reset();
      },

      onError: () => {
        toast.error(
          "Something went wrong"
        );
      },
    });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg border border-[#111111]/10 bg-white p-8 dark:border-white/10 dark:bg-[#111111]">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {lead
              ? "Edit Lead"
              : "Create Lead"}
          </h2>

          <button
            onClick={onClose}
            className="text-sm uppercase tracking-widest opacity-60 transition hover:opacity-100"
          >
            Close
          </button>
        </div>

        <form
          onSubmit={handleSubmit(
            (values) =>
              mutation.mutate(
                values
              )
          )}
          className="space-y-5"
        >
          <input
            {...register("name")}
            placeholder="Lead name"
            className="w-full border border-[#111111]/10 bg-transparent px-4 py-3 outline-none dark:border-white/10"
          />

          <input
            {...register(
              "email"
            )}
            placeholder="Lead email"
            className="w-full border border-[#111111]/10 bg-transparent px-4 py-3 outline-none dark:border-white/10"
          />

          <select
            {...register(
              "status"
            )}
            className="w-full border border-[#111111]/10 bg-[#F4F4F0] text-[#111111] dark:border-white/10 dark:bg-[#111111] dark:text-white px-4 py-3 outline-none"
          >
            <option
              value="new"
              className="bg-[#F4F4F0] text-[#111111] dark:bg-[#111111] dark:text-white"
            >
              New
            </option>

            <option
              value="contacted"
              className="bg-[#F4F4F0] text-[#111111] dark:bg-[#111111] dark:text-white"
            >
              Contacted
            </option>

            <option
              value="qualified"
              className="bg-[#F4F4F0] text-[#111111] dark:bg-[#111111] dark:text-white"
            >
              Qualified
            </option>

            <option
              value="lost"
              className="bg-[#F4F4F0] text-[#111111] dark:bg-[#111111] dark:text-white"
            >
              Lost
            </option>
          </select>

          <select
            {...register(
              "source"
            )}
            className="w-full border border-[#111111]/10 bg-[#F4F4F0] text-[#111111] dark:border-white/10 dark:bg-[#111111] dark:text-white px-4 py-3 outline-none"
          >
            <option
              value="website"
              className="bg-[#F4F4F0] text-[#111111] dark:bg-[#111111] dark:text-white"
            >
              Website
            </option>

            <option
              value="instagram"
              className="bg-[#F4F4F0] text-[#111111] dark:bg-[#111111] dark:text-white"
            >
              Instagram
            </option>

            <option
              value="referral"
              className="bg-[#F4F4F0] text-[#111111] dark:bg-[#111111] dark:text-white"
            >
              Referral
            </option>
          </select>

          <button
            type="submit"
            disabled={
              mutation.isPending
            }
            className="w-full bg-[#111111] px-5 py-3 text-sm font-medium uppercase tracking-widest text-white transition hover:bg-[#FF3E00] disabled:opacity-50 dark:bg-white dark:text-black"
          >
            {mutation.isPending
              ? "Processing..."
              : lead
                ? "Update Lead"
                : "Create Lead"}
          </button>
        </form>
      </div>
    </div>
  );
}