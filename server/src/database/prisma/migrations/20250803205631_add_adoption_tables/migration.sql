-- CreateEnum
CREATE TYPE "public"."AdoptionRequestStatus" AS ENUM ('pending', 'accepted', 'rejected');

-- CreateTable
CREATE TABLE "public"."adoption_requests" (
    "id" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,
    "request_user_id" TEXT NOT NULL,
    "status" "public"."AdoptionRequestStatus" NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ,

    CONSTRAINT "adoption_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."adoptions" (
    "id" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,
    "adopter_id" TEXT NOT NULL,
    "status" "public"."AdoptionRequestStatus" NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ,

    CONSTRAINT "adoptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."favorited_pets" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favorited_pets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "adoption_requests_pet_id_request_user_id_key" ON "public"."adoption_requests"("pet_id", "request_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "adoptions_pet_id_key" ON "public"."adoptions"("pet_id");

-- CreateIndex
CREATE UNIQUE INDEX "adoptions_pet_id_adopter_id_key" ON "public"."adoptions"("pet_id", "adopter_id");

-- CreateIndex
CREATE UNIQUE INDEX "favorited_pets_user_id_pet_id_key" ON "public"."favorited_pets"("user_id", "pet_id");

-- AddForeignKey
ALTER TABLE "public"."adoption_requests" ADD CONSTRAINT "adoption_requests_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "public"."pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."adoption_requests" ADD CONSTRAINT "adoption_requests_request_user_id_fkey" FOREIGN KEY ("request_user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."adoptions" ADD CONSTRAINT "adoptions_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "public"."pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."adoptions" ADD CONSTRAINT "adoptions_adopter_id_fkey" FOREIGN KEY ("adopter_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."favorited_pets" ADD CONSTRAINT "favorited_pets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."favorited_pets" ADD CONSTRAINT "favorited_pets_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "public"."pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
