const express = require('express')
const router = express.Router()
const paypalControllers = require('../controllers/paypal')

router.post('/paiement', paypalControllers.createPayment)
 
module.exports = router