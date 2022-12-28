window.onload = () => {
    const movieId = localStorage.getItem('editMovie');
    fetch('http://localhost:3001/api/movies/' + movieId)
    .then(response => 
    {
      response.json()
        .then(result => renderForm(result.data))
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
}

function renderForm(movie)
{
    const formatDate = (date) =>
    {
        //* Thanks StackOverflow
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return [year, month, day].join('-');
    }
    
    const title = document.querySelector('#title');
    const rating = document.querySelector('#rating');
    const awards = document.querySelector('#awards');
    const releaseDate = document.querySelector('#release_date');
    const length = document.querySelector('#length');

    title.value = movie.title;
    rating.value = movie.rating;
    awards.value = movie.awards;
    releaseDate.value = formatDate(movie.release_date);
    length.value = movie.length;

    document.querySelector('#editButton').addEventListener('click', e =>
    {
        const data = {
            title: title.value,
            rating: rating.value,
            awards: awards.value,
            release_date: releaseDate.value,
            length: length.value
        }

        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }

        fetch('http://localhost:3001/api/movies/update/' + movie.id, options)
        .then(response => 
        {
            response.json()
                .then(result => {
                    const homeUrl = window.location.href.substring(0, window.location.href.lastIndexOf('/')) + '/home.html';
                    window.location.href = homeUrl;
                })
                .catch(error => {
                    console.log(error)
                })
        })
        .catch(error => console.log(error))
    });

    document.querySelector('#deleteButton').addEventListener('click', e =>
    {
        const options = { method: 'DELETE' }

        fetch('http://localhost:3001/api/movies/delete/' + movie.id, options)
        .then(response => 
        {
            response.json()
                .then(result => {
                    //! Deleting fav if exists in there
                    const favs = JSON.parse(localStorage.getItem('favs'));
                    if(favs && Array.isArray(favs) && favs.includes(movie.id))
                    {
                        favs.splice(favs.indexOf(movie.id), 1);
                        localStorage.setItem('favs', JSON.stringify(favs))
                    }

                    const homeUrl = window.location.href.substring(0, window.location.href.lastIndexOf('/')) + '/home.html';
                    window.location.href = homeUrl;
                })
                .catch(error => {
                    console.log(error)
                })
        })
        .catch(error => console.log(error))
    });
}