const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    createdAt:{
        type : Date,
        // default:Date.now,
    },
    updatedAt:{
        type:Date,
        default:Date.now,
    }
});

const Cart = mongoose.model('Cart', cartItemSchema);

module.exports = Cart