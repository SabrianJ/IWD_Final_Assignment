// JavaScript Document


var canvas,ctx;
var value = 1590* Math.random();
console.log(value);
onload=setInterval(randomize,1000);

//function to generate random circle parameters, x,y and radius

function randomize(){
 // console.log("here");
  canvas = document.getElementById("game");
  ctx = canvas.getContext("2d");
  var rr = Math.ceil(30* Math.random());
  if(value < 157)
  {
	   var rx = Math.ceil(value);
       var ry = Math.ceil(value);
   	   drawCircle(rx,ry,rr);

  }
  var rx = Math.ceil(value);
  var ry = Math.ceil(value);
  drawCircle(rx,ry,rr);

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
