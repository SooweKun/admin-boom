-- CreateTable
CREATE TABLE "Card" (
    "id" TEXT NOT NULL,
    "ico" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "bonus" INTEGER NOT NULL,
    "link" TEXT NOT NULL,
    "margin" DOUBLE PRECISION NOT NULL,
    "percent" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Advantage" (
    "id" SERIAL NOT NULL,
    "stat" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,

    CONSTRAINT "Advantage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Advantage" ADD CONSTRAINT "Advantage_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
