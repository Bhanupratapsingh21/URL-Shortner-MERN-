import { Route, Routes } from "react-router-dom";
import App from "../App.jsx";
import Createurl from "../Componets/Home/createUrl.jsx";
import Redirect from "../Componets/Redirect.jsx";
import Analytics from "../Componets/Analytics.jsx";
import Login from "../Componets/Login/Login.jsx";
import Signin from "../Componets/Sign-up/Signup.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import Home from "../Componets/Home/Home.jsx";
function AllRoutes() {

    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/createurl" element={
                <PrivateRoute>
                    <Createurl />
                </PrivateRoute>
            } />
            <Route path="/Redirect" element={<Redirect />} />
            <Route path="/Analytics" element={
            <PrivateRoute>
                <Analytics />
            </PrivateRoute>} />
            <Route path="/user">
                <Route path="/user/login" element={<Login />} />
                <Route path="/user/signin" element={<Signin />} />
            </Route>
        </Routes>
    )
}

export default AllRoutes
