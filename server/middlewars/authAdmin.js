const User = require ('../models/userModel')

const authAdmin = async(req, res, next)=>{
    try {
       const user = await User.findOne({
           _id: req.userId 
       })   
       console.log(user)
       if(user.role === 'user' ) return res.status(400).json({msg :'Admin ressource access denied'})
       next()
    } catch (error) { 
        return res.status(500).json({msg : `invalid token`})
    }
}

module.exports = authAdmin