const mongoose = require('mongoose')
const uri = process.env.DB_URL;

mongoose.connect(uri , {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    // to use the Func data or else it will be using the test database
    // dbName: "Func"
}).then(()=>{
    console.log('connection is successfull ......')
}).catch((err)=>{
    console.log(err);
})
