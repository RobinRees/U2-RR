"use strict";


function renderMovie(movie) {
    let div = document.createElement("div"); //Deklarerar div och säger att den ska skapa ett "div" element i HTML
    div.classList.add("movie"); //diven som skapas får classen: "movie"
    div.id = movie.id; // diven som skapas får obejetet .id


    //den div vi skapar får följande HTML kod i sig. ${movie.X} betyder att det ska stå vad det gör i just det minnet av arrayen.
    div.innerHTML = ` 
    <div>${movie.title}</div>
    <div>${movie.director}</div>
    <div>${movie.imdbRating}</div>
    <div>${movie.releaseYear}</div>
    <button type="button">Remove</button>
    `;
    return div;
}

function renderMovies(movies) {

    let moviesElement = document.getElementById("movies"); //Deklarerar moviesElement som nu selectar id:t movies i html.
    moviesElement.innerHTML = ""; // MoviesElement kommer ha inner HTML som är tomt varje gång det uppdateras så att det inte blir dubbelt.

    // Denna skapar en loop som sen renderar alla filmer i arrayen (database) och lägger dem under id:t "movies".
    for (let movie of movies) {
        let movieElement = renderMovie(movie);
        moviesElement.appendChild(movieElement);
    } 

}


// --------------

// Här skapar jag en ny film och sen tar tillbaka det
function createNewMovie(title, director, imdbRating, releaseYear) {
    let movie = {
        title: title,
        director: director,
        imdbRating: imdbRating,
        releaseYear: releaseYear,
    }

    return movie;
}

// Sen skickar jag den filmen jag skapat till database (arrayen)
function addMovieToDatabase(database, movie) {
    database.push(movie);
}

/* prova genoma att skriva i konsollen: 
let filmensTitel = createNewMovie("title", "director", 1, 1);
addMovieToDatabase(database, filmensTitel)
renderMovies(database)
*/







renderMovies(database)