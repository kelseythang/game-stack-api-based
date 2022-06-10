// api config
const apiKey = config.API_KEY;

// global variables
const cardContainer = document.querySelector('#card-container');


fetch(`https://rawg.io/api/games?page_size=20?token&key=${apiKey}`)
  .then(res=> res.json())
  .then(data => {
    console.log(data)
    data.results.map(game => {
      const cardDiv = document.createElement('div');
      const cardTitle = document.createElement('p');
      const cardImg = document.createElement('img');

      cardTitle.textContent = game.name;
      cardImg.src = game.background_image;
      cardDiv.classList.add('cardDetail');
      cardImg.classList.add('cardImg');
      
      
      cardContainer.appendChild(cardDiv);
      cardDiv.append(cardTitle, cardImg);
    })
  })
  .catch(error => console.log('error', error)); 


