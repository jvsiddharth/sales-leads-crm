import {} from "express";
import { createLead, deleteLead, getLeadById, getLeads, updateLead, } from "../services/lead.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
export const getAllLeads = asyncHandler(async (request, response) => {
    const data = await getLeads(request.query);
    response.status(200).json({
        success: true,
        message: "Leads fetched successfully",
        data,
    });
});
export const createNewLead = asyncHandler(async (request, response) => {
    const lead = await createLead(request.body, request.userId);
    response.status(201).json({
        success: true,
        message: "Lead created successfully",
        data: lead,
    });
});
export const getSingleLead = asyncHandler(async (request, response) => {
    const lead = await getLeadById(request.params.id);
    response.status(200).json({
        success: true,
        data: lead,
    });
});
export const updateSingleLead = asyncHandler(async (request, response) => {
    const lead = await updateLead(request.params.id, request.body);
    response.status(200).json({
        success: true,
        message: "Lead updated successfully",
        data: lead,
    });
});
export const removeLead = asyncHandler(async (request, response) => {
    await deleteLead(request.params.id);
    response.status(200).json({
        success: true,
        message: "Lead deleted successfully",
    });
});
//# sourceMappingURL=lead.controller.js.map