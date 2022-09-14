const jwt = require('jsonwebtoken')
const config = require('config')

const auth = (req,res,next) => {
    
    // Get the token from the header
    const token = req.header("auth-token")

    // Check if token is present or not 
    if(!token) return res.status(401).json({ msg: "Token is missing"})

    try {
        const payload =  jwt.verify(token, config.get('jwtSecret'))
        req.user = payload.user
        next()
    } catch (error) {
        console.log("Error: ",error.message);
        res.status(401).json({ msg: "Unauthorized!" })
    }
    
}

module.exports = auth