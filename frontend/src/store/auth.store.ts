import { create } from 'zustand'
import {  IUser } from '../interfaces/index.interface'

type authStoreType = {
	isLoading:boolean,
    isAuth:boolean,
    user:IUser,
    setLoading:(bool:boolean)=>void,
    setIsAuth:(bool:boolean)=>void,
    setUser:(bool:IUser)=>void
}

export const authStore = create<authStoreType>(set => ({
	isLoading:false,
    isAuth:false,
    user:{} as IUser,
    setIsAuth:bool=>set({isAuth:bool}),
    setLoading:bool=>set({isLoading:bool}),
    setUser:user=>set({user})
}))
