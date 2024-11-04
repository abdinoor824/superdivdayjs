require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const  mongoose = require ("mongoose");
const encrypt = require("mongoose-encryption");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.urlencoded({ extended: true }));


mongoose.connect("mongodb://localhost:27017/User2DB");

const  userSchema  = new mongoose.Schema( {
   email: String,
   password: String
});
const User =  new mongoose.model("User",userSchema);



userSchema.plugin(encrypt, { secret:process.env.SECRET, encryptedFields: ['password'] });




app.get("/",function(req,res){
    res.render("home");
});


app.get("/register",function(req,res){
    res.render("register");
});
app.get("/login",function(req,res){
 res.render("login");
});
app.post("/register",function(req, res){
     const newuser =  new User ({
       email: req.body.username,
       password:req.body.password
    
     });
   

     newuser.save(res.render("secrets"));
    });
    app.post("/login",function(req,res){
        const username = req.body.username;
        const password = req.body.password;

        
    async function findUsers() {
        try {
          const users = await User.findOne({email:username},);
       
              if(users){
               if(users.password===password){
          res.render("secrets");
               }else if (users.password!==password){
                 res.send("<h1>password does not match</h1> ");
               }
               
              }else if(!users){
                console.log("no user found");
                res.send("no user found");
              }
            
          
        } catch (error) {
          console.log("An error occurred:", error);
        }
      }
      
      findUsers();
            

    
 });

     
// app.post("/login",async function(req,res){
//     const username = req.body.username;
//     const password = req.body.password;
// Try{
//   Const user = await User.find({email:username})
//     If(!user) {
//         return conse. Log("user not found") 
//     } 
// If else(user.Password! == password){

//     console. Log("wrong password") 

// }else{
//     console. Log("logged in successfully")
// }
 
    
//   } catch((error)=>{
//     console.log("an error ocured",error)
//        }) })
    
    


app.listen(8000,function(){
    console.log("server running on port 3000...")
});