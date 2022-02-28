"use strict";


// Denna ska skapa en ny film 
function createNewMovie (title, director, imdbScore, year) {
    let movie = {
        title: title,
        director: director,
        imdbScore: imdbScore,
        year: year,
    };
    return movie;
}

function addMovieToDatabase(database, movie) {
    database.push(movie);
}


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

    let moviesElement = document.getElementById("movies");
    moviesElement.innerHTML = "";


    for (let movie of movies) {
        let movieElement = renderMovie(movie);
        moviesElement.appendChild(movieElement);
    }




}

renderMovies(database)

