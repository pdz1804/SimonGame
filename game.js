var highest = 1;
var gamePattern = [];
const buttonColors = ["red", "blue", "green", "yellow"];

function nextSequence() {
    return Math.floor(Math.random() * 4);
}

// Pre-load audio files
var greenSound = new Audio("./sounds/green.mp3");
var blueSound = new Audio("./sounds/blue.mp3");
var redSound = new Audio("./sounds/red.mp3");
var yellowSound = new Audio("./sounds/yellow.mp3");
var wrongSound = new Audio("./sounds/wrong.mp3");

function makeSound(key) {
    switch(key) {
        case "green":
            greenSound.play();
            break;
        case "blue":
            blueSound.play();
            break;
        case "red":
            redSound.play();
            break;
        case "yellow":
            yellowSound.play();
            break;
        default:
            wrongSound.play();
            break;
    }
}

function startOver() {
    isTurnPlaying = true;
    console.log("wrong cmnr");
    makeSound("wrong");
    gamePattern = [];
    highest = Math.max(highest, level);
    level = 1;
    $("h1").text("Game over. Highest score: " + highest);
    setTimeout(() =>
    {
        $("h1").text("Press anything to Restart.");
        started = false;
    }, 2000);
    // $("h1").text("Game over.\n Press any key or touch the screen to restart.");
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over"); 
    }, 200);
}

function startGame() {
    $("h1").text("Level " + level);
    var randomChosenColor = buttonColors[nextSequence()];
    gamePattern.push(randomChosenColor);
    // $("#" + randomChosenColor).fadeOut().fadeIn();
    $("#" + randomChosenColor).addClass("pressed");
    setTimeout(function() {
        $("#" + randomChosenColor).removeClass("pressed");
    }, 200);
    makeSound(randomChosenColor); 
    console.log("game: ", gamePattern);
    started = true;
    isTurnPlaying = false;
}

var level = 1;
var started = false;
var isTurnPlaying = true; // set the flag to make the user cannot press any buttons while it is creating the new game play
$(document).on("keypress", function() {
    if (!started) {
        startGame();
        // $("h1").text("Level " + level);
        // var randomChosenColor = buttonColors[nextSequence()];
        // gamePattern.push(randomChosenColor);
        // // $("#" + randomChosenColor).fadeOut().fadeIn();
        // $("#" + randomChosenColor).addClass("pressed");
        // setTimeout(function() {
        //     $("#" + randomChosenColor).removeClass("pressed");
        // }, 200);
        // makeSound(randomChosenColor); 
        // console.log("game: ", gamePattern);
        // started = true;
    }
});

$(document).on("mousedown", function(event) {
    if (!started && !$(event.target).hasClass("btn")) {
        startGame();
    }
});

$(".btn").click(function(e) {
    if (!isTurnPlaying) {
        var colorChosen = e.target.id;
        // $("#" + colorChosen).fadeOut().fadeIn();
        $("#" + colorChosen).addClass("pressed");
        setTimeout(function() {
            $("#" + colorChosen).removeClass("pressed");
        }, 200);
        
        if (colorChosen === gamePattern[0]) {
            gamePattern.shift();
            makeSound(colorChosen);
        }
        else {
            startOver();
            return;
        }

        if (gamePattern.length === 0) {
            // This just look like a for loop
            function playPattern(index) {
                if (index < level) {
                    var randomChosenColor = buttonColors[nextSequence()];
                    gamePattern.push(randomChosenColor);
                    // $("#" + randomChosenColor).fadeOut().fadeIn();
                    $("#" + randomChosenColor).addClass("pressed");
                    setTimeout(function() {
                        $("#" + randomChosenColor).removeClass("pressed");
                    }, 200);
                    makeSound(randomChosenColor); 
        
                    setTimeout(function() {
                        playPattern(index + 1);
                    }, 1000); // Adjust the delay time between patterns as needed (1000 milliseconds here)
                }
                else {
                    console.log("game: ", gamePattern);
                    isTurnPlaying = false;
                }
            }
            setTimeout(function() {
                isTurnPlaying = true;
                level++;
                $("h1").text("Level " + level);
                playPattern(0)
            }, 1500);
            
        }
    }
});