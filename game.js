
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var level =0 
var started = false

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

$(document).keypress(function(event)
{
    if(event)
    { 
        
        $('h1').text("Level "+level)
        nextSequence()
    
}})

function nextSequence() {

  level = level +1 
  $("#level-title").text("Level " + level);
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


function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel)
{
    if (gamePattern[currentLevel]==userClickedPattern[currentLevel])
    {
        console.log("success")
    }
    if(userClickedPattern.length == gamePattern.length)
    {
        setTimeout(()=>nextSequence(),1000)
    }
    else{
        console.log("Wrong !")
        $("body").addClass("game-over")
        playSound('wrong')
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200)
        $('h1').text("Game Over, Press Any Key to Restart")
        startOver()
    }

    function startOver()
    {
        level =0 
        gamePattern = []
        started = false

    }
    
}