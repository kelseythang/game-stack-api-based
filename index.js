// api config
const apiKey = config.API_KEY;

// global variables
const cardContainer = document.querySelector('#card-container');

// DOMContentLoaded fetch
function fetchGames(){
fetch(`https://rawg.io/api/games?page_size=20?token&key=${apiKey}`)
  .then(res=> res.json())
  .then(data => {
    console.log(data)
    renderCard(data);
  })
  .catch(error => console.log('error', error)); 
} 

document.addEventListener('DOMContentLoaded', fetchGames);

// form event
const form = document.querySelector('form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const searchValue = event.target.search.value + ' ';
  cardContainer.innerHTML = '';
  
  fetch(`https://rawg.io/api/games?search=${searchValue}token&key=${apiKey}`)
    .then(res => res.json())
    .then(data =>  renderCard(data));
});
  
function renderCard(data){
  data.results.map(game => {
    const cardDiv = document.createElement('div');
    const cardTitle = document.createElement('p');
    const cardImg = document.createElement('img');
    const cardRating = document.createElement('p');
    const cardAdd = document.createElement('p');  
    const cardDetails = document.createElement('p');

    cardTitle.textContent = game.name;
    cardImg.src = game.background_image;
    cardDiv.classList.add('cardDefault');
    cardImg.classList.add('cardImg');
    cardRating.textContent = 'Rating: ' + game.rating;
    cardDetails.textContent = 'View Details'; 
    cardDetails.style.textDecoration = 'underline';
    cardDetails.classList.add('details');
    cardAdd.textContent = 'Add to My Collection   ☆';
  

    cardContainer.appendChild(cardDiv);
    cardDiv.append(cardTitle, cardImg, cardRating, cardDetails, cardAdd);

    // game details event 
    cardDetails.addEventListener('click', () => {
      cardContainer.innerHTML = '';
      const cardDiv = document.createElement('div');
      const cardTitle = document.createElement('h2');
      const cardImg = document.createElement('img');
      const cardReleased= document.createElement('p');
      const cardAdd = document.createElement('p');  
      const cardDetails = document.createElement('p');
  
      cardTitle.textContent = game.name;
      cardImg.src = game.background_image;
      cardDiv.classList.add('cardDetail');
      cardImg.classList.add('cardDetailImg');
      cardReleased.textContent = 'Released Date: ' + game.released;
      cardDetails.textContent = `Total Playtime: ${game.playtime} Hours`; 
      cardAdd.textContent = 'Add a Review';
    
  
      cardContainer.appendChild(cardDiv);
      cardDiv.append(cardTitle, cardImg, cardRating, cardDetails, cardAdd);
    });
  });  
} 
