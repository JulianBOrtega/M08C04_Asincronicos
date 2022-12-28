window.onload = () => {
  //* Creando favs si no existen
  if(localStorage.getItem('favs') == null || !Array.isArray(JSON.parse(localStorage.getItem('favs'))))
    localStorage.setItem('favs', JSON.stringify([]));
  
  checkFavs();

  //* Aqui debemos agregar nuestro fetch
  fetch('http://localhost:3001/api/movies')
    .then(response => 
    {
      response.json()
        .then(result => renderMovies(result))
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
};


function renderMovies(peliculas)
{
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  let data = peliculas.data;
  data.forEach((movie) => {
    const card = document.createElement("div");
    card.setAttribute("class", "card");

    const h1 = document.createElement("h1");
    h1.textContent = movie.title;

    //! Ya que PG no agregó las estrellas, las agregaré yo mismo lol
    h1.innerHTML += `
    <button id="${movie.id}-star" 
      onclick="toggleFav(${movie.id})" 
      style="border: none; background-color: transparent; font-size: 24px; cursor:pointer; color: gold;"
      >${findFav(movie.id) ? '★' : '☆'}</button>
    `;

    const p = document.createElement("p");
    p.textContent = `Rating: ${movie.rating}`;

    const duracion = document.createElement("p");
    duracion.textContent = `Duración: ${movie.length}`;

    container.appendChild(card);
    card.appendChild(h1);
    card.appendChild(p);
    if (movie.genre !== null) {
      const genero = document.createElement("p");
      genero.textContent = `Genero: ${movie.genre.name}`;
      card.appendChild(genero);
    }
    card.appendChild(duracion);

    card.innerHTML += `<button class='editButton' onclick='editMovie(${movie.id})'>Editar película</button>`;
  });
}

//! Edit button redirect
function editMovie(id)
{
  localStorage.setItem('editMovie', id);
  const editUrl = window.location.href.substring(0, window.location.href.lastIndexOf('/')) + '/formEdit.html'; 
  window.location.href = editUrl;
}

//! Favs
function checkFavs()
{
  const favs = JSON.parse(localStorage.getItem('favs'));
  const favLink = document.querySelector('#favsButton');

  console.log(favs);
  (favs && favs.length > 0) ? favLink.style.display = 'block' : favLink.style.display = 'none';
}

function findFav(id) 
{ 
  const favs = JSON.parse(localStorage.getItem('favs'))
  return favs.includes(id); 
}

function storeFav(id) 
{ 
  const favs = JSON.parse(localStorage.getItem('favs'));
  favs.push(id);
  localStorage.setItem('favs', JSON.stringify(favs));
}

function removeFav(id)  
{
  if(!findFav(id)) return;

  let favs = JSON.parse(localStorage.getItem('favs'));
  favs.splice(favs.indexOf(id), 1);
  localStorage.setItem('favs', JSON.stringify(favs));
}

function toggleFav (id)
{
  if(findFav(id))
  {
    removeFav(id);
    document.getElementById(id + '-star').textContent = '☆';
  }
  else
  {
    storeFav(id);
    document.getElementById(id + '-star').textContent = '★';
  }

  checkFavs();
}