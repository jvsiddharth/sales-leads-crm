import Papa from "papaparse";
import { type Lead } from "../types/lead.types";

export default function exportToCsv(
  leads: Lead[]
) {
  const csv = Papa.unparse(
    leads.map((lead) => ({
      Name: lead.name,
      Email: lead.email,
      Status: lead.status,
      Source: lead.source,
      CreatedAt:
        lead.createdAt,
    }))
  );

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url =
    URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;

  link.setAttribute(
    "download",
    "leads.csv"
  );

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
}