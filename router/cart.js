const express = require('express');
const router = express.Router();
const Cart = require('../models/cartitemSchema')
const authenticateToken = require('../middleware/authenticateToken')
const Product = require('../models/productSchema');


router.post('/addtocart', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const productId = req.body.productId;
        const quantity = req.body.quantity;
        const product = await Product.findById(productId)
        const findCart = await Cart.findOneAndUpdate({userId} , {
            pro
        });
        if(findCart){
            findCart.updateOne
        }
    }
    catch(err){
        res.status(500).json({ error: err });
    }
})

module.exports = router