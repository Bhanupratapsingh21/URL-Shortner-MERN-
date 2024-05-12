import axios from "axios";
import { useNavigate } from "react-router";
import { useState } from "react";

function Analytics() {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    async function EnterURL() {
        try {
            setLoading(true);
            const response = await axios.get(`https://url-shortner-hzlh.onrender.com/analytics/${input}`);
            setData(response.data); // Update data state with fetched analytics data
            setLoading(false);
        } catch (error) {
            alert("Something went wrong");
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <>
            <div className="bodybox">
                <div className="form">
                    <div>
                        <button className="button-confirm" onClick={() => navigate("/")}>HOME</button>
                    </div>
                    {!loading && (
                        <>
                            <div className="title">URL Analytics<br /><span>Enter the URL To Get Analytics</span></div>
                            <input onChange={(e) => setInput(e.target.value)} value={input} className="input" name="url" placeholder="URL" type="text" />
                            <div className="login-with" />
                            <div>
                                <button className="button-confirm" onClick={EnterURL}>GO</button>
                            </div>
                        </>
                    )}
                    {data.visitHistory && (
                        <div>
                            <h1 style={{ "color" : "black"}}>Total Views : {data.visitHistory.length + 1}</h1>
                            {data.visitHistory.map((value, index) => (
                                <div key={index} className="card" >
                                    <h3>Req By = Device : {value["Device-Info"]} </h3>
                                    <h3>IP :{value["ip-addreas"]}</h3>
                                    <h3>At {value.timestamp} </h3>
                                    <h3>Time :{value["Time-IND"]}`</h3>
                                </div>
                            ))}
                        </div>
                    )}
                    {loading && (
                        <div className="loading-wave">
                            <div className="loading-bar"></div>
                            <div className="loading-bar"></div>
                            <div className="loading-bar"></div>
                            <div className="loading-bar"></div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Analytics;
