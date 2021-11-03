var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();
var tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
var dd1 = tomorrow.getDate();
var mm1 = tomorrow.getMonth() + 1;
var yyyy1 = tomorrow.getFullYear();
var adult = 0;
var children = 0;
let xmlContent = '';
var doc;

window.onload=OnLoad();

function OnLoad(){
  checkIn();
  checkOut();
  loadCanvas();
  readXML();
}

function readXML(){
  //
  // var parser = new DOMParser();
  // doc = parser.parseFromString(strXML, 'text/xml');

  fetch('room.xml').then((response)=>{
    response.text().then((xml)=>{
      xmlContent = xml;
      let parser = new DOMParser();
      let xmlDOM = parser.parseFromString(xmlContent,'application/xml');
      let rooms = xmlContent.querySelectorAll('room');

      rooms.forEach(roomXMLNode => {
        console.log(roomXMLNode.children[0].innerHTML);
      });
    });
  });
}

function loadCanvas(){
  var c = document.getElementById("game2");
  var ctx = c.getContext("2d");
  var ctx1 = c.getContext("2d");
  ctx.beginPath();





  ctx.fillStyle = "#53E3B2";
  ctx.font = "15pt sans-serif";

  ctx.fillRect(20, 20, 160, 200);
  ctx.stroke();
  ctx.fillRect(220, 20, 150, 180);
  ctx.stroke();
  ctx.fillRect(500, 20, 150, 120);
  ctx.stroke();
  ctx.fillRect(20, 320, 150, 160);
  ctx.stroke();
  ctx.fillRect(220, 320, 150, 140);
  ctx.stroke();
  ctx.fillRect(500, 320, 150, 120);
  ctx.stroke();
  ctx.fillRect(500, 180, 150, 100);


  ctx.fillStyle = "brown";
  ctx.fillRect(80,220,40,70);
  ctx.stroke();

  ctx.fillRect(100,255,170,35);
  ctx.stroke();

  ctx.fillRect(230,255,40,65);
  ctx.stroke();

  ctx.fillRect(290,200,40,120);
  ctx.stroke();


  ctx.fillRect(170,365,50,35);
  ctx.stroke();



  ctx.fillRect(415,370,40,-300);
  ctx.stroke();


  ctx.fillRect(370,365,130,35);
  ctx.stroke();

  ctx.fillRect(450,215,50,35);
  ctx.stroke();


  ctx.fillRect(450,70,50,35);
  ctx.stroke();


  ctx.fillRect(290,460,40,70);
  ctx.stroke();


  ctx.fillStyle = "grey";
  ctx.fillRect(0,530,700,70);
  ctx.stroke();

  ctx1.fillStyle = "red";
  ctx1.fillText("Main Building", 236, 390);



  ctx1.font = "40pt sans-serif";
  ctx1.fillText("1", 80, 420);
  ctx1.fillText("2", 80, 120);
  ctx1.fillText("3", 280, 120);
  ctx1.fillText("4", 560, 100);
  ctx1.fillText("5", 560, 250);
  ctx1.fillText("6", 560, 400);

  ctx.stroke();
}

function checkIn(){
  if (dd < 10) {
     dd = '0' + dd;
  }

  if (mm < 10) {
     mm = '0' + mm;
  }

  today = yyyy + '-' + mm + '-' + dd;

  document.getElementById("checkIn").setAttribute("min", today);
  document.getElementById("checkIn").value = today;
}

function checkOut(){
  if (dd1 < 10) {
     dd1 = '0' + dd1;
  }

  if (mm1 < 10) {
     mm1 = '0' + mm1;
  }

  tomorrow = yyyy1 + '-' + mm1 + '-' + dd1;

  document.getElementById("checkOut").setAttribute("min", tomorrow);
  document.getElementById("checkOut").value = tomorrow;
}

function checkAvailability(){
  document.getElementById("checkOut").value = tomorrow;
}

function AdjustCheckOut(){
  var checkInDate = document.getElementById("checkIn").value;
  checkInDate = new Date(checkInDate);

  var minCheckOut = new Date(checkInDate);
  minCheckOut.setDate(minCheckOut.getDate() + 1);

  var dd1 = minCheckOut.getDate();
  var mm1 = minCheckOut.getMonth() + 1;
  var yyyy1 = minCheckOut.getFullYear();

  if (dd1 < 10) {
     dd1 = '0' + dd1;
  }

  if (mm1 < 10) {
     mm1 = '0' + mm1;
  }

  minCheckOut = yyyy1 + '-' + mm1 + '-' + dd1;

  document.getElementById("checkOut").setAttribute("min", minCheckOut);
  document.getElementById("checkOut").value = minCheckOut;
}

function adultCapacity(event){
  adult = event.target.value;
}

function childrenCapacity(event){
  children = event.target.value;
}
