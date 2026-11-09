import { Router } from "express";

import { asyncHandler } from '../utils/async-handler.js'
import { bulkDeleteSourcesSchema } from "../validator/source.validator.js";
import { bulkDeleteSources, createSource, deleteSource, getSource, listSources } from "../controllers/sourec.controllar.js";

export const sourceRoutes = Router({ mergeParams: true });

sourceRoutes.get("/", asyncHandler(listSources));
sourceRoutes.post("/", asyncHandler(createSource));
sourceRoutes.post("/bulk-delete", asyncHandler(bulkDeleteSources));
sourceRoutes.get("/:sourceId", asyncHandler(getSource));
sourceRoutes.delete("/:sourceId", asyncHandler(deleteSource));