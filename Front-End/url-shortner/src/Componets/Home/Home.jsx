import axios from "axios";
import { AuthContext } from "../../Contaxt/AuthContextprovider";
import Redirect from "../Redirect"
import { useContext } from "react";
import { useState,useEffect } from "react";
function Home (){
    const {setIsAuth} = useContext(AuthContext)
    
    
    return (
        <>
            <Redirect/>
        </>
    )
}
export default Home