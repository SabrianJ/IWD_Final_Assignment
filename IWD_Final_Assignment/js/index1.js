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

window.onload = setInterval(randomize,1);
window.onload = init;
window.onkeydown = onKeyDown;

function clear(){
  ctx.clearRect(0,0, canvas.width, canvas.height);
}

function randomize(){
  canvas = document.getElementById("game");
  ctx = canvas.getContext("2d");
  var rr = Math.ceil(30* Math.random());
  var valueX = 2220*Math.random();
  var valueY = 920* Math.random();
  if(valueY > 157){
	   var rx = Math.ceil(1920* Math.random());
     var ry = Math.ceil(valueY);
  }

  if(numberOfRefresh < 500){
    numberOfRefresh++;


      console.log("Number" + numberOfRefresh);
	  

if(valueY > 357 && valueX > 800){
  if(circlesCount < 4){
    circlesCount++;
    circles.push({
      radius : rr,
      pointX : rx,
      pointY : ry
    });
  }
}

    clear();

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
    console.log("reset");
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

// if (a.x < b.x + b.width &&
//         a.x + a.width > b.x &&
//         a.y < b.y + b.height &&
//         a.y + a.height > b.y) return true;

function checkCollision(){
  if(playerY <= -59){
    return true;
  }

  if(playerX <= -57){
    return true;
  }

  if(playerY >= 410){
    return true;
  }

  if(playerX >= 1810){
    return true;
  }

  var stepCount = 0;
  for(var i=81; i >= -52 ; i-=7){
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
    default:
      alert("Only W, A, S, D can be pressed");

  }
   event.preventDefault();
}

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    console.log("x: " + x + " y: " + y)
}

canvas.addEventListener('mousedown', function(e) {

    getCursorPosition(canvas, e)
})
