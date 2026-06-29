import { createServer, getAllServers, getServerById, updateServer, deleteServer } from "./server.controller.js";
import { validate } from "../../../middleware/validate.middleware.js";
import { createServerValidation } from "./server.validation.js";
import { authenticate } from "../../../middleware/auth.middleware.js";
import express from "express";
const router = express.Router()

// Base endpoint: /api/v1/admin/server
router.post("/", authenticate, validate(createServerValidation), createServer)
router.get("/", authenticate, getAllServers);

// Parameterized endpoint: /api/v1/admin/server/:id
router.get("/:id", authenticate, getServerById);
router.put("/:id", authenticate, updateServer);
router.delete("/:id", authenticate, deleteServer);

export default router