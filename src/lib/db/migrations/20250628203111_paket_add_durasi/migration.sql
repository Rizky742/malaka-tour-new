/*
  Warnings:

  - Added the required column `durasi` to the `Paket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Paket" ADD COLUMN     "durasi" TEXT NOT NULL;
