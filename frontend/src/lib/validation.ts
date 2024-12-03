import { z } from "zod"
 
export const postSchema = z.object({
  picture: z.string().min(2),
  title:z.string().min(2).max(30),
  description:z.string().min(5)
})

export const authSchema=z.object({
  email:z.string().email(),
  password:z.string().min(3).max(30)
})
export const emailSchema=z.object({
  email:z.string().email()
})
export const passwordSchema=z.object({
  password:z.string().min(3).max(30),
  confirmPassword:z.string().min(3).max(30)
}).refine(data=>data.password===data.confirmPassword,{
  message:"Password is not match",
  path:['confirmPassword']
})