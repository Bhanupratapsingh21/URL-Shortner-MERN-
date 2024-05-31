import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "./home.css"
function Createurl() {

    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post("localhost:4000/url/createurl", {
                url: url
            });
            setShortUrl(response.data);
            console.log(response.data);
            handleCopy();
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
        <div>
            {
                shortUrl.length > 1 && (
                    <div className="loaderbox">
                        <div className="cardres">
                            <div class="card-details">
                                <p class="text-title">Card title</p>
                                <p class="text-body">Here are the details of the card</p>
                            </div>
                            <button class="card-button">COPY MAGIC-LINK</button>
                        </div>
                    </div>
                )
            }
            {!loading && shortUrl === "" && (
                <div class="login-box">
                    <form onSubmit={handleSubmit}>
                        <div class="user-box">
                            <input onChange={(e) => setUrl(e.target.value)} type="text" value={url} name="" required="" />
                            <label>Create MAGIC-URL</label>
                        </div>
                        <center>
                            <button id="button" class="full-rounded">
                                <span>Hover me</span>
                                <div class="border full-rounded"></div>
                            </button>
                        </center>
                    </form>
                </div>
            )}
            <div className="loaderbox">
                {loading && (
                    <>
                        <div class="loader">
                            <div class="cell d-0"></div>
                            <div class="cell d-1"></div>
                            <div class="cell d-2"></div>
                            <div class="cell d-1"></div>
                            <div class="cell d-2"></div>
                            <div class="cell d-2"></div>
                            <div class="cell d-3"></div>
                            <div class="cell d-3"></div>
                            <div class="cell d-4"></div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Createurl;
