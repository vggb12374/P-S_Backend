/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `Sessions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Sessions_token_key" ON "Sessions"("token");
