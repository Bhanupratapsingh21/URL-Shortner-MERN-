import { Route, Routes } from "react-router-dom";
import App from "../App.jsx";

import Createurl from "../Componets/createUrl.jsx";
function AllRoutes (){

    return(
        <Routes>
            <Route path="/" element={<Createurl/>} />

        </Routes>
    )
}
export default AllRoutes
