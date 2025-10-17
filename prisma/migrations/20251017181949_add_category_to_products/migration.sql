/*
  Warnings:

  - You are about to drop the column `categories` on the `Products` table. All the data in the column will be lost.
  - Added the required column `category` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Products" DROP COLUMN "categories",
ADD COLUMN     "category" TEXT NOT NULL;
