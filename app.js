const express = require('express'); 
const app = express();  
const cookieParser =  require("cookie-parser")  
const cors = require('cors')



app.use(cors());
app.use(express.json())
app.use(cookieParser())
// api routes


const appointment = require("./routes/appointmentRoute")
const user = require("./routes/userRoute")
const doctor = require("./routes/doctorRoute")


app.use("/api/a1",appointment)
app.use("/api/a1",user)
app.use("/api/a1",doctor)
//middleware 



module.exports = app;