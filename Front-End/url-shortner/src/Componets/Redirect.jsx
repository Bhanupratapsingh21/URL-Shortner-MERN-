import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Redirect() {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function EnterURL(e) {
        e.preventDefault();
        setLoading(true);

        try {
           
            window.location.href = input;
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="login-box">
                <form onSubmit={EnterURL} >
                    <div className="user-box">
                        <input
                            type="text"
                            name="inputURL"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            required
                        />
                        <label>Enter Magic URL To Redirect</label>
                    </div>
                    <center>
                        <button type="submit" id="button" className="full-rounded" disabled={loading}>
                            <span>{loading ? 'Redirecting...' : 'Let\'s GO'}</span>
                            <div className="border full-rounded"></div>
                        </button>
                    </center>
                </form>
            </div>
        </>
    );
}

export default Redirect;
