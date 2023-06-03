const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/doctorapp",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useCreateIndex:true,
}).then(()=>{
    console.log("connnection")
}).catch((e)=>{
    console.log("not connected")
    console.log(e)
})