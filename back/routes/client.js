const express = require('express')
const router = express.Router()
const clientControllers = require('../controllers/client')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')
const session = require('../middleware/session')

router.post('/inscription', clientControllers.inscription)
router.post('/connexion', session, multer, clientControllers.connexion)
router.get('/informationClient', session, auth, clientControllers.informationClient)
 
module.exports = router