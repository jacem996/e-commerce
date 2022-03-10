const jwt = require('jsonwebtoken')

const authMiddleware = async(req,res,next) => {
    try {
        const token = req.headers.token;
        if(!token) return res.stauts(401).json({msg: 'token must be provided'})
        const verifyToken= await jwt.verify(req.headers.token, process.env.SECRET_KEY)
        req.userId=verifyToken.sub
        next()
    } catch (error) {
        console.log(error)
       return res.status(500).json({msg : `invalid token`})
    }
};
module.exports= authMiddleware 