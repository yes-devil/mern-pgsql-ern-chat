const jwt = require("jsonwebtoken")
const { Socket } = require("socket.io")
require("dotenv").config()

let ACCESS_SECRET = process.env.jwt_ACCESS_TOKEN_SECRET
let REFRESH_SECRET = process.env.jwt_REFRESH_TOKEN_SECRET
let REGD_SECRET = process.env.jwt_REGD_TOKEN_SECRET

// console.log(ACCESS_SECRET, REFRESH_SECRET)


const generateRegdToken = async (email, pass) => {
    try {
        const regdToken = await jwt.sign({ email, pass }, REGD_SECRET, { expiresIn: '6m' })
        return regdToken
    } catch (error) {
        return false
    }
}

const verifyRegdToken = async (token) => {
    try {
        let decoded = await jwt.verify(token, REGD_SECRET)
        return decoded //OK authenticated

    } catch (err) {
        return false //401 Unauthorized
    }
}

const generateAccessToken = async (email) => {
    try {
        const accessToken = await jwt.sign({ email }, ACCESS_SECRET, { expiresIn: '30m' })
        return accessToken
    } catch (e) {
        console.log("Failed to generate access token for email : ", email)
        return false
    }
}

const generateRefreshToken = async (email) => {
    try {
        const accessToken = await jwt.sign({ email }, REFRESH_SECRET, { expiresIn: '5d' })
        return accessToken
    } catch (e) {
        console.log("Failed to generate refresh token for email : ", email)
        return false

    }
}

// verify token utitlity function that docodes on the basis of type given
const verifyToken = async (token, secret)=>{
    try {
        let decoded = await jwt.verify(token, secret)
        return decoded
    } catch (error) {
        return false
    }
}


// middle wares to verify jwt before access resources
const verifyAccessToken = async (req, res, next) => {
    try {
        let {accessToken, refreshToken} = req.cookies
        let accessTokenDecoded = await verifyToken(accessToken, ACCESS_SECRET)
        if(accessTokenDecoded) {
            req.user = accessTokenDecoded.email
            next()
        }
        else{
            let refreshTokenDecoded = await verifyToken(refreshToken, REFRESH_SECRET)
            if(refreshTokenDecoded){
                let newAccessToken = generateAccessToken(refreshTokenDecoded.email)
                let accessTokenOptions = {
                    maxAge : 30*60*1000, //30mins
                    sameSite : "lax",
                    secure: false,
                    httpOnly: true
                }
                res.cookies("accessToken", newAccessToken, accessTokenOptions)
                req.user = refreshTokenDecoded.email
                next()
            }
        }
    } catch (err) {
        console.log("token verification failed : ", err)
        res.status(401).json({message: "Access denied. Go back to login."})
    }
}

// middleware to run before Socket connection
// const verifyAccessCookie = (token)=>{
//     if(!token) return false
//     try {
//         let decoded = jwt.verify(token, ACCESS_SECRET)
//         return decoded
        
//     } catch (error) {
//         return false
        
//     }
// }

const verifyRefreshCookie= (token)=>{
    if(!token) return false
    try {
        let decoded = jwt.verify(token, REFRESH_SECRET)
        return decoded
        
    } catch (error) {
        return false
        
    }
}


module.exports = {
    generateRegdToken,
    verifyRegdToken,
    generateAccessToken,
    verifyAccessToken,
    generateRefreshToken,
    // verifyRefreshToken
    verifyRefreshCookie
}