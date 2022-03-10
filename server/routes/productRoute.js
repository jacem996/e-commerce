const express = require ('express')
const { registerProduct,updateProduct,getProduct,getProductById,deleteProduct,getTopProducts} = require('../controllers/productController');
const router = express.Router();
const authAdmin = require ('../middlewars/authAdmin')
const authMiddlewares = require ('../middlewars/authMiddlewares')

const multer = require('multer')

const storage = multer.diskStorage({
    destination: './uploads-product/',
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' +  file.originalname)
    }
  })
  const upload = multer({ storage })


router
.post('/register',upload.single('picture'),authMiddlewares,authAdmin,registerProduct)
.get('/',getProduct)
.get('/:id',getProductById)
.put('/:prodId',authMiddlewares,authAdmin,updateProduct)
.delete('/:prodId',authMiddlewares,authAdmin,deleteProduct)
// .get('/top', getTopProducts)

module.exports= router