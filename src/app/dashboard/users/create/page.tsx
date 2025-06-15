
"use client"

import { useRouter } from "next/navigation";
/* eslint-disable @typescript-eslint/no-explicit-any */
import PelangganForm from "./components/form-pelanggan";




export default function PelangganPage() {

    const router = useRouter();
    const handleSubmit = (data: any) => {
     

        router.push("/dashboard/pelanggan")
     console.log("Data pelanggan:", data);
     // Lanjutkan POST ke backend /api/pelanggan atau lainnya
   };
  return (
    <div className="p-8">
      <PelangganForm onSubmit={handleSubmit} />
    </div>
  );
}
