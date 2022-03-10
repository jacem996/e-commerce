const express = require ('express')
const router = express.Router()
const {registerOrder,getOrder,deleteOrder, getOrderById} = require ('../controllers/orderController')

router.post('/register',registerOrder)
.get('/',getOrder)
.get('/:id',getOrderById)
.delete('/:id',deleteOrder)
module.exports = router