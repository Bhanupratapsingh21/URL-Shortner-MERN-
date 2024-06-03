import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Contaxt/AuthContextprovider"; 
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Login() {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setLogin } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null); // Reset error state

        try {
            const response = await axios.post("https://url-shortner-mern-uetd.onrender.com/users/login", {
                name: username,
                email,
                password
            },
            { withCredentials: true });

            const token = response.data.data.accessToken;
            setLogin(token);
            // console.log(response.data);
            navigate("/createurl")
        } catch (error) {
            console.error("Login failed:", error);
            setError("Login failed. Please check your credentials and try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {!loading && (
                <div className="login-box">
                    <form onSubmit={handleSubmit}>
                        <div className="user-box">
                            <input
                                type="text"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <label>Username</label>
                        </div>
                        <div className="user-box">
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <label>Email</label>
                        </div>
                        <div className="user-box">
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <label>Password</label>
                        </div>
                        {error && <div className="error-message">{error}</div>}
                        <center>
                            <button type="submit" id="button" className="full-rounded">
                                <span>Login</span>
                                <div className="border full-rounded"></div>
                            </button>
                        </center>
                    </form>
                    <center>
                        <h5>
                            Don't Have an Account? Create <Link to="/user/signin">Sign-In</Link>
                        </h5>
                    </center>
                </div>
            )}
            {loading && (
                <div className="loaderbox">
                    <div className="loader">
                        <div className="cell d-0"></div>
                        <div className="cell d-1"></div>
                        <div className="cell d-2"></div>
                        <div className="cell d-1"></div>
                        <div className="cell d-2"></div>
                        <div className="cell d-2"></div>
                        <div className="cell d-3"></div>
                        <div className="cell d-3"></div>
                        <div className="cell d-4"></div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Login;
