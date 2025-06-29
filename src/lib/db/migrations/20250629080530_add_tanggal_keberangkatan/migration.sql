/*
  Warnings:

  - Added the required column `tanggal_keberangkatan` to the `Paket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Paket" ADD COLUMN     "tanggal_keberangkatan" TIMESTAMP(3) NOT NULL;
