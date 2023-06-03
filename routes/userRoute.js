const express = require('express'); 
const { registerUser, loginUser, logout, forgotPassword, getAllUsers } = require('../controllers/userController');



const router = express.Router();  
         
                 

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route('/password/forgot').post(forgotPassword)
router.route("/logout").get(logout)
router.route('/users').get(getAllUsers)
module.exports = router;