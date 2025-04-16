import {object, string } from "zod";

export const RegisterSchema = object({
  name: string().min(1, "Nama harus lebih dari 1 karakter"),
  email: string().email("Email tidak valid"),
  noHp: string().min(10, "Nomor HP harus valid"),
  alamat: string().optional(),
  password: string()
    .min(8, "Password harus lebih dari 8 karakter")
    .max(32, "Password harus kurang dari 32 karakter"),
  confirmPassword: string()
    .min(8, "Konfirmasi password harus lebih dari 8 karakter")
    .max(32, "Konfirmasi password harus kurang dari 32 karakter"),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Password dan konfirmasi password tidak cocok",
});

export const LoginSchema = object({
  email: string().email("Email tidak valid"),
  password: string()
    .min(8, "Password harus lebih dari 8 karakter")
    .max(32, "Password harus kurang dari 32 karakter"),
});
