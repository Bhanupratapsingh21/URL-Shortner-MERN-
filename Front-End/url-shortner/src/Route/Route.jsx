import { Route, Routes } from "react-router-dom";
import App from "../App.jsx";
import Createurl from "../Componets/Home/createUrl.jsx";
import Redirect from "../Componets/Redirect.jsx";
import Analytics from "../Componets/Analytics.jsx";
import Login from "../Componets/Login/Login.jsx";
import Signin from "../Componets/Sign-up/Signup.jsx";
function AllRoutes (){

    return(
        <Routes>
            <Route path="/" element={<Createurl/>} />
            <Route path="/Redirect" element={<Redirect/>} />
            <Route path="/Analytics" element={<Analytics/>} />
            <Route path="/user">
                    <Route path="/user/login" element={<Login/>} />
                    <Route path="/user/signin" element={<Signin/>} />                   
            </Route>
        </Routes>
    )
}

export default AllRoutes
