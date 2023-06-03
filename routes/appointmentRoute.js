const express = require('express'); 
const { getAllAppointments, updateAppointment, getAppointmentsById } = require('../controllers/appointmentController');
const { createAppointment } = require('../controllers/appointmentController');

const { isAuthenticatedUser ,authorizedRoles } = require('../middleware/auth')

const router = express.Router();  
         
                 

router.route("/Appointment").get(getAllAppointments)
router.route("/Appointment/new").post(isAuthenticatedUser, createAppointment)
router.route("/Appointment/:id").put(updateAppointment).get(getAppointmentsById)


module.exports = router;