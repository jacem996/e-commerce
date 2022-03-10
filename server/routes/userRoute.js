const express = require ('express');
const { register,login,loadUserInfo,getAllUsers,getUserById,updateUserById,deleteUser,updateProfilePicture } = require('../controllers/userController');
const authMiddleware = require ('../middlewars/authMiddlewares')
const router = express.Router();
const userValidation = require ('../middlewars/userValidation');
const multer = require ('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './img-uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + file.originalname
      cb(null, uniqueSuffix)
    }
  })
  const upload = multer({ storage: storage })

router.put('/profilePic',authMiddleware, upload.single('profilePicture'),updateProfilePicture)
router.post('/register',userValidation,register)
router.post('/login',userValidation,login)
router.get('/userInfo',authMiddleware,loadUserInfo)
.get('/',getAllUsers)
.get('/:id',getUserById)
.put('/updateuser',authMiddleware,updateUserById)
.delete('/:id',deleteUser)

module.exports = router 