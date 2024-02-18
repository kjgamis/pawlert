fetch("https://pet-app.kjgamis.workers.dev")
  .then((response) => response.json())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));