import { Form,FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { authSchema } from "../../lib/validation"
import { authConfirm } from "../../hooks/useAuth"
import { useMutation } from "@tanstack/react-query"
import $axios from "../../http"
import { authStore } from "../../store/auth.store"
import { useNavigate } from "react-router-dom"
import FillLoading from "../ui/shared/fill-loading"
import { toast } from "sonner"


function Register() {
    const {setAuth}=authConfirm()
    const {setIsAuth,setUser}=authStore()
    const navigate=useNavigate()
    const form = useForm<z.infer<typeof authSchema>>({
        resolver: zodResolver(authSchema),
        defaultValues: {
          email: "",
          password:"",
        },
      })

      const {mutate,isPending}=useMutation({
        mutationKey:['login'],
        mutationFn:async (values:z.infer<typeof authSchema>)=>{
          const {data}=await $axios.post("/auth/register",values);
          return data
        },
        onSuccess:data=>{
            setUser(data.user)
            setIsAuth(true)
            localStorage.setItem("accessToken",data.accessToken);
            navigate('/')
        },
        onError:(error)=>{
          toast(error.message)
        }
      })

      async function onSubmit(values: z.infer<typeof authSchema>){
        mutate(values)
      }
  return (
    <>
    {isPending && <FillLoading/>}
    <h1 className="text-2xl font-bold text-center">Register</h1>
    <p className="hover:underline text-blue-600 cursor-pointer" onClick={()=>setAuth('login')}>Already have an account</p>

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
        <FormField
        control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" type="password" className="rounded-xl" {...field} />
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

export default Register