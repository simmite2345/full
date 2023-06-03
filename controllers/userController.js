const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require('../utils/sendEmail')

// register user

exports.registerUser = async (req, res, next) => {

    const { fullname, email, password } = req.body;


    const user = await User.create({
        fullname,
        email,
        password
    });

    const token = user.getJWTToken();


    sendToken(user, 201, res);
}


// login user 

exports.loginUser = async (req, res, next) => {


    const { email, password } = req.body;
    //checking email and pasword 


    if (!email || !password) {
        return res.status(401).json({
            success: false,
            message: 'please enter email and password'
        })
    }

    const user = await User.findOne({ email }).select("+password");


    if (!user) {
        return res.status(401).json({
            success: false,
            message: 'please enter email and password'
        });
    }


    if (!user.comparePassword(password)) {
        return res.status(401).json({
            success: false,
            message: 'please enter email and password'
        });
    } else {
        return res.status(200).json({
            success: true,
            message: 'please enter',user
        })
    }


    const token = user.getJWTToken();


    sendToken(user, 200, res);

};






//Logout user


exports.logout = async (req, res, next) => {


    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })

    res.status(200).json({
        success: true,
        message: "Logged Out"
    })

}



// forgot password

exports.forgotPassword = async (req, res, next) => {



    const user = await User.findOne({ email: req.body.email }).select("+password");


    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'user not found'
        });
    }


    //get resetpassword token

    const resetToken = user.getResetPasswordToken();


    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/a1/password/reset/${resetToken}`;

    const message = `Your Password reset token is :- \n\n ${resetPasswordUrl} \n\n Tf you have not requested this email then, please ignore it`

    try {

        await sendEmail({

            email: user.email,
            subject: `Doctor App Password Recovery`,
            message,

        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email}`
        })





    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined



        await user.save({ validateBeforeSave: false });

        return res.status(200).json({
            success: false,
            message: error.message,

        })

        console.log("m hu")
    }


    // res.cookie("token",null,{
    //     expires : new Date(Date.now()),
    //     httpOnly: true,
    // })

    // res.status(200).json({
    //     success:true,
    //     message:"Logged Out"
    // })

}


//get all users

exports.getAllUsers = async (req, res) => {

    const user = await User.find();

    res.status(200).json({
        success: true,
        user    })
}
