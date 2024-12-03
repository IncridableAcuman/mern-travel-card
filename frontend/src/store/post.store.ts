import { create } from 'zustand'
import { IPost } from '../interfaces/index.interface'

type PostStoreType = {
	posts: IPost[]
	setPosts: (posts: IPost[]) => void
}

export const postStore = create<PostStoreType>(set => ({
	posts: [],
	setPosts: posts => set({ posts }),
}))