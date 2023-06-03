const app = require("./app")

const dotenv = require('dotenv').config();


//config 

const port = process.env.PORT || 5000;  


//connection db

require("./db/conn")

app.listen(port, () => {           
    console.log(`Now listening on port ${port}`); 
});