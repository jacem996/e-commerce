const Product = require ('../models/productModel')
const asyncHandler = require ('express-async-handler')

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const registerProduct = async(req,res)=>{
    const newBody = JSON.parse(req.body.info)
    console.log(newBody)
    try {
        const imageUrl =`http://localhost:5000/uploads/${req.file.filename}`;
        console.log(imageUrl)
        // await User.findByIdAndUpdate(req.userId, {profilePic: imageUrl})
        // await User.findByIdAndUpdate(req.userId, {profilePic: imageUrl})
        const {name, description,category, price, quantity } = req.body;
        const newProduct = await Product.create({
            name:newBody.name,
            description:newBody.description,
            // category : newBody.category,
            price: newBody.price,
            image :imageUrl, 
            // quantity:newBody.quantity
        })
        res.json(newProduct)
        //  res.status(201).json({msg : 'Product created'});
    } catch (error) {
        console.log(error)
        res.status(500).json({msg : `something went wrong`})
    }
}
// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProduct = async(req,res)=>{
    try {
         const newProduct = await Product.find()
        res.json(newProduct)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg : `something went wrong`})
    }
}

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
// const getProduct = asyncHandler(async (req, res) => {
// 	const pageSize = 10
// 	const page = Number(req.query.pageNumber) || 1
// 	const keyword = req.query.keyword
// 		? // TODO Fuzzy Search
// 		  {
// 				name: {
// 					$regex: req.query.keyword,
// 					$options: 'i', // case insensitive
// 				},
// 		  }
// 		: {}

// 	const count = await Product.countDocuments({ ...keyword })

// 	const products = await Product.find({ ...keyword })
// 		.limit(pageSize)
// 		.skip(pageSize * (page - 1))

// 	res.json({ products, page, pages: Math.ceil(count / pageSize) })
// })

// @desc    get product by id
// @route   GET /api/products/id
// @access  Public
const getProductById = async(req,res)=>{
    try {
         const newProduct = await Product.findById(req.params.id)
         if(Product)
        res.json(newProduct)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg : `something went wrong`})
    }
}

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {

    try {
        const {name, description, price } = req.body;
        console.log( 'product info' ,req.body)
        console.log(req.params.prodId)

        const newProduct = await Product.findOneAndUpdate({_id:req.params.prodId}, {name, description, price},{new:true})
        console.log(newProduct)
        res.status(200).json(newProduct)
    } catch (error) {
        console.log(error)
            res.status(404)
            throw new Error('Product not found')
    }
}

// @desc    Delete single product by id
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req,res)=> {
    try {
        // const product = await Product.findById(req.params.prodId)
        // if(String(product._id) !== req.userId) return res.status(401).json({msg:'you are not authorized'})
        const product = await Product.findByIdAndDelete(req.params.prodId)
        res.json({msg : 'product removed'})
    } catch (error) {
        console.log(error)
        res.status(404).json({msg : `something went wrong`})
    }
}

// @desc    Get sorted Name products
// @route   GET /api/products/top
// @access  Public
// const getTopProducts = async (req, res) => {
// 	// Find products and sort by Name in ascending order
// 	const products = await Product.find().sort({ Name: -1 }).limit()

// 	res.json(products)
// }    

module.exports= {registerProduct,updateProduct,getProduct,getProductById,deleteProduct}