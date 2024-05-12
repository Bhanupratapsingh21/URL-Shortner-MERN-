import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
function Createurl() {

    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post("https://url-shortner-hzlh.onrender.com/url", {
                url: url
            });
            setShortUrl(response.data);
            handleCopy()
        } catch (error) {
            console.error("Error creating short URL:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(`https://url-shortner-hzlh.onrender.com/${shortUrl.shorturl}`)
            .then(() => {
                alert("Short URL copied to clipboard")
                console.log("Short URL copied to clipboard:", shortUrl.shorturl);
            })
            .catch((error) => {
                alert("SOME THING WANT WRONG TRY AGAIN LETER")
                console.error("Error copying to clipboard:", error);
            });
    };

    return (
        <div className="bodybox">
            <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="title">URL Shortener<br /><span>Click To Create Short-URL</span></div>
                {!loading && (
                    <div>
                        <input value={url} onChange={(e) => setUrl(e.target.value)} className="input" name="url" placeholder="URL" type="text" />
                        <div className="login-with" />
                        <div>
                            <button className="button-confirm" type="submit">Create Short-URL</button>
                        </div>
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
            </form>
            <div>
                    <button className="button-confirm" onClick={()=> navigate("/Analytics") }>See Analytics OF URL</button>
                </div>
                <div>
                    <button className="button-confirm" onClick={()=> navigate("/Redirect") } type="submit">Redirect To URL</button>
                </div>
            </div>
        </div>
    );
}

export default Createurl;
