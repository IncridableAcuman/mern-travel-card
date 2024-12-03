import { Loader2 } from "lucide-react"
import { Skeleton } from "../skeleton"

function FillLoading() {
  return (
    <Skeleton className=" absolute inset-0 items-centerw-full h-full justify-center flex opacity-70 z-50 ">
        <Loader2 className="animate-spin"/>
    </Skeleton>
  )
}

export default FillLoading