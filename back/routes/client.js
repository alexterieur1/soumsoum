const express = require('express')
const router = express.Router()
const clientControllers = require('../controllers/client')

router.post('/inscription', clientControllers.inscription)
router.post('/connexion', clientControllers.connexion)
 
module.exports = router