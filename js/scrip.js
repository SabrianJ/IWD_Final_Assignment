// JavaScript Document
var timer; 
var timeLeft = 60; 


function gameOver() {
  
  cancelInterval(timer);
  
  
  $('#playAgainButton').show();
}

function updateTimer() {
  timeLeft = timeLeft - 1;
  if(timeLeft >= 0)
    $('#timer').html(timeLeft);
  else {
    gameOver();
  }
}


function start() {
  
  timer = setInterval(updateTimer, 1000);
  
  
  updateTimer();
  
  
   $('#playAgainButton').hide();
}