const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const mongoose = require("mongoose");
const _ = require("lodash");
const dotenv = require("dotenv");
require("dotenv").config();

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Connection details in .env file in directory
const host = process.env.DB_HOST;
const username = process.env.DB_USER;
const password = process.env.DB_PASS;

// Mongoose connection
mongoose.connect("mongodb+srv://" + username + ":" + password + "@" + host + "/blogSiteDB", {useNewUrlParser: true, useUnifiedTopology: true});

// MongoDB schema
const postSchema = new mongoose.Schema({
  title: String,
  content: String
});

// MongoDB model
const Post = new mongoose.model("Post", postSchema);


// Load homepage with all posts
app.get("/", (req, res) => {
  Post.find({}, function(err, posts){
    if (!err) {
      res.render("home", {
        startingContent: homeStartingContent,
        posts: posts
      });
    }
  });
});


// Compose page render
app.get("/compose", (req, res) => {
  res.render("compose");
});

// Post compose request
app.post("/compose", (req, res) => {
  const title = req.body.postTitle;
  const content = req.body.postBody;
  const post = new Post ({
    title: title,
    content: content
  });

  post.save(function(err){
    if (!err) {
      res.redirect("/");
    }
  });
});


// Go to postId request
app.get("/posts/:postId", (req, res) => {
  
  const requestedPostId = req.params.postId;
  
  Post.findOne({_id: requestedPostId}, function(err, post){
    if (!err){
      res.render("post", {
        title: post.title, 
        content: post.content});
      } else {
        console.log(err);
      }
    });
  });

app.get("/contact", (req, res) => {
  res.render("contact", {contactContent: contactContent});
});

app.get("/about", (req, res) => {
  res.render("about", {aboutContent: aboutContent});
});


  // Start server
  let port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log("Server started on port " + port + ".");
});