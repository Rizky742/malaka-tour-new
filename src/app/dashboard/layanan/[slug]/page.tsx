"use client";

import React, { useState, useEffect } from "react";
import { Users, Calendar, MapPin, Plane, Building } from "lucide-react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

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

const BookingPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const slug = params.slug;
  console.log(slug);

  const [selectedPeriod, setSelectedPeriod] = useState(0);
  const [jamaahs, setJamaahs] = useState([
    { nik: "", phone: "", name: "", age: "", roomType: "quad" },
  ]);

  const { data, isLoading, error } = useQuery<{
    success: boolean;
    data: Paket;
  }>({
    queryKey: ["paket", slug],
    queryFn: async () => {
      const response = await fetch(`/api/paket/${slug}`);
      if (!response.ok) {
        throw new Error("Failed to fetch package data");
      }
      return response.json();
    },
    enabled: !!slug, // Only run query if slug exists
  });

  const packageData = data?.data;

  // Parse departure date from packageData
  const departureDate = packageData
    ? new Date(packageData.tanggal_keberangkatan)
    : new Date();

  // Calculate months until departure
  const calculateMonthsUntilDeparture = () => {
    if (!packageData) return 1;
    const today = new Date();
    const departure = departureDate;

    const yearDiff = departure.getFullYear() - today.getFullYear();
    const monthDiff = departure.getMonth() - today.getMonth();

    return Math.max(1, yearDiff * 12 + monthDiff);
  };

  const monthsUntilDeparture = calculateMonthsUntilDeparture();

  // Generate period options
  const generatePeriodOptions = () => {
    const options = [];
    for (let i = 1; i <= monthsUntilDeparture; i++) {
      options.push(i);
    }
    return options;
  };

  const periodOptions = generatePeriodOptions();

  // Calculate total cost based on actual package data
  const calculateTotalCost = () => {
    if (!packageData) return 0;

    // Create a map of room prices from packageData
    const roomPriceMap: { [key: string]: number } = {};
    packageData.paket_kamar.forEach((kamar) => {
      roomPriceMap[kamar.tipe_kamar] = kamar.harga;
    });

    // Fallback prices if not found in packageData
    const fallbackPrices: { [key: string]: number } = {
      quad: 25000000,
      triple: 28000000,
      double: 32000000,
    };

    const totalRoomCost = jamaahs.reduce((total, jamaah) => {
      const roomPrice =
        roomPriceMap[jamaah.roomType] || fallbackPrices[jamaah.roomType];
      return total + roomPrice;
    }, 0);

    // Admin fee - you might want to add this to your Paket type
    const adminFee = 15555; // Default admin fee
    return totalRoomCost + adminFee;
  };

  const totalCost = calculateTotalCost();

  // Calculate monthly payment
  const calculateMonthlyPayment = () => {
    if (selectedPeriod === 0) return 0;
    return Math.ceil(totalCost / selectedPeriod);
  };

  const monthlyPayment = calculateMonthlyPayment();

  // Get room price for display
  const getRoomPrice = (roomType: string) => {
    if (!packageData) return 0;

    const roomData = packageData.paket_kamar.find(
      (kamar) => kamar.tipe_kamar === roomType
    );
    if (roomData) return roomData.harga;

    // Fallback prices
    const fallbackPrices: { [key: string]: number } = {
      quad: 25000000,
      triple: 28000000,
      double: 32000000,
    };
    return fallbackPrices[roomType];
  };

  // Set default period to maximum (until departure)
  useEffect(() => {
    if (selectedPeriod === 0 && monthsUntilDeparture > 0) {
      setSelectedPeriod(monthsUntilDeparture);
    }
  }, [monthsUntilDeparture, selectedPeriod]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute(
      "data-client-key",
      process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!
    );
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    const orderId = `ORDER-${Date.now()}`;
    // const grossAmount = totalCost;
    const grossAmount = monthlyPayment; // Ini yang dibayar per cicilan

    const res = await fetch("/api/transaction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId,
        grossAmount, // Sekarang menggunakan nilai cicilan bulanan
        customer: {
          first_name: session?.user.name || "Jamaah",
          email: session?.user.email || "customer@example.com",
          phone: jamaahs[0]?.phone || "08123456789",
        },
        // Tambahan info untuk tracking cicilan
        metadata: {
          totalCost,
          monthlyPayment,
          selectedPeriod,
          currentInstallment: 1,
          packageId: packageData!.id,
          jamaahs: jamaahs.length,
        },
      }),
    });

    const data = await res.json();

    if (window.snap) {
      window.snap.pay(data.token, {
        onSuccess: function (result) {
          // alert("Pembayaran berhasil!");
          console.log("Success:", result);
          // Redirect atau simpan ke database
          router.push("/dashboard"); // navigasi client side tanpa reload
        },
        onPending: function (result) {
          alert("Menunggu pembayaran.");
          console.log("Pending:", result);
        },
        onError: function (error) {
          alert("Pembayaran gagal.");
          console.log("Error:", error);
        },
        onClose: function () {
          alert("Popup ditutup tanpa menyelesaikan pembayaran.");
        },
      });
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data paket...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !packageData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Gagal memuat data paket</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Muat Ulang
          </button>
        </div>
      </div>
    );
  }

  const addJamaah = () => {
    setJamaahs([
      ...jamaahs,
      { nik: "", phone: "", name: "", age: "", roomType: "quad" },
    ]);
  };

  const updateJamaah = (index: number, field: string, value: string) => {
    const updated = jamaahs.map((jamaah, i) =>
      i === index ? { ...jamaah, [field]: value } : jamaah
    );
    setJamaahs(updated);
  };

  const removeJamaah = (index: number) => {
    if (jamaahs.length > 1) {
      setJamaahs(jamaahs.filter((_, i) => i !== index));
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Package Summary */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Detail Paket
              </h2>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {packageData.nama}
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span>{packageData.durasi}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-red-600" />
                    <span>Keberangkatan: {formatDate(departureDate)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Plane className="w-4 h-4 text-green-600" />
                    <span>{packageData.maskapai.nama}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-green-600" />
                    <span>
                      Hotel Madinah: {packageData.hotel_madinah.nama} (
                      {packageData.hotel_madinah.bintang}⭐)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-purple-600" />
                    <span>
                      Hotel Mekkah: {packageData.hotel_mekkah.nama} (
                      {packageData.hotel_mekkah.bintang}⭐)
                    </span>
                  </div>
                </div>
              </div>

              {/* Package Selection */}
              <div className="grid grid-cols-1 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Periode Tabungan
                    <span className="text-blue-600 ml-1">
                      (Tersisa {monthsUntilDeparture} bulan sampai
                      keberangkatan)
                    </span>
                  </label>
                  <select
                    value={selectedPeriod}
                    onChange={(e) =>
                      setSelectedPeriod(parseInt(e.target.value))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {periodOptions.map((period) => (
                      <option key={period} value={period}>
                        {period} Bulan
                      </option>
                    ))}
                  </select>
                  <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                    <div className="text-sm text-blue-800">
                      <strong>Cicilan Terpilih:</strong> Rp
                      {monthlyPayment.toLocaleString("id-ID")}/bulan selama{" "}
                      {selectedPeriod} bulan
                    </div>
                    <div className="text-xs text-blue-600 mt-1">
                      Pembayaran pertama: {formatDate(new Date())} | Pembayaran
                      terakhir:{" "}
                      {formatDate(
                        new Date(
                          new Date().setMonth(
                            new Date().getMonth() + selectedPeriod - 1
                          )
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Jamaah Data */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Data Pribadi Jamaah
                </h2>
                <button
                  onClick={addJamaah}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
                >
                  + Tambah Jamaah
                </button>
              </div>

              {jamaahs.map((jamaah, index) => (
                <div
                  key={index}
                  className="mb-6 p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">
                      Jamaah {index + 1}
                    </h3>
                    {jamaahs.length > 1 && (
                      <button
                        onClick={() => removeJamaah(index)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Hapus
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        NIK
                      </label>
                      <input
                        type="text"
                        value={jamaah.nik}
                        onChange={(e) =>
                          updateJamaah(index, "nik", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Masukkan NIK"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        No. Telepon
                      </label>
                      <input
                        type="text"
                        value={jamaah.phone}
                        onChange={(e) =>
                          updateJamaah(index, "phone", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Masukkan nomor telepon"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        value={jamaah.name}
                        onChange={(e) =>
                          updateJamaah(index, "name", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Masukkan nama lengkap"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Umur
                      </label>
                      <input
                        type="number"
                        value={jamaah.age}
                        onChange={(e) =>
                          updateJamaah(index, "age", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Masukkan umur"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tipe Kamar
                      </label>
                      <select
                        value={jamaah.roomType}
                        onChange={(e) =>
                          updateJamaah(index, "roomType", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {packageData.paket_kamar.map((kamar) => (
                          <option key={kamar.id} value={kamar.tipe_kamar}>
                            {kamar.tipe_kamar.charAt(0).toUpperCase() +
                              kamar.tipe_kamar.slice(1)}{" "}
                            ({kamar.total_pax} orang/kamar) - Rp{" "}
                            {kamar.harga.toLocaleString("id-ID")}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Rincian Pembayaran
              </h2>

              <div className="space-y-3 mb-6">
                {jamaahs.map((jamaah, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span className="text-gray-600">
                      Jamaah {index + 1} ({jamaah.roomType}):
                    </span>
                    <span className="font-semibold">
                      Rp{getRoomPrice(jamaah.roomType).toLocaleString("id-ID")}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Biaya Admin:</span>
                  <span className="font-semibold">
                    Rp{(15555).toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Total:</span>
                    <span className="text-xl font-bold text-blue-600">
                      Rp{totalCost.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    (Termasuk Biaya Admin)
                  </div>
                </div>
              </div>

              {/* Cicilan Info */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-green-800 mb-2">
                  Rencana Cicilan
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-green-700">Periode:</span>
                    <span className="font-semibold text-green-800">
                      {selectedPeriod} bulan
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Per bulan:</span>
                    <span className="font-semibold text-green-800">
                      Rp{monthlyPayment.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Mulai:</span>
                    <span className="font-semibold text-green-800">
                      {formatDate(new Date()).split(" ").slice(0, 2).join(" ")}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePayment}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold transition-colors"
              >
                Konfirmasi Pembayaran
              </button>

              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="text-sm text-yellow-800">
                  <strong>Catatan:</strong> Setelah konfirmasi, Anda akan
                  menerima detail pembayaran dan jadwal cicilan.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
