/*
  Warnings:

  - A unique constraint covering the columns `[resourceId,userSessionId]` on the table `Inventories` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Inventories_resourceId_userSessionId" ON "Inventories"("resourceId", "userSessionId");

CREATE OR REPLACE FUNCTION increase_amount_on_update()
RETURNS TRIGGER AS $$
BEGIN
    NEW.amount = NEW.amount + 1;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER increase_amount_trigger
BEFORE UPDATE ON "Inventories"
FOR EACH ROW
EXECUTE FUNCTION increase_amount_on_update();
