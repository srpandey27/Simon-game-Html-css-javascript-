var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var clear=false;
var numberOfClicks=0;
$(".btn").click(function(){
       var userChosenColor=$(this).attr("id");
       userClickedPattern.push(userChosenColor);
       playSound(userChosenColor);
       animatePress(userChosenColor);
       checkAnswer(userClickedPattern.length-1);
 });


document.addEventListener("keydown",function(){
  if (level===0){
    gamePattern=[];
    userClickedPattern=[];
    nextSequence();
  }
});

function nextSequence(){
  level++;
  $("h1").text("Level " +level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColor=buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  setTimeout(function(){
  $('#' + randomChosenColor).css({opacity: 0});
  $('#' + randomChosenColor).animate({opacity: 1}, 300 );
  playSound(randomChosenColor);
  }, 200);
}


function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatePress(userChosenColor){
  $("#"+userChosenColor).addClass("pressed");
  setTimeout(function(){
    $("#"+userChosenColor).removeClass("pressed");
  },100);
}

function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    if (currentLevel===level-1){
      setTimeout(nextSequence, 600);
      userClickedPattern=[];
    }
  }
  else{
    var audio=new Audio("sounds/wrong.mp3");
    audio.play();
    $("h1").text("Game Over !");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 300);
    level=0;
    $("h1").text("Game over! Press a key to restart.");
  }
  
}
