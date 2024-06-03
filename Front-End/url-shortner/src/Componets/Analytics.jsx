import axios from "axios";
import { useNavigate } from "react-router";
import { useState } from "react";

function Analytics() {
    const [input, setInput] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(
    );
    const navigate = useNavigate();

    async function EnterURL(e) {
        e.preventDefault();
        try {
            setLoading(true);
            const lastPart = input.split('/').pop(); // Extract the last part of the URL
            const response = await axios.get(`https://url-shortner-mern-uetd.onrender.com/url/analytics/${lastPart}`, { withCredentials: true });
            console.log(response.data)
            setData(response.data.result);
            setLoading(false);
        } catch (error) {
            alert("This URL Is Not OWN BY You Or Not Found");
            setError("This URL Is Not OWN BY You Or Not Found");
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <>
            {!data && (
                <div className="login-box">
                    <form onSubmit={EnterURL}>
                        <div className="user-box">
                            <input onChange={(e) => setInput(e.target.value)} type="text" value={input} name="" required="" />
                            <label>Your Magic URL</label>
                        </div>
                        {error && <div className="error-message">{error}</div>}
                        <br />
                        <center>
                            <button type="submit" id="button" className="full-rounded">
                                <span>Get Analytics</span>
                                <div className="border full-rounded"></div>
                            </button>
                        </center>
                    </form>
                </div>
            )}
            <div className="loaderbox">
                {data && (
                    <div class="code-editor">
                        <div class="header">
                            <span class="title">Your Data</span>
                        </div>
                        <div class="editor-content">
                            <code class="code">
                                <p><span class="color-0">.url-analytics </span> <span></span></p>

                                <p class="property">
                                    <span class="color-2">Total Views</span><span>:</span>
                                    <span class="color-1"> {data.visitHistory.length} </span>;
                                </p>
                                <p class="property">
                                    <span class="color-2">RedirectURL</span><span>:</span>
                                    <span class=""> {data.redirectURL} </span>;
                                </p>
                                <p class="property">
                                    <span class="color-2"> Created On</span><span>:</span>
                                    <span class="color-1"> {data.createdAt} <span class="color-3"></span></span>;
                                </p>
                                <p class="property">
                                    <span class="color-2">CreatedBy</span><span>:</span>
                                    <span class="color-1"> You That Why You Are Able To See Analytics</span> ;
                                </p>
                                <div className="centerbox">
                                    {data.visitHistory.map((value, index) => (
                                        <div key={index} className="card" >
                                            <h3>Req By (Device) : {value["Device-Info"]} </h3>
                                            <h3>IP :{value["ip-addreas"]}</h3>
                                            <h3>At {value.timestamp} </h3>
                                            <h3>Time :{value["Time-IND"]}`</h3>
                                        </div>
                                    ))}
                                </div>
                                <span></span>
                            </code>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Analytics;

/*{data.visitHistory.length + 1}

{data.visitHistory.map((value, index) => (
                                <div key={index} className="card" >
                                    <h3>Req By = Device : {value["Device-Info"]} </h3>
                                    <h3>IP :{value["ip-addreas"]}</h3>
                                    <h3>At {value.timestamp} </h3>
                                    <h3>Time :{value["Time-IND"]}`</h3>
                                </div>
                            ))}

*/
