const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/user");

const bcrypt = require("bcrypt");


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

app.post("/create",async (req, res)=>{
      let {username,email,password,age} = req.body;

      bcrypt.genSalt(10, (err,salt))

    let createdUser = await userModel.create({
      username,
      email,
      password,
      age
     });
     res.send(createdUser);
});

app.listen(3000);