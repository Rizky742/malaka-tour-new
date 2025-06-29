import { z } from "zod";

export const CreateHotel = z.object({
  nama: z.string().min(1),
  location: z.string().min(1),
  bintang: z.string().min(1).max(1),
});

export type CreateHotelSchemeType = z.infer<typeof CreateHotel>;
