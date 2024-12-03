import { Form,FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {  emailSchema } from "../../lib/validation"
import { useMutation } from "@tanstack/react-query"
import $axios from "../../http"
import { toast } from "sonner"
import FillLoading from "../ui/shared/fill-loading"
import { useState } from "react"
import { authConfirm } from "../../hooks/useAuth"

function ForgotPassword() {
    const [success,setSuccess]=useState(false)
    const {setAuth}=authConfirm()
    
    const form = useForm<z.infer<typeof emailSchema>>({
        resolver: zodResolver(emailSchema),
        defaultValues: {
          email: "",
        },
      })
      const {mutate,isPending}=useMutation({
        mutationKey:['forgot-password'],
        mutationFn:async (values:z.infer<typeof emailSchema>)=>{
          const {data}=await $axios.post("/forgot-password",values);
          return data
        },
        onSuccess:()=>{
            setSuccess(true)
        },
        onError:(error)=>{
            //@ts-ignore
          toast(error.response?.data?.message)
        }
      })
      async function onSubmit(values: z.infer<typeof emailSchema>){
        mutate(values)
      }
      if(success) return <p>Success</p>
  return (
    <>
    {isPending && <FillLoading/>}
    <h1 className="text-2xl font-bold text-center">Forgot Password</h1>
    <p className="hover:underline text-blue-600 cursor-pointer" onClick={()=>setAuth('register')}>Don't have an account</p>

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">
        <FormField
        control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email"className="rounded-xl"  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>            
          )}
        />
        <Button type="submit" className="rounded-xl">Submit</Button>
      </form>
    </Form> 
    </>
  )
}

export default ForgotPassword