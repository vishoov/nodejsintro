//router -> this is a feature of express that allows us to create modular route handlers
//modular code -> code that is organized into smaller, reusable chunks 
const User = require("../model/users.model");
const router = require("express").Router();

const { signup, login } = require("../controller/user.controller");
//app.method('route', (req, res) => {})
//router.method('route', (req, res) => {})

router.post("/signup", signup)

router.post("/login", login)

router.get("/profile/:id", async (req, res)=>{
    // facebook
    // on what basis we are going to show the profile
try{
    // user id
    // const user = await User.findById(req.params.id);
    const user = await User.find({_id:req.params.id});



    // findById -> this is a method of mongoose that is used to find a document by its id
    //id is always going to be unique 
    res.json({user:user});
}
catch(err){
    res.send(err.message);
}
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

router.put("/updatepassword", async (req, res)=>{
  //verify 
  //email, password 
  //updated password 

  try{
    const { email, password, newpassword } = req.body;
    const user = await User.findOne({email:email});
    //error handling for user not found
    if(!user){
        return res.status(400).send("User not found");
    }
    //password verification
    if(user.password !== password){
        return res.status(400).send("Invalid password");
    }
    //user-> this is the user object that is returned by the findOne method that is saved in the database
    //newpassword -> this is the new password that we are going to update in the database
    //update password
    user.password= newpassword;
    await user.save();
    res.json({message:"Password updated successfully", user:user});

  }
  catch(err){
    res.send(err.message);
  }
})
// updatepassword
router.get("/allusers", async (req, res)=>{
    const users = await User.find();   
    res.json({users:users}) 
})


router.get("/user/:name", async (req, res)=>{
    try{
        const queryname = req.params.name;
        const user = await User.find({name:queryname});

        res.json({user:user});

        //always remember to insert an object in the find method
    }
    catch(err){
        res.send(err.message);
    }
})
//50 routes 

router.get("/age/:age", async (req, res) => {

    try {

        const age = parseInt(req.params.age);
        const users = await User.find({ age: { $lt:age  } });
        res.json(users);

    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }

});


router.get("/age_range/:min/:max", async (req, res) => {
    try {
        const min = Number(req.params.min);
        const max = Number(req.params.max);
        const users = await User.find({
           $and : [
                { age: { $gte: min } },
                { age: { $lte: max } },
                { age : { $ne: 0 } }

           ]
        });
        res.json({ users: users });
    } catch (err) {
        res.send(err.message);
    }
});

router.get("/age_exists", async (req, res)=>{
    try{
        const user = await User.find(
            {
                age: { $exists:true }
            }
        )
        res.json({user:user});
    }
    catch(err){
        res.send(err.message);
    }
});


router.get("/agewise_dist", async (req, res)=>{
    try{
        //i want to get the count of users in each age group
        //aggregation pipeline 
        const data = await User.aggregate(
            [
                {
                    //stage 1 : group the users by age
                    //age wise grouping 
                    $group:{
                        _id:"$age",//grouping by age
                        count :{
                            $sum : 1 //counting the number of users in each age group
                            
                        }
                    }
                },
                {
                    $sort:{
                        _id:-1 //sorting the data in descending order
                        //key-> on which we are going to sort the data
                        // order -> 1 for ascending and -1 for descending
                    }
                },
                {
                    //stage 3: project the data
                    //projecting the data to get the desired output
                    //key value pair 
                    $project:{
                        _id:0,//this is used to exclude the _id field from the output
                        age:"$_id",
                        count : "$count"
                    }
                }

            ]

            //aggregation has values:
            //1. $group -> this is used to group the data
            //2. $sort -> this is used to sort the data
            //3. $project -> this is used to project the data
            //4. $match -> this is used to match the data
            //5. $lookup -> this is used to join the data
            //6. $unwind -> this is used to unwind the data
            //7. $limit -> this is used to limit the data !imp
            //8. $skip -> this is used to skip the data !imp 
        );
        //this aggregate method is used to perform aggregation operations on the data
        //aggregation operations are used to perform calculations on the data
        //like sum, avg, min, max, count, etc
        //that helps us to get the data in a better way
        //and in the format THAT WE WANT 

        res.json({data:data});

    }
    catch(err){
        res.send(err.message);
    }
})

module.exports = router;