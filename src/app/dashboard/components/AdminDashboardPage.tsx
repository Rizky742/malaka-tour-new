"use client";

import { useMemo } from "react";
import { CreditCard, DollarSign, Users, Clock } from "lucide-react";

type Pelanggan = {
  id: number;
  nama: string;
  sudahBayarBulanIni: boolean;
  jumlahBayarBulanIni: number;
};

export default function DashboardAdminPage() {
  // Simulasi data pelanggan
  const pelangganList: Pelanggan[] = [
    { id: 1, nama: "Andi", sudahBayarBulanIni: true, jumlahBayarBulanIni: 500000 },
    { id: 2, nama: "Budi", sudahBayarBulanIni: false, jumlahBayarBulanIni: 0 },
    { id: 3, nama: "Cici", sudahBayarBulanIni: true, jumlahBayarBulanIni: 750000 },
    { id: 4, nama: "Dina", sudahBayarBulanIni: true, jumlahBayarBulanIni: 300000 },
    { id: 5, nama: "Eko", sudahBayarBulanIni: false, jumlahBayarBulanIni: 0 },
  ];

  // Perhitungan statistik
  const totalPelanggan = pelangganList.length;

  const pemasukanBulanIni = useMemo(
    () =>
      pelangganList.reduce((total, p) => total + p.jumlahBayarBulanIni, 0),
    [pelangganList]
  );

  const jumlahYangBayar = pelangganList.filter((p) => p.sudahBayarBulanIni).length;
  const jumlahBelumBayar = pelangganList.filter((p) => !p.sudahBayarBulanIni).length;

  return (
    <div className="px-4 md:px-20 py-8 space-y-8">
      <h1 className="text-2xl font-bold">Dashboard Admin</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          icon={<Users size={32} className="text-blue-600" />}
          title="Jumlah Pelanggan"
          value={`${totalPelanggan}`}
        />
        <DashboardCard
          icon={<DollarSign size={32} className="text-green-600" />}
          title="Pemasukan Bulan Ini"
          value={`Rp ${pemasukanBulanIni.toLocaleString("id-ID")}`}
        />
        <DashboardCard
          icon={<CreditCard size={32} className="text-emerald-600" />}
          title="Sudah Bayar Cicilan"
          value={`${jumlahYangBayar}`}
        />
        <DashboardCard
          icon={<Clock size={32} className="text-red-600" />}
          title="Belum Bayar"
          value={`${jumlahBelumBayar}`}
        />
      </div>
    </div>
  );
}

function DashboardCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex items-center space-x-4">
      <div className="p-3 rounded-full bg-gray-100">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  );
}
