import { useForm } from "react-hook-form"
import { Card, CardContent } from "../components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { passwordSchema } from "../lib/validation"
import { z } from "zod"
import { Form,FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { useMutation } from "@tanstack/react-query"
import $axios from "../http"
import FillLoading from "../components/ui/shared/fill-loading"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"

function RecoveryAccount() {
    const {token}=useParams()
    const navigate=useNavigate()
    const form = useForm<z.infer<typeof passwordSchema>>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
          password:"",
          confirmPassword:""
        },
      })
      const {mutate,isPending}=useMutation({
        mutationKey:['recovery-account'],
        mutationFn:async (values:z.infer<typeof passwordSchema>)=>{
            const obj={password:values.password,token}
            const {data}=await $axios.put("/recovery-account",obj);
            return data
        },
        onSuccess:()=>{
           toast("Successfully updated your password")
           navigate('/auth')
        },
        onError:(error)=>{
            //@ts-ignore
          toast(error.response?.data?.message)
        }
      })

      async function onSubmit(values: z.infer<typeof passwordSchema>){
        mutate(values)
      }
  return (
    <div className="w-full h-screen flex justify-center items-center">
        <Card className="w-1/3 p-3 bg-secondary rounded-xl relative">
    <CardContent>
        {isPending && <FillLoading/>}
    <h1 className="text-2xl font-bold text-center">Recovery Account</h1>

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">
        <FormField
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password"className="rounded-xl"  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>            
          )}
        />
        <FormField
        control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input placeholder="Confirm password" type="password" className="rounded-xl" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
 
          )}
        />       
        <Button type="submit" className="rounded-xl">Submit</Button>
      </form>
    </Form> 
    </CardContent>
    
    </Card>
    </div>
    
  )
}

export default RecoveryAccount