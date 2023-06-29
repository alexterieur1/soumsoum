const express = require('express')
const router = express.Router()
const clientControllers = require('../controllers/client')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')
const session = require('../middleware/session')

router.post('/inscription', multer, session, clientControllers.inscription)
router.post('/connexion', multer, session, clientControllers.connexion)
router.get('/informationClient', multer, session, auth, clientControllers.informationClient)

module.exports = router