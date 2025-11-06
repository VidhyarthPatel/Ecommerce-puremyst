-- CreateTable
CREATE TABLE "public"."GuestOrder" (
    "id" TEXT NOT NULL,
    "orderNumber" TEXT NOT NULL,
    "guestName" TEXT NOT NULL,
    "guestEmail" TEXT NOT NULL,
    "guestPhone" TEXT NOT NULL,
    "guestAddress" TEXT NOT NULL,
    "guestCity" TEXT NOT NULL,
    "guestState" TEXT NOT NULL,
    "guestZipCode" TEXT NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL,
    "shipping" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GuestOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."GuestOrderItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "productSlug" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "productPrice" DOUBLE PRECISION NOT NULL,
    "productImage" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GuestOrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GuestOrder_orderNumber_key" ON "public"."GuestOrder"("orderNumber");

-- AddForeignKey
ALTER TABLE "public"."GuestOrderItem" ADD CONSTRAINT "GuestOrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."GuestOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
