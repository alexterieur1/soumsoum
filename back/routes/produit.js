const express = require('express')
const router = express.Router()
const produitControllers = require('../controllers/produit')
const multer = require('../middleware/multer-config')

router.get('/produit', produitControllers.affichageAllProduit)
router.post('/produit', multer, produitControllers.creation)
 
module.exports = router