'use strict'

// Min github länk:
// https://github.com/RobinRees/U2-RR.git


function renderMovie (movie) {
  let li = document.createElement('li') //Deklarerar div och säger att den ska skapa ett "div" element i HTML
  li.classList.add('movie') //diven som skapas får classen: "movie"
  li.id = movie.id // diven som skapas får obejetet .id

  //den div vi skapar får följande HTML kod i sig. ${movie.X} betyder att det ska stå vad det gör i just det minnet av arrayen.
  li.innerHTML = ` 
    <li>${movie.title}</li>
    <div>${movie.director}</div>
    <div>${movie.imdbRating}</div>
    <div>${movie.releaseYear}</div>
    <button type="button">Remove</button>
    `
  return li
}

function renderMovies (movies) {
  let moviesElement = document.getElementById('movies') //Deklarerar moviesElement som nu selectar id:t movies i html.
  moviesElement.innerHTML = '' // MoviesElement kommer ha inner HTML som är tomt varje gång det uppdateras så att det inte blir dubbelt.

  // Denna skapar en loop som sen renderar alla filmer i arrayen (database) och lägger dem under id:t "movies".
  for (let movie of movies) {
    let movieElement = renderMovie(movie)
    moviesElement.appendChild(movieElement)
  }
  setRemoveMovies()
}

// --------------

// Här skapar jag en ny film och sen tar tillbaka det
function createNewMovie (title, director, imdbRating, releaseYear) {
  let movie = {
    title: title,
    director: director,
    imdbRating: imdbRating,
    releaseYear: releaseYear
  }

  return movie
}

// Sen skickar jag den filmen jag skapat till database (arrayen)
// adda även en confirmation till att lägga till filmer
function addMovieToDatabase (database, movie) {
  let addMovieConfirmation = confirm(
    `Do you want to add ${movie.title} to the list of awesome Steven Seagall movies?`
  )

  if (addMovieConfirmation) {
    database.push(movie)
  }
}

/* prova genoma att skriva i konsollen: 
let filmensTitel = createNewMovie("title", "director", 1, 1);
addMovieToDatabase(database, filmensTitel)
renderMovies(database)
*/

function onAddMovieSubmit (event) {
  event.preventDefault()
  //deklarerar olika variablar och säger att dem ska hitta elementet med id (title)... Dvs inputen i formuläret i HTML
  let title = document.getElementById('title').value
  let director = document.getElementById('director').value
  let imdbRating = Number(document.getElementById('imdbRating').value)
  let releaseYear = Number(document.getElementById('releaseYear').value)
  // ger dig ett meddelande om att du glömt skriva in viktig information och väljer att inte lägga till filmen.

  if (title == '') {
    return alert('Please fill in all the necessary information')
  } else if (director == '') {
    return alert('Please fill in all the necessary information')
  } else if (imdbRating == '') {
    return alert('Please fill in all the necessary information')
  } else if (releaseYear == '') {
    return alert('Please fill in all the necessary information')
  }

  let movie = createNewMovie(title, director, imdbRating, releaseYear)

  // följande id får nya hunden
  movie.id = database[database.length - 1].id + 1

  addMovieToDatabase(database, movie)
  renderMovies(database)

  // Gör alla tomma efter man skrivit in vad man vill ha
  let form = document.getElementById('add-new-movie')
  form.reset()
}

function setAddMovie () {
  let form = document.getElementById('add-new-movie')
  form.addEventListener('submit', onAddMovieSubmit)
}

// Här över är mina funktioner för att adda filmer från formuläret

//Här är mina funktioner för att ta bort en film från listan genom att trycka på knappen (remove)
function removeMovieById (movies, id) {
  for (let i = 0; i < movies.length; i++) {
    let movie = movies[i]

    if (movie.id == id) {
      movies.splice(i, 1)
      return
    }
  }
}

// När någon klickar på knappen ska detta hända
function clickToRemoveMovie (event) {
  let button = event.target
  let id = button.parentElement.id

  //Kör funktionen removeMovieById om man trycker "yes" i confirmation rutan som kommer upp när man trycker.
  //Annars så händer inget
  if (
    confirm('Are you sure you want to remove this movie from the list?') == true
  ) {
    removeMovieById(database, id)
  } else return false

  renderMovies(database)
}

// lägger till eventet så att det hamnar på alla knappar för att ta bort filmen
function setRemoveMovies () {
  let buttons = document.querySelectorAll('.movie button')

  for (let button of buttons) {
    button.addEventListener('click', clickToRemoveMovie)
  }
}

// här över är ta bort funtkionen

// Funktion för att filtrera filmer efter film titlar
function getByMovieTitle (movies, title) {
  let movieByTitle = []

  for (let movie of movies) {
    if (movie.title.toLowerCase() == title.toLowerCase()) {
      movieByTitle.push(movie)
    }
  }
  return movieByTitle
}

function filterMovieTitle (event) {
  event.preventDefault()

  let title = document.getElementById('filter-title').value

  let movies = getByMovieTitle(database, title)

  renderMovies(movies)
}

//Funktioner för att filtrera filmer efter director
function getByMovieDirector (movies, director) {
  let movieByDirector = []

  for (let movie of movies) {
    if (movie.director.toLowerCase() == director.toLowerCase()) {
      movieByDirector.push(movie)
    }
  }
  return movieByDirector
}

function filterMovieDirector (event) {
  event.preventDefault()

  let director = document.getElementById('filter-director').value

  let movies = getByMovieDirector(database, director)

  renderMovies(movies)
}

//Funktioner för att filtrera efter IMDB - Rating

function getByMovieRating (movies, imdbRating) {
  let movieByRating = []

  for (let movie of movies) {
    if (movie.imdbRating == imdbRating) {
      movieByRating.push(movie)
    }
  }
  return movieByRating
}

function filterImdbRating (event) {
  event.preventDefault()

  let imdbRating = document.getElementById('filter-rating').value

  let movies = getByMovieRating(database, imdbRating)

  renderMovies(movies)
}

//Funktioner för att filtrera efter release Year
function getByReleaseYear (movies, releaseYear) {
  let movieByReleaseYear = []

  for (let movie of movies) {
    if (movie.releaseYear == releaseYear) {
      movieByReleaseYear.push(movie)
    }
  }
  return movieByReleaseYear
}

function filterByYear (event) {
  event.preventDefault()

  let releaseYear = document.getElementById('filter-release').value
  let movies = getByReleaseYear(database, releaseYear)

  renderMovies(movies)
}

// Clear filter funktion nedan.
// Denna tömmer rutorna med text och renderar filmerna i database
function setClearFilters () {
  document.getElementById('filter-release').value = ''
  document.getElementById('filter-rating').value = ''
  document.getElementById('filter-title').value = ''
  document.getElementById('filter-director').value = ''

  renderMovies(database)
}

// Sätter filter funktionerna i spinn.
function setFilterMovies () {
  let titleForm = document.getElementById('filter-by-title')
  let directorForm = document.getElementById('filter-by-director')
  let ratingForm = document.getElementById('filter-by-rating')
  let releaseYear = document.getElementById('filter-by-release')
  let clearFilters = document.getElementById('clear-filters')

  titleForm.addEventListener('submit', filterMovieTitle)
  directorForm.addEventListener('submit', filterMovieDirector)
  ratingForm.addEventListener('submit', filterImdbRating)
  releaseYear.addEventListener('submit', filterByYear)
  clearFilters.addEventListener('click', setClearFilters)
}

setAddMovie()
renderMovies(database)
setFilterMovies()
