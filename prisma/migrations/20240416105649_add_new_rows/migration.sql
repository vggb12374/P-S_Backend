/*
  Warnings:

  - Added the required column `isCurrentPosition` to the `AvailableSquares` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionId` to the `Squares` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AvailableSquares" ADD COLUMN     "isCurrentPosition" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Squares" ADD COLUMN     "sessionId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "Squares" ADD CONSTRAINT "Squares_fk1" FOREIGN KEY ("sessionId") REFERENCES "Sessions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
