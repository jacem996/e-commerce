const Order = require ('../models/orderModel')

const registerOrder = async(req,res)=>{
    try {
        const { orderItems, paymentMethod, totalPrice,validate} = req.body ;
        const newOrder = await Order.create({orderItems, paymentMethod, totalPrice,validate} )
        res.status(201).json(newOrder)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg : `something went wrong`})
    }
}

// @desc    Fetch all order
// @route   GET /api/order
// @access  Public
const getOrder = async(req,res)=>{
    try {
         const newOrder = await Order.find()
        res.json(newOrder)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg : `something went wrong`})
    }
}

// @desc    Fetch all order
// @route   GET /api/order
// @access  Public
const getOrderById = async(req,res)=>{
    try {
        const order = await Order.findById(req.params.id)
        res.json(order)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg : `something went wrong`})
    }
}

// @desc    Delete single order by id
// @route   DELETE /api/order/:id
// @access  Private/Admin
const deleteOrder = async (req,res)=> {
    try {
        const newOrder = await Order.findByIdAndRemove(req.params.id)
        res.json({msg : 'order removed'})
    } catch (error) {
        console.log(error)
        res.status(404).json({msg : `something went wrong`})
    }
}
module.exports= {registerOrder,getOrder,getOrderById,deleteOrder}