const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");
require('dotenv').config();

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// MongoDB connection - details .env file in working directory
host = process.env.DB_HOST;
username = process.env.DB_USER;
password = process.env.DB_PASS;
mongoose.connect("mongodb+srv://" + username + ":" + password + "@" + host + "/todolistDB",{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

// Item schema
const itemsSchema = new mongoose.Schema({
    name: String
});

// Item nodel
const Item = new mongoose.model("Item", itemsSchema);

// Default items to add to list
const item1 = new Item ({
    name: "Welcome to your todolist!"
});

const item2 = new Item ({
    name: "Hit the + button to add a new item."
});

const item3 = new Item ({
    name: "<-- Hit this to delete an item"
});

const defaultItems = [item1, item2, item3];

// Custom list schema
const listSchema = {
    name: String,
    items: [itemsSchema]
};

// Custom list model
const List = mongoose.model("List", listSchema);


// Insert default list into Items collection
function insertDefaultItems(){
    Item.insertMany(defaultItems, function(err){
        if (!err) {
            console.log("Successfully saved default items to DB.");
        } else {
            console.log(err);
        }
    });
}


// Default page load
app.get("/", (req, res) => {
    Item.find({}, function(err, foundItems){
        // Insert default items if no items in collection
        if (foundItems.length === 0) {
            insertDefaultItems();
        }
        res.render("list", {listTitle: "Today", itemsList: foundItems});
    });
});

// Handle new item post request
app.post("/", (req, res) => {
    const itemName = req.body.newItem;
    const listName = req.body.list;

    const item = new Item ({
        name: itemName
    });
    // If standard list save to Item collection
    if (listName === "Today"){
        item.save();
        res.redirect("/");
    // Else save to custom list's item document
    } else {
        List.findOne({name: listName}, function(err, foundList){
            foundList.items.push(item);
            foundList.save();
            res.redirect("/" + listName);
        });
    }

});


// Handle item deletion
app.post("/delete", (req, res) => {
    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName;
    // If deleting from standard list
    if (listName === "Today") {
        Item.findByIdAndRemove(checkedItemId, function(err){
            if (!err) {
                res.redirect("/");
            }
        });
    // If deleting from custom list
    } else {
        List.findOneAndUpdate({name: listName}, {$pull:{items:{_id: checkedItemId}}}, function(err){
            if (!err) {
                res.redirect("/" + listName);
            }
        });
    }
});


// Handle custom list names request
app.get("/:customListName", (req, res) => {
    const customListName = _.capitalize(req.params.customListName);
    
    // See if list exists
    List.findOne({name: customListName}, function(err, foundList){
        if (!err){
            // If it doesn't exist
            if (!foundList) {
                // Create the new list
                const list = new List ({
                    name: customListName,
                    items: defaultItems
                });
                list.save();
                res.redirect("/" + customListName);
            }
            // If it exists, render the list
            else {
                res.render("list", {listTitle: customListName, itemsList: foundList.items});
            }
        }
    });
});

let port = process.env.PORT;
if (port === null || port === "") {
    port = 3000;
}

app.listen(port, function(){
    console.log("Server has started successfully.");
});