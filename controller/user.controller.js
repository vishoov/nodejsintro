const User  = require("../model/users.model");
const { createToken} = require("../auth/auth.user");
const jwt = require('jsonwebtoken');
const signup =  async (req, res)=> {

    try{
        const user = req.body;
    //input sanitization
    //hackers -> query injection attack
    //mpngoose mongodb -> 3rd party library that is used to connect to the database
    const newUser = await User.create(user);
    //insertOne -> user.create(user) -> create a new user in the database

    const token =createToken(newUser);
    //input sanitization -> process of removing unwanted characters from the input
    //input validation -> process of checking if the input is valid or not

 
    // email = email.trim();
    // if(!email.includes("@")){
    //     return res.status(400).send("Invalid email");
    // }

    // res.send(`Hello ${name}, your email is ${email} and your password is ${password}`);
    res.json({message:"User created successfully", user:newUser, token:token});

    }
    catch(err){
        console.log(err);
        res.send(err.message);
    }

}

const login = async (req, res)=>{
    try{
    const { email, password} = req.body;

    const user = await User.findOne({email:email});
    
    if(!user){
        return res.status(400).send("User not found");
    }

    // if(user.password !== password){
    //     return res.status(400).send("Invalid password");
    // }

    const isMatch = user.comparePassword(password);

    if(!isMatch){
        return res.status(400).send("Invalid password");
    }

    const token = createToken(user);

    res.json({message:"Login successful", user:user, token:token});

    
}
catch(err){
    res.send(err.message);
}
}


module.exports = {
    signup,
    login
}