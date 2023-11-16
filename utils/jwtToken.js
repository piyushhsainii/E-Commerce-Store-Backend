const jwt = require('jsonwebtoken')

const sendCookie_Token = (user,status,res)=>{
    const token = jwt.sign({id:user._id},process.env.JWT_KEY,{          //creating a token
        expiresIn:process.env.JWT_EXPIRE,
    })
    const expirationTime = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const options = {
        httpOnly:true,
        expires:expirationTime,
        sameSite:'none',
        secure: true
             
    } 
    res.status(status).cookie('token',token ,options).json({
        sucess:true,
        user
    })
}

module.exports = sendCookie_Token  