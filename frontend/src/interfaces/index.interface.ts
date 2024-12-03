export   interface IPost{
    _id:string,
    picture:string,
    title:string,
    description:string,
    createdAt:string,
    author:string
}
export  interface IUser{
    email:string,
    password:string,
    id:string
}

export type AuthType="register"|"login"|"forgot-password";