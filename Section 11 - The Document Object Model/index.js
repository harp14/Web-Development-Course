// Random numbers
var randomNumber1 = Math.floor(Math.random() * 6) + 1;
var randomNumber2 = Math.floor(Math.random() * 6) + 1;

// Set image for dice 1 to roll result
document.querySelector(".img1").setAttribute("src","images/dice" + randomNumber1 + ".png");

// Set image for dice 2 to roll result
document.querySelector(".img2").setAttribute("src","images/dice" + randomNumber2 + ".png");

if (randomNumber1 > randomNumber2) {
    document.querySelector("h1").innerHTML = "🚩 Player 1 Won!";
} else if (randomNumber2 > randomNumber1) {
    document.querySelector("h1").innerHTML = "Player 2 Won! 🚩";
} else {
    document.querySelector("h1").innerHTML = "Draw!";
}