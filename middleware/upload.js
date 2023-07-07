const express = require('express');
const multer = require('multer');

const app = express();

// Multer configuration
const storage = multer.memoryStorage(); // Use memory storage for handling file uploads

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // Set the maximum file size to 5MB (adjust as needed)
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true); // Accept the file if it is an image
        } else {
            cb(new Error('Invalid file type. Only images are allowed.'), false);
        }
    },
});

module.exports = upload;