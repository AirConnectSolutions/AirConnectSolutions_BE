import { createServer, getAllServers, getServerById, updateServer, deleteServer } from "./server.controller.js";
import { validate } from "../../../middleware/validate.middleware.js";
import { createServerValidation } from "./server.validation.js";
import express from "express";
const router = express.Router()

// Base endpoint: /api/v1/admin/server
router.post("/", validate(createServerValidation), createServer)
router.get("/", getAllServers);

// Parameterized endpoint: /api/v1/admin/server/:id
router.get("/:id", getServerById);
router.put("/:id", updateServer);
router.delete("/:id", deleteServer);

export default router