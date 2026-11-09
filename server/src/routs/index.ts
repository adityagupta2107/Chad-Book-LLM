import { sourceRoutes } from "./sources.routes.js";
import { workspaceRoutes } from "./workspace.routes.js";
import type { Express } from 'express'
export function registerRoutes(app:Express):void{
    workspaceRoutes.use("/:workspaceId/sources",sourceRoutes)
    app.use("/api/workspaces", workspaceRoutes)
}   