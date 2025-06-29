"use client";

import { useState } from "react";
import { Pencil, Trash2, Plus, Plane, X } from "lucide-react";
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

type Hotel = {
  id: number;
  nama: string;
  deskripsi: string;
};

export default function HotelPage() {
  const queryClient = useQueryClient();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Hotel | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { data: hotelList = [], isPending } = useQuery({
    queryKey: ["hotel"],
    queryFn: async () => {
      const response = await fetch("/api/hotel");
      return response.json();
    },
  });

  const [formData, setFormData] = useState({
    nama: "",
    deskripsi: "",
  });

  const createMutation = useMutation({
    mutationFn: async (data: {
      nama: string;
      deskripsi: string;
    }) => {
      const res = await fetch("/api/hotel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hotel"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: Hotel) => {
      const res = await fetch(`/api/hotel/${data.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama: data.nama,
          deskripsi: data.deskripsi,
        }),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hotel"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await fetch(`/api/hotel/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hotel"] });
    },
  });

  const openCreateModal = () => {
    setFormData({ nama: "", deskripsi: "" });
    setEditing(null);
    setModalOpen(true);
  };

  const openEditModal = (data: Hotel) => {
    setFormData({
      nama: data.nama,
      deskripsi: data.deskripsi,
    });
    setEditing(data);
    setModalOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      updateMutation.mutate({ ...editing, ...formData });
    } else {
      createMutation.mutate(formData);
    }
    setModalOpen(false);
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-gray-200 rounded-lg animate-pulse" />
              <div className="h-8 bg-gray-200 rounded-lg w-64 animate-pulse" />
            </div>
            <div className="h-12 bg-gray-200 rounded-lg w-36 animate-pulse" />
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="h-6 bg-gray-200 rounded w-48 animate-pulse" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">No</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nama hotel</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Deskripsi</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[...Array(5)].map((_, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-6 animate-pulse" />
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-40 animate-pulse" />
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-64 animate-pulse" />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="h-4 bg-gray-200 rounded w-20 mx-auto animate-pulse" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Plane className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Daftar Hotel</h1>
          </div>
          <button
            onClick={openCreateModal}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 transform hover:scale-105"
          >
            <Plus size={20} />
            Tambah Hotel
          </button>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Plane className="h-5 w-5 text-blue-600" />
              Data Hotel
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    No
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Nama Hotel
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Deskripsi
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {hotelList.data?.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="p-4 bg-gray-100 rounded-full">
                          <Plane className="h-8 w-8 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-lg font-medium text-gray-500">Belum ada data hotel</p>
                          <p className="text-sm text-gray-400">Tambahkan hotel baru untuk memulai</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  hotelList.data?.map((m: Hotel, i: number) => (
                    <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                          <span className="text-sm font-medium text-blue-600">{i + 1}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{m.nama}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-600 max-w-md">
                          {m.deskripsi}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => openEditModal(m)}
                            className="inline-flex items-center gap-1 px-4 py-2 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors font-medium"
                          >
                            <Pencil size={16} />
                            Edit
                          </button>
                          <button
                            onClick={() => setDeleteId(m.id)}
                            className="inline-flex items-center gap-1 px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors font-medium"
                          >
                            <Trash2 size={16} />
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Plane className="h-5 w-5 text-blue-600" />
                  {editing ? "Edit Hotel" : "Tambah Hotel"}
                </h2>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama hotel
                  </label>
                  <input
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    required
                    placeholder="Masukkan nama hotel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deskripsi
                  </label>
                  <textarea
                    name="deskripsi"
                    value={formData.deskripsi}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Masukkan deskripsi hotel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  />
                </div>
                
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    {editing ? "Update" : "Simpan"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Alert Dialog */}
        <AlertDialog
          open={deleteId !== null}
          onOpenChange={(open) => !open && setDeleteId(null)}
        >
          <AlertDialogContent className="rounded-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2 text-red-600">
                <Trash2 className="h-5 w-5" />
                Konfirmasi Hapus
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-600">
                Apakah Anda yakin ingin menghapus data hotel ini? 
                Tindakan ini tidak dapat dibatalkan dan akan menghapus data secara permanen.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="rounded-xl">Batal</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  if (deleteId !== null) {
                    deleteMutation.mutate(deleteId);
                    setDeleteId(null);
                  }
                }}
                className="bg-red-600 hover:bg-red-700 rounded-xl"
              >
                Hapus
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}