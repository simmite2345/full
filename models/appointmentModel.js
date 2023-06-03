const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema({
    date:{
        type:Number,
        required:[true, "please enter vaild date"]
    },
    timming:{
        type:String,
        required:[true,"please slot select"]
    },
    name:{
        type:String,
        required:[true,"enter your name"]
    },
    age:{
        type:Number,
        required:[true, "please enter vaild age"],
        maxLength:[2]
    },
    phone:{
        type:Number,
        required:[true, "please enter vaild phone number"],
        maxLength:[10]
    },
    gender:{
        type:String,
        required:[true,"please select your gender"]
    },
    problem:{
        type:String,
        required:[true,"enter your problem carefully"]
    },
    // doctor:{
    //     type:mongoose.Schema.ObjectId,
    //     ref:"User",
    //     require:[true,"enter"]
    // },
    specialist:{
        type:String,
        required:[true,"enter "]
    },
    status:{
        type:String,
        default:"Pending",
    },
    createdAt:{
        type:Date,
        default: Date.now
    }

})

module.exports = mongoose.model("Appointment",appointmentSchema)