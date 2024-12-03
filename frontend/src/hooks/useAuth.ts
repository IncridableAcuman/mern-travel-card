import { create } from 'zustand'
import { AuthType } from '../interfaces/index.interface'

type authConfirmStore = {
	authState:AuthType,
    setAuth:(state:AuthType)=>void
}

export const authConfirm = create<authConfirmStore>(set => ({
	authState:"login",
    setAuth:(state)=>set({authState:state})
}))