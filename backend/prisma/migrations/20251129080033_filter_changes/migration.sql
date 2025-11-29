/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Color` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categorySlug` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "categorySlug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Color_name_key" ON "Color"("name");
