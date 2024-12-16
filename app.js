const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/user");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// creating middleware
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

// creating routes

app.get("/", (req, res)=>{
      res.render("index");
});


app.post("/create", (req, res)=>{
      let {username,email,password,age} = req.body;

      bcrypt.genSalt(10, (err,salt)=>{
      bcrypt.hash(password, salt, async(err,hash)=>{
      let createdUser = await userModel.create({   //creating account
         username,
         email,
         password:hash,
         age
     })
// login account (sign in) 
   let token = jwt.sign({email}, "ccchhhh");
   res.cookie("token", token);
         res.send(createdUser);
            })
      });
});

// login
app.get("/login", (req,res)=>{
      res.render("login");
});

app.post("/login", async(req,res)=>{
   let userlogin =  await userModel.findOne({email: req.body.email},)
   if(!userlogin) return res.send("user not found");

   bcrypt.compare(req.body.password, userlogin.password, function(err, result) {

      if(result) {
            let token = jwt.sign({email:userlogin.email}, "ccchhhh");
            res.cookie("token", token);
            res.send("yes you can login");
      }
      else res.send("wrong password");
});
  

});
// logout route
app.get("/logout", (req, res)=>{
      res.cookie("token","");
      res.redirect("/");
});



app.listen(3000);