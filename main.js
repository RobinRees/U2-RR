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