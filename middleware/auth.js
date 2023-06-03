
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")



exports.isAuthenticatedUser = async(req, res, next)=>{
    const { token }= req.cookies;

  if(!token){
    return res.status(401).json({
        success: false,
        message: 'please login to book appointment'
  })
  }
  const decodeData = jwt.verify(token,process.env.JWT_SECRET);

 req.user = await User.findById(decodeData._id);

 next();
}


// not working authorize role

exports.authorizedRoles = (...roles) =>{
  return (req, res, next) => {
    console.log(req.user.role)
if(!roles.includes(req.user.role)){
  return res.status(403).json({
    success: false,
    message: `Role: ${req.user.role} is not allowed`
})
}

next();
   };
 }