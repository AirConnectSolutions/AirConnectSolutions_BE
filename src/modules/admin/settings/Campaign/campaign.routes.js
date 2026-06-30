import { createCampaign, getAllCampaigns, getCampaignById, updateCampaign, deleteCampaign } from "./campaign.controller.js";
import { authenticate } from "../../../../middleware/auth.middleware.js";
import express from "express";

const router = express.Router();

// Base endpoint: /api/v1/campaign
router.post("/", authenticate, createCampaign);
router.get("/", authenticate, getAllCampaigns);

// Parameterized endpoint: /api/v1/campaign/:id
router.get("/:id", authenticate, getCampaignById);
router.put("/:id", authenticate, updateCampaign);
router.delete("/:id", authenticate, deleteCampaign);

export default router;