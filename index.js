//import and implement 
const express = require('express');
//import express dependancy 

const app = express();
//app is an instance of express that is used to create a server
//create an instance of express

//api design express -> server -> 24X7 

//port listener 
//port -> local system -> server locations 
//localhost:8000, localhost:3000, localhost:5000
const PORT = 3000;

//routing 

//routing -> define the endpoints
//endpoints -> url -> api -> server

// document.addEventListener("DOMContentLoaded", function() {
//     console.log("DOM fully loaded and parsed");
//   });

//Route 
app.get("/", (req, res) => {
    res.send("Hello World");
})
//req -> request object -> contains information about the request that was made to the server or that we have recieved from the client  
//res -> response object -> contains information about the response that we will send back to the client

app.get("/time", (req, res)=>{
    const date = new Date().toLocaleString();
    res.send(`The current time is ${date}`);
});




//route is built on the app instance
//app.method() -> method is the type of request
//method -> get, post, put, delete, patch
//in express there is UNIDIRECTIONAL flow of data
//app.method('address', callBack function)

// app.get("/api", (req, res)=>{
//     res.send("Hello from the API");
// });

// app.get("/about", (req, res)=>{
//     res.send("Hello from the about page");
// })

// app.get("/contact", (req, res)=>{
//     res.send("Hello from the contact page");
// })

// app.get("/user", (req, res)=>{
//     res.send("Hello from the user page");
// })

//route memory save 
//listen 


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

