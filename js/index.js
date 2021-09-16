var initialX = 70;
var initialY = 70;
var second = document.getElementById('secondCanvas');
var ctx = second.getContext("2d");

window.onload = drawCircle;

function drawCircle(){
  ctx.beginPath();
  ctx.arc(initialX, initialY, 50, 0, Math.PI * 2);
  ctx.stroke();
}

function checkCollision(){

  if((initialX + 50) >= second.width){
    return true;
  }

  if(initialX - 50 < 0){
    return true;
  }

  if((initialY + 50) >= second.height){
    return true;
  }

  if(initialY - 50 < 0){
    return true;
  }

  return false;

}

window.onkeydown = onKeyDown;

function clear(myCanvas){
  ctx.clearRect(0,0, myCanvas.width, myCanvas.height);
}

function onKeyDown(event){

  switch(event.code){
    case "KeyA":
      --initialX;

      if(checkCollision()){
        ++initialX;
        alert("Collision detected");
      }else{
        clear(second);
        drawCircle();
      }

      break;
    case "KeyD":
      ++initialX;

      if(checkCollision()){
        --initialX;
        alert("Collision detected");
      }else{
        clear(second);
        drawCircle();
      }

      break;
    case "KeyW":
      --initialY;

      if(checkCollision()){
        ++initialY;
        alert("Collision detected");
      }else{
        clear(second);
        drawCircle();
      }

      break;
    case "KeyS":
      ++initialY;

      if(checkCollision()){
        --initialY;
        alert("Collision detected");
      }else{
        clear(second);
        drawCircle();
      }

      break;
    default:
      alert("Only W, A, S, D can be pressed");

  }
   event.preventDefault();
}


$('#canvas').mousedown(function(event) {
  var canvas = event.target;
  var ctx = canvas.getContext("2d");

  var x = event.offsetX;
  var y = event.offsetY;

  switch (event.which) {
    case 1:
      // alert('Left Mouse button pressed.');
      ctx.beginPath();
      ctx.arc(x, y, 50, 0, Math.PI * 2);
      ctx.stroke();
      break;
    case 2:
      alert('Middle Mouse button pressed.');
      break;
    case 3:
    // alert('Right Mouse button pressed.');
      ctx.beginPath();
      ctx.rect(x, y, 150, 100);
      ctx.stroke();
      break;
    default:
      alert('You have a strange Mouse!');
  }
});
