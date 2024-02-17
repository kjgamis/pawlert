// let petProfic = document.getElementById('petProfic');
// let breed = document.getElementById('breed');
// let infoNA = document.getElementById('infoNA');
// let bodyTempLevel = document.getElementById('bodyTempLevel');
// let bodyTemp = document.getElementById('bodyTemp');
// let heartRateLevel = document.getElementById('heartRateLevel');
// let heartRate = document.getElementById('heartRate');
// let alert1 = document.getElementById('alert1');
// let humidity = document.getElementById('humidity');
// let nowTemperature = document.getElementById('nowTemperature');
// let bottombubble = document.getElementById('bottombubble');


var requestURL = "data/example.json";
var request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";
request.send();

request.onload = function () {
    var superHeroes = request.response;
    populateHeader(superHeroes);
    showHeroes(superHeroes);
  };
  
  console.log("Hello world!");
