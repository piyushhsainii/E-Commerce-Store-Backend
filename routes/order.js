const express = require('express')
const {newOrder, getSingleOrder, MyOrders, AllOrders, updateOrder, DelOrders} = require('../controllers/order.js')
const {isAuthenticated ,admin} = require('../middlewares/auth.js')
const router = express.Router()

router.post('/createOrder', isAuthenticated, newOrder)
router.route('/getOrder/:id').get(isAuthenticated,getSingleOrder) 
router.route('/myOrders').get(isAuthenticated,MyOrders)
router.get('/AllOrders',isAuthenticated,admin("admin"),AllOrders)
router.put('/updateOrder/:id',isAuthenticated,admin("admin"),updateOrder)
router.delete('/DeleteOrder/:id',isAuthenticated,admin("admin"),DelOrders)


module.exports = router