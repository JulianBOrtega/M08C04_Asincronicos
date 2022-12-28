window.onload = () => {
  //* Aqui debemos agregar nuestro fetch
  fetch('http://localhost:3001/api/movies')
    .then(response => 
    {
      response.json()
        .then(result => 
        {
          const favStorage = JSON.parse(localStorage.getItem('favs'));
          const favs = result.data.filter((movie) => favStorage.includes(movie.id));

          if(!favs || favs.length < 1)
          {
            document.querySelector('#root').innerHTML += '<h2 style="text-align: center;">¿Qué haces aquí? ¡No tienes películas favoritas!</h2>'
          }
          renderMovies(favs);
         })
         .catch(error => console.log(error))
    })
    .catch(error => console.log(error));
};


function renderMovies(data)
{
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  data.forEach((movie) => {
    const card = document.createElement("div");
    card.setAttribute("class", "card");

    const h1 = document.createElement("h1");
    h1.textContent = movie.title;

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
  });
}

//! Favs
if(localStorage.getItem('favs') == null || !Array.isArray(JSON.parse(localStorage.getItem('favs'))))
  localStorage.setItem('favs', JSON.stringify([]));