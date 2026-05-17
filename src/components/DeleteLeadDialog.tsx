import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import { deleteLead } from "../services/lead.service";

interface DeleteLeadDialogProps {
  open: boolean;

  onClose: () => void;

  leadId: string;
}

export default function DeleteLeadDialog({
  open,
  onClose,
  leadId,
}: DeleteLeadDialogProps) {
  const queryClient =
    useQueryClient();

  const mutation =
    useMutation({
      mutationFn: () =>
        deleteLead(
          leadId
        ),

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              "leads",
            ],
          }
        );

        toast.success(
          "Lead deleted"
        );

        onClose();
      },

      onError: () => {
        toast.error(
          "Delete failed"
        );
      },
    });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md border border-[#111111]/10 bg-white p-8 dark:border-white/10 dark:bg-[#111111]">
        <h2 className="text-xl font-semibold">
          Delete Lead
        </h2>

        <p className="mt-3 text-sm opacity-70">
          This action cannot be
          undone.
        </p>

        <div className="mt-8 flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 border border-[#111111]/10 px-4 py-3 text-sm uppercase tracking-widest dark:border-white/10"
          >
            Cancel
          </button>

          <button
            onClick={() =>
              mutation.mutate()
            }
            disabled={
              mutation.isPending
            }
            className="flex-1 bg-red-500 px-4 py-3 text-sm font-medium uppercase tracking-widest text-white disabled:opacity-50"
          >
            {mutation.isPending
              ? "Deleting..."
              : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}