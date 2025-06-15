"use client"

import React, { useState } from "react";

type Pelanggan = {
  nama: string;
  email: string;
  password: string;
  noHp: string;
  alamat: string;
};

type Props = {
  onSubmit: (data: Pelanggan) => void;
};

export default function PelangganForm({ onSubmit }: Props) {
  const [form, setForm] = useState<Pelanggan>({
    nama: "",
    email: "",
    password: "",
    noHp: "",
    alamat: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white p-6 rounded-xl shadow-md space-y-5"
    >
      <h2 className="text-xl font-semibold text-gray-800">Tambah Pelanggan</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Nama</label>
        <input
          type="text"
          name="nama"
          value={form.nama}
          onChange={handleChange}
          required
          className="mt-1 w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          className="mt-1 w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          className="mt-1 w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">No HP</label>
        <input
          type="text"
          name="noHp"
          value={form.noHp}
          onChange={handleChange}
          required
          className="mt-1 w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Alamat</label>
        <textarea
          name="alamat"
          value={form.alamat}
          onChange={handleChange}
          required
          rows={3}
          className="mt-1 w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      <div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Simpan
        </button>
      </div>
    </form>
  );
}
