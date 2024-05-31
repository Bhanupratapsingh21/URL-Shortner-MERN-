import AllRoutes from "./Route/Route"
import Header from "./Componets/Header"
import { useContext } from "react"
import { AuthContext } from "./Contaxt/AuthContextprovider"
function App() {
  const {createnewsession} = useContext(AuthContext);
  createnewsession()
  return(
    <div className="body">
      <Header/>
      <AllRoutes/>
    </div>
  )
  
}

export default App
