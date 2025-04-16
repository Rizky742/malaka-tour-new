import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function TransaksiBerhasil() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle2 className="text-green-500 w-16 h-16" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Transaksi Berhasil!</h2>
        <p className="text-gray-600 mb-6">Terima kasih, transaksi Anda telah berhasil dibuat.</p>

        <div className="flex flex-col gap-3">
          <Link href="/dashboard">
            <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
              Kembali ke Dashboard
            </button>
          </Link>

          <Link href="/dashboard/riwayat-pembayaran">
            <button className="w-full border border-blue-600 text-blue-600 py-2 rounded-md hover:bg-blue-50 transition">
              Lihat Riwayat Pembayaran
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
