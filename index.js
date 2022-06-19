// api config
const apiKey = config.API_KEY;

// global variables
const cardContainer = document.querySelector('#card-container');

// DOMContentLoaded fetch
function fetchGames(){
fetch(`https://rawg.io/api/games?page_size=20?token&key=${apiKey}`)
  .then(res => res.json())
  .then(data => {
    cardContainer.innerHTML = '';
    renderCard(data);
  })
  .catch(error => console.log('error', error)); 
} 

document.addEventListener('DOMContentLoaded', fetchGames);

// form event
const form = document.querySelector('#game-form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const searchValue = event.target.search.value + ' ';
  cardContainer.innerHTML = '';
  
  fetch(`https://rawg.io/api/games?search=${searchValue}token&key=${apiKey}`)
    .then(res => res.json())
    .then(data =>  renderCard(data));
  
  form.reset();
});
  
function renderCard(data){
  data.results.map(game => {
    const cardDiv = document.createElement('div');
    const cardTitle = document.createElement('p');
    const cardImg = document.createElement('img');
    const cardRating = document.createElement('p');
    const cardAdd = document.createElement('button');  
    const cardDetails = document.createElement('p');

    cardTitle.textContent = game.name;
    cardImg.src = game.background_image;
    cardDiv.classList.add('cardDefault');
    cardImg.classList.add('cardImg');
    cardRating.textContent = 'Rating: ' + game.rating;
    cardDetails.textContent = 'View Details'; 
    cardDetails.style.textDecoration = 'underline';
    cardDetails.style.cursor = 'pointer';
    cardDetails.classList.add('details');
    cardAdd.textContent = 'Add to Collection';
    cardAdd.classList.add('button');
  

    cardContainer.appendChild(cardDiv);
    cardDiv.append(cardTitle, cardImg, cardRating, cardDetails, cardAdd);
    
    // add to collection event
    cardAdd.addEventListener('click', (event) => {
      if(cardAdd.textContent === 'Add to Collection'){
        cardAdd.textContent = 'Added to Collection';
        cardAdd.classList.remove('button');
        cardAdd.classList.add('added-button');
        const configObj = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            'title': game.name,
            'image': game.background_image,
          }),
        };
      
        fetch('http://localhost:3000/games/', configObj)
          .then(res => res.json());

      } else {
        cardAdd.textContent = 'Add to Collection';
        cardAdd.classList.remove('added-button');
        cardAdd.classList.add('button');
        handleDelete(event);
      };
    });

    // game details event 
    cardDetails.addEventListener('click', () => {
      cardContainer.innerHTML = '';
      const cardDiv = document.createElement('div');
      const cardTitle = document.createElement('h2');
      const cardImg = document.createElement('img');
      const cardReleased = document.createElement('p');
      const cardAdd = document.createElement('p');  
      const cardDetails = document.createElement('p');
      const cardComments = document.createElement('ul');
  
      cardTitle.textContent = game.name;
      cardImg.src = game.background_image;
      cardDiv.classList.add('cardDetail');
      cardImg.classList.add('cardDetailImg');
      cardReleased.textContent = 'Released Date: ' + game.released;
      cardDetails.textContent = `Total Playtime: ${game.playtime} Hours`; 
      cardAdd.textContent = 'Add a Review:';
      cardAdd.style.padding = '20px 0px 0px 0px';
      
      // dynamic form
      const commentForm = document.createElement('form');
      const formInput = document.createElement('input');
      const formSubmit = document.createElement('input');
      formInput.setAttribute('type', 'text');
      formInput.setAttribute('name', 'comment');
      formSubmit.setAttribute('type', 'submit');
      formSubmit.setAttribute('value', 'submit');
      commentForm.append(formInput, formSubmit);
    
      commentForm.addEventListener('submit', event => {
        event.preventDefault();
        const newComment = document.createElement('li');
        console.log(event.target.comment.value);
        newComment.textContent = event.target.comment.value;
        cardComments.appendChild(newComment);
      });
  
      cardContainer.appendChild(cardDiv);
      cardDiv.append(cardTitle, cardImg, cardReleased, cardDetails, cardAdd, commentForm, cardComments);
    });
  });   
} 

// home and title page events
const home = document.querySelector('#home');
const titleSearch = document.querySelector('#search-titles');
home.addEventListener('click', fetchGames);
titleSearch.addEventListener('click', fetchGames);

// my collection event
const myCollection = document.querySelector('#my-collection');
myCollection.addEventListener('click', fetchMyGames);

function fetchMyGames() {
fetch(`http://localhost:3000/games/`)
  .then(res => res.json())
  .then(data => {
    cardContainer.innerHTML = '';
    data.map(games => renderMyCards(games))
  })
  .catch(error => console.log('error', error)); 
} 

function renderMyCards(games) {
    const cardDiv = document.createElement('div');
    const cardTitle = document.createElement('p');
    const cardImg = document.createElement('img');
    const deleteBtn = document.createElement('button');

    cardTitle.textContent = games.title;
    cardImg.src = games.image;
    cardDiv.classList.add('cardDefault');
    cardImg.classList.add('cardImg');
    deleteBtn.textContent = 'Delete From Collection';
    deleteBtn.classList.add('delete-button');
    deleteBtn.addEventListener('click', handleDelete);

    cardContainer.appendChild(cardDiv);
    cardDiv.append(cardTitle, cardImg, deleteBtn);
};

function handleDelete(event) {
  fetch(`http://localhost:3000/games/`) 
    .then(res => res.json())
    .then(data => {
      const deleteSearch = event.target.parentElement.firstChild.textContent;

      data.find(game => {
        if(game.title === deleteSearch){
          fetch(`http://localhost:3000/games/${game.id}`, 
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });
        };
      });
    });
};

