import CardTabungan from '@/components/ui/card_tabungan'
import { Plus } from 'lucide-react'
import React from 'react'
import BgUmroh from "@/assets/baru.jpg";
import Link from 'next/link';

function DashboardUserPage() {
  return (
    <>
     <div
        className="h-80 w-full flex flex-col justify-center bg-cover"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${BgUmroh.src})`,
          backgroundPosition: "center 400px",
          backgroundSize: "cover",
        }}
      >
        <h1 className="text-white px-4 md:px-[124px] text-[50px] font-bold">
          Dashboard
        </h1>
        <h1 className="text-white  px-4 md:px-[124px] text-[25px] font-medium">
          Tabungan anda
        </h1>
      </div>
      <div className="flex flex-col gap-4 my-8 px-4 md:px-[124px]">
        <CardTabungan paket="Paket Gold" sisaBulan={16} sudahDibayar={25000000} tagihanBulanIni={345345345} totalHarga={60000000} />
          <Link href={'/dashboard/layanan'}>
        <div className="flex items-center justify-center w-full h-[250px] border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 transition-all">
        <div className="flex flex-col items-center text-center text-gray-500">
          <Plus className="w-10 h-10 mb-2" />
          <span className="text-lg font-semibold">Tambah Tabungan Baru</span>
        </div>
      </div>
          </Link>
        {/* Kamu bisa menambah atau mengurangi CardTabungan sesuai kebutuhan */}
      </div>
    </>
  )
}

export default DashboardUserPage