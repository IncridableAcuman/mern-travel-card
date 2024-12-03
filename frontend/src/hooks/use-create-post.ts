import {create} from 'zustand'
type useCreatePostStore={
    isOpen:boolean
    onOpen:()=>void
    onClose:()=>void
}
export  const UseCreatePost=create<useCreatePostStore>(set=>({
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false})
}))
