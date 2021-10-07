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

window.onload = init;
window.onkeydown = onKeyDown;

function clear(){
  ctx.clearRect(0,0, canvas.width, canvas.height);
}

function init() {

    canvas.width = document.body.clientWidth; //document.width is obsolete
    canvas.height = document.body.clientHeight; //document.height is obsolete

    canvas.style.backgroundImage = "url('images/beach.jpg')";
    ctx.drawImage(playerFace, playerX, playerY,175,175);
    ctx.fillStyle = "#ff0000";
    // ctx.translate((0/2),(140/2));
    ctx.rotate( (Math.PI / 180) * 50);
    // ctx.translate(-(0/2),-(140/2));
    ctx.fillRect(0,140, 1375, 1);
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
}

function onKeyDown(event){

  switch(event.code){
    case "KeyA":
      playerX -= playerSpeed;

      if(checkCollision()){
        alert("You can't move ahead");
        playerX += playerSpeed;
      }
        clear();
        ctx.drawImage(playerLeft, playerX, playerY,175,175);
      break;
    case "KeyD":
      playerX += playerSpeed;
      if(checkCollision()){
        alert("You can't move ahead");
        playerX -= playerSpeed;
      }
      clear();
      ctx.drawImage(playerRight, playerX, playerY,175,175);
      break;
    case "KeyW":
      playerY -= playerSpeed;

      if(checkCollision()){
        alert("You can't move ahead");
        playerY += playerSpeed;
      }
      clear();
      ctx.drawImage(playerBack, playerX, playerY,175,175);
      break;
    case "KeyS":
      playerY += playerSpeed;
      if(checkCollision()){
        alert("You can't move ahead");
        playerY -= playerSpeed;
      }
      clear();
      ctx.drawImage(playerFace, playerX, playerY,175,175);
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
