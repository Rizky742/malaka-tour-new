"use client";

import Link from "next/link";
import { useState } from "react";
import { FormJemaah } from "./components/form-jamaah";
import { LandmarkIcon } from "lucide-react";
import Qris from "@/assets/qris.png";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectBox } from "./components/selectbox";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm, useFieldArray } from "react-hook-form";
import { formSchema } from "@/lib/schema/layanan";

interface Jemaah {
  nik: string;
  no_telp: string;
  nama_lengkap: string;
  umur: number;
}

interface FormData {
  layanan: string;
  lama_tabungan: number;
  jumlah_orang: number;
  jemaah: Jemaah[];
}


export default function PembayaranPage() {
  const [selectedMethod, setSelectedMethod] = useState("transfer");
  const {
    // register,
    control,
    handleSubmit,
    // formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      layanan: "",
      lama_tabungan: 0,
      jumlah_orang: 1,
      jemaah: [{ nik: "", no_telp: "", nama_lengkap: "", umur: 0 }],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "jemaah",
  });

  const onSubmit = (data: FormData) => {
      console.log(data);
      // handle API submission here
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   try {
  //     const res = await fetch("/api/transaction", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         first_name: "rizky",
  //         last_name: "ardiansyah",
  //         email: "rizkyardiansyah967@gmail.com",
  //         phone: "081249142352",
  //         amount: 500000,
  //       }),
  //     });

  //     if (!res.ok) throw new Error("Gagal membuat transaksi");

  //     const data = await res.json();
  //     console.log("Transaction result:", data);

  //     // Redirect ke Midtrans payment page
  //     if (data?.redirect_url) {
  //       window.location.href = data.redirect_url;
  //     } else {
  //       Router.push("/dashboard/transaksi-berhasil");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     alert("Terjadi kesalahan saat memproses pembayaran");
  //   }
  // };

  return (
    <div className="min-h-screen bg-[#EAF3F9] p-6 md:p-12">
        <form onSubmit={handleSubmit(onSubmit)}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
          {/* Kiri - Form */}
          <div className="flex-1 space-y-6">
            {/* Pilihan Paket */}
            <div className="bg-white rounded-lg p-6 shadow">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <SelectBox label="Layanan" options={["Paket Gold"]} />
                <SelectBox label="Tabungan" options={["36 Bulan"]} />
                <SelectBox label="Jumlah Orang" options={["2 orang"]} />
              </div>
            </div>

            {/* Data Jemaah */}
            <div className="bg-white rounded-lg p-6 shadow space-y-6">
              {fields.map((field, index) => (
                <div key={field.id}>
                  <FormJemaah
                    title={`Data Pribadi Jemaah ${index + 1}`}
                    // register={register}
                    // index={index}
                    // errors={errors.jemaah?.[index]}
                  />
                </div>
              ))}

              {/* <FormJemaah title="Data Pribadi Jemaah 1" /> */}
              <Button
                type="button"
                onClick={() =>
                  append({ nik: "", no_telp: "", nama_lengkap: "", umur: 0 })
                }
              >
                Tambah Jemaah
              </Button>

              {/* <FormJemaah title="Data Pribadi Jemaah 2" /> */}
              <div>
                <p className="font-semibold mb-2">Metode Pembayaran</p>
                <div className="flex gap-4">
                  {/* Transfer Bank */}
                  <Card
                    onClick={() => setSelectedMethod("transfer")}
                    className={`cursor-pointer w-full md:w-48 ${
                      selectedMethod === "transfer"
                        ? "border-blue-500 shadow-lg"
                        : ""
                    }`}
                  >
                    <CardHeader className="flex items-center justify-center flex-col">
                      {/* <Image src={Qris} alt="QRIS" className="w-12 h-12" /> */}
                      <LandmarkIcon className="w-12 h-12" />
                      <CardTitle className="text-center text-sm">
                        Transfer Bank
                      </CardTitle>
                    </CardHeader>
                  </Card>

                  {/* QRIS */}
                  <Card
                    onClick={() => setSelectedMethod("qris")}
                    className={`cursor-pointer w-full md:w-48 ${
                      selectedMethod === "qris"
                        ? "border-blue-500 shadow-lg"
                        : ""
                    }`}
                  >
                    <CardHeader className="flex items-center justify-center flex-col">
                      <Image src={Qris} alt="QRIS" className="w-12 h-12" />
                      <CardTitle className="text-center text-sm">
                        QRIS
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </div>
              </div>
            </div>
          </div>

          {/* Kanan - Ringkasan */}
          <div className="w-full md:w-[350px] bg-white rounded-lg p-6 shadow space-y-4">
            <h2 className="text-lg font-semibold">Rincian Pembayaran</h2>
            <div className="text-sm space-y-1">
              <p>
                Tagihan:{" "}
                <span className="float-right font-medium">Rp2.222.222</span>
              </p>
              <p>
                Biaya Admin:{" "}
                <span className="float-right font-medium">Rp15.555</span>
              </p>
            </div>
            <hr />
            <div className="text-base font-semibold">
              Total:{" "}
              <span className="float-right text-[#1E1E1E] font-bold">
                Rp2.237.777
              </span>
              <p className="text-xs text-gray-400 font-normal mt-1">
                (Termasuk Biaya Admin)
              </p>
            </div>
            <Link href={"/dashboard/transaksi-berhasil"}>
              <button
             type="submit"
                className="bg-[#00AEEF] text-white rounded-md w-full py-2 font-semibold hover:bg-[#0096ce] transition-all"
              >
                Konfirmasi Pembayaran
              </button>
            </Link>
          </div>
      </div>
        </form>
    </div>
  );
}
