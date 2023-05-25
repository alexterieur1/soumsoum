const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next) => {
   try {
    console.log('test')
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, process.env.PHRASECRYPT);
       const idClient = decodedToken.idClient;
       req.auth = {
           idClient: idClient,
           tout: decodedToken
       };
	next();
   }
   catch(e){
       return res.status(401).json({e, message : `bad authentification`})
   }
}