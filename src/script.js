let petProfic = document.getElementById('petProfic');
let breed = document.getElementById('breed');
let infoNA = document.getElementById('infoNA');
let bodyTempLevel = document.getElementById('bodyTempLevel');
let bodyTemp = document.getElementById('bodyTemp');
let heartRateLevel = document.getElementById('heartRateLevel');
let heartRate = document.getElementById('heartRate');
let alert1 = document.getElementById('alert1');
let alert2 = document.getElementById('alert2');
let humidity = document.getElementById('humidity');
let nowTemperature = document.getElementById('nowTemperature');
let bottombubble = document.getElementById('bottombubble');
let loc = document.getElementById('loc');
let temp = document.getElementById('temp');
let gradient = document.getElementById('gradient');
let dogName = document.getElementById('dogName');



var requestURL = "data/APIresponses.json";
var request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";
request.send();

request.onload = function () {
    var values = request.response;
    showHeroes(values);
  };

function showHeroes(jsonObj) {
  petProfic.style.backgroundImage = `url(${jsonObj.data.pet.image})`;
  breed.innerHTML = jsonObj.data.pet.breed;
  infoNA.innerHTML = jsonObj.data.pet.name + ', ' + jsonObj.data.pet.age;
  bodyTempLevel.innerHTML = jsonObj.data.pet.bodyTempLevel;
  heartRateLevel.innerHTML = jsonObj.data.pet.heartRateLevel;
  bodyTemp.innerHTML = jsonObj.data.pet.bodyTemperature;
  heartRate.innerHTML = jsonObj.data.pet.heartRate;
  loc.innerHTML = jsonObj.data.weather.city;
  temp.innerHTML = jsonObj.data.weather.temperature + '°C';
  humidity.innerHTML = 'Humidity: ' + jsonObj.data.weather.humidity + '%';
  nowTemperature.innerHTML = jsonObj.data.weather.temperature + '°C';
  dogName.innerHTML = jsonObj.data.pet.name + '!'; 

  let temperatureSen = jsonObj.data.weather.temperature;

  if (jsonObj.data.pet.bodyTempLevel == "normal") {
    bodyTempLevel.style.backgroundColor = "#50F291";
  } else if (jsonObj.data.pet.bodyTempLevel == "caution") {
    bodyTempLevel.style.backgroundColor = "#FFB445";
  } else if (jsonObj.data.pet.bodyTempLevel == "fatal") {
    bodyTempLevel.style.backgroundColor = "#EC3F3F";
  }

  if (jsonObj.data.pet.heartRateLevel == "normal") {
    heartRateLevel.style.backgroundColor = "#50F291";
  } else if (jsonObj.data.pet.heartRateLevel == "caution") {
    heartRateLevel.style.backgroundColor = "#FFB445";
  } else if (jsonObj.data.pet.heartRateLevel == "fatal") {
    heartRateLevel.style.backgroundColor = "#EC3F3F";
  }

  if (temperatureSen < 20) {
    alert1.innerHTML = "Safe to go out!";
    alert2.innerHTML = "is just right for me!";
    bottombubble.innerHTML = "I could enjoy playing outside anyway I want! Don’t have to worry about getting too warm.";
    gradient.src = "img/safeGradient.svg";
  } else if (temperatureSen > 19 && temperatureSen < 28) {
    alert1.innerHTML = "Be Cautious";
    alert2.innerHTML = "is a little warm for me.";
    bottombubble.innerHTML = "I could walk, I could run, I could sniff around... I just need to stay hydrated and occasionally hide in the shade!";
    gradient.src = "img/cautionGradient.svg";
  } else if (temperatureSen > 27 && temperatureSen < 32) {
    alert1.innerHTML = "Risky to go out!";
    alert2.innerHTML = "can get me panting heavily!";
    bottombubble.innerHTML = "I could go out, but the weather can get me heated up quite fast. Let’s not do anything intense! Water and shade is a must.";
    gradient.src = "img/badGradient.svg";
  } else if (temperatureSen > 31) {
    alert1.innerHTML = "Dangerously to go out!";
    alert2.innerHTML = "um, maybe I’ll pass...";
    bottombubble.innerHTML = "I could go out for bit, like 10 to 20 minutes...But no longer than that. I could feel over heated easily. Please give me enough water and shade!";
    gradient.src = "img/fatalGradient.svg";
  }
}
  

let swiper = new Swiper(".mySwiper", {
  spaceBetween: 50,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
 
