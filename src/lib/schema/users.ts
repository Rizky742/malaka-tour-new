import { z } from "zod";

export const CreateUsers = z.object({
  name: z.string().min(1).max(50),
  email : z.string().min(1).max(50),
  password : z.string().min(1).max(50),
  role : z.string().min(1).max(10),
  no_hp : z.string().min(13).max(14),
  alamat : z.string().min(1).max(100).optional()
});


export type CreateUsersOfferSchemaType = z.infer<typeof CreateUsers>;