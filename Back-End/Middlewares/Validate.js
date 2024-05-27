import jwt from "jsonwebtoken"

function Validateauth(req, res, next) {
    const tokencookieValue = req.cookies["accessToken"] ||  req.header("Authorization")?.replace("Bearer", "");
    if (!tokencookieValue) return res.status(401).json({ "MSG": "Invaild User Pls Login First" })
    try {
        const userpayload = jwt.verify(tokencookieValue, process.env.ACCESS_TOKEN_SECRET)
        if(!userpayload) return res.status(401).json({ "MSG": "Invaild User Pls Login First" })
        req.user = userpayload;
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({ "MSG": "SOME SERVER ISSUES" })
    }

}
export default Validateauth 