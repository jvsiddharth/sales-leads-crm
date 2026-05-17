import {
  type Request,
  type Response,
} from "express";

import {
  createLead,
  deleteLead,
  getLeadById,
  getLeads,
  updateLead,
} from "../services/lead.service.js";

import { asyncHandler } from "../utils/asyncHandler.js";

export const getAllLeads =
  asyncHandler(
    async (
      request: Request,
      response: Response
    ) => {
      const data =
        await getLeads(
          request.query
        );

      response.status(200).json({
        success: true,

        message:
          "Leads fetched successfully",

        data,
      });
    }
  );

export const createNewLead =
  asyncHandler(
    async (
      request: Request,
      response: Response
    ) => {
      const lead =
        await createLead(
          request.body,

          request.userId as string
        );

      response.status(201).json({
        success: true,

        message:
          "Lead created successfully",

        data: lead,
      });
    }
  );

export const getSingleLead =
  asyncHandler(
    async (
      request: Request,
      response: Response
    ) => {
      const lead =
        await getLeadById(
            request.params.id as string
        );

      response.status(200).json({
        success: true,

        data: lead,
      });
    }
  );

export const updateSingleLead =
  asyncHandler(
    async (
      request: Request,
      response: Response
    ) => {
      const lead =
        await updateLead(
          request.params.id as string,
          request.body
        );

      response.status(200).json({
        success: true,

        message:
          "Lead updated successfully",

        data: lead,
      });
    }
  );

export const removeLead =
  asyncHandler(
    async (
      request: Request,
      response: Response
    ) => {
      await deleteLead(
        request.params.id as string
      );

      response.status(200).json({
        success: true,

        message:
          "Lead deleted successfully",
      });
    }
  );