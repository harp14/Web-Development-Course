require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));

// Set up session (cookie and session settings)
app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
}));

// Use passport to manage sessions
app.use(passport.initialize());
app.use(passport.session());

// Mongoose DB connection
mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

// Connect passport-local-mongoose plugin to schema
userSchema.plugin(passportLocalMongoose);

// Mongoose model
const User = new mongoose.model("User", userSchema);


// Passport-Local Configuration - create strategy using User model
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Home route
app.get("/", function(req, res){
    res.render("home");
});


// Login route
app.get("/login", function(req, res){
    res.render("login");
});

app.post("/login", function(req, res){
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    // Use Passport.js to authenticate locally
    req.login(user, function(err){
        if (err) {
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/secrets");
            });
        }
    });
});


// Secrets route if authenticated
app.get("/secrets", function(req, res){
    if (req.isAuthenticated()){
        res.render("secrets");
    } else {
        res.redirect("/login");
    }
});


// Log out route
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

// Register route
app.get("/register", function(req, res){
    res.render("register");
});

app.post("/register", function(req, res){
    // Use passport-local-mongoose module to handle the creation of new user
    User.register({username: req.body.username}, req.body.password, function(err, user){
        if (err) {
            console.log(err);
            res.redirect("/register");
        } else {
            // Authenticate using Passport.js
            passport.authenticate("local")(req, res, function(){
                res.redirect("/secrets");
            });
        }
    });
});


// Server start up
port = 3000 || process.env.PORT;
app.listen(port, function(){
    console.log("Server has started on port " + port + ".");
});