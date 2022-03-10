const { body } = require('express-validator');

const userValidation = 
[
    body('email','invalid email !').isEmail(),
body('password','you must be at least 6 caracters').isLength({min: 6})

]

module.exports = userValidation