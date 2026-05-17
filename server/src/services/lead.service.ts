import Lead from "../models/lead.model.js";
import { AppError } from "../utils/AppError.js";

interface GetLeadsQuery {
  page?: string;

  status?: string;

  source?: string;

  search?: string;

  sort?: string;
}

export async function getLeads(
  query: GetLeadsQuery
) {
  const {
    page = "1",

    status,

    source,

    search,

    sort = "latest",
  } = query;

  const limit = 10;

  const skip =
    (Number(page) - 1) * limit;

  const filters: Record<
    string,
    unknown
  > = {};

  if (status) {
    filters.status = status;
  }

  if (source) {
    filters.source = source;
  }

  if (search) {
    filters.$or = [
      {
        name: {
          $regex: search,

          $options: "i",
        },
      },

      {
        email: {
          $regex: search,

          $options: "i",
        },
      },
    ];
  }

  const sortOption =
    sort === "oldest"
      ? { createdAt: 1 }
      : { createdAt: -1 };

  const leads =
    await Lead.find(filters)
      .sort(sortOption as any)
      .skip(skip)
      .limit(limit);

  const total =
    await Lead.countDocuments(
      filters
    );

  return {
    leads,

    pagination: {
      total,

      page: Number(page),

      pages: Math.ceil(
        total / limit
      ),

      limit,
    },
  };
}

interface CreateLeadPayload {
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
  payload: CreateLeadPayload,

  userId: string
) {
  const lead =
    await Lead.create({
      ...payload,

      createdBy: userId,
    });

  return lead;
}

export async function getLeadById(
  leadId: string
) {
  const lead =
    await Lead.findById(leadId);

  if (!lead) {
    throw new AppError(
      "Lead not found",
      404
    );
  }

  return lead;
}

export async function updateLead(
  leadId: string,

  payload: CreateLeadPayload
) {
  const lead =
    await Lead.findByIdAndUpdate(
      leadId,

      payload,

      {
        new: true,
      }
    );

  if (!lead) {
    throw new AppError(
      "Lead not found",
      404   
    );
  }

  return lead;
}

export async function deleteLead(
  leadId: string
) {
  const lead =
    await Lead.findByIdAndDelete(
      leadId
    );

  if (!lead) {
    throw new AppError(
      "Lead not found",
      404   
    );
  }

  return lead;
}