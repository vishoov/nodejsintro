//import and implement 
const express = require('express');
//import express dependancy 
const userRoutes = require("./view/user.routes");
const app = express();
const limit = require('express-rate-limit');
//import express-rate-limit dependancy
//app is an instance of express that is used to create a server
//create an instance of express

//api design express -> server -> 24X7 

//port listener 
//port -> local system -> server locations 
//localhost:8000, localhost:3000, localhost:5000
const mongoose = require('mongoose');
const PORT = 3000;
app.use(express.json())
//routing 
const dotenv=   require('dotenv');
dotenv.config();
//dotenv is used to load environment variables from a .env file into process.env
const cors = require('cors');

app.use(cors({
    origin: "",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
   
    exposedHeaders: ['Authorization'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

//cors is used to allow cross-origin requests

//routing -> define the endpoints
//endpoints -> url -> api -> server

// document.addEventListener("DOMContentLoaded", function() {
//     console.log("DOM fully loaded and parsed");
//   });

//this is a promise that is used to connect to the database
mongoose.connect(process.env.MONGO)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.log("Error connecting to MongoDB", err);
})





const loggingMiddleware = (req, res, next) =>{

    //console.log all the request data
    const method = req.method;
    const url = req.url;
    const date = new Date().toLocaleString();
    const ip = req.ip;
    
    console.log(`Middleware Triggered`)
    console.log(`Request : METHOD -> ${method} URL -> ${url} DATE -> ${date} IP -> ${ip}`);

    next(); 
    //next() -> function that is used to call the next middleware in the stack
    

}

const limiter = limit(
    {
        //windowMs
        windowMs: 15*60*1000,
        maxRequests:5,
        message:"Too many requests from this IP, please try again later",
    }
);


app.use(limiter);
app.use(loggingMiddleware);
//middleware -> function that runs before the request is processed

//Route 
//root route
app.get("/",  (req, res) => {
    res.send("Hello World");
})


//middleware used to import the routes from the user.routes.js file
app.use("/", userRoutes);



//port listener should be at the end of the file
//port listener 
app.listen(
    PORT, 
    ()=>{
        console.log(`Server is running on port ${PORT}`);
        //callback function that runs when the server is running
        //console.log is used to print the message to the console
    }
    
);
//listen to the port
//2 arguments -> port number, callback function

