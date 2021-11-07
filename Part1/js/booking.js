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
// var xml = "<muriwai>"+"<room id='1'>"+
//  "<type>Presidential</type>"
//  + "<capacity>8</capacity>" +
// " <status>vacant</status>" +
//  "<cost>500</cost>"+
// " <imagepath>123, 275, 105, 213</imagepath>"+
// " </room>"+
// "<room id='2'>"+
//  "<type>Executive</type>"+
//  "<capacity>6</capacity>"+
//  "<status>vacant</status>"+
//  "<cost>400</cost>"+
// "<imagepath>120, 172, 113, 80</imagepath>"+
//  "</room>"+
// "<room id='3'>"+
//  "<type>Executive</type>"+
// " <capacity>6</capacity>"+
// " <status>vacant</status>"+
//  "<cost>400</cost>"+
//  "<imagepath>120, 67, 113, 85</imagepath>"+
// " </room>"+
// "<room id='4'>"+
//  "<type>Couple</type>"+
// " <capacity>2</capacity>"+
//  "<status>full</status>"+
//  "<cost>250</cost>"+
//  "<imagepath>353, 67, 48, 110</imagepath>"+
//  "</room>"+
// "<room id='5'>"+
// " <type>Couple</type>"+
//  "<capacity>2</capacity>"+
//  "<status>full</status>"+
// " <cost>250</cost>"+
//  "<imagepath>413, 67, 52, 110</imagepath>"+
//  "</room>"+
// "<room id='6'>"+
// " <type>Couple</type>"+
//  "<capacity>2</capacity>"+
//  "<status>full</status>"+
//  "<cost>250</cost>"+
//  "<imagepath>475, 67, 48, 110</imagepath>"+
//  "</room>"+
//  "<room id='7'>"+
//  " <type>Couple</type>"+
//   "<capacity>2</capacity>"+
//   "<status>vacant</status>"+
//   "<cost>250</cost>"+
//   "<imagepath>533, 67, 48, 110</imagepath>"+
//   "</room>"+
//   "<room id='8'>"+
//   " <type>Superior</type>"+
//    "<capacity>2</capacity>"+
//    "<status>vacant</status>"+
//    "<cost>150</cost>"+
//    "<imagepath>590, 67, 48, 113</imagepath>"+
//    "</room>"+
//    "<room id='9'>"+
//    " <type>Deluxe</type>"+
//     "<capacity>4</capacity>"+
//     "<status>vacant</status>"+
//     "<cost>250</cost>"+
//     "<imagepath>550, 228, 85, 110</imagepath>"+
//     "</room>"+
//     "<room id='10'>"+
//     " <type>Signature</type>"+
//      "<capacity>4</capacity>"+
//      "<status>vacant</status>"+
//      "<cost>350</cost>"+
//      "<imagepath>550, 350, 85, 120</imagepath>"+
//      "</room>"+
//  "</muriwai>";



window.onload=OnLoad();

function OnLoad(){
  checkIn();
  checkOut();
  readXML();
}

