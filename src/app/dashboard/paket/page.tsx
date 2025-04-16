"use client"
import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";

type Paket = {
  id: number;
  maskapai: string;
  tourGuide: string;
  namaPaket: string;
  harga: number;
  durasi: string;
  deskripsi: string;
};

export default function PaketPage() {
  const [paketList, setPaketList] = useState<Paket[]>([
    {
      id: 1,
      maskapai: "Garuda Indonesia",
      tourGuide: "John Doe",
      namaPaket: "Paket Liburan Bali",
      harga: 5000000,
      durasi: "5 Hari 4 Malam",
      deskripsi: "Nikmati liburan yang menyenangkan dengan Paket Liburan Bali yang mencakup semua kebutuhan Anda.",
    },
    {
      id: 2,
      maskapai: "Lion Air",
      tourGuide: "Jane Smith",
      namaPaket: "Paket Tour Jogja",
      harga: 3000000,
      durasi: "3 Hari 2 Malam",
      deskripsi: "Jelajahi keindahan Jogja dengan Paket Tour Jogja yang meliputi wisata budaya dan kuliner.",
    },
    {
      id: 3,
      maskapai: "Sriwijaya Air",
      tourGuide: "Rudi Santoso",
      namaPaket: "Paket Wisata Lombok",
      harga: 4500000,
      durasi: "4 Hari 3 Malam",
      deskripsi: "Eksplorasi keindahan alam Lombok dengan Paket Wisata Lombok yang mencakup wisata pantai dan trekking.",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Paket | null>(null);

  const [formData, setFormData] = useState({
    maskapai: "",
    tourGuide: "",
    namaPaket: "",
    harga: 0,
    durasi: "",
    deskripsi: "",
  });

  const maskapaiOptions = ["Garuda Indonesia", "Lion Air", "Sriwijaya Air"];
  const tourGuideOptions = ["John Doe", "Jane Smith", "Rudi Santoso"];

  const openCreateModal = () => {
    setFormData({ maskapai: "", tourGuide: "", namaPaket: "", harga: 0, durasi: "", deskripsi: "" });
    setEditing(null);
    setModalOpen(true);
  };

  const openEditModal = (data: Paket) => {
    setFormData({
      maskapai: data.maskapai,
      tourGuide: data.tourGuide,
      namaPaket: data.namaPaket,
      harga: data.harga,
      durasi: data.durasi,
      deskripsi: data.deskripsi,
    });
    setEditing(data);
    setModalOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      setPaketList((prev) =>
        prev.map((item) =>
          item.id === editing.id ? { ...item, ...formData } : item
        )
      );
    } else {
      setPaketList((prev) => [
        ...prev,
        { ...formData, id: Date.now(), harga: Number(formData.harga) },
      ]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Yakin ingin menghapus paket ini?")) {
      setPaketList((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="px-4 md:px-[124px] py-6 w-full mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Daftar Paket</h1>
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
              <th className="px-4 py-2">Maskapai</th>
              <th className="px-4 py-2">Tour Guide</th>
              <th className="px-4 py-2">Nama Paket</th>
              <th className="px-4 py-2">Harga</th>
              <th className="px-4 py-2">Durasi</th>
              <th className="px-4 py-2">Deskripsi</th>
              <th className="px-4 py-2 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {paketList.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-6 text-gray-400">
                  Tidak ada data paket.
                </td>
              </tr>
            ) : (
              paketList.map((p, i) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{i + 1}</td>
                  <td className="px-4 py-2">{p.maskapai}</td>
                  <td className="px-4 py-2">{p.tourGuide}</td>
                  <td className="px-4 py-2">{p.namaPaket}</td>
                  <td className="px-4 py-2">Rp {p.harga.toLocaleString()}</td>
                  <td className="px-4 py-2">{p.durasi}</td>
                  <td className="px-4 py-2">{p.deskripsi}</td>
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
              {editing ? "Edit Paket" : "Tambah Paket"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Maskapai</label>
                <select
                  name="maskapai"
                  value={formData.maskapai}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border rounded"
                >
                  <option value="">Pilih Maskapai</option>
                  {maskapaiOptions.map((maskapai) => (
                    <option key={maskapai} value={maskapai}>
                      {maskapai}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tour Guide</label>
                <select
                  name="tourGuide"
                  value={formData.tourGuide}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border rounded"
                >
                  <option value="">Pilih Tour Guide</option>
                  {tourGuideOptions.map((tourGuide) => (
                    <option key={tourGuide} value={tourGuide}>
                      {tourGuide}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Nama Paket</label>
                <input
                  name="namaPaket"
                  value={formData.namaPaket}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Harga</label>
                <input
                  name="harga"
                  type="number"
                  value={formData.harga}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Durasi</label>
                <input
                  name="durasi"
                  value={formData.durasi}
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
