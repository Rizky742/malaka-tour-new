/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { Pencil, Trash2, Plus, Eye, X, ImageIcon, Upload } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";

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

type PaketFormData = {
  maskapai: string; // id saja
  hotel_madinah: string;
  hotel_mekkah: string;
  total_pax: number;
  nama: string;
  durasi: string;
  deskripsi: string;
  tanggal_keberangkatan: string;
  photo: string;
  tipeKamar: Paket_Kamar[];
};

export default function PaketPage() {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [editing, setEditing] = useState<Paket | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [selectedPaket, setSelectedPaket] = useState<Paket | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  //  const [ setDeleteId] = useState<number | null>(null);

  const { data: paketList = [], isPending } = useQuery({
    queryKey: ["paket"],
    queryFn: async () => {
      const response = await fetch("/api/paket");
      return response.json();
    },
  });

  const { data: maskapaiList = [] } = useQuery({
    queryKey: ["maskapai"],
    queryFn: async () => {
      const response = await fetch("/api/maskapai");
      return response.json();
    },
  });

  const { data: hotelList = [] } = useQuery({
    queryKey: ["hotel"],
    queryFn: async () => {
      const response = await fetch("/api/hotel");
      return response.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const form = new FormData();
      if (photoFile) {
        form.append("photo", photoFile);
      }
      form.append("maskapai", data.maskapai);
      form.append("hotel_madinah", data.hotel_madinah);
      form.append("hotel_mekkah", data.hotel_mekkah);
      form.append("nama", data.nama);
      form.append("durasi", data.durasi);
      form.append("tanggal_keberangkatan", data.tanggal_keberangkatan);
      form.append("deskripsi", data.deskripsi);

      // Jika photo berupa base64
      form.append("photo", data.photo);

      // Jika tipeKamar berupa array JSON, ubah jadi string
      form.append("tipeKamar", JSON.stringify(data.tipeKamar));

      console.log(data);

      const res = await fetch("/api/paket", {
        method: "POST",
        body: form,
      });

      if (!res.ok) throw new Error("Gagal menyimpan paket");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paket"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: Paket) => {
      const form = new FormData();
      console.log(data);

      form.append("maskapai", data.maskapai.id);
      form.append("hotel_madinah", data.hotel_madinah.id);
      form.append("hotel_mekkah", data.hotel_mekkah.id);
      form.append("nama", data.nama);
      form.append("durasi", data.durasi);
      form.append("deskripsi", data.deskripsi);
      form.append("tanggal_keberangkatan", data.tanggal_keberangkatan);
      form.append("photo", data.image_url);
      form.append("tipeKamar", JSON.stringify(data.paket_kamar));

      const res = await fetch(`/api/paket/${data.id}`, {
        method: "PUT",
        body: form,
      });

      if (!res.ok) throw new Error("Gagal update paket");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paket"] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await fetch(`/api/paket/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paket"] });
    },
  });

  const [formData, setFormData] = useState<PaketFormData>({
    maskapai: "",
    hotel_madinah: "",
    hotel_mekkah: "",
    total_pax: 0,
    nama: "",
    durasi: "",
    deskripsi: "",
    tanggal_keberangkatan: "",
    photo: "" as string,
    tipeKamar: [
      {
        id: "new1",
        tipe_kamar: "quad" as const,
        harga: 0,
        tersedia: true,
        total_pax: 0,
      },
      {
        id: "new2",
        tipe_kamar: "triple" as const,
        harga: 0,
        tersedia: true,
        total_pax: 0,
      },
      {
        id: "new3",
        tipe_kamar: "double" as const,
        harga: 0,
        tersedia: true,
        total_pax: 0,
      },
    ],
  });

  // const maskapaiOptions = [
  //   "cmcgq810s0000gy14ok6ln60p",
  //   "Lion Air",
  //   "Sriwijaya Air",
  //   "Citilink",
  // ];
  // const tourGuideOptions = [
  //   "John Doe",
  //   "Jane Smith",
  //   "Rudi Santoso",
  //   "Ahmad Zaki",
  // ];

  const openCreateModal = () => {
    queryClient.invalidateQueries({ queryKey: ["hotel"] });
    queryClient.invalidateQueries({ queryKey: ["maskapai"] });
    setFormData({
      maskapai: "",
      hotel_madinah: "",
      hotel_mekkah: "",
      total_pax: 0,
      nama: "",
      tanggal_keberangkatan: "",
      durasi: "",
      deskripsi: "",
      photo: "",
      tipeKamar: [
        { id: "new1", tipe_kamar: "quad", harga: 0, tersedia: true, total_pax: 0 },
        {
          id: "new2",
          tipe_kamar: "triple",
          harga: 0,
          tersedia: true,
          total_pax: 0,
        },
        { id: "new3", tipe_kamar: "double", harga: 0, tersedia: true, total_pax: 0 },
      ],
    });
    setEditing(null);
    setModalOpen(true);
  };

  const openEditModal = (data: Paket) => {
    setFormData({
      maskapai: data.maskapai.id,
      hotel_madinah: data.hotel_madinah.id,
      hotel_mekkah: data.hotel_mekkah.id,
      total_pax: data.total_pax,
      nama: data.nama,
      durasi: data.durasi,
      tanggal_keberangkatan: data.tanggal_keberangkatan,
      deskripsi: data.deskripsi,
      photo: data.image_url,
      tipeKamar: [...data.paket_kamar],
    });
    setEditing(data);
    // setPhotoPreview(data.photo)
    setModalOpen(true);
  };

  const openDetailModal = (paket: Paket) => {
    setSelectedPaket(paket);
    setDetailModalOpen(true);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }

    // Reset input agar bisa upload file yang sama lagi
    e.target.value = "";
  };
  const removePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
  };

  const handleTipeKamarChange = (
    index: number,
    field: string,
    value: unknown
  ) => {
    const newTipeKamar = [...formData.tipeKamar];
    newTipeKamar[index] = { ...newTipeKamar[index], [field]: value };
    setFormData({ ...formData, tipeKamar: newTipeKamar });
  };

  // const handleSubmit = () => {
  //   if (editing) {
  //     setPaketList((prev) =>
  //       prev.map((item) =>
  //         item.id === editing.id ? { ...item, ...formData } : item
  //       )
  //     );
  //   } else {
  //     setPaketList((prev) => [...prev, { ...formData, id: Date.now() }]);
  //   }
  //   setModalOpen(false);
  // };

  // const handleDelete = (id: number) => {
  //   if (confirm("Yakin ingin menghapus paket ini?")) {
  //     setPaketList((prev) => prev.filter((item) => item.id !== id));
  //   }
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validasi wajib isi
    if (!formData.nama.trim()) {
      alert("Nama paket harus diisi!");
      return;
    }

    if (!formData.maskapai.trim()) {
      alert("Maskapai harus diisi!");
      return;
    }

    if (!formData.hotel_madinah.trim() || !formData.hotel_mekkah.trim()) {
      alert("Hotel Madinah dan Mekkah harus diisi!");
      return;
    }

    if (formData.tipeKamar.some((tipe) => tipe.harga <= 0)) {
      alert("Harga setiap tipe kamar harus lebih dari 0!");
      return;
    }

    if (editing) {
      if (editing) {
        const updatedPaket: Paket = {
          id: editing.id,
          maskapai: { id: formData.maskapai, nama: "" },
          hotel_madinah: {
            id: formData.hotel_madinah,
            nama: "",
            bintang: "",
            location: "",
          },
          hotel_mekkah: {
            id: formData.hotel_mekkah,
            nama: "",
            bintang: "",
            location: "",
          },
          total_pax: formData.total_pax,
          nama: formData.nama,
          durasi: formData.durasi,
          tanggal_keberangkatan: formData.tanggal_keberangkatan,
          deskripsi: formData.deskripsi,
          image_url: formData.photo,
          paket_kamar: formData.tipeKamar,
        };
        updateMutation.mutate(updatedPaket);
      } else {
        createMutation.mutate(formData);
      }
    } else {
      createMutation.mutate(formData);
    }
    setModalOpen(false);
  };

  const getLowestPrice = (tipeKamar: Paket_Kamar[]) => {
    // const tersediaKamar = tipeKamar.filter((t) => t.tersedia);
    // if (tersediaKamar.length === 0) return 0;
    return Math.min(...tipeKamar.map((t) => t.harga));
  };

  const getTipeKamarLabel = (tipe: string) => {
    switch (tipe) {
      case "quad":
        return "Quad (4 orang)";
      case "triple":
        return "Triple (3 orang)";
      case "duo":
        return "Double (2 orang)";
      default:
        return tipe;
    }
  };

  if (isPending) {
    return (
      <div className="px-4 md:px-[124px] py-6 w-full mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse mb-2" />
            <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
          </div>
          <div className="h-12 bg-gray-200 rounded w-32 animate-pulse" />
        </div>

        <div className="grid gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border p-6">
              <div className="animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4" />
                <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4" />
                <div className="grid grid-cols-3 gap-3">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="h-24 bg-gray-200 rounded" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-[124px] py-6 w-full mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Manajemen Paket Umrah
          </h1>
          <p className="text-gray-600 mt-1">
            Kelola paket umrah dengan berbagai tipe kamar
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 flex items-center gap-2 shadow-lg transition-all"
        >
          <Plus size={20} />
          Tambah Paket
        </button>
      </div>

      <div className="grid gap-6">
        {paketList.data.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
            <div className="text-gray-400 text-lg">
              Belum ada paket tersedia
            </div>
            <p className="text-gray-500 mt-2">
              Klik &quot;Tambah Paket&quot; untuk membuat paket baru
            </p>
          </div>
        ) : (
          paketList.data.map((paket: Paket) => (
            <div
              key={paket.id}
              className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {paket.nama}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        {new Date(
                          paket.tanggal_keberangkatan
                        ).toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        {paket.maskapai.nama}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        {paket.durasi}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                        {paket.paket_kamar.reduce(
                          (total, kamar) => total + kamar.total_pax,
                          0
                        )}{" "}
                        pax
                      </span>
                      {/* <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        Guide: {paket.tourGuide}
                      </span> */}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Mulai dari</div>
                    <div className="text-2xl font-bold text-blue-600">
                      Rp {getLowestPrice(paket.paket_kamar).toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {paket.deskripsi}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Hotel:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div className="bg-gray-50 p-2 rounded">
                      <span className="font-medium">Madinah:</span>{" "}
                      {paket.hotel_madinah.nama}
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <span className="font-medium">Mekkah:</span>{" "}
                      {paket.hotel_mekkah.nama}
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Tipe Kamar & Harga:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {paket.paket_kamar.map((kamar) => (
                      // <div
                      //   key={kamar.id}
                      //   className={`p-3 rounded-lg border ${
                      //     kamar.tersedia
                      //       ? "bg-green-50 border-green-200"
                      //       : "bg-gray-50 border-gray-200 opacity-60"
                      //   }`}
                      // >
                      <div
                        key={kamar.id}
                        className={
                          "p-3 rounded-lg border bg-green-50 border-green-200"
                        }
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-sm">
                            {getTipeKamarLabel(kamar.tipe_kamar)}
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded-full"bg-green-100 text-green-800"`}
                          >
                            Tersedia
                          </span>
                        </div>

                        <div className="text-lg font-semibold text-gray-800 mb-2">
                          Rp {kamar.harga.toLocaleString()}
                        </div>

                        {/* Info Pax */}
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">
                            Kapasitas:{" "}
                            {kamar.tipe_kamar === "quad"
                              ? "4"
                              : kamar.tipe_kamar === "triple"
                              ? "3"
                              : "2"}{" "}
                            orang
                          </span>
                          <span
                            className={`font-medium ${
                              kamar.tersedia && kamar.total_pax > 0
                                ? "text-blue-600"
                                : "text-gray-500"
                            }`}
                          >
                            {kamar.total_pax || 0} pax tersedia
                          </span>
                        </div>

                        {/* Progress bar untuk visualisasi ketersediaan */}
                        {/* {kamar.tersedia && (
                          <div className="mt-2">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  kamar.total_pax > 0
                                    ? "bg-blue-500"
                                    : "bg-gray-400"
                                }`}
                                style={{
                                  width: `${Math.min(
                                    (kamar.total_pax /
                                      (kamar.tipe_kamar === "quad"
                                        ? 20
                                        : kamar.tipe_kamar === "triple"
                                        ? 15
                                        : 10)) *
                                      100,
                                    100
                                  )}%`,
                                }}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              Ketersediaan pax
                            </div>
                          </div>
                        )} */}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t">
                  <button
                    onClick={() => openDetailModal(paket)}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Eye size={16} />
                    Detail
                  </button>
                  <button
                    onClick={() => openEditModal(paket)}
                    className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Pencil size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteId(paket.id)}
                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  {editing ? "Edit Paket" : "Tambah Paket Baru"}
                </h2>
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800 border-b pb-2">
                  Informasi Dasar
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nama Paket *
                    </label>
                    <input
                      name="nama"
                      value={formData.nama}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Masukkan nama paket"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Durasi *
                    </label>
                    <input
                      name="durasi"
                      value={formData.durasi}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="contoh: 12 Hari 11 Malam"
                    />
                  </div>

                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tour Guide *
                    </label>
                    <select
                      name="tourGuide"
                      value={formData.tourGuide}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Pilih Tour Guide</option>
                      {tourGuideOptions.map((guide) => (
                        <option key={guide} value={guide}>
                          {guide}
                        </option>
                      ))}
                    </select>
                  </div> */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hotel Madinah *
                    </label>
                    <select
                      name="hotel_madinah"
                      value={formData.hotel_madinah}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Pilih Hotel</option>
                      {hotelList.data.map((hotel: Hotel) => (
                        <option key={hotel.id} value={hotel.id}>
                          {hotel.nama}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hotel Mekkah *
                    </label>
                    <select
                      name="hotel_mekkah"
                      value={formData.hotel_mekkah}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Pilih Hotel</option>
                      {hotelList.data.map((hotel: Hotel) => (
                        <option key={hotel.id} value={hotel.id}>
                          {hotel.nama}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Maskapai *
                    </label>
                    <select
                      name="maskapai"
                      value={formData.maskapai}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Pilih Maskapai</option>
                      {maskapaiList.data.map((maskapai: Maskapai) => (
                        <option key={maskapai.id} value={maskapai.id}>
                          {maskapai.nama}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tanggal Keberangkatan *
                    </label>
                    <input
                      type="date"
                      name="tanggal_keberangkatan"
                      value={formData.tanggal_keberangkatan}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="contoh: 12 Hari 11 Malam"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Foto Paket
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                      {photoPreview ? (
                        <div className="relative">
                          <img
                            src={photoPreview}
                            alt="Preview"
                            className="w-full object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={removePhoto}
                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="mt-2">
                            <label
                              htmlFor="photo-upload"
                              className="cursor-pointer"
                            >
                              <span className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                                <Upload className="mr-2 h-4 w-4" />
                                Upload Foto
                              </span>
                              <input
                                id="photo-upload"
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoUpload}
                                className="hidden"
                              />
                            </label>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            PNG, JPG, JPEG hingga 10MB
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Deskripsi *
                    </label>
                    <textarea
                      name="deskripsi"
                      value={formData.deskripsi}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Deskripsi detail paket umrah"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800 border-b pb-2">
                  Tipe Kamar & Harga
                </h3>
                <div className="space-y-4">
                  {formData.tipeKamar.map((kamar, index) => (
                    <div key={kamar.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tipe Kamar
                          </label>
                          <select
                            value={kamar.tipe_kamar}
                            onChange={(e) =>
                              handleTipeKamarChange(
                                index,
                                "tipe",
                                e.target.value
                              )
                            }
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="quad">Quad (4 orang)</option>
                            <option value="triple">Triple (3 orang)</option>
                            <option value="duo">Double (2 orang)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Harga (Rp)
                          </label>
                          <input
                            type="number"
                            value={kamar.harga}
                            onChange={(e) =>
                              handleTipeKamarChange(
                                index,
                                "harga",
                                Number(e.target.value)
                              )
                            }
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Pax
                          </label>
                          <input
                            type="number"
                            value={kamar.total_pax}
                            onChange={(e) =>
                              handleTipeKamarChange(
                                index,
                                "total_pax",
                                Number(e.target.value)
                              )
                            }
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="0"
                          />
                        </div>
                        {/* <div className="flex items-center">
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={kamar.tersedia}
                              onChange={(e) => handleTipeKamarChange(index, 'tersedia', e.target.checked)}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">Tersedia</span>
                          </label>
                        </div> */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all"
                >
                  {editing ? "Update Paket" : "Simpan Paket"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {detailModalOpen && selectedPaket && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Detail Paket</h2>
                <button
                  onClick={() => setDetailModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Photo Section */}
              <div className="bg-gray-50 rounded-lg overflow-hidden">
                <img
                  src={selectedPaket.image_url}
                  alt={selectedPaket.nama}
                  className="w-full h-80 object-cover"
                />
              </div>

              {/* Package Info */}
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {selectedPaket.nama}
                </h3>
                <p className="text-gray-600">{selectedPaket.deskripsi}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">
                    Informasi Perjalanan
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Keberangkatan:</span>{" "}
                      {/* {selectedPaket.tanggal_keberangkatan.toloca} */}
                      {new Date(
                        selectedPaket.tanggal_keberangkatan
                      ).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}{" "}
                      *
                    </div>
                    <div>
                      <span className="font-medium">Durasi:</span>{" "}
                      {selectedPaket.durasi}
                    </div>
                    <div>
                      <span className="font-medium">Maskapai:</span>{" "}
                      {selectedPaket.maskapai.nama}
                    </div>
                    <div>
                      <span className="font-medium">Total Pax:</span>{" "}
                      {selectedPaket.paket_kamar.reduce(
                        (total, kamar) => total + kamar.total_pax,
                        0
                      )}{" "}
                      orang
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">Hotel</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Madinah:</span>{" "}
                      {selectedPaket.hotel_madinah.nama}
                    </div>
                    <div>
                      <span className="font-medium">Mekkah:</span>{" "}
                      {selectedPaket.hotel_mekkah.nama}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-3">
                  Pilihan Kamar & Harga
                </h4>
                <div className="space-y-3">
                  {selectedPaket.paket_kamar.map((kamar) => (
                    <div
                      key={kamar.id}
                      className={`p-4 rounded-lg border bg-green-50 border-green-200`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">
                            {getTipeKamarLabel(kamar.tipe_kamar)}
                          </div>
                          <div className="text-xl font-bold text-gray-800 mt-1">
                            Rp {kamar.harga.toLocaleString()}
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm bg-green-100 text-green-800`}
                        >
                          {kamar.tipe_kamar}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <AlertDialog
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Yakin ingin menghapus data ini?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak bisa dibatalkan. Data pelanggan akan dihapus
              secara permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteId !== null) {
                  deleteMutation.mutate(deleteId);
                  setDeleteId(null);
                }
              }}
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
