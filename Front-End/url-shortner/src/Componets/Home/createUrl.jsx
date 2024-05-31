import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "./home.css";

function Createurl() {
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:4000/url/createurl", {
                url: url
            },{ withCredentials: true });
            setShortUrl(response.data.shorturl);
            console.log(response.data);
        } catch (error) {
            console.log("Error creating short URL:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(`http://localhost:4000/${shortUrl}`)
            .then(() => {
                alert("Short URL copied to clipboard");
                console.log("Short URL copied to clipboard:", shortUrl);
            })
            .catch((error) => {
                alert("Something went wrong. Please try again later.");
                console.error("Error copying to clipboard:", error);
            });
    };

    return (
        <div>
            {shortUrl && (
                <div className="loaderbox">
                    <div className="cardres">
                        <div className="card-details">
                            <h2>Magic-Link</h2>
                            <p className="text-body">http://localhost:5173/{shortUrl}</p>
                        </div>
                        <button className="card-button" onClick={handleCopy}>
                            COPY MAGIC-LINK
                        </button>
                    </div>
                </div>
            )}
            {!loading && !shortUrl && (
                <div className="login-box">
                    <form onSubmit={handleSubmit}>
                        <div className="user-box">
                            <input onChange={(e) => setUrl(e.target.value)} type="text" value={url} name="" required="" />
                            <label>Create MAGIC-URL</label>
                        </div>
                        <center>
                            <button type="submit" id="button" className="full-rounded">
                                <span>Create</span>
                                <div className="border full-rounded"></div>
                            </button>
                        </center>
                    </form>
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
        </div>
    );
}

export default Createurl;