const { connect } = require('mongodb');
const mongoose = require('mongoose');

// Specify the DB to connect to
mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser: true, useUnifiedTopology: true});

// Specifies the layout for every fruit document added to database
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  review: String
});

// First parameter is the name of the collection, use the singular version of the name, Mongoose will automatically pluralise it.
// Use this to create instances of the document to insert into collection.
const Fruit = mongoose.model("Fruit", fruitSchema);

const grapefruit = new Fruit({
  name: "grapefruit",
  rating: 2,
  review: "Sour af"
});



const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

Person.updateOne({name: "John"},{favouriteFruit: grapefruit}, function(err){
  if (!err){
    console.log("Updated");
  } else {
    console.log(err);
  }
});