const mongoose = require("mongoose");
const validator = require("validator")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv').config();
const doctorSchema = mongoose.Schema({
    
    fullname:{
        type:String,
        required:[true,"enter your name"]
    },
    email:{
        type:String,
        required:[true,"enter your email id"],
        validate:[validator.isEmail,"enter a valid email"],
    },
    password:{
        type:String,
        required:[true,"enter your password"],
    },
    specialist:{
        type:String,
        required:[true,"enter your specilization"]
    },
    qualification:{
        type:String,
        required:[true,"enter your qualification"]
    },
    experiance:{
        type:Number,
        maxLength: [2],
        default:0
        // require:[true,"please select your experiance"]
    },
    phone:{
        type:Number,
        required:[true, "please enter vaild phone number"],
        maxLength:[10]
    },
    status:{
        type:String,
        default:"Request to Approve",
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})
doctorSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

// jwt token


doctorSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE
    })
}

//compare password

doctorSchema.methods.comparePassword = function(enteredPassword){
    return bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model("Doctors",doctorSchema)