const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next) => {
    console.log('bonjour')
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, process.env.PHRASECRYPT);
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       };
	next();
   }
   catch(e){
       return res.status(401).json({e, message : `bad authentification`})
   }
}