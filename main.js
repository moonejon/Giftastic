var musicians = [
  "Justin Timberlake",
  "Paul McCartney",
  "Adele",
  "Weird Al Yankovic",
  "Taylor Swift",
  "John Legend",
  "Shakira"
];
var buttonDiv = document.getElementById("buttons");

//Event Listeners
function clearElement(elementID) {
  document.getElementById(elementID).innerHTML = "";
}
function createButtons() {
  for (var i = 0; i < musicians.length; i++) {
    var btn = document.createElement("button");
    btn.innerText = musicians[i];
    btn.setAttribute("data-person", musicians[i]);
    btn.setAttribute("Id", "btnGif");
    btn.addEventListener("click", gifQuery);
    buttonDiv.appendChild(btn);
  }
}
createButtons();

function handleInput(event) {
  var searchField = document.getElementById("searchInput");
  if (!musicians.includes(searchField.value) && searchField.value != "") {
    musicians.push(searchField.value);
    var btn = document.createElement("button");
    btn.innerText = searchField.value;
    btn.setAttribute("data-person", searchField.value);
    btn.setAttribute("Id", "btnGif");
    btn.addEventListener("click", gifQuery);

    buttonDiv.appendChild(btn);
  }
  event.preventDefault();
}

document.getElementById("searchAction").addEventListener("click", handleInput);

function gifQuery() {
  var searchString = this.getAttribute("data-person");

  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    searchString +
    "&api_key=dc6zaTOxFJmzC&rating=R&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var results = response.data;

    var gifsContainer = document.getElementById("gifs-go-here");
    clearElement("gifs-go-here");

    for (var i = 0; i < results.length; i++) {
      var gifDiv = document.createElement("div");
      gifDiv.setAttribute("class", "gifDiv");
      var p = document.createElement("p");
      var rating = results[i].rating;
      p.textContent = rating;
      var personImage = document.createElement("img");
      personImage.addEventListener("click", pauseGif);
      personImage.setAttribute(
        "src",
        results[i].images.fixed_height_small_still.url
      );
      personImage.setAttribute(
        "data-still",
        results[i].images.fixed_height_small_still.url
      );
      personImage.setAttribute("data-state", "still");
      personImage.setAttribute(
        "data-animate",
        results[i].images.fixed_height_small.url
      );
      gifDiv.appendChild(personImage);
      gifDiv.appendChild(p);

      gifsContainer.appendChild(gifDiv);
    }
  });
}

function pauseGif() {
  var imgElement = this;
  var state = imgElement.getAttribute("data-state");

  if (state === "still") {
    var imgAnimate = imgElement.getAttribute("data-animate");
    imgElement.setAttribute("src", imgAnimate);
    imgElement.setAttribute("data-state", "animate");
  } else if (state === "animate") {
    var imgStill = imgElement.getAttribute("data-still");
    imgElement.setAttribute("src", imgStill);
    imgElement.setAttribute("data-state", "still");
  }
}
