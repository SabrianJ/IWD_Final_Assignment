window.onload = drawCircle;

function drawCircle(){

  var second = document.getElementById('secondCanvas');
  var ctx = second.getContext("2d");


  ctx.beginPath();
  ctx.arc(70, 70, 50, 0, Math.PI * 2);
  ctx.stroke();
}

window.onkeydown = myFunction;

function myFunction(event){
  alert(event.keyCode);
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
