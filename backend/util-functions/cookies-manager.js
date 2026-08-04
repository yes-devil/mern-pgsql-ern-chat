// remove token existing in the client side by middleware
const removeTokenCookies = (req, res, next)=>{
    res.clearCookie("accessToken")
    res.clearCookie("refreshToken")
    next()
}

module.exports = {
    removeTokenCookies
}