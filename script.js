let moviesArray = [];
let toWatchList = document.querySelector(".to-watch-list");
let aside = document.querySelector(".sidebar");
let sortMode = "";

function Movie(title, releaseDate, isWatched, rating, index) {
  this.title = title;
  this.releaseDate = releaseDate;
  this.isWatched = isWatched;
  this.rating = rating;
  this.index = index;
}

let newMovieButton = document.querySelector(".add-new-movie");
newMovieButton.addEventListener("click", () => {
  clearAside();
  createFormSection();
});

function updateDisplay() {
  if (sortMode == "") {
    sortByIndex(moviesArray);
  }
	if (sortMode == "title") {
	  sortByTitle(moviesArray);
	}
	if (sortMode == "year") {
	  sortByReleaseDate(moviesArray);
	}
  if (sortMode == "isWatched") {
    sortByIsWatched(moviesArray);
  }
  if (sortMode == "rating") {
    sortByRating(moviesArray);
  }
  clearDisplay();
  moviesArray.forEach(movie => createListItem(movie, moviesArray.indexOf(movie)));
}

function createFormSection(movie = undefined) {
  clearAside();
  let h2 = document.createElement("h2");
  if (movie == undefined) {
    h2.textContent = "New movie";
  } else {
    h2.textContent = movie.title;
  }
  let form = document.createElement("form");
  form.classList.add("movie-form");
  let ul = document.createElement("ul");

  for (let i = 0; i < 4; i++) {
    let li = document.createElement("li");
    let label = document.createElement("label");
    let input = document.createElement("input");
    if (i == 0) {
      label.setAttribute("for", "title");
      label.textContent = "Title*: ";
      input.setAttribute("id", "title");
      input.setAttribute("type", "text");
      if (movie != undefined) input.value = movie.title;
    } else if (i == 1) {
      label.setAttribute("for", "year");
      label.textContent = "Release date: ";
      input.setAttribute("id", "year");
      input.setAttribute("type", "number");
      if (movie != undefined) input.value = movie.releaseDate;
    } else if (i == 2) {
      label.setAttribute("for", "is-watched");
      label.textContent = "I watched it ";
      input.setAttribute("id", "is-watched");
      input.setAttribute("type", "checkbox");
      if (movie != undefined) {
        if (movie.isWatched) input.checked = true;
      }
    } else if (i == 3) {
      label.setAttribute("for", "stars");
      label.textContent = "Rating";
      input.setAttribute("id", "stars");
      input.setAttribute("type", "number");
      if (movie != undefined) input.value = movie.rating;
    }
    li.append(label, input);
    ul.append(li);
  }

  let divWithFormButtons = document.createElement("div");
  divWithFormButtons.classList.add("form-buttons"); 

  let buttonToCancel = document.createElement("button");
  buttonToCancel.classList.add("discard-changes");
  buttonToCancel.setAttribute("type", "button");
  let spanOne = document.createElement("span");
  spanOne.classList.add("material-icons");
  spanOne.textContent = "delete";
  buttonToCancel.append(spanOne, " Cancel");
  buttonToCancel.addEventListener("click", clearAside);
  divWithFormButtons.append(buttonToCancel);

  if (movie != undefined) {
    let buttonToDeleteMovie = document.createElement("button");
    buttonToDeleteMovie.classList.add("discard-changes");
    buttonToDeleteMovie.setAttribute("type", "button");
    let spanOne = document.createElement("span");
    spanOne.classList.add("material-icons");
    spanOne.textContent = "delete";
    buttonToDeleteMovie.append(spanOne, " Delete");
    buttonToDeleteMovie.addEventListener("click", () => {
      moviesArray.splice(moviesArray.indexOf(movie), 1);
      clearAside();
      updateDisplay();
    });

    let buttonToEditMovie = document.createElement("button");
    buttonToEditMovie.classList.add("save-movie");
    buttonToEditMovie.setAttribute("type", "button");
    let spanTwo = document.createElement("span");
    spanTwo.classList.add("material-icons");
    spanTwo.textContent = "bookmark_add";
    buttonToEditMovie.append(spanTwo, " Edit");
    buttonToEditMovie.addEventListener("click", () => {
      if (document.getElementById("title").value != "") {
      movie.title = document.getElementById("title").value;
      movie.releaseDate = document.getElementById("year").value;
      movie.isWatched = document.getElementById("is-watched").checked;
      movie.rating = document.getElementById("stars").value;
      updateDisplay();
      clearAside();
      }
    });
    divWithFormButtons.append(buttonToDeleteMovie, buttonToEditMovie);
  } else {
    let buttonToSaveMovie = document.createElement("button");
    buttonToSaveMovie.classList.add("save-movie");
    buttonToSaveMovie.setAttribute("type", "button");
    let spanTwo = document.createElement("span");
    spanTwo.classList.add("material-icons");
    spanTwo.textContent = "bookmark_add";
    buttonToSaveMovie.append(spanTwo, " Save");
    buttonToSaveMovie.addEventListener("click", () => {
    if (document.getElementById("title").value != "") {
      pushMovieToArray();
      clearAside();
      updateDisplay();
    }
  });
  divWithFormButtons.append(buttonToSaveMovie);
  }

  form.append(ul);
  form.append(divWithFormButtons);
  aside.append(h2);
  aside.append(form);
}

