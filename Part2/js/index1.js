"use strict";

var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
var playerFace = document.getElementById("playerFace");
var playerBack = document.getElementById("playerBack");
var playerLeft = document.getElementById("playerLeft");
var playerRight = document.getElementById("playerRight");
var playerX = 300;
var playerY = 200;
var playerSpeed = 7;
var currentKey ="W";
var circles = [];
var circlesCount = 0;
var numberOfRefresh = 0;
var score = 0;
var touch = false;
var hidden = false;
var isPlaying = false;
var timerRestart = true;
var countdown = 60;
var seconds;
var modal = document.getElementById("myModal");
var btn = document.getElementById("settings12");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


var x = setInterval(function(){

  countdown = document.getElementById("time").value * 60;

  if(isPlaying){
    if(timerRestart){
      seconds = countdown;
      timerRestart = false;
    }else{

      seconds--;

      if (seconds < 0) {
        seconds = countdown;
        timerRestart = true;
        isPlaying = false;
      }
    }
  }


}, 1000);

window.onload = setInterval(randomize,1);
window.onload = init;
window.onkeydown = onKeyDown;

function clear(){
  ctx.clearRect(0,0, canvas.width, canvas.height);
}

function startGame() {
  score = 0;
    hidden = !hidden;
    isPlaying = true;

document.getElementById('startgame').style.visibility = 'hidden';
document.getElementById('background').style.visibility = 'hidden';
document.getElementById('settings12').style.visibility = 'hidden';
document.getElementById('game').style.visibility = 'visible';
document.getElementById('playerFace').style.visibility = 'visible';
document.getElementById('playerBack').style.visibility = 'visible';
document.getElementById('playerLeft').style.visibility = 'visible';
document.getElementById('playerRight').style.visibility = 'visible';
}

function restartGame() {
  score = 0;
    hidden = !hidden;
    isPlaying = true;

    document.getElementById('startgame').style.visibility = 'hidden';
    document.getElementById('toggler').style.visibility = 'hidden';
    document.getElementById('background').style.visibility = 'hidden';
document.getElementById('settings12').style.visibility = 'hidden';
document.getElementById('game').style.visibility = 'visible';
document.getElementById('playerFace').style.visibility = 'visible';
document.getElementById('playerBack').style.visibility = 'visible';
document.getElementById('playerLeft').style.visibility = 'visible';
document.getElementById('playerRight').style.visibility = 'visible';
}

function randomize(){
  canvas = document.getElementById("game");
  ctx = canvas.getContext("2d");

  clear();

  var myColors  =["black"];
  var colorPicker = Math.ceil(4* Math.random() -1);
  ctx.strokeStyle = "#000000";
  ctx.font = "20px Arial";
  ctx.strokeText("Score : " + score, 5, 25);
  if(seconds != null){
    	ctx.strokeText("Time Left: " + seconds, 105,25);
  }

	if(seconds == 0)
		{
      document.getElementById('displayScore').innerHTML = "Best Score : " + score;
			document.getElementById('toggler').style.visibility = 'visible';
			document.getElementById('settings12').style.visibility = 'visible';
			document.getElementById('background').style.visibility = 'visible';
			document.getElementById('game').style.visibility = 'hidden';
			document.getElementById('playerFace').style.visibility = 'hidden';
			document.getElementById('playerBack').style.visibility = 'hidden';
			document.getElementById('playerLeft').style.visibility = 'hidden';
			document.getElementById('playerRight').style.visibility = 'hidden';
		}
  ctx.closePath();

	var valueX = 2220*Math.random();
  var valueY = 920* Math.random();
  if(valueY > 157){
	   var rx = Math.ceil(1920* Math.random());
     var ry = Math.ceil(valueY);
  }

  if(numberOfRefresh < 500){
    numberOfRefresh++;


if(valueY > 357 && valueX > 800){
  if(circlesCount < 5){
    circlesCount++;
    circles.push({
      radius : 30,
      pointX : rx,
      pointY : ry
    });
  }
}



  for(var i=0 ; i < circles.length; i++){
    var currentCircle = circles[i];
    drawCircle(currentCircle.pointX, currentCircle.pointY, currentCircle.radius);
  }

  switch(currentKey){
    case "W":
       ctx.drawImage(playerBack, playerX, playerY,175,175);
       break;
    case "A":
       ctx.drawImage(playerLeft, playerX, playerY,175,175);
       break;
     case "D":
       ctx.drawImage(playerRight, playerX, playerY,175,175);
       break;
    case "S":
       ctx.drawImage(playerFace, playerX, playerY,175,175);
       break;
  }

  }else{
    // console.log("reset");
    clear();
    circlesCount = 0;
    circles = [];
    numberOfRefresh = 0;

    switch(currentKey){
      case "W":
         ctx.drawImage(playerBack, playerX, playerY,175,175);
         break;
      case "A":
         ctx.drawImage(playerLeft, playerX, playerY,175,175);
         break;
       case "D":
         ctx.drawImage(playerRight, playerX, playerY,175,175);
         break;
      case "S":
         ctx.drawImage(playerFace, playerX, playerY,175,175);
         break;
    }
  }
}

