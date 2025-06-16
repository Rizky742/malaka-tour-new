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

type Pelanggan = {
  id: number;
  name: string;
  email: string;
  role: string;
  password: string;
  no_hp: string;
  alamat: string;
};

export default function PelangganPage() {
  // const {data} =
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { data: pelangganList = [], isPending } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch("/api/users");
      return response.json();
    },
  });

  const queryClient = useQueryClient();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Pelanggan | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    no_hp: "",
    role: "",
    alamat: "",
  });

  const createMutation = useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      password: string;
      alamat?: string;
      no_hp: string;
    }) => {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const openCreateModal = () => {
    setFormData({
      name: "",
      email: "",
      no_hp: "",
      alamat: "",
      password: "",
      role: "",
    });
    setEditing(null);
    setModalOpen(true);
  };

  const updateMutation = useMutation({
    mutationFn: async (data: Pelanggan) => {
      const res = await fetch(`/api/users/${data.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          alamat: data.alamat,
          role: data.role,
          no_hp: data.no_hp,
        }),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const openEditModal = (data: Pelanggan) => {
    setFormData({
      name: data.name,
      email: data.email,
      no_hp: data.no_hp,
      alamat: data.alamat,
      password: "",
      role: data.role,
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

  // const handleDelete = (id: number) => {
  //   // console.log(id);
  //   if (confirm("Yakin ingin menghapus users ini?")) {
  //     deleteMutation.mutate(id);
  //   }
  // };

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
      <div className="bg-white p-6 rounded-lg shadow overflow-x-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Daftar Users</h1>
          <button
            onClick={openCreateModal}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus size={18} />
            Tambah
          </button>
        </div>
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">Nama</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">No HP</th>
              <th className="px-4 py-2">Alamat</th>
              <th className="px-4 py-2 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pelangganList.data.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-400">
                  Tidak ada data pelanggan.
                </td>
              </tr>
            ) : (
              pelangganList.data.map((p: Pelanggan, i: number) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{i + 1}</td>
                  <td className="px-4 py-2">{p.name}</td>
                  <td className="px-4 py-2">{p.email}</td>
                  <td className="px-4 py-2">{p.role}</td>
                  <td className="px-4 py-2">{p.no_hp}</td>
                  <td className="px-4 py-2">{p.alamat}</td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex space-x-4 justify-center">
                      <button
                        onClick={() => openEditModal(p)}
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        <Pencil size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteId(p.id)}
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
              {editing ? "Edit Pelanggan" : "Tambah Pelanggan"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nama
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required={editing ? false : true}
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  No HP
                </label>
                <input
                  type="tel"
                  name="no_hp"
                  value={formData.no_hp}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border rounded"
                >
                  <option value="">Pilih Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Alamat
                </label>
                <textarea
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleChange}
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
