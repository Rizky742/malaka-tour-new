import { date, z } from "zod";

export const CreateTabungan = z.object({
  user_id: z.string(),
  saldo: z.number(),
  status: z.string(),
  tanggal_mulai: date(),
  tanggal_akhir: date(),
  tipe_cicilan: z.enum(["bulan", "minggu"]),
});


export type CreateTabunganSchemaType = z.infer<typeof CreateTabungan>;
