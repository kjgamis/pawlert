let slide1Img = document.getElementById('slide1Img');
let slide2Img = document.getElementById('slide2Img');
let slide3Img = document.getElementById('slide3Img');
let slide1Name = document.getElementById('slide1Name');
let slide2Name = document.getElementById('slide2Name');
let slide3Name = document.getElementById('slide3Name');
let slide1Address = document.getElementById('slide1Address');
let slide2Address = document.getElementById('slide2Address');
let slide3Address = document.getElementById('slide3Address');


var requestURL = "data/location.json";
var request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";
request.send();

request.onload = function () {
    var values = request.response;
    showHeroes(values);
  };

function showHeroes(jsonObj) {
  slide1Name.innerHTML = jsonObj.data.locations[0].name;
  slide2Name.innerHTML = jsonObj.data.locations[1].name;
  slide3Name.innerHTML = jsonObj.data.locations[2].name;
  slide1Address.innerHTML = jsonObj.data.locations[0].address;
  slide2Address.innerHTML = jsonObj.data.locations[1].address;
  slide3Address.innerHTML = jsonObj.data.locations[2].address;
  slide1Img.style.backgroundImage = 'url("img/place1.png")';
  slide2Img.style.backgroundImage = 'url("img/place2.png")';
  slide3Img.style.backgroundImage = 'url("img/place3.png")';
}
  
// const myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");

// const raw = JSON.stringify({
//   "location": {
//     "latitude": 43.6545629,
//     "longitude": -79.4064103,
//     "WEATHER_API_KEY": "d9442ae097e08ac8353888ae1852995b737e4851",
//     "MAPS_API_KEY": "AIzaSyDxS_u6YZ2SkkIHTRjl82U7ZHWT3JQog0A"
//   },
//   "pet": {
//     "name": "Dapper",
//     "img": "https://placedog.net/800/640?id=177",
//     "breed": "Scottish Terrier",
//     "age": 1.5,
//     "weight": 22,
//     "heartRate": 120,
//     "bodyTemperature": 40
//   }
// });

// const requestOptions = {
//   method: "GET",
//   headers: myHeaders,
//   body: raw,
//   redirect: "follow"
// };

// fetch("http://localhost:8787/health?token=TM2qQoHtA2B9us", requestOptions)
//   .then((response) => response.text())
//   .then((result) => console.log(result))
//   .catch((error) => console.error(error));

