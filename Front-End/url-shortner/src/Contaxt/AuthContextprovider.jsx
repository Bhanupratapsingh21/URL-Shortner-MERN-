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
        const token = localStorage.getItem("refreshToken");
        if (token) {
            try {
                const res = await axios.post("https://url-shortner-mern-uetd.onrender.com/users/refreshtoken", {
                    refreshToken: token
                }, { withCredentials: true });
                // console.log(res);
                if (res) {
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
        localStorage.removeItem("refreshToken");
        setIsAuth(false);
        // Make a request to logout the user
        axios.get("https://url-shortner-mern-uetd.onrender.com/users/logout", { withCredentials: true })
            .then(response => {
                console.log("User logged out successfully");
                // Redirect to login page

            })
            .catch(error => {
                console.error("Error logging out user:", error);
                // Redirect to login page

            });
    };

    const setLogin = (token) => {
        localStorage.setItem("refreshToken", token);
        setIsAuth(true);
    };
    const createnewsession = () => {
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

export { AuthContextProvider };