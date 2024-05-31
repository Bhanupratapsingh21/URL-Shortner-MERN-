import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {

    const [isAuth, setIsAuth] = useState(false);
    useEffect(() => {
        getAuthStatus();
    }, []);

    const getAuthStatus = async () => {
        const token = localStorage.getItem("accesstoken");
        if (token) {
            try {
                const res = await axios.get("http://localhost:4000/users/refreshtoken", { withCredentials: true });
                // console.log(res);
                setIsAuth(true);
            } catch (error) {
                // console.log(error);
                setIsAuth(false);
            }
        } else {
            setIsAuth(false);
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

    const value = {
        isAuth,
        setIsAuth,
        setLogin,
        setLogout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
