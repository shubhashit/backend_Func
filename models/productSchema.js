const mongoose = require('mongoose');


// User data to be stored in this format
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price:{
        type:Number,
        required: true
    },
    description:{
        type:String
    },
    quantity:{
        type:Number,
        required:true,
    },
    specification:{
        type:String
    },
    image:{
        data: Buffer,
        contentType: String
    }
})

const Product = mongoose.model("PRODUCT", productSchema);

module.exports = Product;