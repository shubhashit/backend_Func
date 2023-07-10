const express = require('express');
const router = express.Router();
const Cart = require('../models/cartitemSchema')
const authenticateToken = require('../middleware/authenticateToken')
const Product = require('../models/productSchema');


router.post('/cart/add', authenticateToken, async (req, res) => {
    try {
        console.log(req.body)
        console.log(req.user)
        const userId = req.user.userId;
        const productId = req.body.productId;
        const quantity = req.body.quantity;
        const product = await Product.findById(productId)
        const findCart = await Cart.findOne({userId : userId})
        const currentDate = new Date();
        
        const num = 134123;
        const insertProduct = {
            productId,
            quantity
        }
        console.log('check')
        console.log(findCart)
        if(findCart){
            console.log('here int the ab9ove block')
            findCart.f
            await findCart.updateOne({
                $push : {products : insertProduct}
            })
            
        }
        else{
            console.log('here')
            const newcart = new Cart({
                userId,
                products : [{
                    productId,
                    quantity
                }],
                createdAt : currentDate
            })
            await newcart.save();
        }
        res.status(201).json({ message: 'cart saved successfully',  });
    }
    catch(err){
        res.status(500).json({ error: err });
    }
})

module.exports = router