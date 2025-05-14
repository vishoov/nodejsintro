

const signup =  (req, res)=> {

    try{
    const { name, email, password } = req.body;
    //input sanitization
    //hackers -> query injection attack 

    //input sanitization -> process of removing unwanted characters from the input
    //input validation -> process of checking if the input is valid or not

    const user = {
        name: name.trim(),
        email: email.trim(),
        password: password.trim()
    }
    // email = email.trim();
    // if(!email.includes("@")){
    //     return res.status(400).send("Invalid email");
    // }

    // res.send(`Hello ${name}, your email is ${email} and your password is ${password}`);
    res.json({user})

    }
    catch(err){
        console.log(err);
        res.send(err.message);
    }

}

const login = (req, res)=>{
    try{
    const { email, password} = req.body;

    const user = { 
        email: email.trim(),
        password: password.trim()
    }
    res.send(user);
}
catch(err){
    res.send(err.message);
}
}


module.exports = {
    signup,
    login
}