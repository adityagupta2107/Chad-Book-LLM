import { Router } from "express";
import {
    createMemory,
    deleteMemory,
    listMemories,
    updateMemory,
} from "../controllers/memory.controllar.js";
import { requireAuth } from "../middleware/require-auth-midleware.js";
import { asyncHandler } from "../utils/async-handler.js";

export const memoryRoutes = Router();

memoryRoutes.use(requireAuth);

memoryRoutes.get("/", asyncHandler(listMemories));
memoryRoutes.post("/", asyncHandler(createMemory));
memoryRoutes.patch("/:memoryId", asyncHandler(updateMemory));
memoryRoutes.delete("/:memoryId", asyncHandler(deleteMemory));