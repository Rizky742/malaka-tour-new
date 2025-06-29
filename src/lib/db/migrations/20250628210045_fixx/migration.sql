/*
  Warnings:

  - The primary key for the `Maskapai` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Tabungan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TransaksiTabungan` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Paket" DROP CONSTRAINT "Paket_maskapai_id_fkey";

-- DropForeignKey
ALTER TABLE "TransaksiTabungan" DROP CONSTRAINT "TransaksiTabungan_tabungan_id_fkey";

-- AlterTable
ALTER TABLE "Maskapai" DROP CONSTRAINT "Maskapai_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Maskapai_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Maskapai_id_seq";

-- AlterTable
ALTER TABLE "Paket" ALTER COLUMN "maskapai_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Tabungan" DROP CONSTRAINT "Tabungan_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Tabungan_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Tabungan_id_seq";

-- AlterTable
ALTER TABLE "TransaksiTabungan" DROP CONSTRAINT "TransaksiTabungan_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "tabungan_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "TransaksiTabungan_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "TransaksiTabungan_id_seq";

-- AddForeignKey
ALTER TABLE "Paket" ADD CONSTRAINT "Paket_maskapai_id_fkey" FOREIGN KEY ("maskapai_id") REFERENCES "Maskapai"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransaksiTabungan" ADD CONSTRAINT "TransaksiTabungan_tabungan_id_fkey" FOREIGN KEY ("tabungan_id") REFERENCES "Tabungan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
