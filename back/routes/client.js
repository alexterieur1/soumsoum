const express = require('express')
const router = express.Router()
const produitControllers = require('../controllers/produit.js')

router.get('/produit', produitControllers.affichageAllProduit)
 
module.exports = router