function readXML(){
      // parser = new DOMParser();
      // xmlDoc = parser.parseFromString(xml,"text/xml");
        if(typeof window.DOMParser != "undefined") {
          xmlhttp=new XMLHttpRequest();
          xmlhttp.open("GET","./room.xml",false);
          if (xmlhttp.overrideMimeType){
            xmlhttp.overrideMimeType('text/xml');
          }
          xmlhttp.send();
          xmlDoc=xmlhttp.responseXML;
        }
        else{
          xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
          xmlDoc.async="false";
          xmlDoc.load("./room.xml");
        }

      for(var i=0;i<xmlDoc.getElementsByTagName("type").length;i++){
        var imagePath = xmlDoc.getElementsByTagName("imagepath")[i].childNodes[0].nodeValue;
        var imagePathArray = imagePath.split(",").map(Number);
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

function removeSummary(){
  var summary = document.getElementById("summary");
  summary.style.display = "none";
  var booking= document.getElementById("booking");
  booking.innerHTML = "";
  var roomImage = document.getElementById("roomImage");
  roomImage.innerHTML = "";
}

function canvasMouseMove(e){
  var c = document.getElementById("allocation");
  var ctx = c.getContext("2d");
  ctx.clearRect(0,0, c.width, c.height);

  loadCanvas();

  var mousePosition = getMousePosition(e.clientX, e.clientY);

  for(var room=0 ; room < rooms.length ; room++){
    var currentRoom = rooms[room];
    for(var x = currentRoom.imagepath[0]; x < currentRoom.imagepath[0] + currentRoom.imagepath[2]; x++){
      for(var y = currentRoom.imagepath[1] ; y < currentRoom.imagepath[1] + currentRoom.imagepath[3]; y++){
        if(mousePosition.x == x && mousePosition.y == y){
          ctx.fillStyle = "#d3d3d3";
          var imagex = currentRoom.imagepath[0] - (currentRoom.imagepath[2]/2);
          var imagey = currentRoom.imagepath[1] + (currentRoom.imagepath[3]/2);
          ctx.fillRect(imagex, imagey, 160, 75);
          ctx.stroke();
          ctx.fillStyle = "#000000";
          ctx.fillText(currentRoom.type + " room", imagex + 3, imagey + 20);
          ctx.fillText("Rate: $" + currentRoom.cost + "/night", imagex + 3, imagey + 40);
          ctx.fillText("Max Person: " + currentRoom.capacity, imagex + 3, imagey + 63);
          break;
        }
      }
    }
  }
}

function formatDate(newDate){
  var currentDate = new Date(newDate);
  var thisDate = String(currentDate.getDate()).padStart(2, '0');
  var thisMonth = String(currentDate.getMonth() + 1).padStart(2, '0'); //January is 0!
  var thisYear = currentDate.getFullYear();
  return thisDate + "/" + thisMonth + "/" + thisYear;
}

function datediff(first, second) {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    return Math.round((second-first)/(1000*60*60*24));
}

function canvasMouseClick(e){
  var c = document.getElementById("allocation");
  var ctx = c.getContext("2d");
  ctx.clearRect(0,0, c.width, c.height);

  loadCanvas();

  var mousePosition = getMousePosition(e.clientX,e.clientY);

  for(var room=0 ; room < rooms.length ; room++){
    var currentRoom = rooms[room];
    for(var x = currentRoom.imagepath[0]; x < currentRoom.imagepath[0] + currentRoom.imagepath[2]; x++){
      for(var y = currentRoom.imagepath[1] ; y < currentRoom.imagepath[1] + currentRoom.imagepath[3]; y++){
        if(mousePosition.x == x && mousePosition.y == y){
          if(currentRoom.status == "full" || adult > currentRoom.capacity){
            alert("Sorry, room is not available")
          }else{
            var booking= document.getElementById("booking");
            booking.innerHTML = "<h3><u>Booking Summary</u></h3>";

            var checkInDate = document.getElementById("checkIn").value;
            booking.innerHTML += "Check In : " + formatDate(checkInDate) + " at 02.00PM";

            var checkOutDate = document.getElementById("checkOut").value;
            booking.innerHTML += "<br/> Check Out : " + formatDate(checkOutDate) + " at 10.00AM";
            booking.innerHTML += "<br/> Number of nights : " + datediff(new Date(checkInDate), new Date(checkOutDate));
            booking.innerHTML += "<br/> Room ID : " + currentRoom.id;
            booking.innerHTML += "<br/> Room Type : " + currentRoom.type;
            booking.innerHTML += "<br/> Number of Adults : " + adult;
            booking.innerHTML += "<br/> Room rate : $" + currentRoom.cost + "/night";
            booking.innerHTML += "<br/> Total Cost : $" + datediff(new Date(checkInDate), new Date(checkOutDate)) * currentRoom.cost;
            booking.innerHTML += "<br/> Booking time : " + formatDate(today) + " at " + new Date().getHours() + ":" + new Date().getMinutes();
            booking.innerHTML += "<br/> <br/><button onclick='confirmBooking("+ currentRoom.id +")' class='btn btn-outline-primary'>Book now</button>";

            var roomImage = document.getElementById("roomImage");
             switch(currentRoom.type){
               case "Superior":
                  roomImage.innerHTML = "<img src='img/rooms/1.png' width='350' height='250'>";
                  break;
              case "Deluxe":
                  roomImage.innerHTML = "<img src='img/rooms/2.png' width='350' height='250'>";
                  break;
              case "Signature":
              roomImage.innerHTML = "<img src='img/rooms/3.png' width='350' height='250'>";
                  break;
              case "Couple":
              roomImage.innerHTML = "<img src='img/rooms/4.png' width='350' height='250'>";
                  break;
              case "Executive":
              roomImage.innerHTML = "<img src='img/rooms/5.jpg' width='350' height='250'>";
                  break;
              case "Presidential":
              roomImage.innerHTML = "<img src='img/rooms/6.jpg' width='350' height='250'>";
                  break;
             }

          }
          break;
        }
      }
    }
  }
}

function confirmBooking(id){
    xmlDoc.getElementsByTagName("status")[id-1].childNodes[0].nodeValue = "full";
    var blob = new Blob([new XMLSerializer().serializeToString(xmlDoc.documentElement)], {type: "text/xml"});
    saveAs(blob, "./room.xml");
}

function getMousePosition(x,y){
    var c = document.getElementById("allocation");
    var rect = c.getBoundingClientRect();
    x = x - rect.left;
    y = y - rect.top;
    return {
      x : Math.round(x),
      y : Math.round(y)
    }
}

function loadCanvas(){
  var c = document.getElementById("allocation");
  var ctx = c.getContext("2d");
  var ctx1 = c.getContext("2d");
  ctx.beginPath();

  ctx.fillStyle = "#53E3B2";
  ctx.font = "15pt sans-serif";


  for(var i=0 ; i < rooms.length; i++){
    var room = rooms[i];
    if(room.status == "full" || adult > room.capacity){
      ctx.fillStyle = "#FF0000";
    }else{
      ctx.fillStyle = "#53E3B2";
    }
    var imagePathArray = room.imagepath;
    ctx.fillRect(imagePathArray[0],imagePathArray[1],imagePathArray[2],imagePathArray[3]);
    ctx.fillStyle = "#000000";
    var imagex = room.imagepath[0] + (room.imagepath[2]/2);
    var imagey = room.imagepath[1] + (room.imagepath[3]/2);
    ctx.fillText(room.id, imagex-5, imagey);
    ctx.stroke();
  }

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

  removeSummary();
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

removeSummary();
}

function checkAvailability(){
  var summary = document.getElementById("summary");
  summary.style.display = "block";
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

  removeSummary();
}

function checkoutChange(){
  removeSummary();
}

function adultCapacity(e){
  adult = e.target.value;
  removeSummary();
}

function childrenCapacity(e){
  children = e.target.value;
  removeSummary();
}
