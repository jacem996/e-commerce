const mongoose = require ('mongoose')

const productSchema = mongoose.Schema({
    // user: {
    //     type: mongoose.Schema.Types.ObjectId, // Gets id of User
    //     required: true,
    //     ref: 'User', // Adds relationship between Product and User
    // },
    name :{
        type: String,
        required: true,

    },
    description :{
        type: String,
        required: true,
    },
    // category :{
    //     type:String,
    //     required: true
    // },
    price :{
        type: Number,
        required: true,
        
    },
    image :{
        type: String,
        
    },
    // quantity :{
    //     type: Number,
    //     required: true,
    // },

})
module.exports = mongoose.model('Product', productSchema)