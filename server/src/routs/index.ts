import { workspaceRoutes } from "./workspace.routes.js";
import type { Express } from 'express'
export function registerRoutes(app:Express):void{
    app.use("/api/workspaces", workspaceRoutes)
}  