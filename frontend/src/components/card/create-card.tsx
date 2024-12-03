import { useForm } from "react-hook-form"
import { useConfirm } from "../../hooks/use-confirm"
import {IPost} from "../../interfaces/index.interface"
import { Button } from "../ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { z } from "zod"
import { postSchema } from "../../lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Form,FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { useMutation } from "@tanstack/react-query"
import { postStore } from "../../store/post.store"
import { toast } from "sonner"
import FillLoading from "../ui/shared/fill-loading"
import $api from "../../http/api"

function CreateCard({post}:{post:IPost}) {
  const {onOpen,setPost}=useConfirm()
  const [open,setOpen]=useState(false)
  const {posts,setPosts}=postStore()
  const onDelete=()=>{
    onOpen()
    setPost(post)
  }
  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      picture: post.picture,
      title:post.title,
      description:post.description
    },
  })

  const {mutate,isPending}=useMutation({
    mutationKey:['edit-post'],
    mutationFn:async (values:z.infer<typeof postSchema>)=>{
      const {data}=await $api.put(`/edit/${post._id}`,values);
      return data
    },
    onSuccess:data=>{
      const newData=posts.map(c=>c._id===data._id?data:c)
      setPosts(newData)
      setOpen(false)
    },
    onError:(error)=>{
      //@ts-ignore
      toast(error.response?.data?.message)
    }
  })

  async function onSubmit(values: z.infer<typeof postSchema>){
    mutate(values)
  }
  return (
    <Card className="text-center justify-center items-center shadow-md shadow-white hover:shadow-xl">
        <img src={post.picture} alt={post.title} className="rounded-top-md w-full"/>
  <CardHeader>
    <CardTitle className="line-clamp-1">{post.title}</CardTitle>
    <CardDescription className="line-clamp-3">{post.description}</CardDescription>
  </CardHeader>

  <CardFooter className="gap-2 justify-between rounded-md">
      <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
                <Button className="px-8 f-bold"  variant={'default'} onClick={()=>setOpen(true)}>Edit</Button>
          </PopoverTrigger>
          <PopoverContent className="w-96">
            {isPending && <FillLoading/>}
          <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">
        <FormField
        control={form.control}
          name="picture"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Picture</FormLabel>
              <FormControl>
                <Input placeholder="Picture" disabled={isPending} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>            
          )}
        />
        <FormField
        control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" disabled={isPending}  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
 
          )}
        />
        <FormField
        control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
              <Textarea placeholder="Message" disabled={isPending}  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending} >Submit</Button>
      </form>
    </Form> 
          </PopoverContent>
      </Popover>
    <Button className="px-8 f-bold"  variant={'destructive'} onClick={onDelete}>Delete</Button>
  </CardFooter>
</Card>

  )
}

export default CreateCard