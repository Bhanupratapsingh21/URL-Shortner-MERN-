import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
function Redirect() {
    // Here is a exaple for Checking Server Is Working Or not
    const [input, setinput] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    function EnterURL() {
            setLoading(true)
            window.location.href = `https://url-shortner-hzlh.onrender.com/${input}`
            setLoading(false)
    }


    return (
        <>
            <div className="bodybox">
                <div className="form">
                    {
                        !loading && (
                            <>
                                <div className="title">URL Redirect<br /><span>Click On To Redirect</span></div>
                                <input onChange={(e) => setinput(e.target.value)} value={input} className="input" name="url" placeholder="URL" type="text" />
                                <div className="login-with" />
                                <div>
                                    <button className="button-confirm" onClick={EnterURL}>GO</button>
                                </div>
                            </>
                        )
                    }
                    {loading && (
                        <div className="loading-wave">
                            <div className="loading-bar"></div>
                            <div className="loading-bar"></div>
                            <div className="loading-bar"></div>
                            <div className="loading-bar"></div>
                        </div>
                    )}
                    <div>
                        <button className="button-confirm" onClick={() => navigate("/Analytics")}>See Analytics OF URL</button>
                    </div>
                    <div>
                        <button className="button-confirm" onClick={() => navigate("/")}>Create URL'S</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Redirect