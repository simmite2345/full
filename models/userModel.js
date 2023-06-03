const mongoose = require("mongoose");
const validator = require("validator")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv').config();
const crypto = require("crypto")


const usersSchema = new mongoose.Schema({
    
   fullname:{
        type:String,
        required:[true,"enter your name"],
        maxLength:[30,"enter key name "],
        minLength:[4,"enter name more chacters"]    },
    email:{
        type:String,
        required:[true,"enter your email id"],
       validate:[validator.isEmail,"enter a valid email"],
        unique: true
    },
    password:{
        type:String,
        required:[true,"enter your password"],
        minLength:[8,"password should bo greater than 7 chacters"] 
    },
    role:{
        type: String,
        default:"user"
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
resetPasswordToken: String,
resetPasswordExpire: Date
});

usersSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

// jwt token


usersSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE
    })
}

//compare password

usersSchema.methods.comparePassword = async function(enteredPassword) {
    console.log(enteredPassword);
    console.log(this.password);
    return await bcrypt.compare(enteredPassword, this.password);
  };

//generatting password reset token

usersSchema.methods.getResetPasswordToken = function(){


    //generating token 

    const resetToken = crypto.randomBytes(20).toString("hex");

    //hasing and adding reset password token to userShchem


    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;


    return resetToken;
}






module.exports = mongoose.model("User",usersSchema)