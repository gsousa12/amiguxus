/*
  Warnings:

  - You are about to drop the column `imagesUrls` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `pets` table. All the data in the column will be lost.
  - The required column `owner_id` was added to the `pets` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "public"."pets" DROP CONSTRAINT "pets_ownerId_fkey";

-- AlterTable
ALTER TABLE "public"."pets" DROP COLUMN "imagesUrls",
DROP COLUMN "ownerId",
ADD COLUMN     "images_urls" TEXT[],
ADD COLUMN     "owner_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."pets" ADD CONSTRAINT "pets_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
