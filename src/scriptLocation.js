let slide1Img = document.getElementById('slide1Img');
let slide2Img = document.getElementById('slide2Img');
let slide3Img = document.getElementById('slide3Img');
let slide1Name = document.getElementById('slide1Name');
let slide2Name = document.getElementById('slide2Name');
let slide3Name = document.getElementById('slide3Name');
let slide1Address = document.getElementById('slide1Address');
let slide2Address = document.getElementById('slide2Address');
let slide3Address = document.getElementById('slide3Address');

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

let values

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "weather": {
    "address": "54 Queen St",
    "city": "AU",
    "time": "2024-02-18 14:00:00",
    "temperature": 24.4,
    "humidity": 85.5,
    "weatherSafelyLevel": "Safe"
  }
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://pawlert-api.kjgamis.workers.dev/api/location", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    values = result
    console.log("location", values)
    showHeroes(values);
  })
  .catch((error) => console.error(error));
