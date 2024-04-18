/*
  Warnings:

  - A unique constraint covering the columns `[squareId,userSessionId]` on the table `AvailableSquares` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AvailableSquares_squareId_userSessionId" ON "AvailableSquares"("squareId", "userSessionId");
