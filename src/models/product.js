const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        required   : true,
        trim:true,
        ref : 'Users'
    },
    name : {
        type : String,
        required : true,
        trim:true,
    },
    price : {
        type : String,
        required : true,
        trim:true
    },
    status : {
        type : Boolean,
        required : true,
        trim:true,
        default : true
    }
},{
    timestamps:true
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product