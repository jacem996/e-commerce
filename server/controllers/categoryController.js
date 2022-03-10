const Category = require ('../models/categoryModel')

const registerCategory = async(req,res)=>{
    try {
        // if user have role = 'admin' ---> admin
        // only admin can create , delete and update category
        const {name} = req.body;
        const category = await Category.findOne({name})
        if(category) return res.status(400).json({msg: "This category already exists."})

        const newCategory = new Category({name})

        await newCategory.save()
        return res.json({msg: "Created a category"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

// @desc    Fetch all order
// @route   GET /api/order
// @access  Public
const getCategory = async(req,res)=>{
    try {
         const newCategory = await Category.find()
        res.json(newCategory)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg : `something went wrong`})
    }
}
   const deleteCategory= async(req, res) =>{
        try {
            const products = await Products.findOne({category: req.params.id})
            if(products) return res.status(400).json({
                msg: "Please delete all products with a relationship."
            })

            await Category.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a Category"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }

   const updateCategory = async(req, res) =>{
        try {
            const {name} = req.body;
            await Category.findOneAndUpdate({_id: req.params.id}, {name})

            res.json({msg: "Updated a category"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }

module.exports = {registerCategory,getCategory,deleteCategory,updateCategory}