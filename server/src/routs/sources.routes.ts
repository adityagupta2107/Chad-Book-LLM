import { Router } from "express";

import { asyncHandler } from '../utils/async-handler.js'
import { bulkDeleteSourcesSchema } from "../validator/source.validator.js";
import { bulkDeleteSources, createSource, deleteSource, getSource, importWebsite, importYoutube, listSources, uploadPdf } from "../controllers/sourec.controllar.js";
import { uploadSinglePdf } from "../controllers/upload.middleware.js";

export const sourceRoutes = Router({ mergeParams: true });

sourceRoutes.post(
    "/upload",
    uploadSinglePdf,
    asyncHandler(uploadPdf),
);
sourceRoutes.post("/import/website", asyncHandler(importWebsite));
sourceRoutes.post("/import/youtube", asyncHandler(importYoutube));
sourceRoutes.get("/", asyncHandler(listSources));
sourceRoutes.post("/", asyncHandler(createSource));
sourceRoutes.post("/bulk-delete", asyncHandler(bulkDeleteSources));
sourceRoutes.get("/:sourceId", asyncHandler(getSource));
sourceRoutes.delete("/:sourceId", asyncHandler(deleteSource));