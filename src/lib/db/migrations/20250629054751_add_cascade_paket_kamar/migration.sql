-- DropForeignKey
ALTER TABLE "PaketKamar" DROP CONSTRAINT "PaketKamar_paket_id_fkey";

-- AddForeignKey
ALTER TABLE "PaketKamar" ADD CONSTRAINT "PaketKamar_paket_id_fkey" FOREIGN KEY ("paket_id") REFERENCES "Paket"("id") ON DELETE CASCADE ON UPDATE CASCADE;
