var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();
var tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
var dd1 = tomorrow.getDate();
var mm1 = tomorrow.getMonth() + 1;
var yyyy1 = tomorrow.getFullYear();
var adult = 1;
var children = 0;
var rooms = [];
var parser, xmlDoc;
var xml = "<muriwai>"+"<room id='1'>"+
 "<type>superior</type>"
 + "<capacity>2</capacity>" +
" <status>full</status>" +
 "<cost>150</cost>"+
" <imagepath>20,320,150,160</imagepath>"+
" </room>"+
"<room id='2'>"+
 "<type>deluxe</type>"+
 "<capacity>4</capacity>"+
 "<status>vacant</status>"+
 "<cost>250</cost>"+
"<imagepath>20,20,160,200</imagepath>"+
 "</room>"+
"<room id='3'>"+
 "<type>signature</type>"+
" <capacity>5</capacity>"+
" <status>full</status>"+
 "<cost>350</cost>"+
 "<imagepath>220,20,150,180</imagepath>"+
" </room>"+
"<room id='4'>"+
 "<type>couple</type>"+
" <capacity>2</capacity>"+
 "<status>full</status>"+
 "<cost>250</cost>"+
 "<imagepath>500,20,150,120</imagepath>"+
 "</room>"+
"<room id='5'>"+
" <type>executive</type>"+
 "<capacity>4</capacity>"+
 "<status>vacant</status>"+
" <cost>400</cost>"+
 "<imagepath>500,180,150,100</imagepath>"+
 "</room>"+
"<room id='6'>"+
" <type>presidential</type>"+
 "<capacity>5</capacity>"+
 "<status>vacant</status>"+
 "<cost>500</cost>"+
 "<imagepath>500,320,150,120</imagepath>"+
 "</room>"+
 "</muriwai>";



window.onload=OnLoad();

function OnLoad(){
  checkIn();
  checkOut();
  readXML();
  loadCanvas();


}

function readXML(){
      parser = new DOMParser();
      xmlDoc = parser.parseFromString(xml,"text/xml");

      for(var i=0;i<xmlDoc.getElementsByTagName("type").length;i++){
        var imagePath = xmlDoc.getElementsByTagName("imagepath")[i].childNodes[0].nodeValue;
        var imagePathArray = imagePath.split(",");
        var room = {
          id: xmlDoc.getElementsByTagName("room")[i].id,
          type: xmlDoc.getElementsByTagName("type")[i].childNodes[0].nodeValue,
          capacity : xmlDoc.getElementsByTagName("capacity")[i].childNodes[0].nodeValue,
          status: xmlDoc.getElementsByTagName("status")[i].childNodes[0].nodeValue,
          cost: xmlDoc.getElementsByTagName("cost")[i].childNodes[0].nodeValue,
          imagepath: imagePathArray,
        }
        rooms.push(room);
      }
}

function loadCanvas(){
  var c = document.getElementById("allocation");
  var ctx = c.getContext("2d");
  var ctx1 = c.getContext("2d");
  ctx.beginPath();






//   ctx.fillStyle = "#FFFFFF";
//   ctx.font = "15pt sans-serif";
//
// //Main building
//   ctx.fillRect(220, 320, 150, 140);
//   ctx.stroke();
//
//   for(var i=0 ; i < rooms.length; i++){
//     var room = rooms[i];
//     if(room.status == "full"){
//       ctx.fillStyle = "#FF0000";
//     }else{
//       ctx.fillStyle = "#53E3B2";
//     }
//     var imagePathArray = room.imagepath;
//     ctx.fillRect(imagePathArray[0],imagePathArray[1],imagePathArray[2],imagePathArray[3]);
//     ctx.stroke();
//   }



  // ctx.fillStyle = "#402F1D";
  // ctx.fillRect(80,220,40,70);
  // ctx.stroke();
  //
  // ctx.fillRect(100,255,170,35);
  // ctx.stroke();
  //
  // ctx.fillRect(230,255,40,65);
  // ctx.stroke();
  //
  // ctx.fillRect(290,200,40,120);
  // ctx.stroke();
  //
  //
  // ctx.fillRect(170,365,50,35);
  // ctx.stroke();
  //
  //
  //
  // ctx.fillRect(415,370,40,-300);
  // ctx.stroke();
  //
  //
  // ctx.fillRect(370,365,130,35);
  // ctx.stroke();
  //
  // ctx.fillRect(450,215,50,35);
  // ctx.stroke();
  //
  //
  // ctx.fillRect(450,70,50,35);
  // ctx.stroke();
  //
  //
  // ctx.fillRect(290,460,40,70);
  // ctx.stroke();
  //
  //
  // ctx.fillStyle = "grey";
  // ctx.fillRect(0,530,700,70);
  // ctx.stroke();
  //
  // ctx1.fillStyle = "black";
  // ctx1.fillText("Main Building", 236, 390);
  //
  //
  //
  // ctx1.font = "40pt sans-serif";
  // ctx1.fillText("1", 80, 420);
  // ctx1.fillText("2", 80, 120);
  // ctx1.fillText("3", 280, 120);
  // ctx1.fillText("4", 560, 100);
  // ctx1.fillText("5", 560, 250);
  // ctx1.fillText("6", 560, 400);
  //
  // ctx.stroke();
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
  var canvas = document.getElementById("allocation");
  canvas.style.display = "block";
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
