const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    //Schema is the blueprint of the document
    //we will write all the fields that we want to store in the database
    //and their types, their ranges, their default values, etc
    name:{
        type:String, //type of the field
        required:[true, "Name is  required"],//this field is required meaning without this field the document will not be saved
        trim:true,//remove all the spaces from the start and end of the string
        lowercase:true,//convert the string to lowercase
        minLength:[3, "Please choose a longer name"],//minimum length of the string
        maxLength:[50, "Please write a shorter name"],//maximum length of the string
    },
    // dob:{
    //     type:Date,//type of the field
    //     required:[true, "Please add your DOB"],//this field is required meaning without this field the document will not be saved
        
    // },
    gender:{
        type:String,//type of the field
        required:true,//this field is required meaning without this field the document will not be saved

        enum:["male", "female", "others"],//enumeration is used to define the possible values of the field
        default:"others",//default value of the field
        trim:true,//remove all the spaces from the start and end of the string
    },
    email:{
        type:String,
        required:[true, "Please add your email"],
        unique:true,
        
        //this field should be unique meaning no two documents can have the same value for this field
        //email validation @ .com 
        validate:{
            validator:function(value){
                const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                return regex.test(value);
            },
            message:"Please enter a valid email"
        }
    },
    age:{
        type:Number,
        required:[true, "Please add your age"],
        min:[1, "Age should be at least 1"],
        max:[100, "Age should be at most 100"],
    },
    password:{
        type:String,
        required:[true, "Please add your password"],
        minLength:[6, "Password should be at least 6 characters long"],
        maxLength:[20, "Password should be at most 20 characters long"],
        
    }
},
{
    timestamps:true,//this will add createdAt and updatedAt fields to the document

}); 



userSchema.pre("save", function(next){
    const user = this;
    //signup -> schema -> current user for who the document is being created is accessed through 'this'
    const salt =  bcrypt.genSaltSync(10);
    //10 is the number of rounds of hashing
    const hashedPassword = bcrypt.hashSync(user.password, salt);
    
    user.password = hashedPassword;
    //this will hash the password before saving it to the database

    next();
})
//event listener -> this function will run before the document is saved to the database


//we need a method to compare the password entered by the user with the hashed password in the database

userSchema.methods.comparePassword = function(password){
    const user = this;
    //this extracts the current user from the schema

    const isMatch = bcrypt.compareSync(password, user.password);
    //this will compare the password entered by the user with the hashed password in the database
    //if the password matches it will return true else false
    return isMatch;
}

const User = mongoose.model("User", userSchema);

module.exports = User;

//userSchema 
//name, DOB, Gender, email, password

//vishoo@gmail.com
//v@yahoo.in
//v@wikipedia.org
//@yahoo.com
//vishoo@.com
//vishoo@com

//string@string.string 