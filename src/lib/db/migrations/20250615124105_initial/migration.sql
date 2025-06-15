/*
  Warnings:

  - Added the required column `harga` to the `Paket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hotel_madinah_id` to the `Paket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hotel_mekkah_id` to the `Paket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama` to the `Paket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipe_kamar_id` to the `Paket` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `tipe_cicilan` on the `Tabungan` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `updatedAt` to the `Transaksi_Tabungan` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TypeTabungan" AS ENUM ('bulan', 'minggu');

-- AlterTable
ALTER TABLE "Paket" ADD COLUMN     "harga" INTEGER NOT NULL,
ADD COLUMN     "hotel_madinah_id" INTEGER NOT NULL,
ADD COLUMN     "hotel_mekkah_id" INTEGER NOT NULL,
ADD COLUMN     "nama" TEXT NOT NULL,
ADD COLUMN     "tipe_kamar_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Tabungan" DROP COLUMN "tipe_cicilan",
ADD COLUMN     "tipe_cicilan" "TypeTabungan" NOT NULL;

-- AlterTable
ALTER TABLE "Transaksi_Tabungan" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Hotel" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "bintang" TEXT NOT NULL,

    CONSTRAINT "Hotel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tanggal_Kebarangkatan" (
    "id" SERIAL NOT NULL,
    "paket_id" INTEGER NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tanggal_Kebarangkatan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tipe_Kamar" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "desc" TEXT,

    CONSTRAINT "Tipe_Kamar_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Paket" ADD CONSTRAINT "Paket_tipe_kamar_id_fkey" FOREIGN KEY ("tipe_kamar_id") REFERENCES "Tipe_Kamar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paket" ADD CONSTRAINT "Paket_hotel_madinah_id_fkey" FOREIGN KEY ("hotel_madinah_id") REFERENCES "Hotel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paket" ADD CONSTRAINT "Paket_hotel_mekkah_id_fkey" FOREIGN KEY ("hotel_mekkah_id") REFERENCES "Hotel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tanggal_Kebarangkatan" ADD CONSTRAINT "Tanggal_Kebarangkatan_paket_id_fkey" FOREIGN KEY ("paket_id") REFERENCES "Paket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
