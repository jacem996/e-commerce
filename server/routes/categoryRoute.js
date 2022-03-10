const express = require ('express')
const { registerCategory, getCategory ,deleteCategory,updateCategory} = require('../controllers/categoryController')
const authMiddleware = require('../middlewars/authMiddlewares')
const authAdmin = require('../middlewars/authAdmin')
const router = express.Router()

router.get('/',getCategory)
router.post('/register',authMiddleware,authAdmin,registerCategory)

router.route('/category/:id')
    .delete(authMiddleware, authAdmin, deleteCategory)
    .put(authMiddleware, authAdmin, updateCategory)
    
module.exports = router