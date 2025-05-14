//import and implement 
const express = require('express');
//import express dependancy 
const userRoutes = require("./view/user.routes");
const app = express();
//app is an instance of express that is used to create a server
//create an instance of express

//api design express -> server -> 24X7 

//port listener 
//port -> local system -> server locations 
//localhost:8000, localhost:3000, localhost:5000
const PORT = 3000;
app.use(express.json())
//routing 

//routing -> define the endpoints
//endpoints -> url -> api -> server

// document.addEventListener("DOMContentLoaded", function() {
//     console.log("DOM fully loaded and parsed");
//   });

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

