/*
  Warnings:

  - A unique constraint covering the columns `[source]` on the table `Maps` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[type]` on the table `Resources` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Maps_source_key" ON "Maps"("source");

-- CreateIndex
CREATE UNIQUE INDEX "Resources_type_key" ON "Resources"("type");
