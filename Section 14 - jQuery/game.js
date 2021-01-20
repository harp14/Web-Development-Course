var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;  // Current level

// If game hasn't started and key has been pressed...
$(document).keypress(function(){
    if (!started) {
        // Update page title...
        $("#level-title").text("Level " + level);
        // Move to next level...
        nextSequence();
        started = true;
    }
})

// Detect button being clicked
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    // Add selected colour to userClickedPattern array
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);

    // Check answer in the last array position of user array
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(arrayPosition) {

    // If array record at last array position match then...
    if (userClickedPattern[arrayPosition] === gamePattern[arrayPosition]) {
        
        console.log("success");

        // If array lengths are the same then the user has done their choices...
        // Move to next level after 1 second...
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }

    } else {
        console.log("wrong");

        playSound("wrong");
        
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        
        $("#level-title").text("Game Over, Press Any Key to Restart");
        
        // Reset game attributes
        startOver();
    }
}

function nextSequence() {

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    // Pick random colour and add to gamePattern array...
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}