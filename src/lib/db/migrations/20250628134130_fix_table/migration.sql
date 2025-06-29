/*
  Warnings:

  - The primary key for the `Hotel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `harga` on the `Paket` table. All the data in the column will be lost.
  - You are about to drop the column `tipe_kamar_id` on the `Paket` table. All the data in the column will be lost.
  - You are about to drop the column `tour_guide_id` on the `Paket` table. All the data in the column will be lost.
  - You are about to drop the column `saldo` on the `Tabungan` table. All the data in the column will be lost.
  - You are about to drop the column `alamat` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `no_hp` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Anggota` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Detail_Fasilitas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Fasilitas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pemesanan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tanggal_Kebarangkatan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tipe_Kamar` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tour_Guide` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transaksi_Pembayaran` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transaksi_Tabungan` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `image_url` to the `Hotel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deskripsi` to the `Paket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_url` to the `Paket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_pax` to the `Paket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paket_id` to the `Tabungan` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "JenisKelamin" AS ENUM ('L', 'P');

-- CreateEnum
CREATE TYPE "StatusPendaftaran" AS ENUM ('aktif', 'batal', 'selesai');

-- CreateEnum
CREATE TYPE "StatusAnggota" AS ENUM ('aktif', 'batal');

-- CreateEnum
CREATE TYPE "StatusTransaksi" AS ENUM ('pending', 'verifikasi', 'ditolak', 'settlement');

-- DropForeignKey
ALTER TABLE "Anggota" DROP CONSTRAINT "Anggota_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Detail_Fasilitas" DROP CONSTRAINT "Detail_Fasilitas_fasilitas_id_fkey";

-- DropForeignKey
ALTER TABLE "Detail_Fasilitas" DROP CONSTRAINT "Detail_Fasilitas_paket_id_fkey";

-- DropForeignKey
ALTER TABLE "Paket" DROP CONSTRAINT "Paket_hotel_madinah_id_fkey";

-- DropForeignKey
ALTER TABLE "Paket" DROP CONSTRAINT "Paket_hotel_mekkah_id_fkey";

-- DropForeignKey
ALTER TABLE "Paket" DROP CONSTRAINT "Paket_tipe_kamar_id_fkey";

-- DropForeignKey
ALTER TABLE "Paket" DROP CONSTRAINT "Paket_tour_guide_id_fkey";

-- DropForeignKey
ALTER TABLE "Pemesanan" DROP CONSTRAINT "Pemesanan_paket_id_fkey";

-- DropForeignKey
ALTER TABLE "Pemesanan" DROP CONSTRAINT "Pemesanan_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Tanggal_Kebarangkatan" DROP CONSTRAINT "Tanggal_Kebarangkatan_paket_id_fkey";

-- DropForeignKey
ALTER TABLE "Transaksi_Pembayaran" DROP CONSTRAINT "Transaksi_Pembayaran_pemesanan_id_fkey";

-- DropForeignKey
ALTER TABLE "Transaksi_Tabungan" DROP CONSTRAINT "Transaksi_Tabungan_tabungan_id_fkey";

-- AlterTable
ALTER TABLE "Hotel" DROP CONSTRAINT "Hotel_pkey",
ADD COLUMN     "image_url" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Hotel_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Hotel_id_seq";

-- AlterTable
ALTER TABLE "Maskapai" ALTER COLUMN "nama" SET DATA TYPE TEXT,
ALTER COLUMN "deskripsi" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Paket" DROP COLUMN "harga",
DROP COLUMN "tipe_kamar_id",
DROP COLUMN "tour_guide_id",
ADD COLUMN     "deskripsi" TEXT NOT NULL,
ADD COLUMN     "image_url" TEXT NOT NULL,
ADD COLUMN     "total_pax" INTEGER NOT NULL,
ALTER COLUMN "hotel_madinah_id" SET DATA TYPE TEXT,
ALTER COLUMN "hotel_mekkah_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Tabungan" DROP COLUMN "saldo",
ADD COLUMN     "paket_id" INTEGER NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'aktif',
ALTER COLUMN "status" SET DATA TYPE TEXT,
ALTER COLUMN "tanggal_mulai" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "tanggal_akhir" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" DROP COLUMN "alamat",
DROP COLUMN "no_hp";

-- DropTable
DROP TABLE "Anggota";

-- DropTable
DROP TABLE "Detail_Fasilitas";

-- DropTable
DROP TABLE "Fasilitas";

-- DropTable
DROP TABLE "Pemesanan";

-- DropTable
DROP TABLE "Tanggal_Kebarangkatan";

-- DropTable
DROP TABLE "Tipe_Kamar";

-- DropTable
DROP TABLE "Tour_Guide";

-- DropTable
DROP TABLE "Transaksi_Pembayaran";

-- DropTable
DROP TABLE "Transaksi_Tabungan";

-- CreateTable
CREATE TABLE "PendaftaranUmroh" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "paket_id" INTEGER NOT NULL,
    "tanggal_pendaftaran" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "StatusPendaftaran" NOT NULL DEFAULT 'aktif',

    CONSTRAINT "PendaftaranUmroh_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PendaftaranAnggota" (
    "id" TEXT NOT NULL,
    "pendaftaran_id" TEXT NOT NULL,
    "jemaah_id" TEXT NOT NULL,
    "tipe_kamar" TEXT NOT NULL,
    "status" "StatusAnggota" NOT NULL DEFAULT 'aktif',

    CONSTRAINT "PendaftaranAnggota_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jemaah" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "nama" TEXT NOT NULL,
    "tanggal_lahir" TIMESTAMP(3) NOT NULL,
    "jenis_kelamin" "JenisKelamin" NOT NULL,
    "hubungan" TEXT NOT NULL,
    "no_hp" TEXT NOT NULL,

    CONSTRAINT "Jemaah_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaketKamar" (
    "id" TEXT NOT NULL,
    "paket_id" INTEGER NOT NULL,
    "tipe_kamar" TEXT NOT NULL,
    "harga" INTEGER NOT NULL,

    CONSTRAINT "PaketKamar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransaksiTabungan" (
    "id" SERIAL NOT NULL,
    "tabungan_id" INTEGER NOT NULL,
    "tanggal_setor" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "jumlah" INTEGER NOT NULL,
    "status_pembayaran" "StatusTransaksi" NOT NULL DEFAULT 'pending',
    "bukti_transfer" TEXT,
    "midtrans_order_id" TEXT,
    "midtrans_status" TEXT,

    CONSTRAINT "TransaksiTabungan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PendaftaranUmroh" ADD CONSTRAINT "PendaftaranUmroh_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PendaftaranUmroh" ADD CONSTRAINT "PendaftaranUmroh_paket_id_fkey" FOREIGN KEY ("paket_id") REFERENCES "Paket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PendaftaranAnggota" ADD CONSTRAINT "PendaftaranAnggota_pendaftaran_id_fkey" FOREIGN KEY ("pendaftaran_id") REFERENCES "PendaftaranUmroh"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PendaftaranAnggota" ADD CONSTRAINT "PendaftaranAnggota_jemaah_id_fkey" FOREIGN KEY ("jemaah_id") REFERENCES "Jemaah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jemaah" ADD CONSTRAINT "Jemaah_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paket" ADD CONSTRAINT "Paket_hotel_madinah_id_fkey" FOREIGN KEY ("hotel_madinah_id") REFERENCES "Hotel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paket" ADD CONSTRAINT "Paket_hotel_mekkah_id_fkey" FOREIGN KEY ("hotel_mekkah_id") REFERENCES "Hotel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaketKamar" ADD CONSTRAINT "PaketKamar_paket_id_fkey" FOREIGN KEY ("paket_id") REFERENCES "Paket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tabungan" ADD CONSTRAINT "Tabungan_paket_id_fkey" FOREIGN KEY ("paket_id") REFERENCES "Paket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransaksiTabungan" ADD CONSTRAINT "TransaksiTabungan_tabungan_id_fkey" FOREIGN KEY ("tabungan_id") REFERENCES "Tabungan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
