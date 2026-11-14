-- CreateEnum
CREATE TYPE "MessageRole" AS ENUM ('USER', 'ASSINTANT');

-- CreateEnum
CREATE TYPE "ArtifactsType" AS ENUM ('SUMMRY', 'TAKEAWAYS', 'FLASHCARDS', 'QUIZ', 'MINDMAP', 'REPORT');

-- CreateEnum
CREATE TYPE "ArtifactsStatus" AS ENUM ('PENDING', 'PROCESSING', 'READY', 'FAILED');

-- CreateTable
CREATE TABLE "conversation" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "title" TEXT,
    "summary" TEXT,
    "summaryMessageCount" INTEGER NOT NULL DEFAULT 0,
    "summarizedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "conversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "role" "MessageRole" NOT NULL,
    "content" TEXT NOT NULL,
    "citations" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "learning-artifacts" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "type" "ArtifactsType" NOT NULL,
    "title" TEXT NOT NULL,
    "content" JSONB,
    "sourceIds" TEXT[],
    "status" "ArtifactsStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "learning-artifacts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "conversation_workspaceId_idx" ON "conversation"("workspaceId");

-- CreateIndex
CREATE INDEX "conversation_workspaceId_updatedAt_idx" ON "conversation"("workspaceId", "updatedAt");

-- CreateIndex
CREATE INDEX "messages_conversationId_idx" ON "messages"("conversationId");

-- CreateIndex
CREATE INDEX "messages_conversationId_createdAt_idx" ON "messages"("conversationId", "createdAt");

-- CreateIndex
CREATE INDEX "learning-artifacts_workspaceId_idx" ON "learning-artifacts"("workspaceId");

-- CreateIndex
CREATE INDEX "learning-artifacts_workspaceId_type_idx" ON "learning-artifacts"("workspaceId", "type");

-- AddForeignKey
ALTER TABLE "conversation" ADD CONSTRAINT "conversation_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "learning-artifacts" ADD CONSTRAINT "learning-artifacts_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
