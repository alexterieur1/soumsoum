const express = require('express')
const router = express.Router()
const produitControllers = require('../controllers/produit')
const multer = require('../middleware/multer-config')
const auth = require('../middleware/auth')
const session = require('../middleware/session')

router.get('/produit', produitControllers.affichageAllProduit)
router.get('/produit/:id', produitControllers.affichageUnProduit)
router.post('/produit', multer, produitControllers.creation)
router.get('/panier', session, auth, produitControllers.panier)
router.post('/panier', auth, produitControllers.addPanier)

module.exports = router