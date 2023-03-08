let moviesArray = [];
let aside = document.querySelector(".sidebar");

let newMovieButton = document.querySelector(".add-new-movie");
newMovieButton.addEventListener("click", createFormSection);

let toWatchList = document.querySelector(".to-watch-list");

function Movie(title, releaseDate, isWatched, rating) {
  this.title = title;
  this.releaseDate = releaseDate;
  this.isWatched = isWatched;
  this.rating = rating;
}

function addMovieToArray() {
  let title = document.getElementById("title").value;
  let releaseDate = document.getElementById("year").value;
  let isWatched = document.getElementById("is-watched").checked;
  let rating = document.getElementById("stars").value;

  let newMovie = new Movie(title, releaseDate, isWatched, rating);
  moviesArray.push(newMovie);
}

function createListItem(movie) {
  let newListItem = document.createElement("li");
  let newIndex = moviesArray.length-1;
  newListItem.setAttribute("data-index", newIndex);
  newListItem.addEventListener("click", () => {
    showInfo(moviesArray[newIndex]);
  })
  let newH3 = document.createElement("h3");
  newH3.textContent = movie.title;
  newListItem.append(newH3);

  let newReleaseDate = document.createElement("span");
  newReleaseDate.classList.add("year");
  if (movie.releaseDate != "") {
    newReleaseDate.textContent = ` (${movie.releaseDate})`;
  }
  newH3.append(newReleaseDate);

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

function createFormSection() {
  clearAside();
  let h2 = document.createElement("h2");
  h2.textContent = "New movie";

  let form = document.createElement("form");
  form.classList.add("movie-form");

  let ul = document.createElement("ul");

  for (let i = 0; i < 4; i++) {
    let li = document.createElement("li");
    let label = document.createElement("label");
    let input = document.createElement("input");
    if (i == 0) {
      label.setAttribute("for", "title");
      label.textContent = "Title: ";
      input.setAttribute("id", "title");
      input.setAttribute("type", "text");
    } else if (i == 1) {
      label.setAttribute("for", "year");
      label.textContent = "Release date: ";
      input.setAttribute("id", "year");
      input.setAttribute("type", "number");
    } else if (i == 2) {
      label.setAttribute("for", "is-watched");
      label.textContent = "I watched it ";
      input.setAttribute("id", "is-watched");
      input.setAttribute("type", "checkbox");
    } else if (i == 3) {
      label.setAttribute("for", "stars");
      label.textContent = "Rating";
      input.setAttribute("id", "stars");
      input.setAttribute("type", "number");
    }
    li.append(label, input);
    ul.append(li);
  }
  form.append(ul);
  aside.append(h2);
 

  let formButtonsDiv = document.createElement("div");
  formButtonsDiv.classList.add("form-buttons"); 

  let discardChangesButton = document.createElement("button");
  discardChangesButton.classList.add("discard-changes");
  discardChangesButton.setAttribute("type", "button");
  let spanOne = document.createElement("span");
  spanOne.classList.add("material-icons");
  spanOne.textContent = "delete";
  discardChangesButton.append(spanOne, " Cancel");

  discardChangesButton.addEventListener("click", clearAside);
  

  let saveMovieButton = document.createElement("button");
  saveMovieButton.classList.add("save-movie");
  saveMovieButton.setAttribute("type", "button");
  let spanTwo = document.createElement("span");
  spanTwo.classList.add("material-icons");
  spanTwo.textContent = "bookmark_add";
  saveMovieButton.append(spanTwo, "Save");

  saveMovieButton.addEventListener("click", () => {
    if (document.getElementById("title").value != "") {
      addMovieToArray(); 
      createListItem(moviesArray[moviesArray.length-1]);
    }
  });
  
  formButtonsDiv.append(discardChangesButton, saveMovieButton);
  form.append(formButtonsDiv);
  aside.append(form);
}

function showInfo(item) {
  clearAside();
  let h2 = document.createElement("h2");
  h2.textContent = item.title;

  let form = document.createElement("form");
  form.classList.add("movie-form");

  let ul = document.createElement("ul");

  for (let i = 0; i < 4; i++) {
    let li = document.createElement("li");
    let label = document.createElement("label");
    let input = document.createElement("input");
    if (i == 0) {
      label.setAttribute("for", "title");
      label.textContent = "Title: ";
      input.setAttribute("id", "title");
      input.setAttribute("type", "text");
      input.value = item.title;
    } else if (i == 1) {
      label.setAttribute("for", "year");
      label.textContent = "Release date: ";
      input.setAttribute("id", "year");
      input.setAttribute("type", "number");
      input.value = item.releaseDate;
    } else if (i == 2) {
      label.setAttribute("for", "is-watched");
      label.textContent = "I watched it ";
      input.setAttribute("id", "is-watched");
      input.setAttribute("type", "checkbox");
      if (item.isWatched) input.checked = true;
    } else if (i == 3) {
      label.setAttribute("for", "stars");
      label.textContent = "Rating";
      input.setAttribute("id", "stars");
      input.setAttribute("type", "number");
      input.value = item.rating;
    }
    li.append(label, input);
    ul.append(li);
  }
  form.append(ul);
  aside.append(h2);
 

  let formButtonsDiv = document.createElement("div");
  formButtonsDiv.classList.add("form-buttons"); 

  let deleteItemButton = document.createElement("button");
  deleteItemButton.classList.add("discard-changes");
  deleteItemButton.setAttribute("type", "button");
  let spanOne = document.createElement("span");
  spanOne.classList.add("material-icons");
  spanOne.textContent = "delete";
  deleteItemButton.append(spanOne, " Delete");

  deleteItemButton.addEventListener("click", clearAside);
  deleteItemButton.addEventListener("click", () => {
    let itemToDelete = document.querySelector(`[data-index='${moviesArray.indexOf(item)}']`);
    console.log(itemToDelete);
    itemToDelete.remove();
    // moviesArray.splice(moviesArray.indexOf(item), 1);
  })
  

  let editButton = document.createElement("button");
  editButton.classList.add("save-movie");
  editButton.setAttribute("type", "button");
  let spanTwo = document.createElement("span");
  spanTwo.classList.add("material-icons");
  spanTwo.textContent = "bookmark_add";
  editButton.append(spanTwo, " Edit");

  // editButton.addEventListener("click", () => {
  //   if (document.getElementById("title").value != "") {
    
  // });
  
  formButtonsDiv.append(deleteItemButton, editButton);
  form.append(formButtonsDiv);
  aside.append(form);
}

function clearAside() {
  aside.innerHTML = "";
}

