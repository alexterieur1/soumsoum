const express = require('express')
const router = express.Router()
const produitControllers = require('../controllers/produit')
const multer = require('../middleware/multer-config')
const auth = require('../middleware/auth')

router.get('/produit', produitControllers.affichageAllProduit)
router.get('/produit/:id', produitControllers.affichageUnProduit)
router.post('/produit', multer, produitControllers.creation)

module.exports = router