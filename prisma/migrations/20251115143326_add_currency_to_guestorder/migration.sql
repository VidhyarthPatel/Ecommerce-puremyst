/*
  Warnings:

  - A unique constraint covering the columns `[razorpayOrderId]` on the table `GuestOrder` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[razorpayPaymentId]` on the table `GuestOrder` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[receipt]` on the table `GuestOrder` will be added. If there are existing duplicate values, this will fail.
  - The required column `receipt` was added to the `GuestOrder` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "public"."GuestOrder" ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'INR',
ADD COLUMN     "paidAt" TIMESTAMP(3),
ADD COLUMN     "paymentStatus" TEXT NOT NULL DEFAULT 'pending',
ADD COLUMN     "razorpayOrderId" TEXT,
ADD COLUMN     "razorpayPaymentId" TEXT,
ADD COLUMN     "razorpaySignature" TEXT,
ADD COLUMN     "receipt" TEXT NOT NULL,
ALTER COLUMN "paymentMethod" SET DEFAULT 'online';

-- CreateIndex
CREATE UNIQUE INDEX "GuestOrder_razorpayOrderId_key" ON "public"."GuestOrder"("razorpayOrderId");

-- CreateIndex
CREATE UNIQUE INDEX "GuestOrder_razorpayPaymentId_key" ON "public"."GuestOrder"("razorpayPaymentId");

-- CreateIndex
CREATE UNIQUE INDEX "GuestOrder_receipt_key" ON "public"."GuestOrder"("receipt");
