import { useQuery } from "@tanstack/react-query"
import $axios from "../http"
import CreateCard from "../components/card/create-card"
import {IPost} from "../interfaces/index.interface"
import PostLoading from "../components/ui/shared/post-loading"
import { Alert,AlertTitle,AlertDescription } from "../components/ui/alert"
import {postStore} from "../store/post.store"
import ConfirmModal from "../components/modals/confirm.modal"
function Home() {
  const {setPosts,posts}=postStore()
  const {isLoading,error}=useQuery({
    queryKey:['get-posts'],
    queryFn:async ()=>{
      const {data}=await $axios.get('/get-all')
      setPosts(data)
      return data
    }
  })
  
  return (
    <>
    <div className="container max-w-6xl mx-auto mt-28">
      {error && (
         <Alert variant="destructive">
         <AlertTitle>Error</AlertTitle>
         <AlertDescription>
           Your session has expired. Please log in again.
         </AlertDescription>
       </Alert>
      )}
      <div className="grid grid-cols-3 gap-4">
      {isLoading && Array.from({ length: 6 }).map((_, idx) => <PostLoading key={idx} />)}
         {posts.map((post:IPost)=>(
          <CreateCard key={post._id} post={post} />
        ))}
      </div>
    </div>
    <ConfirmModal/>
    </>
  )
}

export default Home