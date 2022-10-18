const express =require("express");
const app = express();
const helmet = require("helmet");    
const mongoose = require("mongoose");
require("dotenv").config();
const morgan = require("morgan");
const cors =require("cors");
const{readdirSync} =require("fs");






///.....Middleware ,............

app.use(helmet());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(morgan("dev"));
app.use(cors());




/////........DataBase Connection..........

mongoose
.connect(process.env.DATABASE)
.then(()=>{console.log("DataBase Connected Successfull")})
.catch((error)=>{console.log("DataBase Error=>",error)});

///.....routes MiddleWare .....
readdirSync("./routes").map(a =>app.use("/api/v1",require(`./routes/${a}`)));



//......Server.....
const port = process.env.PORT 

app.listen(port,()=>{
    console.log(`App is running on port ${port}`)
});