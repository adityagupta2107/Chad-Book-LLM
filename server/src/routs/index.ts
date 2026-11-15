import type { Express } from "express";
import { memoryRoutes } from "./memory.routes.js";
import { sourceRoutes } from "./sources.routes.js";
import { workspaceRoutes } from "./workspace.routes.js";

export function registerRoutes(app: Express): void {
    workspaceRoutes.use("/:workspaceId/sources", sourceRoutes);
    app.use("/api/workspaces", workspaceRoutes);
    app.use("/api/memory", memoryRoutes);
}