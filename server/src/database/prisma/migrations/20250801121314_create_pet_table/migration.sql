-- CreateEnum
CREATE TYPE "public"."PetSpecies" AS ENUM ('dog', 'cat');

-- CreateEnum
CREATE TYPE "public"."PetAge" AS ENUM ('puppy', 'adult', 'senior');

-- CreateEnum
CREATE TYPE "public"."PetSize" AS ENUM ('small', 'medium', 'large');

-- CreateEnum
CREATE TYPE "public"."PetGender" AS ENUM ('male', 'female', 'unknown');

-- CreateEnum
CREATE TYPE "public"."PetStatus" AS ENUM ('available', 'adopted');

-- CreateTable
CREATE TABLE "public"."pets" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "species" "public"."PetSpecies" NOT NULL,
    "breed" TEXT,
    "gender" "public"."PetGender" NOT NULL,
    "age" "public"."PetAge" NOT NULL,
    "size" "public"."PetSize" NOT NULL,
    "description" TEXT,
    "vaccinated" BOOLEAN NOT NULL,
    "neutered" BOOLEAN NOT NULL,
    "status" "public"."PetStatus" NOT NULL,
    "imagesUrls" TEXT[],
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."pets" ADD CONSTRAINT "pets_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
