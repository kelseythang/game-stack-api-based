// api config
const apiKey = config.API_KEY;

fetch(`https://rawg.io/api/games?page_size=20?token&key=${apiKey}`)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error)); 

