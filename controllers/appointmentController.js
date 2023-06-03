const Appointment = require("../models/appointmentModel")


// create appointment

exports.createAppointment = async (req, res, next) => {

// req.body.user = req.user.id;

    const appointment = await Appointment.create(req.body);

    res.status(201).json({
        success: true,
        appointment
    })
}


// get all appointmnet -- admin


exports.getAllAppointments = async (req, res) => {

    const appointments = await Appointment.find();

    res.status(200).json({
        success: true,
        appointments
    })
}


// get appointmnet update -- doctor


exports.updateAppointment = async (req, res, next) => {



    let appointment = await Appointment.findById(req.params.id);

    if (!appointment){

        return res.status(500).json({
            success: false,
            message: "porduct not found"
        })}

        appointment = await Appointment.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true,
            useFindAndModify:false
        })

        res.status(200).json({
            success: true,
            appointment
        }) 
}


// get appointmnet -- BY id


exports.getAppointmentsById = async (req, res) => {


    let appointment = await Appointment.findById(req.params.id);

    if (!appointment){

        return res.status(500).json({
            success: false,
            message: "porduct not found"
        })}

    
       res.status(200).json({
        success: true,
        appointment
    })
}



// Delet appointment 



// exports.deleteAppointment = async (req, res, next) => {
//     try {
//         const appointment = await Appointment.findById(req.params.id);

//         if (!appointment) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Appointment not found"
//             });
//         }

//         await appointment.remove();

//         res.status(200).json({
//             success: true,
//             message: "Appointment deleted successfully"
//         });
//     } catch (e) {
//         console.log(e)
//         // Handle any other errors that might occur during the deletion process
//         return res.status(500).json({
//             success: false,
//             message: "An error occurred while deleting the appointment",
    
//         });
//     }
// };

