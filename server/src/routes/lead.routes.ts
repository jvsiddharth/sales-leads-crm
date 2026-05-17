import { Router } from "express";

import { protect } from "../middlewares/auth.middleware.js";

import { getAllLeads, createNewLead, updateSingleLead, removeLead, getSingleLead } from "../controllers/lead.controller.js";

import { validate } from "../middlewares/validate.middleware.js";

import { createLeadSchema } from "../validators/lead.validator.js";
import { authorize } from "../middlewares/role.middleware.js";

const router = Router();

router.get(
  "/",
  protect,
  getAllLeads
);

router.get(
  "/:id",
  protect,
  getSingleLead
);

router.post(
    "/",
    protect,
    validate(createLeadSchema),
    createNewLead
);


router.put(
  "/:id",
  protect,
  validate(createLeadSchema),
  updateSingleLead
);
    
router.delete(
  "/:id",
  protect,
  authorize(["admin"]),
  removeLead    
);
export default router;