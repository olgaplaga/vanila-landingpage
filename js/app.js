//https://www.youtube.com/watch?v=fSTQzlprGLI

//DOM elements import
const time = document.getElementById("time");
const greeting = document.getElementById("greeting");
const name = document.getElementById("name");
const focus = document.getElementById("focus");
const weather = document.getElementById("weather");
const weatherPlace = document.getElementById('weather-place')
const dateTime = document.getElementById("date")
const api = "a4c1dcf658b5b247c8ec980651823f4c";



//Show Time
function showTime() {
  let today = new Date();
  let hours = today.getHours();

  //i dont use this two
//   let minutes = today.getMinutes();
//   let seconds = today.getSeconds();

  //Am or PM - can use it but i will not
//   const amPM = hours >= 12 ? "PM" : "AM";

  //12hr format - can use it but i will not
//   hours = hours % 12 || 12;

  //Output time
  time.textContent = today.toLocaleTimeString();

  //below two options with PM - i will not use it
  //   time.innerHTML = `${hours}<span>:</span>${minutes}<span>:</span>${seconds}`
  //   time.textContent = `${hours}:${addZero(minutes)}:${addZero(seconds)} ${amPM}`

  setTimeout(showTime, 1000);
}

//add zeros - i dont use it as well
// function addZero(n) {
//   return (parseInt(n, 10) < 10 ? "0" : "") + n;
// }

//Set Background and greeting
function setBgGreeting() {
  let today = new Date();

  let hours = today.getHours();
  if (hours < 12) {
    document.body.style.backgroundImage =
      "url('https://jooinn.com/images/misty-morning-5.jpg')";
    document.body.style.backgroundSize = "cover";

    greeting.textContent = "Good Morning";
  } else if (hours < 18) {
    document.body.style.backgroundImage =
      "url('https://images.unsplash.com/photo-1560093230-101306845069?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80')";
    document.body.style.backgroundSize = "cover";
    greeting.textContent = "Good Afternoon";
  } else {
    document.body.style.backgroundImage =
      "url('https://wallpapersmug.com/download/3840x2400/2fa40a/starry-sky-night-mountians-5k.jpg')";
    document.body.style.color = "white";
    document.body.style.backgroundSize = "cover";
    greeting.textContent = "Good Evening";
  }
}

//saving name and greeting to a local storage
function getName() {
  if (localStorage.getItem("name") === null) {
    name.textContent = "[Enter your name]";
  } else {
    name.textContent = localStorage.getItem("name");
  }
}

function getFocus() {
  if (localStorage.getItem("focus") === null) {
    focus.textContent = "[Enter focus]";
  } else {
    focus.textContent = localStorage.getItem("focus");
  }
}
function setName(event) {
  if (event.type === "keypress") {
    //make sure enter is pressed ( enter - code 13)
    if (event.which == 13 || event.keyCode == 13) {
      localStorage.setItem("name", event.target.innerText);
      name.blur();
    }
    //saves to local storage when it is blured
  } else {
    localStorage.setItem("name", event.target.innerText);
  }
}

function setFocus(event) {
  if (event.type === "keypress") {
    //make sure enter is pressed ( enter - code 13)
    if (event.which == 13 || event.keyCode == 13) {
      localStorage.setItem("focus", event.target.innerText);
      focus.blur();
    }
    //saves to local storage when it is blured
  } else {
    localStorage.setItem("focus", event.target.innerText);
  }
}

//weather and location
function showWeather() {
  let long;
  let lat;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric`;
      fetch(base)
        .then((response) => {
          return response.json();
        })
        .then((weatherData) => {
          const { temp } = weatherData.main;
          const location = weatherData.name;

          weather.textContent = `${temp.toFixed(0)} °C`
          weatherPlace.textContent = `${location}`
        });
    });
  }
}

function showDate() {
    let date = new Date()
    dateTime.textContent = date.toLocaleDateString();
}

//saving the text when user press key or click outside text field
name.addEventListener("keypress", setName);
name.addEventListener("blur", setName);
focus.addEventListener("keypress", setFocus);
focus.addEventListener("blur", setFocus);
window.addEventListener("load", showWeather);
window.addEventListener("load", showDate);



//Run functions
setBgGreeting();
showTime();
getName();
getFocus();
setName();
