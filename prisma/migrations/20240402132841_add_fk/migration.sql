-- AddForeignKey
ALTER TABLE "AvailableSquares" ADD CONSTRAINT "AvailableSquares_fk1" FOREIGN KEY ("squareId") REFERENCES "Squares"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "AvailableSquares" ADD CONSTRAINT "AvailableSquares_fk2" FOREIGN KEY ("userSessionId") REFERENCES "UsersSessions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Inventories" ADD CONSTRAINT "Inventories_fk1" FOREIGN KEY ("resourceId") REFERENCES "Resources"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Inventories" ADD CONSTRAINT "Inventories_fk2" FOREIGN KEY ("userSessionId") REFERENCES "UsersSessions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Sessions" ADD CONSTRAINT "Sessions_fk2" FOREIGN KEY ("mapId") REFERENCES "Maps"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UsersSessions" ADD CONSTRAINT "UsersSessions_fk1" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UsersSessions" ADD CONSTRAINT "UsersSessions_fk2" FOREIGN KEY ("sessionId") REFERENCES "Sessions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
