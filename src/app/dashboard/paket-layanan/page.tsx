/* eslint-disable @next/next/no-img-element */
"use client";
import { useQuery } from "@tanstack/react-query";
// pages/paket-layanan.js atau app/paket-layanan/page.js (untuk App Router)
// import { useState } from 'react';
import Head from "next/head";
import Link from "next/link";

// Type definitions
type Paket_Kamar = {
  id: string;
  tipe_kamar: "quad" | "triple" | "double";
  harga: number;
  total_pax: number;
  tersedia: boolean;
};

type Hotel = {
  id: string;
  nama: string;
  bintang: string;
  location: string;
};

type Maskapai = {
  id: string;
  nama: string;
};

type Paket = {
  id: number;
  maskapai: Maskapai;
  hotel_madinah: Hotel;
  hotel_mekkah: Hotel;
  total_pax: number;
  nama: string;
  durasi: string;
  deskripsi: string;
  tanggal_keberangkatan: string;
  paket_kamar: Paket_Kamar[];
  image_url: string;
};

const PaketLayananPage = () => {
  //   const [selectedCategory] = useState('semua');

  const { data: packages = [], isPending } = useQuery({
    queryKey: ["paket"],
    queryFn: async () => {
      const response = await fetch("/api/paket");
      return response.json();
    },
  });

  const getLowestPrice = (tipeKamar: Paket_Kamar[]) => {
    // const tersediaKamar = tipeKamar.filter((t) => t.tersedia);
    // if (tersediaKamar.length === 0) return 0;
    return Math.min(...tipeKamar.map((t) => t.harga));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const renderStars = (bintang: string) => {
    const starCount = parseInt(bintang);
    return "⭐".repeat(starCount);
  };

  if (isPending) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Paket Layanan - Tabungan Umroh</title>
        <meta
          name="description"
          content="Pilih paket umroh, haji, dan tour terbaik dengan harga terjangkau"
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex gap-6">
            {/* Sidebar */}

            {/* Main Content */}
            <div className="flex-1">
              {/* Breadcrumb */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Pesan Paket
                </h1>
                <div className="text-sm text-gray-500">
                  <span>Beranda</span>
                  <span className="mx-2">|</span>
                  <span>Pesan Paket</span>
                </div>
              </div>

              {/* Package Grid */}
              <div className="grid gap-6">
                {packages.data.map((pkg: Paket) => (
                  <div
                    key={pkg.id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="flex">
                      {/* Image */}
                      <div className="w-80 h-full relative overflow-hidden">
                        <img
                          src={pkg.image_url}
                          alt={pkg.nama}
                          className="w-full h-full object-cover"
                        />
                        {/* Fallback gradient background */}
                        <div
                          className="absolute inset-0 bg-gradient-to-br from-green-400 via-teal-500 to-blue-500 flex items-center justify-center"
                          style={{ display: "none" }}
                        >
                          <div className="text-white text-center">
                            <div className="text-5xl mb-2">🕌</div>
                            <div className="text-lg font-semibold">
                              {pkg.durasi}
                            </div>
                          </div>
                        </div>
                        {/* Duration overlay */}
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-sm font-semibold">
                          {pkg.durasi}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight">
                              {pkg.nama}
                            </h3>

                            {/* Airline Info */}
                            <div className="flex items-center text-sm text-gray-600 mb-2">
                              <span className="text-blue-500 mr-1">✈️</span>
                              <span>
                                Maskapai:{" "}
                                <span className="text-blue-600 font-medium">
                                  {pkg.maskapai.nama}
                                </span>
                              </span>
                            </div>

                            {/* Departure Date */}
                            <div className="flex items-center text-sm text-gray-600 mb-2">
                              <span className="text-orange-500 mr-1">📅</span>
                              <span>
                                Keberangkatan:{" "}
                                <span className="text-blue-600 font-medium">
                                  {/* {pkg.tanggal_keberangkatan} */}
                                  {new Date(
                                    pkg.tanggal_keberangkatan
                                  ).toLocaleDateString("id-ID", {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                  })}
                                </span>
                              </span>
                            </div>

                            {/* Hotel Madinah */}
                            <div className="flex items-center text-sm text-gray-600 mb-2">
                              <span className="text-green-500 mr-1">🏨</span>
                              <span>
                                Hotel Madinah:{" "}
                                <span className="text-blue-600 font-medium">
                                  {pkg.hotel_madinah.nama}
                                </span>
                                <span className="ml-2 text-yellow-500">
                                  {renderStars(pkg.hotel_madinah.bintang)}
                                </span>
                              </span>
                            </div>

                            {/* Hotel Makkah */}
                            <div className="flex items-center text-sm text-gray-600 mb-4">
                              <span className="text-purple-500 mr-1">🏨</span>
                              <span>
                                Hotel Mekkah:{" "}
                                <span className="text-blue-600 font-medium">
                                  {pkg.hotel_mekkah.nama}
                                </span>
                                <span className="ml-2 text-yellow-500">
                                  {renderStars(pkg.hotel_mekkah.bintang)}
                                </span>
                              </span>
                            </div>

                            <div className="mb-4">
                              <div className="text-xs text-gray-500 mb-1">
                                Mulai dari
                              </div>
                              <div className="text-2xl font-bold text-gray-900">
                                {formatPrice(getLowestPrice(pkg.paket_kamar))}
                              </div>
                            </div>

                            {/* Package Description */}
                            {pkg.deskripsi && (
                              <div className="text-sm text-gray-600 mb-3">
                                {pkg.deskripsi}
                              </div>
                            )}

                            {/* Additional Info */}
                            <div className="flex flex-wrap gap-2">
                              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                {pkg.durasi}
                              </span>
                              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                                {pkg.total_pax} Pax
                              </span>
                              <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                                {pkg.paket_kamar.length} Tipe Kamar
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-col gap-2 ml-6">
                            <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 text-sm font-medium transition-colors">
                              Lihat Detail
                            </button>
                            <Link href={`/dashboard/layanan/${pkg.id}`}>
                            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors">
                              Pesan Sekarang
                            </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-8">
                <button className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Muat Lebih Banyak Paket
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaketLayananPage;
