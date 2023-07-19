const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next) => {
   try {
      let idSession = req.headers.id
      let tokenSession = JSON.parse(req.sessionStore.sessions[idSession]).token
      
    //console.log(req.headers.cookie)
       const token = req.session.token;
       const decodedToken = jwt.verify(tokenSession, process.env.PHRASECRYPT);
       //console.log(decodedToken)
       req.auth = {
           token: decodedToken
       };
	next();
   }
   catch(e){
    console.log(e)
       return res.status(401).json({e, message : `bad authentification`})
   }
}