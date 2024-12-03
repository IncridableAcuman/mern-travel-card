import { create } from 'zustand'
import { IPost } from '../interfaces/index.interface'

type ConfirmStore = {
	isOpen: boolean
	post: IPost
	onOpen: () => void
	onClose: () => void
	setPost: (post: IPost) => void
}

export const useConfirm = create<ConfirmStore>(set => ({
	isOpen: false,
	post: {} as IPost,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
	setPost: post => set({ post }),
}))