"use client";

import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

type TourGuide = {
  id: number;
  nama: string;
  no_hp: string;
};

export default function TourGuidePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<TourGuide | null>(null);
  const [formData, setFormData] = useState({ nama: "", no_hp: "" });

  const queryClient = useQueryClient();

  // GET all tour guides
  const { data: tourGuideList = [], isPending } = useQuery({
    queryKey: ["tour_guide"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/api/tour-guide");
      return response.json();
    },
  });

  // POST new tour guide
  const createMutation = useMutation({
    mutationFn: async (data: { nama: string; no_hp: string }) => {
      const res = await fetch("http://localhost:3000/api/tour-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tour_guide"] });
    },
  });

  // PUT update tour guide
  const updateMutation = useMutation({
    mutationFn: async (data: TourGuide) => {
      const res = await fetch(`http://localhost:3000/api/tour-guide/${data.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama: data.nama, no_hp: data.no_hp }),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tour_guide"] });
    },
  });

  // DELETE tour guide
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await fetch(`http://localhost:3000/api/tour-guide/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tour_guide"] });
    },
  });

  const openCreateModal = () => {
    setFormData({ nama: "", no_hp: "" });
    setEditing(null);
    setModalOpen(true);
  };

  const openEditModal = (data: TourGuide) => {
    setFormData({ nama: data.nama, no_hp: data.no_hp });
    setEditing(data);
    setModalOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  const handleDelete = (id: number) => {
    console.log(id)
    if (confirm("Yakin ingin menghapus tour guide ini?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isPending)
    return (
      <div className="px-4 md:px-[124px] py-6 w-full mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse" />
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse" />
        </div>
  
        <div className="bg-white p-6 rounded-lg shadow overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-2">No</th>
                <th className="px-4 py-2">Nama Tour Guide</th>
                <th className="px-4 py-2">No. HP</th>
                <th className="px-4 py-2 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, i) => (
                <tr key={i} className="border-b">
                  <td className="px-4 py-2">
                    <div className="h-4 bg-gray-200 rounded w-6 animate-pulse" />
                  </td>
                  <td className="px-4 py-2">
                    <div className="h-4 bg-gray-200 rounded w-40 animate-pulse" />
                  </td>
                  <td className="px-4 py-2">
                    <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <div className="h-4 bg-gray-200 rounded w-20 mx-auto animate-pulse" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );

  return (
    <div className="px-4 md:px-[124px] py-6 w-full mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Daftar Tour Guide</h1>
        <button
          onClick={openCreateModal}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={18} />
          Tambah
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">Nama Tour Guide</th>
              <th className="px-4 py-2">No. HP</th>
              <th className="px-4 py-2 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {tourGuideList.data.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-400">
                  Tidak ada data tour guide.
                </td>
              </tr>
            ) : (
              tourGuideList.data.map((tg: TourGuide, i: number) => (
                <tr key={tg.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{i + 1}</td>
                  <td className="px-4 py-2">{tg.nama}</td>
                  <td className="px-4 py-2">{tg.no_hp}</td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex space-x-4 justify-center">
                      <button
                        onClick={() => openEditModal(tg)}
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        <Pencil size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(tg.id)}
                        className="text-red-600 hover:text-red-800 flex items-center gap-1"
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

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">
              {editing ? "Edit Tour Guide" : "Tambah Tour Guide"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nama Tour Guide
                </label>
                <input
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  No. HP
                </label>
                <input
                  name="no_hp"
                  value={formData.no_hp}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
