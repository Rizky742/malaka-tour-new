import { z } from "zod";

export const jemaahSchema = z.object({
  nik: z.string().min(10, "NIK wajib diisi"),
  no_telp: z.string().min(10, "Nomor telepon wajib diisi"),
  nama_lengkap: z.string().min(1, "Nama lengkap wajib diisi"),
  umur: z.number().min(1, "Umur harus lebih dari 0"),
});

export const formSchema = z.object({
  layanan: z.string().min(1, "Layanan wajib dipilih"),
  lama_tabungan: z.number().min(1, "Tabungan minimal 1 bulan"),
  jumlah_orang: z.number().min(1),
  jemaah: z.array(jemaahSchema).min(1),
});

export type FormData = z.infer<typeof formSchema>;
