/*
  Warnings:

  - A unique constraint covering the columns `[x,y,sessionId]` on the table `Squares` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Squares_x_y_sessionId" ON "Squares"("x", "y", "sessionId");
