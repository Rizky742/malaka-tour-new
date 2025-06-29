import { z } from "zod";

export const CreateMaskapai = z.object({
  nama: z.string().min(1),
  deskripsi : z.string().min(1)
});



export type CreateMaskapaiSchemeType = z.infer<typeof CreateMaskapai>;