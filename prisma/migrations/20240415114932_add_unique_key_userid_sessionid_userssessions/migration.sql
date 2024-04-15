/*
  Warnings:

  - A unique constraint covering the columns `[userId,sessionId]` on the table `UsersSessions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UsersSessions_userId_sessionId" ON "UsersSessions"("userId", "sessionId");
