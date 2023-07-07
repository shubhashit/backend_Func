const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken')
const Product = require('../models/productSchema');

// code to upload the image 
// async function saveImageToStorage(image) {
//     // Implement the logic to save the image to a file storage service (e.g., Amazon S3, Google Cloud Storage)
//     // Return the URL or identifier of the saved image

//     // Example implementation using local file storage
//     const fs = require('fs');
//     const path = require('path');

//     const uploadsDir = path.join(__dirname, 'uploads');
//     if (!fs.existsSync(uploadsDir)) {
//         fs.mkdirSync(uploadsDir);
//     }

//     const imageFileName = `${Date.now()}-${image.originalname}`;
//     const imagePath = path.join(uploadsDir, imageFileName);

//     fs.writeFileSync(imagePath, image.buffer); // Save the image to the uploads directory

//     return `/uploads/${imageFileName}`; // Return the relative path to the image file
// }



// router.post('/products', upload.single('image'), async (req, res) => {
//     try {
//         const { name, price, description, quantity, specification} = req.body;
//         const image = req.file; // Retrieve the uploaded image file

//         if (!image) {
//             return res.status(400).json({ error: 'Image file is required.' });
//         }

//         // Save the image to a file storage service (e.g., Amazon S3, Google Cloud Storage) and get the image URL
//         const imageUrl = await saveImageToStorage(image);

//         // Save the product with the image URL
//         const product = new Product({
//             name,
//             description,
//             price,
//             quantity,
//             category,
//             brand,
//             image: imageUrl,
//         });

//         await product.save();

//         res.status(201).json({ message: 'Product created successfully', product });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Server error' });
//     }
// });



router.post('/products', authenticateToken , async (req, res) => {
    try {
        // Verify if the user is an admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied' });
        }

        const { name, price, description, quantity, specification } = req.body;
        // const image = {
        //     data: Buffer.from(req.body.image, 'base64'),
        //     contentType: req.body.imageType,
        // };

        // Create a new product
        const product = new Product({ name, price, description, quantity, specification });
        await product.save();

        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/products/all', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router