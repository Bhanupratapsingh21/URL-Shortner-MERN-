import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {

    const [isAuth, setIsAuth] = useState(false);
    useEffect(() => {
       getAuthStatus();
    }, []);

    const getAuthStatus = async () => {
        console.log("NEW SESSION GENRATED");
        const token = localStorage.getItem("accesstoken");
        if (token) {
            try {
                const res = await axios.get("http://localhost:4000/users/refreshtoken", { withCredentials: true });
                console.log(res);
                if(res){
                    setLogin(res.data.data.accessToken)
                    console.log(res)
                }
            } catch (error) {
                console.log("error in makeing req")
                setLogout();
            }
        } else {
            setLogout();
            console.log("logouted")
        }
    };

    const setLogout = () => {
        localStorage.removeItem("accesstoken");
        setIsAuth(false);
    };

    const setLogin = (token) => {
        localStorage.setItem("accesstoken", token);
        setIsAuth(true);
    };
    const createnewsession= ()=>{
        getAuthStatus();
    };

    const value = {
        isAuth,
        setIsAuth,
        setLogin,
        setLogout,
        createnewsession,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
