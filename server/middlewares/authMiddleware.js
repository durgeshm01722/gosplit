import jwt from "jsonwebtoken";
import userDataModel from "../models/userModel.js";

const protect = async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // Get token from header
            token = req.headers.authorization.split(" ")[1];
            
            // Verify Token
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

            // Get user from the token
            req.user = await userDataModel.findOne({username: decoded.username}).select("-password");
            next();
        }
        catch (err) {
            res.send("not authorized!");
        }
    }
    else{
        res.send("not authorized!");
    }
}

export default protect;