let moviesArray = [];

let toWatchList = document.querySelector(".to-watch-list");

function Movie(title, releaseDate, isWatched, rating) {
  this.title = title;
  this.releaseDate = releaseDate;
  this.isWatched = isWatched;
  this.rating = rating;
}

let saveChangesButton = document.querySelector(".save-movie");
let discardChangesButton = document.querySelector(".discard-changes");

saveChangesButton.addEventListener("click", () => {
  if (document.getElementById("title").value != "") {
    saveMovie(); 
    createListItem(moviesArray[moviesArray.length-1]);
  }
});

function saveMovie() {
  let title = document.getElementById("title").value;
  let releaseDate = document.getElementById("year").value;
  let isWatched = document.getElementById("is-watched").checked;
  let rating = document.getElementById("stars").value;

  let newMovie = new Movie(title, releaseDate, isWatched, rating);
  moviesArray.push(newMovie);
}

function createListItem(movie) {
  let newListItem = document.createElement("li");

  let newH3 = document.createElement("h3");
  newH3.textContent = movie.title;
  newListItem.appendChild(newH3);

  let newReleaseDate = document.createElement("span");
  newReleaseDate.classList.add("year");
  if (movie.releaseDate != "") {
    newReleaseDate.textContent = ` (${movie.releaseDate})`;
  }
  newH3.appendChild(newReleaseDate);

  let ratingDiv = document.createElement("div");
  ratingDiv.classList.add("rating");
  ratingDiv.textContent = movie.rating;
  newListItem.appendChild(ratingDiv);

  let starSpan = document.createElement("span");
  starSpan.classList.add("material-icons");
  if (movie.rating != "") {
    starSpan.textContent = "star";
  }
  ratingDiv.appendChild(starSpan);
  
  toWatchList.appendChild(newListItem);
}


