"use client";

import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";

type Maskapai = {
  id: number;
  nama: string;
  deskripsi: string;
};

export default function MaskapaiPage() {
  const [maskapaiList, setMaskapaiList] = useState<Maskapai[]>([
    {
      id: 1,
      nama: "Garuda Indonesia",
      deskripsi: "Maskapai penerbangan nasional Indonesia yang menyediakan layanan penerbangan domestik dan internasional.",
    },
    {
      id: 2,
      nama: "Lion Air",
      deskripsi: "Maskapai penerbangan Indonesia yang menawarkan penerbangan dengan tarif terjangkau untuk berbagai tujuan domestik.",
    },
    {
      id: 3,
      nama: "Sriwijaya Air",
      deskripsi: "Maskapai penerbangan yang berfokus pada penerbangan domestik dengan berbagai pilihan rute ke seluruh Indonesia.",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Maskapai | null>(null);

  const [formData, setFormData] = useState({
    nama: "",
    deskripsi: "",
  });

  const openCreateModal = () => {
    setFormData({ nama: "", deskripsi: "" });
    setEditing(null);
    setModalOpen(true);
  };

  const openEditModal = (data: Maskapai) => {
    setFormData({
      nama: data.nama,
      deskripsi: data.deskripsi,
    });
    setEditing(data);
    setModalOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      setMaskapaiList((prev) =>
        prev.map((item) =>
          item.id === editing.id ? { ...item, ...formData } : item
        )
      );
    } else {
      setMaskapaiList((prev) => [
        ...prev,
        { ...formData, id: Date.now() },
      ]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Yakin ingin menghapus maskapai ini?")) {
      setMaskapaiList((prev) => prev.filter((item) => item.id !== id));
    }
  };

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
            {maskapaiList.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-400">
                  Tidak ada data maskapai.
                </td>
              </tr>
            ) : (
              maskapaiList.map((m, i) => (
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
                        onClick={() => handleDelete(m.id)}
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
    </div>
  );
}
