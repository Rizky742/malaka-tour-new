"use client";

import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";

type Pelanggan = {
  id: number;
  nama: string;
  email: string;
  noHp: string;
  alamat: string;
};

export default function PelangganPage() {
  const [pelangganList, setPelangganList] = useState<Pelanggan[]>([
    {
      id: 1,
      nama: "Rizky Saputra",
      email: "rizky@example.com",
      noHp: "081234567890",
      alamat: "Jl. Merdeka No. 123, Surabaya",
    },
    {
      id: 2,
      nama: "Dewi Lestari",
      email: "dewi@example.com",
      noHp: "082112345678",
      alamat: "Jl. Pahlawan No. 45, Jakarta",
    },
    {
      id: 3,
      nama: "Andi Pratama",
      email: "andi@example.com",
      noHp: "089876543210",
      alamat: "Jl. Diponegoro No. 88, Bandung",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Pelanggan | null>(null);

  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    noHp: "",
    alamat: "",
  });

  const openCreateModal = () => {
    setFormData({ nama: "", email: "", noHp: "", alamat: "" });
    setEditing(null);
    setModalOpen(true);
  };

  const openEditModal = (data: Pelanggan) => {
    setFormData({
      nama: data.nama,
      email: data.email,
      noHp: data.noHp,
      alamat: data.alamat,
    });
    setEditing(data);
    setModalOpen(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      setPelangganList((prev) =>
        prev.map((item) =>
          item.id === editing.id ? { ...item, ...formData } : item
        )
      );
    } else {
      setPelangganList((prev) => [...prev, { ...formData, id: Date.now() }]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Yakin ingin menghapus pelanggan ini?")) {
      setPelangganList((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="px-4 md:px-[124px] py-6 w-full mx-auto space-y-6">
      <div className="bg-white p-6 rounded-lg shadow overflow-x-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Daftar Pelanggan</h1>
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
              <th className="px-4 py-2">No HP</th>
              <th className="px-4 py-2">Alamat</th>
              <th className="px-4 py-2 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pelangganList.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-400">
                  Tidak ada data pelanggan.
                </td>
              </tr>
            ) : (
              pelangganList.map((p, i) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{i + 1}</td>
                  <td className="px-4 py-2">{p.nama}</td>
                  <td className="px-4 py-2">{p.email}</td>
                  <td className="px-4 py-2">{p.noHp}</td>
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
                        onClick={() => handleDelete(p.id)}
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
                  name="nama"
                  value={formData.nama}
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
                  No HP
                </label>
                <input
                  name="noHp"
                  value={formData.noHp}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Alamat
                </label>
                <textarea
                  name="alamat"
                  value={formData.alamat}
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
