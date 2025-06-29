/*
  Warnings:

  - You are about to drop the column `total_pax` on the `Paket` table. All the data in the column will be lost.
  - Added the required column `total_pax` to the `PaketKamar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Paket" DROP COLUMN "total_pax";

-- AlterTable
ALTER TABLE "PaketKamar" ADD COLUMN     "total_pax" INTEGER NOT NULL;
