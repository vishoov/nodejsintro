//router -> this is a feature of express that allows us to create modular route handlers
//modular code -> code that is organized into smaller, reusable chunks 

const router = require("express").Router();

const { signup, login } = require("../controller/user.controller");
//app.method('route', (req, res) => {})
//router.method('route', (req, res) => {})

router.post("/signup", signup)

router.post("/login", login)

router.get("/profile", (req, res)=>{
    res.send("User Profile");
})
// profile 

router.get("/home", (req, res)=>{
    try{
    res.send("Home");
    }
    catch(err){
        res.send(err.message);
    }
});
// home

router.put("/updatepassword", (req, res)=>{
    res.send("Update Password");
})
// updatepassword

//50 routes 

module.exports = router;