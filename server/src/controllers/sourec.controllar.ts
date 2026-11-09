import type { Request, Response } from "express";
import { ValidationError } from "../types/app-error.js";
import { getZodFieldErrors } from "../utils/zod-error.js";
import {
    bulkDeleteSourcesSchema,
    createSourceSchema,
    importWebsiteSchema,
    importYoutubeSchema,
    listSourcesQuerySchema,
    sourceIdParamSchema,
} from "../validator/source.validator.js";
import { workspaceIdParamSchema } from "../validator/workspace-validator.js";
import {
    bulkDeleteSourceForWorkspace,
    createTextOrMarkdownSource,
    deleteSourceForWorkspace,
    getSourceForWorkspace,
    importWebsiteSource,
    importYoutubeSource,
    listSourcesForWorkspace,
    uploadPdfSource,
} from "../services/source.service.js";

// --- Parsers ---

function parseWorkspaceId(params: Request["params"]) {
    const parsed = workspaceIdParamSchema.safeParse(params);
    if (!parsed.success) {
        throw new ValidationError(
            "Invalid workspace id",
            getZodFieldErrors(parsed.error),
        );
    }
    return parsed.data;
}

function parseSourceParams(params: Request["params"]) {
    const parsed = sourceIdParamSchema.safeParse(params);
    if (!parsed.success) {
        throw new ValidationError(
            "Invalid source id",
            getZodFieldErrors(parsed.error),
        );
    }
    return parsed.data;
}

function parseListQuery(query: Request["query"]) {
    const parsed = listSourcesQuerySchema.safeParse(query);
    if (!parsed.success) {
        throw new ValidationError(
            "Invalid query parameters",
            getZodFieldErrors(parsed.error),
        );
    }
    return parsed.data;
}

function parseCreateBody(body: unknown) {
    const parsed = createSourceSchema.safeParse(body);
    if (!parsed.success) {
        throw new ValidationError(
            "Validation failed",
            getZodFieldErrors(parsed.error),
        );
    }
    return parsed.data;
}

function parseBulkDeleteBody(body: unknown) {
    const parsed = bulkDeleteSourcesSchema.safeParse(body);
    if (!parsed.success) {
        throw new ValidationError(
            "Validation failed",
            getZodFieldErrors(parsed.error),
        );
    }
    return parsed.data;
}

function parseImportWebsiteBody(body: unknown) {
    const parsed = importWebsiteSchema.safeParse(body);
    if (!parsed.success) {
        throw new ValidationError(
            "Validation failed",
            getZodFieldErrors(parsed.error),
        );
    }
    return parsed.data;
}

function parseImportYoutubeBody(body: unknown) {
    const parsed = importYoutubeSchema.safeParse(body);
    if (!parsed.success) {
        throw new ValidationError(
            "Validation failed",
            getZodFieldErrors(parsed.error),
        );
    }
    return parsed.data;
}

// --- Handlers ---

export async function listSources(req: Request, res: Response) {
    const { workspaceId } = parseWorkspaceId(req.params);
    const filters = parseListQuery(req.query);
    const sources = await listSourcesForWorkspace(
        workspaceId,
        req.session.user.id,
        filters,
    );
    res.json(sources);
}

export async function getSource(req: Request, res: Response) {
    const { workspaceId, sourceId } = parseSourceParams(req.params);
    const source = await getSourceForWorkspace(
        workspaceId,
        sourceId,
        req.session.user.id,
    );
    res.json(source);
}

export async function createSource(req: Request, res: Response) {
    const { workspaceId } = parseWorkspaceId(req.params);
    const input = parseCreateBody(req.body);
    const source = await createTextOrMarkdownSource(
        workspaceId,
        req.session.user.id,
        input,
    );
    res.status(201).json(source);
}

export async function deleteSource(req: Request, res: Response) {
    const { workspaceId, sourceId } = parseSourceParams(req.params);
    await deleteSourceForWorkspace(
        workspaceId,
        sourceId,
        req.session.user.id,
    );
    res.status(204).send();
}

export async function bulkDeleteSources(req: Request, res: Response) {
    const { workspaceId } = parseWorkspaceId(req.params);
    const input = parseBulkDeleteBody(req.body);
    await bulkDeleteSourceForWorkspace( // Fixed typo from service file import asymmetry
        workspaceId,
        req.session.user.id,
        input.sourceIds,
    );
    res.status(204).send();
}

export async function uploadPdf(req: Request, res: Response) {
    const { workspaceId } = parseWorkspaceId(req.params);

    if (!req.file) {
        throw new ValidationError("PDF file is required");
    }

    const title =
        typeof req.body.title === "string" ? req.body.title : undefined;

    const source = await uploadPdfSource(
        workspaceId,
        req.session.user.id,
        req.file,
        title,
    );

    res.status(201).json(source);
}

export async function importWebsite(req: Request, res: Response) {
    const { workspaceId } = parseWorkspaceId(req.params);
    const input = parseImportWebsiteBody(req.body);
    const source = await importWebsiteSource(
        workspaceId,
        req.session.user.id,
        input,
    );
    res.status(201).json(source);
}

export async function importYoutube(req: Request, res: Response) {
    const { workspaceId } = parseWorkspaceId(req.params);
    const input = parseImportYoutubeBody(req.body);
    const source = await importYoutubeSource(
        workspaceId,
        req.session.user.id,
        input,
    );
    res.status(201).json(source);
}
