"use client";

import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";

type TourGuide = {
  id: number;
  nama: string;
  noHp: string;
};

export default function TourGuidePage() {
  const [tourGuideList, setTourGuideList] = useState<TourGuide[]>([
    {
      id: 1,
      nama: "Budi Santoso",
      noHp: "081234567890",
    },
    {
      id: 2,
      nama: "Siti Nurhaliza",
      noHp: "082345678901",
    },
    {
      id: 3,
      nama: "Ahmad Hidayat",
      noHp: "083456789012",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<TourGuide | null>(null);

  const [formData, setFormData] = useState({
    nama: "",
    noHp: "",
  });

  const openCreateModal = () => {
    setFormData({ nama: "", noHp: "" });
    setEditing(null);
    setModalOpen(true);
  };

  const openEditModal = (data: TourGuide) => {
    setFormData({
      nama: data.nama,
      noHp: data.noHp,
    });
    setEditing(data);
    setModalOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      setTourGuideList((prev) =>
        prev.map((item) =>
          item.id === editing.id ? { ...item, ...formData } : item
        )
      );
    } else {
      setTourGuideList((prev) => [
        ...prev,
        { ...formData, id: Date.now() },
      ]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Yakin ingin menghapus tour guide ini?")) {
      setTourGuideList((prev) => prev.filter((item) => item.id !== id));
    }
  };

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
            {tourGuideList.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-400">
                  Tidak ada data tour guide.
                </td>
              </tr>
            ) : (
              tourGuideList.map((tg, i) => (
                <tr key={tg.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{i + 1}</td>
                  <td className="px-4 py-2">{tg.nama}</td>
                  <td className="px-4 py-2">{tg.noHp}</td>
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
                <label className="block text-sm font-medium text-gray-700">Nama Tour Guide</label>
                <input
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">No. HP</label>
                <input
                  name="noHp"
                  value={formData.noHp}
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
