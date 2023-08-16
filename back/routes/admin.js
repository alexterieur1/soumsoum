const express = require('express')
const router = express.Router()
const adminControllers = require('../controllers/admin')
const multer = require('../middleware/multer-config')
const auth = require('../middleware/auth')
const session = require('../middleware/session')

router.get('/infoproduit', adminControllers.infoAllproduit)
router.post('/vue', multer, adminControllers.incrementationVue)
//router.get('/infoStock', adminControllers.infostock)

module.exports = router