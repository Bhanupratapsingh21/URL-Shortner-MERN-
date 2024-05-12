import { Route, Routes } from "react-router-dom";
import App from "../App.jsx";

import Createurl from "../Componets/createUrl.jsx";
import Redirect from "../Componets/Redirect.jsx";
import Analytics from "../Componets/Analytics.jsx";
function AllRoutes (){

    return(
        <Routes>
            <Route path="/" element={<Createurl/>} />
            <Route path="/Redirect" element={<Redirect/>} />
            <Route path="/Analytics" element={<Analytics/>} />
        </Routes>
    )
}
export default AllRoutes
