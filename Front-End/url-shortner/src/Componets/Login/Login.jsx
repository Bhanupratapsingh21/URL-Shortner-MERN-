import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Contaxt/AuthContextprovider"; // Ensure this path is correct

function Login() {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setLogin } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:4000/users/login", {
                name : username,
                email,
                password
            });

            const token = response.data.data.accessToken;
            setLogin(token);
            console.log(response.data)
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
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
                    <center>
                        <button class="full-rounded">
                            <span>Login</span>
                            <div class="border full-rounded"></div>
                        </button>
                    </center>
                </form>
            </div>
            <div className="loaderbox">
                {loading && (
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
                )}
            </div>
        </>
    );
}

export default Login;
