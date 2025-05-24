import jwt from "jsonwebtoken"

export const generateToken=(userID, res)=>{
    const token=jwt.sign({userID}, process.env.JWT_SECRET, {
        expiresIn: "7d" // user has to login again after token expires
    })

    res.cookie("jwt", token, {
        maxAge: 7*24*60*60*1000, //7 days in mS
        httpOnly: true, // prevents XSS attacks cross-site scripting attacks
        sameSite: "strict", // CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV != "development" // we use http but in production https is used 
    })
}