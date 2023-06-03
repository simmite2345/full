const Doctor = require("../models/doctorModel");
const sendToken = require("../utils/jwtToken");


// register Doctor

exports.registerDoctor = async (req, res, next) => {



    const doctor = await Doctor.create(req.body);

    // const token = user.getJWTToken();


    res.status(201).json({
        success: true,
        doctor
    })
    // sendToken(doctor, 201,res);
}


// login doctor

exports.loginDoctor = async (req, res, next) => {


    const { email, password, status} = req.body;

    //checking email and pasword 


    if (!email && !passward) {
        return res.status(401).json({
            success: false,
            message: 'please enter email and password'
        })
    }

    const doctor = await Doctor.findOne({ email }).select({password}).select({status:"Approved"});


    if (!doctor) {
        return res.status(401).json({
            success: false,
            message: 'please enter email and password'
        });
    }

    const isPasswordMatched = doctor.comparePassword(password);
console.log(isPasswordMatched)
    if (!isPasswordMatched) {
        return res.status(401).json({
            success: false,
            message: 'please enter email and password'
        });
    }

        const token = doctor.getJWTToken();


    sendToken(doctor, 200,res);

};


// //Logout doctor


exports.logout = async(req,res,next) =>{


    res.cookie("token",null,{
        expires : new Date(Date.now()),
        httpOnly: true,
    })

    res.status(200).json({
        success:true,
        message:"Logged Out"
    })

}


//get by email

exports.getDoctorByEmail = async (req, res) => {

    const email = req.params.email;

    const doctor = await Doctor.findOne({email});


    if (!doctor){

        return res.status(500).json({
            success: false,
            message: "doctor not found"
        })}

    
       res.status(200).json({
        success: true,
        doctor
    })
}

//get all doctor

exports.getAllDoctors = async (req, res) => {

    const doctor = await Doctor.find();

    res.status(200).json({
        success: true,
        doctor
    })
}


