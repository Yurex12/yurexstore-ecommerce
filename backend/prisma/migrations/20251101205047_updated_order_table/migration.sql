/*
  Warnings:

  - You are about to drop the column `city` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `street` on the `Order` table. All the data in the column will be lost.
  - Added the required column `deliveryAddress` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethod` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productName` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PAYMENT_METHOD" AS ENUM ('CASH_ON_DELIVERY', 'STRIPE');

-- CreateEnum
CREATE TYPE "PAYMENT_STATUS" AS ENUM ('PENDING', 'CONFIRMED');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "city",
DROP COLUMN "state",
DROP COLUMN "street",
ADD COLUMN     "deliveryAddress" TEXT NOT NULL,
ADD COLUMN     "paymentMethod" "PAYMENT_METHOD" NOT NULL,
ADD COLUMN     "paymentStatus" "PAYMENT_STATUS" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "stripePaymentId" TEXT;

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "productName" TEXT NOT NULL;
