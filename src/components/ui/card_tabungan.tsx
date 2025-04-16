import Image from "next/image";
import MasjidImage from "@/assets/baru.jpg";
import Link from "next/link";

type CardTabunganProps = {
  paket: string;
  totalHarga: number;
  sudahDibayar: number;
  tagihanBulanIni: number;
  sisaBulan: number;
};

export default function CardTabungan({
  paket,
  totalHarga,
  sudahDibayar,
  tagihanBulanIni,
  sisaBulan,
}: CardTabunganProps) {
  const progress = Math.min((sudahDibayar / totalHarga) * 100, 100);
  const isLunas = tagihanBulanIni === 0;

  return (
    <div className="flex flex-col md:flex-row items-center justify-between border rounded-xl overflow-hidden shadow-lg w-full mx-auto bg-white">
      <div className="w-full md:w-1/3 h-60 relative">
        <Image
          src={MasjidImage}
          alt="Masjid"
          layout="fill"
          objectFit="cover"
          className="rounded-b-xl md:rounded-b-none md:rounded-r-xl"
        />
      </div>

      <div className="p-6 w-full md:w-2/3">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-bold text-gray-800">{paket}</h2>
          <Link href={"/dashboard/riwayat-pembayaran"}>
            <button className="text-sm bg-blue-100 text-blue-600 font-medium px-3 py-1 rounded-full">
              Riwayat Pembayaran
            </button>
          </Link>
        </div>

        <p className="text-[24px] font-bold text-gray-900 mt-2">
          Rp{totalHarga.toLocaleString("id-ID")}
        </p>

        {!isLunas && (
          <p className="text-sm text-gray-600 mb-2">{sisaBulan} Bulan lagi!</p>
        )}

        {/* Progress Bar */}
        <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
          <div
            className="absolute left-0 top-0 h-full bg-blue-400 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="flex justify-between text-sm text-gray-500 mb-3">
          <span>Rp{(sudahDibayar).toLocaleString("id-ID")}</span>
          <span>Rp{totalHarga.toLocaleString("id-ID")}</span>
        </div>

        {/* Status + Aksi */}
        <div className="flex flex-wrap gap-2 items-center mb-3">
          <button className="px-4 py-1 bg-blue-500 text-white rounded-full text-sm">
            Tagihan bulan ini{!isLunas && `: Rp${tagihanBulanIni.toLocaleString("id-ID")}`}
          </button>

          <span className={`px-4 py-1 rounded-full text-sm ${isLunas ? "bg-green-500 text-white" : "bg-yellow-500 text-white"}`}>
            {isLunas ? "Lunas" : "Belum Lunas"}
          </span>
        </div>

        {/* Tombol Bayar Sekarang di bawah */}
        {!isLunas && (
          <Link href="/dashboard/bayar-cicilan">
            <button className="px-4 py-2 bg-green-600 text-white rounded-full text-sm">
              Bayar Sekarang
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