function pushMovieToArray() {
  let title = document.getElementById("title").value;
  let releaseDate = document.getElementById("year").value;
  let isWatched = document.getElementById("is-watched").checked;
  let rating = document.getElementById("stars").value;

  let newMovie = new Movie(title, releaseDate, isWatched, rating, moviesArray.length);
  moviesArray.unshift(newMovie);
}

function createListItem(movie, index) {
  let newListItem = document.createElement("li");
  newListItem.setAttribute("data-index", index);
  let newH3 = document.createElement("h3");
  newH3.textContent = movie.title;
  newListItem.append(newH3);
  newListItem.addEventListener("click", () => {
    createFormSection(moviesArray[index]);
  });

  let newReleaseDate = document.createElement("span");
  newReleaseDate.classList.add("year");
  if (movie.releaseDate != "") {
    newReleaseDate.textContent = ` (${movie.releaseDate})`;
  }
  newH3.append(newReleaseDate);

  let newIsWatched = document.createElement("span");
  newIsWatched.classList.add("check", "material-icons");
  if (movie.isWatched) {
    newIsWatched.textContent = "done";
  }
  newListItem.append(newIsWatched);

  let ratingDiv = document.createElement("div");
  ratingDiv.classList.add("rating");
  ratingDiv.textContent = movie.rating;
  newListItem.append(ratingDiv);

  let starSpan = document.createElement("span");
  starSpan.classList.add("material-icons");
  if (movie.rating != "") {
    starSpan.textContent = "star";
  }
  ratingDiv.append(starSpan);
  toWatchList.append(newListItem);
}

function clearDisplay() {
  toWatchList.innerHTML = "";
}

function clearAside() {
  aside.innerHTML = "";
}

function showRecommendations() {
  moviesArray.unshift(new Movie("Breaking Bad", "2008", true, "10", moviesArray.length));
  moviesArray.unshift(new Movie("Fury", "2014", true, "7", moviesArray.length));
  moviesArray.unshift(new Movie("Twilight", "2007", false, "", moviesArray.length));
  moviesArray.unshift(new Movie("Harry Potter", "2001", true, "9", moviesArray.length));
  moviesArray.unshift(new Movie("Drive", "2011", true, "8", moviesArray.length));
}

let buttonToRecommend = document.querySelector(".recommendations-button");
buttonToRecommend.addEventListener("click", () => {
  showRecommendations();
  updateDisplay();
});

let sortingButtons = [];

let buttonToSortByTitle = document.getElementById("sort-title");
sortingButtons.push(buttonToSortByTitle);
buttonToSortByTitle.addEventListener("click", () => {
  if (sortMode != "title") {
    sortMode = "title";
    disableHighlight();
    highlightButton(buttonToSortByTitle);
    console.log("I sort by title now");
  } else {
    sortMode = "";
    disableHighlight();
    console.log("I don't sort now");
  }
  updateDisplay();
})

let buttonToSortByReleaseDate= document.getElementById("sort-year");
sortingButtons.push(buttonToSortByReleaseDate);
buttonToSortByReleaseDate.addEventListener("click", () => {
  if (sortMode != "year") {
    sortMode = "year";
    disableHighlight();
    highlightButton(buttonToSortByReleaseDate);
    console.log("I sort by year now");
  } else {
    sortMode = "";
    disableHighlight();
    console.log("I don't sort now");
  }
  updateDisplay();
})

let buttonToSortByIsWatched = document.getElementById("sort-watched");
sortingButtons.push(buttonToSortByIsWatched);
buttonToSortByIsWatched.addEventListener("click", () => {
  if (sortMode != "isWatched") {
    sortMode = "isWatched";
    disableHighlight();
    highlightButton(buttonToSortByIsWatched);
    console.log("I sort by isWatched now");
  } else {
    sortMode = "";
    disableHighlight();
    console.log("I don't sort now");
  }
  updateDisplay();
})

let buttonToSortByRating = document.getElementById("sort-rating");
sortingButtons.push(buttonToSortByRating);
buttonToSortByRating.addEventListener("click", () => {
  if (sortMode != "rating") {
    sortMode = "rating";
    disableHighlight();
    highlightButton(buttonToSortByRating);
    console.log("I sort by rating now");
  } else {
    sortMode = "";
    disableHighlight();
    console.log("I don't sort now");
  }
  updateDisplay();
})

function sortByIndex(array) {
  array.sort((a, b) => {
    if (a.index > b.index) return -1;
    if (a.index < b.index) return 1;
    return 0;
  });
}

function sortByTitle(array) {
  array.sort((a, b) => {
    if (a.title.toUpperCase() < b.title.toUpperCase()) return -1;
    if (a.title.toUpperCase() > b.title.toUpperCase()) return 1;
    return 0;
  });
}

function sortByReleaseDate(array) {
  array.sort((a, b) => {
    if (+a.releaseDate < +b.releaseDate) return -1;
    if (+a.releaseDate > +b.releaseDate) return 1;
    return 0;
  });
}

function sortByIsWatched(array) {
  array.sort((a, b) => {
    if (a.isWatched < b.isWatched) return -1;
    if (a.isWatched > b.isWatched) return 1;
    return 0;
  });
}

function sortByRating(array) {
  array.sort((a, b) => {
    if (+a.rating > +b.rating) return -1;
    if (+a.rating < +b.rating) return 1;
    return 0;
  });
}

function highlightButton(button) {
  button.style.cssText = "background-color: green;"
}

function disableHighlight() {
  sortingButtons.forEach(element => element.style.cssText = "background-color: #EFEFEF");
}