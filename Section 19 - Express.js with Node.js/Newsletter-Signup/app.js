const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const mailchimp = require('@mailchimp/mailchimp_marketing');
require('dotenv').config();

const app = express();

// Mailchimp API config settings
mailchimp.setConfig({
  apiKey: process.env.API_KEY,
  server: 'us7'
});

// Create static folder to allow access to static elements
app.use(express.static("public"));
// Setting body-parser mode
app.use(bodyParser.urlencoded({extended: true}));

// Load signup.html when accessing server:3000
app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

// Send data to Mailchimp API when form posted
app.post("/", function(req, res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    const listid = process.env.LIST_ID;

    // Formatting data to be sent to Mailchimp API below
    const subscriberData = {
        "email_address": email,
        "status": "subscribed",
        "merge_fields": {
            "FNAME": firstName,
            "LNAME": lastName
        }
    };

    // Async function that sends data to Mailchimp API
    async function sendDataToMailchimp() {
        try {
            const response = await mailchimp.lists.addListMember(listid, subscriberData);
            res.sendFile(__dirname + "/success.html");
        } catch (error) {
            res.sendFile(__dirname + "/failure.html");
        }
    }
    
    // Call Mailchimp API
    sendDataToMailchimp();

});

// On failure page if user clicks try again - send back to signup page
app.post("/failure", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

// Start server and listen on port 3000
app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000.");
});