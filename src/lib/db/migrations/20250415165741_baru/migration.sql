/*
  Warnings:

  - Added the required column `no_hp` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "alamat" TEXT,
ADD COLUMN     "no_hp" TEXT NOT NULL,
ADD COLUMN     "password" TEXT,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'user';

-- CreateTable
CREATE TABLE "Anggota" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "nama" VARCHAR(50) NOT NULL,
    "tanggal_lahir" DATE NOT NULL,
    "jenis_kelamin" CHAR(1) NOT NULL,
    "hubungan" VARCHAR(10) NOT NULL,
    "no_hp" VARCHAR(13) NOT NULL,

    CONSTRAINT "Anggota_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fasilitas" (
    "id" SERIAL NOT NULL,
    "nama" VARCHAR(20) NOT NULL,

    CONSTRAINT "Fasilitas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tour_Guide" (
    "id" SERIAL NOT NULL,
    "nama" VARCHAR(20) NOT NULL,
    "no_hp" VARCHAR(13) NOT NULL,

    CONSTRAINT "Tour_Guide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Maskapai" (
    "id" SERIAL NOT NULL,
    "nama" VARCHAR(20) NOT NULL,

    CONSTRAINT "Maskapai_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tabungan" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "saldo" DECIMAL(15,2) NOT NULL,
    "status" VARCHAR(10) NOT NULL,
    "tanggal_mulai" DATE NOT NULL,
    "tanggal_akhir" DATE NOT NULL,
    "tipe_cicilan" VARCHAR(10) NOT NULL,

    CONSTRAINT "Tabungan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaksi_Tabungan" (
    "id" SERIAL NOT NULL,
    "tabungan_id" INTEGER NOT NULL,

    CONSTRAINT "Transaksi_Tabungan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paket" (
    "id" SERIAL NOT NULL,
    "maskapai_id" INTEGER NOT NULL,
    "tour_guide_id" INTEGER NOT NULL,

    CONSTRAINT "Paket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Detail_Fasilitas" (
    "paket_id" INTEGER NOT NULL,
    "fasilitas_id" INTEGER NOT NULL,

    CONSTRAINT "Detail_Fasilitas_pkey" PRIMARY KEY ("paket_id","fasilitas_id")
);

-- CreateTable
CREATE TABLE "Pemesanan" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "paket_id" INTEGER NOT NULL,
    "jumlah_orang" INTEGER NOT NULL,
    "tanggal_pemesanan" DATE NOT NULL,

    CONSTRAINT "Pemesanan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaksi_Pembayaran" (
    "id" SERIAL NOT NULL,
    "pemesanan_id" INTEGER NOT NULL,
    "jumlah_pembayaran" INTEGER NOT NULL,
    "tanggal_pembayaran" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaksi_Pembayaran_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Anggota" ADD CONSTRAINT "Anggota_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tabungan" ADD CONSTRAINT "Tabungan_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaksi_Tabungan" ADD CONSTRAINT "Transaksi_Tabungan_tabungan_id_fkey" FOREIGN KEY ("tabungan_id") REFERENCES "Tabungan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paket" ADD CONSTRAINT "Paket_maskapai_id_fkey" FOREIGN KEY ("maskapai_id") REFERENCES "Maskapai"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paket" ADD CONSTRAINT "Paket_tour_guide_id_fkey" FOREIGN KEY ("tour_guide_id") REFERENCES "Tour_Guide"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detail_Fasilitas" ADD CONSTRAINT "Detail_Fasilitas_paket_id_fkey" FOREIGN KEY ("paket_id") REFERENCES "Paket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detail_Fasilitas" ADD CONSTRAINT "Detail_Fasilitas_fasilitas_id_fkey" FOREIGN KEY ("fasilitas_id") REFERENCES "Fasilitas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pemesanan" ADD CONSTRAINT "Pemesanan_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pemesanan" ADD CONSTRAINT "Pemesanan_paket_id_fkey" FOREIGN KEY ("paket_id") REFERENCES "Paket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaksi_Pembayaran" ADD CONSTRAINT "Transaksi_Pembayaran_pemesanan_id_fkey" FOREIGN KEY ("pemesanan_id") REFERENCES "Pemesanan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
