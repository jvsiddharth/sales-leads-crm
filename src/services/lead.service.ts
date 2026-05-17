import api from "../lib/api";

export interface LeadFilters {
  page: number;

  search: string;

  status: string;

  source: string;

  sort: string;
}

export async function getLeads(
  filters: LeadFilters
) {
  const params =
    new URLSearchParams({
      page: String(
        filters.page
      ),

      search:
        filters.search,

      status:
        filters.status,

      source:
        filters.source,

      sort: filters.sort,
    });

  const response =
    await api.get(
      `/leads?${params.toString()}`
    );

  return response.data.data;
}

export interface LeadPayload {
  name: string;

  email: string;

  status:
    | "new"
    | "contacted"
    | "qualified"
    | "lost";

  source:
    | "website"
    | "instagram"
    | "referral";
}

export async function createLead(
  payload: LeadPayload
) {
  const response =
    await api.post(
      "/leads",
      payload
    );

  return response.data.data;
}

export async function updateLead(
  id: string,

  payload: LeadPayload
) {
  const response =
    await api.put(
      `/leads/${id}`,
      payload
    );

  return response.data.data;
}

export async function deleteLead(
  id: string
) {
  const response =
    await api.delete(
      `/leads/${id}`
    );

  return response.data;
}