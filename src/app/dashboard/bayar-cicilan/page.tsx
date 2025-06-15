"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PembayaranCicilan() {
  const router = useRouter();

  // Jumlah cicilan ditentukan oleh sistem
  const jumlahCicilan = 2500000; // Bisa ambil dari props, context, fetch, dsb
  const [metode, setMetode] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const res = await fetch("/api/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ first_name: "rizky", last_name : "ardiansyah", email: "rizkyardiansyah967@gmail.com", phone: "081249142352", "amount" : 500000}),
      });
  
      if (!res.ok) throw new Error("Gagal membuat transaksi");
  
      const data = await res.json();
      console.log("Transaction result:", data);
  
      // Redirect ke Midtrans payment page
      if (data?.redirect_url) {
        window.location.href = data.redirect_url;
      } else {
        router.push("/dashboard/transaksi-berhasil");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat memproses pembayaran");
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
        <h2 className="text-xl font-bold mb-6 text-gray-800 text-center">
          Pembayaran Cicilan
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jumlah Pembayaran
            </label>
            <div className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm bg-gray-100 text-gray-700">
              Rp{jumlahCicilan.toLocaleString("id-ID")}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Metode Pembayaran
            </label>
            <select
              required
              value={metode}
              onChange={(e) => setMetode(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="" disabled>Pilih metode</option>
              <option value="Transfer Bank">Transfer Bank</option>
              <option value="QRIS">QRIS</option>
              <option value="E-wallet">E-wallet</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition"
          >
            Bayar Sekarang
          </button>
        </form>
      </div>
    </div>
  );
}
