var level = 1;
var start = false;
var counter = 0;
const buttonColor = ["red", "blue", "green", "yellow"];
var sequence = [];

$(document).keydown(function (e) { 
    if (!start){
        $("h1").text("level " + level);
        sequence = [];
        start = true;
        nextSequence()   
    }
});

var userPick;
$(".btn").click(function (e) { 
    if(start){
        userPick = e.target.id;
        if (userPick !== sequence[counter]){
            gameOver();  
            return;      
            
        }
        pressed(userPick);
        counter++;
        if (counter === sequence.length){
            level++;
            $("h1").text("level " + level);
            setTimeout(() => {
                nextSequence();
            }, 1000);      
        }
    }
});
        
    

function nextSequence(){
    
    var randomnumber = Math.floor(Math.random() * 4);
    var pickedColor = buttonColor[randomnumber];
    sequence.push(pickedColor);
    $("#"+pickedColor).fadeIn(100).fadeOut(100).fadeIn(100);
    counter = 0;
    pressed(pickedColor);
}

function pressed(btn){
    var audio = new Audio("sounds/"+btn+".mp3");
    $("#"+ btn).addClass("pressed");
    audio.play();
    setTimeout(() => {
    $("#"+ btn).removeClass("pressed");  
    }, 200);
}

function gameOver() {
    level = 1;
    start = false;
    var audio = new Audio('sounds/wrong.mp3');
    $("h1").text("GAME OVER \n Press A Key to Start");
    sequence = [];
    $("body").addClass("game-over");
    audio.play();
    setTimeout(() => {
    $("body").removeClass("game-over");  
    }, 1500);
  }