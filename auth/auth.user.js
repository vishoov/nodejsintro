const jwt = require('jsonwebtoken');


const createToken = (user)=>{

    try{
        const token = jwt.sign(
            {
            email: user.email,
            },
            process.env.JWT_SECRET,
            {
            expiresIn: "1h",
            algorithm: "HS256"
            }
        );
        //this jwt.sign() method is used to create a token
        //it takes 3 arguments
        //1st argument is the payload which is the data that we want to send in the token
        //2nd argument is the secret key which is used to sign the token
        //3rd argument is the options which is an object that contains the options for the token
        return token;
    }
    catch(err){
        console.log(err);

    }
}

const auth = async (req, res, next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        //this will split the token from the authorization header

        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        if(!decoded){
            return res.status(401).send("Unauthorized");
        }

        next();
        //this will call the next middleware in the stack
        
    }
    catch(err){
        console.log(err);
        res.status(401).send("Unauthorized");
    }
}

module.exports = {
    createToken,
    auth
}