/*
  Warnings:

  - Added the required column `avgRating` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviewCount` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "avgRating" INTEGER NOT NULL,
ADD COLUMN     "reviewCount" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "content" DROP NOT NULL;
