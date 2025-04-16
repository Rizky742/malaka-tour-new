"use server"

import { hashSync } from "bcryptjs";
import { LoginSchema, RegisterSchema } from "./zod";
import { prisma } from "@/lib/db"
import { redirect } from "next/navigation";
import { signIn } from "./auth";
import { AuthError } from "next-auth";



export const signUpCredentials = async (prevstate: unknown,formData: FormData) => {
  const validatedFields = RegisterSchema.safeParse(Object.fromEntries(formData.entries()));


  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors, // 👈 akses error yang benar
    };
  }
  
  const {name, email, noHp, alamat, password} = validatedFields.data
  console.log(name,email)
  
  
  const hashedPassword = hashSync(password,10)
  try{
      
      await prisma.user.create({
        data: {
            name,
            email,
            no_hp : noHp,
            alamat,
            password: hashedPassword,
        }
    })
 
  }catch {
    return {message : "Email telah digunakan"}
  }
  redirect("/login")
};

export const signInCredentials = async (prevstate: unknown,formData: FormData) => {
    const validatedFields = LoginSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
      return {
        error: validatedFields.error.flatten().fieldErrors, // 👈 akses error yang benar
      };
    }
    
    const {email, password} = validatedFields.data;

    try {
        await signIn("credentials", {email, password, redirectTo:"/dashboard"})
    } catch (error) {
        // console.log(error)
        if(error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {message: "Email atau Password salah"}
                default:
                    return {message: "Something went wrong"}
            }
        }
        throw error;
    }
   
  };
  
