-- DropForeignKey
ALTER TABLE "Advantage" DROP CONSTRAINT "Advantage_cardId_fkey";

-- AddForeignKey
ALTER TABLE "Advantage" ADD CONSTRAINT "Advantage_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;
