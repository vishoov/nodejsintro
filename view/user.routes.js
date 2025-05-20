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


router.get("/agewise_dist/", async (req, res)=>{
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = 4;
        //how many records you want to show in a page

        const skip = (page - 1) * limit;
        //skip is used to skip the records that are already shown in the previous pages
        // skip = (2-1)*4= 4
        //skip = (3-1)*4= 8
        //1st -> 1st 4 products 
        //2nd -> 5th to 8th products

        //server project efficient, scalable -> pagination, restful, try catch, 
        // async await

        // if(page>100){
        //     return res.status(400).send("Page not found");
        // }
        //i want to get the count of users in each age group
        //aggregation pipeline 
        const data = await User.aggregate(
            [   
                //stage 0 : match the data
                //100000 -> 20000 
            //     {
            //     $match:{
            //         status:"active" //this is used to match the data
                    //queries similar to find  
            //     }
            // },
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
                },
              

            ]).skip(skip).limit(limit);
            //looking for active users from my database 
//336
            //status:active 

            //user1-> name, age, email, status -> active or inactive 

            //amazon -> 100,000 users 
            //20,000 active users 
            //age wise distribution of active users


            //aggregation has values:
            //1. $group -> this is used to group the data
            //2. $sort -> this is used to sort the data
            //3. $project -> this is used to project the data
            //4. $match -> this is used to match the data

            // User.find({age:{$gt:20}})
            //$match -> find -> exact same 

            //5. $lookup -> this is used to join the data


            //is used as joins SQL joins 
            //users, products, orders
            //users -> user_id, name, email
            //products -> product_id, name, price
            //orders -> order_id, user_id, product_id, quantity

            //now you have to find the user who has ordered a product
            //input -> product_id 

            //User.aggregate([
            //     {
            //         $lookup:{
            //             from:"products", //this is the name of the collection that we are going to join
            //             localField:"_id", //this is the field from the users collection
            //             foreignField:"user_id", //this is the field from the products collection
            //             as:"user_products" //this is the name of the field that will be created in the output    
        // ])

            //6. $unwind -> this is used to unwind the data
            //this is used to deconstruct the array field from the input documents to output a document for each element
            //products -> [] -> product1, product2, product3
            //this is used to deconstruct the array field from the input documents to output a document for each element

//Pagination 

            //7. $limit -> this is used to limit the data !imp
                
            //8. $skip -> this is used to skip the data !imp 
     
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


//interview questions


// What is the purpose of the $match stage in a MongoDB aggregation pipeline? Give an example.

//it is used to filter the documents in the pipeline based on a specified condition.
//so this works similar to the find method in MongoDB
// example of $match: 

// db.orders.aggregate([

//   { $match: { status: "completed" } }

// ])


// How does the $project stage work, and how would you use it to exclude a field from the output?

// The $project stage reshapes documents by including or excluding specific fields. To exclude a field, set it to 0. example:

// db.users.aggregate([

//   { $project: { password: 0 } }

// ])



// Explain the difference between $limit and $skip. When would you use each?
// $limit: Restricts the number of documents passed to the next stage.
//defines how many documents to return in the output on a specific page
// $skip: Skips a specified number of documents
//used for pagination
//this is also a method to optimize the performance of the query
// by reducing the number of documents processed in the pipeline.
// User.aggregate().skip(10).limit(5)
//User.aggregate([
//     { $skip: 10 },
//     { $limit: 5 }
// ])


// How do you sort documents in an aggregation pipeline? Provide a sample Node.js aggregation query that sorts documents by a field named score in descending order.
// const result = await db.collection('students').aggregate([

//   { $sort: { score: -1 } }

// ]).toArray();



// What does the $group stage do in an aggregation pipeline? Give a simple example.

// The $group stage groups documents by a specified key and allows you to perform aggregations like $sum, $avg, $max, etc. example:

// db.sales.aggregate([

//   { $group: { _id: "$product", total: { $sum: "$amount" } } }

// ])


// Q. If you want to calculate the average price of products in each category, which aggregation stages would you use and in what order?

//multiple categories -> avg price of products in each category
//group 
//project 
//sort 
// db.products.aggregate([
//   {
//     $group: {
//       _id: "$category",
//       averagePrice: { $avg: "$price" }
//     }
//   },
//   {
//     $project: {
//       _id: 0,
//       category: "$_id",
//       averagePrice: 1
//     }
//   },
//   {
//     $sort: { averagePrice: -1 }
//   }
// ])


