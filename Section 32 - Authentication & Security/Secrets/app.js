require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const md5 = require("md5");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true, useUnifiedTopology: true});

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

const User = new mongoose.model("User", userSchema);

app.get("/", function(req, res){
    res.render("home");
});


app.route("/login")
.get(function(req, res){
    res.render("login");
})
.post(function(req, res){
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({email: username}, function(err, foundUser){
        if (err){
            res.send(err);
        } else {
            if (foundUser) {
                bcrypt.compare(password, foundUser.password, function(err, result){
                    if (result === true) {
                        res.render("secrets");
                    } else {
                        res.send("Wrong password!");
                    }
                });
            } else {
                res.send("User does not exist!");
            }
        }
    });
});


app.route("/register")
.get(function(req, res){
    res.render("register");
})
.post(function(req, res){  
    bcrypt.hash(req.body.password, saltRounds, function(err, hash){
        const newUser = new User ({
            email: req.body.username,
            password: hash
        });
        newUser.save(function(err){
            if (!err){
                res.render("secrets");
            } else {
                res.send(err);
            }
        });
    });

});


port = 3000 || process.env.PORT;
app.listen(port, function(){
    console.log("Server has started on port " + port + ".");
});