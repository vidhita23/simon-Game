var buttonColor=["red" , "green" , "yellow" , "blue"];
var gamePattern=[];
var userClickedPattern= [];

var started=false;
var level= 0;




$(".btn").on("click", function()
{
  var userChoosenColor = $(this).attr("id");

  userClickedPattern.push(userChoosenColor);
 
    //console.log(userClickedPattern);
    
    playSound(userChoosenColor);
    animatePress(userChoosenColor);

    checkAnswer(userClickedPattern.length-1);
});

$(document).on("keypress" , function() {
    if(!started)
    {
        $("h1").text("Level " + level);
        nextSequence();
        started=true;
    }
    
    
});

function nextSequence()
{
    userClickedPattern=[];

    level++;

    $("h1").text("Level " + level);

    var randonNumber = Math.floor(Math.random() *4);
    var randomChosenColor = buttonColor[randonNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
    
}

function playSound(name) 
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
    
}
function animatePress(currentColor)
{
     $("#" + currentColor).addClass("pressed");
   
    setTimeout(function()
    {
        $("#" + currentColor).removeClass("pressed");  
    },100);
    
}
function checkAnswer(currentLevel) 
{
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
    {       if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function()
            {nextSequence(); 
            } , 1000);
        }
    }
    else{
        // console.log("wrong");

        playSound("wrong");
        
        $("body").addClass("game-over");
        $("h1").text("Game Over,Press any key to restart");

        setTimeout(function()
        {   $("body").removeClass("game-over");
        } ,200);

        startOver();
    }
}

function startOver()
{
    level=0;
    started=false;
    gamePattern=[];
}