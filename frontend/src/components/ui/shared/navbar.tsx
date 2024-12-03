import { Link } from "react-router-dom"
import { Button } from "../button"
import CreatePost from "../../create-post"
import { UseCreatePost } from "../../../hooks/use-create-post"
import { authStore } from "../../../store/auth.store"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../avatar"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import $axios from "../../../http"
import { IUser } from "../../../interfaces/index.interface"

function Navbar() {
    const {onOpen}=UseCreatePost()
    const {isAuth,user,isLoading,setUser,setIsAuth}=authStore()

  const logout=async ()=>{
    try {
      await $axios.post('/auth/logout');
      setIsAuth(false);
      setUser({} as IUser)
    } catch (error) {
      //@ts-ignore
      toast(error.response?.data?.message)
    }
  }

  return (
    <div className="w-full h-24 fixed bg-slate-950 inset-0 shadow-2xl shadow-white">
          <div className="w-full h-full flex justify-between items-center container">
             <Link className="flex items-centerjustify-center gap-2 ml-2" to={'/'}>
                <img src={'/vite.svg'} alt="img" />
                <p className=" text-4xl shadow-xl f-bold shadow-white-500">Izzatbek</p>
            </Link>
            
            <div className="flex gap-2 mr-2">
              {isAuth && (
                 <Button size={'lg'} className="rounded-full f-bold" variant={'outline'} onClick={onOpen}>Create Post</Button>
              )}
                {isLoading ?<Loader2 className="animate-spin"/> :(
                  isAuth ? (
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Avatar className="cursor-pointer">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  ):(
                    <Link to={'/auth'}>
                <Button size={'lg'} className="rounded-full f-bold">Login</Button>              
                </Link>
                  )
                )}
                <CreatePost/>
                </div>             
          </div>       
    </div>
  )
}

export default Navbar