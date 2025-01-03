var gamePattern=[];
var useClickedPattern=[]; 

var randomColours=["red","blue","green","yellow"];

var started=false;
var level=0;


$(document).keypress(function(){
    if(!started){
        $("h1").text("Level " + level);
        nextSequence();
        started=true;
    }
});


$(".btn").click(function(event){
    var useChoosenColour=$(this).attr("id");
    useClickedPattern.push(useChoosenColour); 

    playSound(useChoosenColour);
    animatePress(useChoosenColour);

    checkAnswer(useClickedPattern.length-1);
});


function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===useClickedPattern[currentLevel]){
        console.log("right");
        if (useClickedPattern.length === gamePattern.length){
            if(level==5){
                playSound("win");
                $("body").addClass("won");
                setTimeout(function(){
                    $("body").removeClass("won");
                }, 200);
                 $("h1").text("YOU WON, Press any key to Restart.");
                startOver();
            }
            else{
               setTimeout(function () {
               nextSequence();
               }, 1000);
            }
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("GAME OVER, Press any key to Restart.");
        startOver();
    }
}

function nextSequence(){
    useClickedPattern=[];
    level++;
    $("h1").text("Level " + level);

    var randomNumber= Math.floor(Math.random()*4);
    var randomChoosenColour=randomColours[randomNumber];
    gamePattern.push(randomChoosenColour);

    $("#" + randomChoosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColour);
}


function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}


function playSound(name){
    var audio=new Audio("./sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    },100);
}