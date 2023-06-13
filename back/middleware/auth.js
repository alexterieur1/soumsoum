const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next) => {
   try {
    console.log(req.sessionStore.sessions)
    //console.log(req.headers.cookie)
       const token = req.session.token;
       const decodedToken = jwt.verify(token, process.env.PHRASECRYPT);
       //console.log(decodedToken)
       req.auth = {
           token: decodedToken
       };
	next();
   }
   catch(e){
    //console.log(e)
       return res.status(401).json({e, message : `bad authentification`})
   }
}