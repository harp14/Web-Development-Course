const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const date = require(__dirname + "/date.js");
const app = express();

const items = [];
const workItems = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
    const day = date.getDate();
    res.render("list", {listTitle: day, itemsList: items});
});


app.post("/", (req, res) => {
    const item = req.body.newItem;

    // When submit button pressed - checks value of listTitle
    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});


// Path route for /work

app.get("/work", (req,res) => {
    res.render("list", {listTitle: "Work", itemsList: workItems});
});

app.post("/work", (req, res) => {
    const item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});

app.listen(3000, (req, res) => {
    console.log("Server is started on port 3000.");
});