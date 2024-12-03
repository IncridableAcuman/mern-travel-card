import { useNavigate } from "react-router-dom"
import Login from "../components/auth/login"
import Register from "../components/auth/register"
import { Card, CardContent } from "../components/ui/card"
import { authConfirm } from "../hooks/useAuth"
import { useEffect } from "react"
import ForgotPassword from "../components/auth/forgot-password"

function Auth() {
  const {authState}=authConfirm()
  const navigate=useNavigate()

  useEffect(()=>{
    if(localStorage.getItem('accesstoken')){
      navigate('/')
    }
  },[])
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-1/3 p-3 bg-secondary rounded-xl relative">
      <CardContent>
        {authState==="login" && <Login/>}
        {authState==="register" && <Register/>}
        {authState==='forgot-password' && <ForgotPassword/>}
      </CardContent>
      
      </Card>
    </div>
  )
}

export default Auth