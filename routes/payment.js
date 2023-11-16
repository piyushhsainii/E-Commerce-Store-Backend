const express =  require('express')
const router = express.Router() 
const {isAuthenticated} = require('../middlewares/auth')
const { processPayments , sendStripekey } = require('../controllers/payment')

router.post('/payment/process', isAuthenticated, processPayments)
router.get('/payment/stripeKey',isAuthenticated,sendStripekey)


module.exports = router