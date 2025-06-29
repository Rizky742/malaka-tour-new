/*
  Warnings:

  - The primary key for the `Paket` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "PaketKamar" DROP CONSTRAINT "PaketKamar_paket_id_fkey";

-- DropForeignKey
ALTER TABLE "PendaftaranUmroh" DROP CONSTRAINT "PendaftaranUmroh_paket_id_fkey";

-- DropForeignKey
ALTER TABLE "Tabungan" DROP CONSTRAINT "Tabungan_paket_id_fkey";

-- AlterTable
ALTER TABLE "Paket" DROP CONSTRAINT "Paket_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Paket_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Paket_id_seq";

-- AlterTable
ALTER TABLE "PaketKamar" ALTER COLUMN "paket_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "PendaftaranUmroh" ALTER COLUMN "paket_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Tabungan" ALTER COLUMN "paket_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "PendaftaranUmroh" ADD CONSTRAINT "PendaftaranUmroh_paket_id_fkey" FOREIGN KEY ("paket_id") REFERENCES "Paket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaketKamar" ADD CONSTRAINT "PaketKamar_paket_id_fkey" FOREIGN KEY ("paket_id") REFERENCES "Paket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tabungan" ADD CONSTRAINT "Tabungan_paket_id_fkey" FOREIGN KEY ("paket_id") REFERENCES "Paket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