function drawCircle(rx,ry,rr){
  var myColors  =["black"];
  var colorPicker = Math.ceil(4* Math.random() -1);
	ctx.fillStyle = "#E2C39D";
	ctx.fill();
  ctx.strokeStyle = myColors[colorPicker];
  ctx.beginPath();
  ctx.arc(rx,ry,rr,0,Math.PI,true);
  ctx.stroke();
  ctx.closePath();
}

function init() {
    canvas.width = document.body.clientWidth; //document.width is obsolete
    canvas.height = document.body.clientHeight; //document.height is obsolete

    canvas.style.backgroundImage = "url('images/beach.jpg')";
    ctx.drawImage(playerFace, playerX, playerY,175,175);
    ctx.fillStyle = "#ff0000";
    ctx.translate(0,0);
}

function checkCollision(){
  if(playerY <= -40){
    return true;
  }

  if(playerX <= -60){
    return true;
  }

  if(playerY >= 625){
    return true;
  }

  if(playerX >= 1810){
    return true;
  }

  var stepCount = 0;
  for(var i=137; i >= -38 ; i-=7){
    if(playerY == i && playerY > 4 && playerX < (40 * stepCount)){
      return true;
    }else if(playerY == i && playerY <= 4 && playerX < (50 * stepCount)){
      return true;
    }else if(playerY == -52 && playerX < 1150){
      return true;
    }
    stepCount++;
  }
}




function onKeyDown(event){

  switch(event.code){
    case "KeyA":
      playerX -= playerSpeed;
      if(checkCollision()){
        alert("You can't move ahead");
        playerX += playerSpeed;
      }
        currentKey = "A";
      break;
    case "KeyD":
      playerX += playerSpeed;
      if(checkCollision()){
        alert("You can't move ahead");
        playerX -= playerSpeed;
      }
      currentKey = "D";

      break;
    case "KeyW":
      playerY -= playerSpeed;
      if(checkCollision()){
        alert("You can't move ahead");
        playerY += playerSpeed;
      }
      currentKey = "W";

      break;
    case "KeyS":
      playerY += playerSpeed;
      if(checkCollision()){
        alert("You can't move ahead");
        playerY -= playerSpeed;
      }
      currentKey = "S";
      break;
    case "Space":
      catchWorm();
      break;
    default:
      alert("Only W, A, S, D can be pressed");

  }
   event.preventDefault();
}

function playSuccessSound(){
  var success = new Audio('sounds/Success.mp3');
  success.play();
}

function playFailSound(){
  var fail = new Audio("sounds/Fail.mp3");
  fail.play();
}

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    console.log("x: " + x + " y: " + y)
}

