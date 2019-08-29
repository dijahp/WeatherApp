var weatherCard = [];
var city;

// render function

function renderWeather(location) {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth();
  var type = location.weather[0].main;

  return `
          <h3 class="cityname">${location.name}</h3>
          <h4 class="weather-main">${location.weather[0].main}</h4>
 
           <p class="temperature"> ${location.main.temp}&degF</p>
           <p class="today-date">${location.weather[0].description}</p>
           <div class="button-container">
           <button class="see-more">See More</button>
         `;
}

document.addEventListener("submit", function(e) {
  e.preventDefault();
  var searchbar = document.querySelector(".search-bar").value;
  city = searchbar.substr(0, searchbar.indexOf(","));

  axios
    .get(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=imperial&appid=8e9a4b4545a680355a95d6c810a6f708"
    )
    .then(function(response) {
      var type = response.data.weather[0].main;
      console.log(response.data);

      var container = document.querySelector(".weather-cards");
      let newWeather = document.createElement("div");
      newWeather.className = "weather-card";
      newWeather.innerHTML = renderWeather(response.data);
      newWeather;
      container.appendChild(newWeather);
      return response;
    })
    .then(function(response) {
      let c = document.getElementsByClassName("cityname");
      let lastElem = c[c.length - 1];
      lastElem.style.backgroundImage =
        "url('/styles/img/" + response.data.weather[0].main + ".jpg')";
    });
});