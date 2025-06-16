"use client";

import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
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

type Maskapai = {
  id: number;
  nama: string;
  deskripsi: string;
};

export default function MaskapaiPage() {


  const queryClient = useQueryClient();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Maskapai | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { data: maskapaiList = [], isPending } = useQuery({
    queryKey: ["maskapai"],
    queryFn: async () => {
      const response = await fetch("/api/maskapai");
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
      const res = await fetch("/api/maskapai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["maskapai"] });
    },
  });

  const openCreateModal = () => {
    setFormData({ nama: "", deskripsi: "" });
    setEditing(null);
    setModalOpen(true);
  };

  const updateMutation = useMutation({
      mutationFn: async (data: Maskapai) => {
        const res = await fetch(`/api/maskapai/${data.id}`, {
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
        queryClient.invalidateQueries({ queryKey: ["maskapai"] });
      },
    });
  
    const deleteMutation = useMutation({
      mutationFn: async (id: number) => {
        await fetch(`/api/maskapai/${id}`, {
          method: "DELETE",
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["maskapai"] });
      },
    });

  const openEditModal = (data: Maskapai) => {
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
        <h1 className="text-2xl font-bold">Daftar Maskapai</h1>
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
              <th className="px-4 py-2">Nama Maskapai</th>
              <th className="px-4 py-2">Deskripsi</th>
              <th className="px-4 py-2 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {maskapaiList.data.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-400">
                  Tidak ada data maskapai.
                </td>
              </tr>
            ) : (
              maskapaiList.data.map((m:Maskapai, i:number) => (
                <tr key={m.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{i + 1}</td>
                  <td className="px-4 py-2">{m.nama}</td>
                  <td className="px-4 py-2">{m.deskripsi}</td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex space-x-4 justify-center">
                      <button
                        onClick={() => openEditModal(m)}
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        <Pencil size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteId(m.id)}
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
              {editing ? "Edit Maskapai" : "Tambah Maskapai"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nama Maskapai</label>
                <input
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
                <textarea
                  name="deskripsi"
                  value={formData.deskripsi}
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
