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
//req -> request object -> contains information about the request that was made to the server or that we have recieved from the client  
//res -> response object -> contains information about the response that we will send back to the client

//https methods
//route structure
//route -> url -> api -> server
//user management api
//user create -> data collect -> user info -> server send -> post request 
//server recieved -> data -> server extracts and process the data -> server saves the data in the database

app.get("/time", (req, res)=>{
    const date = new Date().toLocaleString();
    res.send(`The current time is ${date}`);
});

app.get("/about", (req, res)=>{
    res.send("Hello from the about page");
})

app.post("/message", (req, res)=>{

    //json file -> header, body
    //header -> metadata -> content type, content length, content encoding, authorization 

    const user_agent = req.headers['user-agent'];
    const content_type = req.headers['content-type'];



    

    const message = req.body.message;
    res.send(`${message}, ${user_agent}, ${content_type}`);
})


app.get("/greet/:name", (req, res)=>{
    const name = req.params.name;
    res.send(`Hello ${name}`);
})



//advanced routing

//route parameters
//dynamic url -> url that can change based on the request
app.get("/user/:id", (req, res)=>{
    //express helps us to extract the parameters from the url
    //req.params -> object that contains the parameters from the url
    const id = req.params.id;
    res.send(`Hello from the user page with id ${id}`);
})

//Query Parameters
//query parameters -> url that can change based on the request
//query parameters -> ?key=value&key=value

//query -> 


//front end -> routing -> render UI 
//backend -> providing specific data to the front end

//query parameters -> ?key=value&key=value
app.get("/search", (req, res)=>{
    
    const video = req.query.video || 'blank';//localhost:3000/search?video=496496396
    const playlist = req.query.playlist || 'blank'; //localhost:3000/search?video=496496396&playlist=123456
    const referrer = req.query.referrer || 'blank'; //localhost:3000/search?video=496496396&playlist=123456&referrer=google
    res.send(`Hello from the search page with video ${video} and playlist ${playlist} and referrer ${referrer}`);
})

//user spelling error -> query parameter -> spelling error handle 







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

