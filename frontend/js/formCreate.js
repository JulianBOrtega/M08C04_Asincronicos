window.onload = () => {
    document.querySelector('#createButton').addEventListener('click', e =>
    {
        const data = {
            title: document.querySelector('#title').value,
            rating: document.querySelector('#rating').value,
            awards: document.querySelector('#awards').value,
            release_date: document.querySelector('#release_date').value,
            length: document.querySelector('#length').value
        }

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }

        fetch('http://localhost:3001/api/movies/create/', options)
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
}