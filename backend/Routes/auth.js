const { Router } = require("express");
const router = Router()
const sendMail = require("../Email-service/send-email")
const jwtManager = require("../util-functions/jwt-manager")
const { createUser, checkUserCredentials, getAllUsersList } = require("../util-functions/db-methods")
const { removeTokenCookies } = require("../util-functions/cookies-manager")




router.get("/test", (req, res) => {
    res.status(200).json(req)
})

router.post("/sign-up", async (req, res) => {
    const { email, pass } = req.body
    const regdToken = await jwtManager.generateRegdToken(email, pass)
    if (regdToken) {
        let result = await sendMail(email, regdToken)
        console.log(result)
        if (result == 200) {
            res.status(200).json({ message: "Verification email sent successfully. Verify it within 6 minutes" })
        }
        else if (result == 500) {
            res.status(500).json({ message: "Error sending verification Email, try after sometime." })
        }
    }
    else {
        res.status(500).json({ message: "We could not generate verification link for now, try after sometime." })
    }
})

router.post("/verify-me", async (req, res) => {
    const token = req.body.token
    const decoded = await jwtManager.verifyRegdToken(token)
    console.log(decoded)
    if (decoded) {
        // register new user to db
        let result = await createUser(decoded.email, decoded.pass)
        if (result) {
            res.status(200).json({ message: `Email ${decoded.email} Verified successfully. Now just login.` })
        }
        else {
            res.status(500).json({ message: "Error occured in registration." })
        }

    }
    else {
        res.status(401).json({ message: "Expired or Invalid Link." })
    }
})

router.post("/log-in", removeTokenCookies, async (req, res) => {
    const { email, pass } = req.body
    let result = await checkUserCredentials(email, pass)
    if (result) {
        let newAccessToken = await jwtManager.generateAccessToken(email)
        let newRefreshToken = await jwtManager.generateRefreshToken(email)
        if (newAccessToken && newRefreshToken) {
            let accessTokenOptions = {
                maxAge: 30 * 60 * 1000, //30 minutes = 900000 milis
                // maxAge : 40*1000, //40sec for dev
                sameSite: "lax",
                secure: false,
                httpOnly: true
            }
            let refreshTokenOptions = {
                maxAge: 5 * 24 * 60 * 60 * 1000, //5days
                // maxAge: 2*60*1000, //2min for dev
                sameSite: "lax",
                secure: false,
                httpOnly: true
            }
            res.cookie("accessToken", newAccessToken, accessTokenOptions)
            res.cookie("refreshToken", newRefreshToken, refreshTokenOptions)
            res.status(200).json({ message: "Longin and Access granted" })
        }
        else {
            res.status(500).json({ message: "Token generation failed" })
        }
    }
    else {
        res.status(401).json({ "message": "Access denied." })
    }
})

router.delete("/log-out", removeTokenCookies, async (req, res) => {
    res.status(200).json({ message: "Logged out successfully." })
})

module.exports = router