function catchWorm(){
  switch(currentKey){
    case "W":
       touch = false;

         for(var i=0 ; i < circles.length; i++){
           var currentCircle = circles[i];

           for(var circleXStarting = currentCircle.pointX - currentCircle.radius; circleXStarting < (currentCircle.pointX + currentCircle.radius); circleXStarting++){
             if(touch){
               break;
             }

             for(var circleYStarting = currentCircle.pointY - currentCircle.radius; circleYStarting < currentCircle.pointY; circleYStarting++){
               if(touch){
                 break;
               }
               for(var playerXStarting = playerX+60; playerXStarting < playerX + 60 + 55; playerXStarting++){
                 for(var playerYStarting = playerY + 157; playerYStarting < playerY + 157 + 13; playerYStarting++){
                   if(touch){
                     break;
                   }

                   if(playerXStarting == circleXStarting && playerYStarting == circleYStarting){
                     score++;
                     touch = true;
                     playSuccessSound();
                     circles.splice(i,1);
                     break;
                   }
                 }
               }
             }
           }
         }

         if(!touch){
           playFailSound();
         }
       break;
    case "A":
       touch = false;

       for(var i=0 ; i < circles.length; i++){
         var currentCircle = circles[i];

         for(var circleXStarting = currentCircle.pointX - currentCircle.radius; circleXStarting < (currentCircle.pointX + currentCircle.radius); circleXStarting++){
           if(touch){
             break;
           }

           for(var circleYStarting = currentCircle.pointY - currentCircle.radius; circleYStarting < currentCircle.pointY; circleYStarting++){
             if(touch){
               break;
             }

             for(var playerXStarting = playerX + 63; playerXStarting < playerX + 63 + 40; playerXStarting++){
               if(touch){
                 break;
               }

               for(var playerYStarting = playerY + 150; playerYStarting < playerY + 150 + 20; playerYStarting++){
                 if(touch){
                   break;
                 }

                 if(playerXStarting == circleXStarting && playerYStarting == circleYStarting){
                   score++;
                   touch = true;
                   playSuccessSound();
                   circles.splice(i,1);
                   break;
                 }
               }
             }
           }
         }
       }

       if(!touch){
         playFailSound();
       }
       break;
     case "D":
       touch = false;

       for(var i=0 ; i < circles.length; i++){
         var currentCircle = circles[i];

         for(var circleXStarting = currentCircle.pointX - currentCircle.radius; circleXStarting < (currentCircle.pointX + currentCircle.radius); circleXStarting++){
           if(touch){
             break;
           }

           for(var circleYStarting = currentCircle.pointY - currentCircle.radius; circleYStarting < currentCircle.pointY; circleYStarting++){
             if(touch){
               break;
             }

             for(var playerXStarting = playerX + 73; playerXStarting < playerX + 73 + 35; playerXStarting++){
               if(touch){
                 break;
               }

               for(var playerYStarting = playerY + 150; playerYStarting < playerY + 150 + 20; playerYStarting++){
                 if(touch){
                   break;
                 }

                 if(circleXStarting == playerXStarting && circleYStarting == playerYStarting){
                   score++;
                   touch = true;
                   playSuccessSound();
                   circles.splice(i,1);
                   break;
                 }
               }
             }
           }
         }
       }

       if(!touch){
         playFailSound();
       }
       break;
    case "S":
       touch = false;

       for(var i=0 ; i < circles.length; i++){
         var currentCircle = circles[i];

         for(var circleXStarting = currentCircle.pointX - currentCircle.radius; circleXStarting < (currentCircle.pointX + currentCircle.radius); circleXStarting++){
           if(touch){
             break;
           }

           for(var circleYStarting = currentCircle.pointY - currentCircle.radius; circleYStarting < currentCircle.pointY; circleYStarting++){
             if(touch){
               break;
             }

             for(var playerXStarting= playerX+53; playerXStarting < playerX + 53 + 62; playerXStarting++){
               for(var playerYStarting= playerY + 152; playerYStarting < playerY + 152 + 18; playerYStarting++){
                 if(touch){
                   break;
                 }

                 if(playerXStarting == circleXStarting && playerYStarting == circleYStarting){
                   score++;
                   touch = true;
                   playSuccessSound();
                   circles.splice(i,1);
                   break;
                 }
               }
             }
           }
         }
       }

       if(!touch){
         playFailSound();
       }
       break;
  }
}

canvas.addEventListener('mousedown', function(e) {

    getCursorPosition(canvas, e)
})
