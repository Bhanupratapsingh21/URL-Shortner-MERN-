import { useContext } from "react"
import { AuthContext } from "../Contaxt/AuthContextprovider"
import { Navigate } from "react-router-dom"

function PrivateRoute ({children}){
    const {isAuth} = useContext(AuthContext)

    return isAuth ? children : <Navigate  to={"/user/login"}/>
}

export default PrivateRoute