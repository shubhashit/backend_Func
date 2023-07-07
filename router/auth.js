const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const client = require('../db/connection');
require('../db/connection');
const User = require('../models/userSchema');

router.get('/' , (req, res)=>{
    res.send("this is hello from the router");
})

router.post('/register' , async (req , res)=>{
    const {name , email , password , role} = req.body;
    console.log(name);
    if(!name || !email || !password){
        res.json({error : "empty filled"})
    }
    const userExists = await User.findOne({email});
    if(userExists){
        return res.json({error : "This email is already taken"});
    }
    const salt = await bcrypt.genSalt(10);

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({name , email , password : hashedPassword , role})
    
    user.save().then(()=>{
        res.status(200).json({message : "user is saved" , user})
    }).catch(()=>{
        res.status(500).json({message : "user is not saved"})
    })
    // res.json({message : req.body});
})

router.get('/login' ,async (req , res)=>{
    const {email , password} = req.body;
    if(!email || !password){
        res.json({error : "empty fileed"})
    }
    const user = await User.findOne({email})
    if(!user){
        res.json({error : "Wrong email"})
    }
    // wait for the password to be encrypted and chekced
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    // create a jwt token 
    const token = jwt.sign({ userId: user._id, role: user.role }, 'secretKey', { expiresIn: '1h' });
    res.json({ token , user});

})

module.exports = router; 
