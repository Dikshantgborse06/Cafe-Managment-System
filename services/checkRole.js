//There could be few APIs which are created for admin..for that we have to check for it
require('dotenv').config();

function checkRole(req,res,next){
    if(res.locals.role == process.env.USER){
        res.sendStatus(401)
    }
    else{
        next()
    }

}
module.exports = { checkRole: checkRole }
