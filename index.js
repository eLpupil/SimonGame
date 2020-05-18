
var gamePattern = [];
var playerList = [];
var level = 0;
var gameInProgress = false;

$(document).on("keydown", StartGame);


function StartGame() {
    if (!gameInProgress) {
        NextSequence();
        gameInProgress = true;
    }
}


$(".btn").on("click", function() {
    ClickAnimation(event);
    ClickSound(event);

    playerList.push(event.target.id);
    CheckClick(playerList.length-1);
});


function CheckClick(index) {
    if (playerList[index] === gamePattern[index]){
        if (playerList.length === gamePattern.length) {
            setTimeout(function() {
                NextSequence();
            }, 1000);
        }
    } else {
        GameOverSequence();
    }
}

function NextSequence() {
    playerList = [];
    AddColor();
    level++;
    $("#level-title").text("Round " + level);
}

function AddColor() {
    var num = Math.floor(Math.random() * 4);
    var color;

    switch (num) {
        case 0:
            color = "blue";        
            break;
        case 1:
            color = "green";
            break;
        case 2:
            color = "red";
            break;
        case 3:
            color = "yellow";
            break;    
        default:
            break;
    }
    gamePattern.push(color);

    $("#" + color).fadeOut(250).fadeIn(250);

    PlaySound(color);
}

function ClickAnimation(event){
    event.target.classList.add("pressed");
    setTimeout(function() {
        event.target.classList.remove("pressed");
    }, 100);
}

function ClickSound(event){
    var audioFile;
    switch (event.target.id) {
        case "blue":
            audioFile = "blue";
            break;
        case "green":
            audioFile = "green";
            break;
        case "red":
            audioFile = "red";
            break;
        case "yellow":
            audioFile = "yellow";
            break;
        default:
            break;
    }

    PlaySound(audioFile);
}

function PlaySound(fileName) {
    var audio = new Audio("sounds/" + fileName + ".mp3");
    audio.play();
}

function GameOverSequence() {
    gameInProgress = false;
    gamePattern = [];
    playerList = [];
    level = 0;
    $("body").addClass("game-over");
    PlaySound("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
}