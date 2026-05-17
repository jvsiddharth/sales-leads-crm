import Lead from "../models/lead.model.js";
import { AppError } from "../utils/AppError.js";
export async function getLeads(query) {
    const { page = "1", status, source, search, sort = "latest", } = query;
    const limit = 10;
    const skip = (Number(page) - 1) * limit;
    const filters = {};
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
    const sortOption = sort === "oldest"
        ? { createdAt: 1 }
        : { createdAt: -1 };
    const leads = await Lead.find(filters)
        .sort(sortOption)
        .skip(skip)
        .limit(limit);
    const total = await Lead.countDocuments(filters);
    return {
        leads,
        pagination: {
            total,
            page: Number(page),
            pages: Math.ceil(total / limit),
            limit,
        },
    };
}
export async function createLead(payload, userId) {
    const lead = await Lead.create({
        ...payload,
        createdBy: userId,
    });
    return lead;
}
export async function getLeadById(leadId) {
    const lead = await Lead.findById(leadId);
    if (!lead) {
        throw new AppError("Lead not found", 404);
    }
    return lead;
}
export async function updateLead(leadId, payload) {
    const lead = await Lead.findByIdAndUpdate(leadId, payload, {
        new: true,
    });
    if (!lead) {
        throw new AppError("Lead not found", 404);
    }
    return lead;
}
export async function deleteLead(leadId) {
    const lead = await Lead.findByIdAndDelete(leadId);
    if (!lead) {
        throw new AppError("Lead not found", 404);
    }
    return lead;
}
//# sourceMappingURL=lead.service.js.map