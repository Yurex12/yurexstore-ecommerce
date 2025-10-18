-- CreateTable
CREATE TABLE "_UserPurchases" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserPurchases_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UserPurchases_B_index" ON "_UserPurchases"("B");

-- AddForeignKey
ALTER TABLE "_UserPurchases" ADD CONSTRAINT "_UserPurchases_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserPurchases" ADD CONSTRAINT "_UserPurchases_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
