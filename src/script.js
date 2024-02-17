let petProfic = document.getElementById('petProfic');
let breed = document.getElementById('breed');
let infoNA = document.getElementById('infoNA');
let bodyTempLevel = document.getElementById('bodyTempLevel');
let bodyTemp = document.getElementById('bodyTemp');
let heartRateLevel = document.getElementById('heartRateLevel');
let heartRate = document.getElementById('heartRate');
let alert1 = document.getElementById('alert1');
let humidity = document.getElementById('humidity');
let nowTemperature = document.getElementById('nowTemperature');
let bottombubble = document.getElementById('bottombubble');
let loc = document.getElementById('loc');
let temp = document.getElementById('temp');


var requestURL = "data/example.json";
var request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";
request.send();

request.onload = function () {
    var values = request.response;
    showHeroes(values);
  };

function showHeroes(jsonObj) {
    petProfic.style.backgroundImage = `url(${jsonObj.data.pet.image})`
    breed.innerHTML = jsonObj.data.pet.breed;
    infoNA.innerHTML = jsonObj.data.pet.name + ', ' + jsonObj.data.pet.age;
    bodyTempLevel.innerHTML = jsonObj.data.pet.bodyTempLevel;
    heartRateLevel.innerHTML = jsonObj.data.pet.heartRateLevel;
    bodyTemp.innerHTML = jsonObj.data.pet.bodyTemperature;
    heartRate.innerHTML = jsonObj.data.pet.heartRate;
    loc.innerHTML = jsonObj.data.weather.city;
    temp.innerHTML = jsonObj.data.weather.temperature + '°C';
    humidity.innerHTML  = 'Humidity: ' + jsonObj.data.weather.humidity + '%';
    nowTemperature.innerHTML = jsonObj.data.weather.temperature + '°C';
  }

  let swiper = new Swiper(".mySwiper", {
    spaceBetween: 50,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
   });
