import { createWorkspaceRecord, deleteWorkspaceRecord, findWorkspaceByIdAndUserId, findWorkspacesByUserId, updateWorkspaceRecord, WorkspaceRecord } from "../repository/workspace-repository.js";
import { NotFoundError } from "../types/app-error.js";
import { CreateWorkspaceInput, UpdateWorkspaceInput } from "../validator/workspace-validator.js";


export function listWorkspaceByUser(userId: string){
    return findWorkspacesByUserId(userId);
}

 
export async function getWorksapceByIdForUser(
    workspaceId: string,
    userId: string,
): Promise<WorkspaceRecord>{
    const workspace = await findWorkspaceByIdAndUserId(workspaceId,userId);

    if(!workspace){
        throw new NotFoundError("Workspace Not Found");
    }

    return workspace;
}

export function createWorkspaceForUser(
    userId: string,
    input: CreateWorkspaceInput,
){
    return createWorkspaceRecord(userId,input);
}

export async function updateWorkspaceForUser(
    workspaceId: string,
    userId: string,
    input: UpdateWorkspaceInput,
){
    await getWorksapceByIdForUser(workspaceId,userId);
    return updateWorkspaceRecord(workspaceId,input);        
}


export async function deleteWorkspaceForUser(
    workspaceId: string,
    userId: string,
){
    await getWorksapceByIdForUser(workspaceId,userId);

    // try{
        
    // }catch(error){

    // }

    await deleteWorkspaceRecord(workspaceId)
}