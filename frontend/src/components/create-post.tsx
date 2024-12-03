import { useForm } from "react-hook-form"
import { UseCreatePost } from "../hooks/use-create-post"
import { zodResolver } from "@hookform/resolvers/zod"
import { Sheet,SheetContent, SheetDescription, SheetHeader, SheetTitle } from "./ui/sheet"
import { postSchema } from "../lib/validation"
import { z } from "zod"
import { Form,FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { toast } from "sonner"
import { useState } from "react"
import { postStore } from "../store/post.store"
import $api from "../http/api"

function CreatePost() {
  const {posts,setPosts}=postStore()
    const {isOpen,onClose}=UseCreatePost()
    const [loading,setLoading]=useState(false);
    const form = useForm<z.infer<typeof postSchema>>({
        resolver: zodResolver(postSchema),
        defaultValues: {
          picture: "",
          title:"",
          description:""
        },
      })
      async function onSubmit(values: z.infer<typeof postSchema>) {
        const formData=new FormData()
        setLoading(true)
        formData.append("picture",values.picture);
        formData.append("title",values.title);
        formData.append("description",values.description);

        try {
          const res=await $api.post('/post',values);
          const newData=[...posts,res.data];
          setPosts(newData);
          form.reset();
          onClose();
        } catch (error) {
          //@ts-ignore
          toast(error.response?.data?.message)
        }finally{
          setLoading(false)
        }

      }
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create Post</SheetTitle>
          <SheetDescription>
            Whati is in your mind
          </SheetDescription>
        </SheetHeader>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">
        <FormField
        control={form.control}
          name="picture"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Picture</FormLabel>
              <FormControl>
                <Input placeholder="Picture" disabled={loading} {...field} />
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
                <Input placeholder="Title" disabled={loading} {...field} />
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
              <Textarea placeholder="Message" disabled={loading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>Submit</Button>
      </form>
    </Form>      
      </SheetContent>
    </Sheet>
  )
}

export default CreatePost