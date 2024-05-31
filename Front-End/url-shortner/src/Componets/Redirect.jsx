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
            <div className="login-box">
                <form >
                    <div className="user-box">
                        <input
                            type="text"
                            name="username"
                            value={input}
                            onChange={(e) => setinput(e.target.value)}
                            required
                        />
                        <label>Enter Magic URL To Redirect</label>
                    </div>
                    <center>
                        <button type="submit" id="button" className="full-rounded">
                            <span>Let's GO</span>
                            <div className="border full-rounded"></div>
                        </button>
                    </center>
                </form>
            </div>
        </>
    )
}
export default Redirect