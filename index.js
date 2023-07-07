// backend
const express = require('express');
const app = express(); 

const dotenv = require('dotenv');
dotenv.config({path:'./config.env'})
require('./db/connection.js');
const port = process.env.PORT;

app.use(express.json());
// const middleware = (req , res , next)=>{
//     console.log("this is middle ware process next");
//     next();
// }

// the routes have been manages here
app.use(require('./router/auth'));
app.use(require('./router/product.js'));

// example to make a route on this file
// app.get('/' ,  (req, res)=>{
//     res.send("hellow world");
// })


// listening to the port 
app.listen(port , ()=>{
    console.log('connecting to the server.....');
})




