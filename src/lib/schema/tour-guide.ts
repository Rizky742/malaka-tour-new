import { z } from "zod";

export const CreateTourGuide = z.object({
  nama: z.string().min(1),
  no_hp : z.string().min(1).max(13)
});

export const UpdateTourGuide = z.object({
  nama: z.string().min(1).optional(),
  no_hp : z.string().min(1).max(13).optional()
});


export type CreateTourGuideOfferSchemaType = z.infer<typeof CreateTourGuide>;
export type UpdateTourGuideOfferSchemaType = z.infer<typeof UpdateTourGuide>;