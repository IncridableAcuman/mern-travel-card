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
import { toast } from "sonner"
import FillLoading from "../ui/shared/fill-loading"
import { authStore } from "../../store/auth.store"
import { useNavigate } from "react-router-dom"

function Login() {
    const {setIsAuth,setUser}=authStore()
    const {setAuth}=authConfirm()
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
          const {data}=await $axios.post("/auth/login",values);
          return data
        },
        onSuccess:data=>{
            setUser(data.user)
            setIsAuth(true)
            localStorage.setItem("accessToken",data.accessToken);
            navigate('/')
        },
        onError:(error)=>{
            //@ts-ignore
          toast(error.response?.data?.message)
        }
      })
      async function onSubmit(values: z.infer<typeof authSchema>){
        mutate(values)
      }
      
  return (
    <>
    {isPending && <FillLoading/>}
    <h1 className="text-2xl font-bold text-center">Login</h1>
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
        <div className="flex justify-end cursor-pointer text-blue-600 hover:underline" onClick={()=>setAuth('forgot-password')}>
          <span>Forgot password</span>
        </div>
        
        <Button type="submit" className="rounded-xl">Submit</Button>
      </form>
    </Form> 
    </>
  )
}

export default Login