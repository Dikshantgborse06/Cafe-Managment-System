require('dotenv').config()   //WE will encrypt and decrypt the token by ACCESS_TOKEN
const jwt = require('jsonwebtoken');

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null){  //token doesn't exist
        return res.sendStatus(401);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN,(err,response)=>{  //checking if the token is signed by the ACCESS_TOKEN
        if(err){
            return res.sendStatus(403);
        }
        res.locals = response;  //the available local var from response will return and move to next method
        next()
    })
}

module.exports = {authenticateToken : authenticateToken}  