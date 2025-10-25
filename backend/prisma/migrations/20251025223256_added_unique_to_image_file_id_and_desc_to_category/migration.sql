/*
  Warnings:

  - A unique constraint covering the columns `[fileId]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "description" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Image_fileId_key" ON "Image"("fileId");
