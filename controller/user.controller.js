const User  = require("../model/users.model");


const signup =  async (req, res)=> {

    try{
        const user = req.body;
    //input sanitization
    //hackers -> query injection attack
    //mpngoose mongodb -> 3rd party library that is used to connect to the database
    const newUser = await User.create(user);
    //insertOne -> user.create(user) -> create a new user in the database

    //input sanitization -> process of removing unwanted characters from the input
    //input validation -> process of checking if the input is valid or not

 
    // email = email.trim();
    // if(!email.includes("@")){
    //     return res.status(400).send("Invalid email");
    // }

    // res.send(`Hello ${name}, your email is ${email} and your password is ${password}`);
    res.json({newUser:newUser})

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

    if(user.password !== password){
        return res.status(400).send("Invalid password");
    }

    res.json({message:"Login successful", user:user});

    
}
catch(err){
    res.send(err.message);
}
}


module.exports = {
    signup,
    login
}