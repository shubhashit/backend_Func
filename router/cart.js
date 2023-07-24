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
        const findCart = await Cart.findOne({ userId: userId })
        const currentDate = new Date();

        if (findCart) {
            const findCartwithProductId = await Cart.findOne({ userId: userId ,  'products.productId': productId });
            if (findCartwithProductId) {
                const index = findCartwithProductId.products.findIndex((product) => product.productId.toString() === productId);
                console.log('find the prodcut');
                console.log(findCartwithProductId)
                await findCartwithProductId.updateOne({
                    $set :{
                        [`products.${index}.quantity`] : quantity 
                    }
                })
                res.status(201).json({ message: 'product updated successfully' });
            }
            else {
                await findCart.updateOne({
                    $push: {
                        products: {
                            productId,
                            quantity
                        }
                    }
                })
                res.status(201).json({ message: 'product saved successfully' });
            }
            
        }
        else {
            console.log('here')
            const newcart = new Cart({
                userId,
                products: [{
                    productId,
                    quantity
                }],
                createdAt: currentDate
            })
            await newcart.save();
            res.status(201).json({ message: 'cart created successfully' });
        }
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
})

router.get('/cart', authenticateToken , async (req, res) => {
        try {
            const  userId  = req.user.userId;
            // Find the user's cart document
            const cart = await Cart.findOne({ userId });

            if (!cart) {
                res.status(404).json({ error: 'Cart not found.' });
            } else {
                res.status(200).json({ cart });
            }
        } catch (err) {
            console.error('Error retrieving cart:', err);
            res.status(500).json({ error: 'An error occurred while retrieving the cart.' });
        }
})

router.delete('/cart/delete/:productId' , authenticateToken , async(req, res)=> {
    try {
        console.log(req.user)
        const userId = req.user.userId;
        const productId = req.params.productId;
        const findcart = await Cart.findOneAndUpdate({ userId : userId, 'products.productId': productId } , {
            $pull : {
                products : {productId}
            }
        } );


        res.status(201).json({ message: 'product deleted successfully' });
        
    } catch (error) {
        res.status(500).json({message : "error occurred" , error})
    }
})


module.exports = router