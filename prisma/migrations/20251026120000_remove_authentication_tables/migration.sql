-- DropForeignKey
ALTER TABLE "public"."CartItem" DROP CONSTRAINT "CartItem_cartId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CartItem" DROP CONSTRAINT "CartItem_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Cart" DROP CONSTRAINT "Cart_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Authenticator" DROP CONSTRAINT "Authenticator_userId_fkey";

-- DropTable
DROP TABLE "public"."CartItem";

-- DropTable
DROP TABLE "public"."Cart";

-- DropTable
DROP TABLE "public"."Authenticator";

-- DropTable
DROP TABLE "public"."Session";

-- DropTable
DROP TABLE "public"."VerificationToken";

-- DropTable
DROP TABLE "public"."Account";

-- DropTable
DROP TABLE "public"."User";

