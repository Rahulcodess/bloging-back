import { z } from "zod";
export const signupinput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional(),
    
});

export const signininput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional(),
});

export const createBloginput = z.object({
   content:z.string(),
   title:z.string()
});

export const updateBloginput = z.object({
   content:z.string(),
   title:z.string(),
   id:z.string()
});
type Signupinput=z.infer<typeof signupinput>;
type Signininput=z.infer<typeof signininput>;
type CreateBloginput=z.infer<typeof createBloginput>;
type UpdateBloginput=z.infer<typeof updateBloginput>;