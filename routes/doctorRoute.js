const express = require('express'); 
const { registerDoctor, loginDoctor, logout, getDoctorByEmail, getAllDoctors } = require('../controllers/doctorController');



const router = express.Router();  
         
                 

router.route("/registerDoctor").post(registerDoctor)
router.route("/loginDoctor").post(loginDoctor)
router.route("/logout").post(logout)
router.route('/registerDoctor/:email').get(getDoctorByEmail)
router.route('/doctor').get(getAllDoctors)
module.exports = router;