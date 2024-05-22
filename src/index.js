import "./style.css";
import nightSky from "../Images/backgroundImages/NightSky.jpeg";
import dawnSky from "../Images/backgroundImages/dawnSky.jpeg";
import sunnySky from "../Images/backgroundImages/sunnySky.jpeg";
import sunsetSky from "../Images/backgroundImages/sunsetSky.jpeg";

const tempConversionBtn = document.getElementById("tempConversionBtn");
tempConversionBtn.addEventListener("click", () => {
  const celSpan = document.getElementById("celSpan");
  const fahSpan = document.getElementById("fahSpan");

  if (celSpan.classList.contains("active")) {
    celSpan.classList.remove("active");
    fahSpan.classList.add("active");
  } else {
    fahSpan.classList.remove("active");
    celSpan.classList.add("active");
  }
  changeTempUnit();
});

const citySearchInput = document.querySelector(
  "div.searchBar input#citySearch"
);
const searchBtn = document.querySelector("div.searchBar button.searchBtn");
const searchErrorMessage = document.querySelector("div.searchErrorMessage");

citySearchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    searchBtn.click();
  }
});

searchBtn.addEventListener("click", () => {
  if (citySearchInput.value === "") {
    searchErrorMessage.innerText = "Please enter a valid city.";
    return;
  }
  weatherAPI.searchCity(citySearchInput.value);
});

const weatherAPI = (function () {
  async function searchCity(input) {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=dd52c3dfc99546429a7162039242804&days=3&q=${input}`,
        { mode: "cors" }
      );
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error.message);
      } else {
        console.log(data);

        renderContent(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function initialSearch() {
    searchCity("Ottawa");
  }

  return { initialSearch, searchCity };
})();

function renderContent(data) {
  renderBackground(data);
  renderMain(data);
  renderForecast(data);
}

function renderBackground(data) {
  const localTime = data.location.localtime;
  const date = new Date(localTime);
  const hour = date.getHours();
  console.log(hour);

  if (hour >= 5 && hour <= 8) {
    document.body.style.backgroundImage = `url(${dawnSky})`;
  } else if (hour > 8 && hour <= 18) {
    document.body.style.backgroundImage = `url(${sunnySky})`;
  } else if (hour > 18 && hour <= 20) {
    document.body.style.backgroundImage = `url(${sunsetSky})`;
  } else {
    document.body.style.backgroundImage = `url(${nightSky})`;
  }
}

function renderMain(data) {
  const cityLocation = data.location.name;
  const localTime = data.location.localtime;
  const currentTempC = data.current.temp_c;
  const weatherIcon = `http:${data.current.condition.icon}`;
  const weatherCondition = data.current.condition.text;

  const cityName = document.querySelector("h1#city");
  cityName.innerText = cityLocation;

  const h2CurrentTempC = document.querySelector("h2#currentTemp");
  h2CurrentTempC.innerHTML = `<span class="temp celsius">${currentTempC}&deg;C</span>`;

  const h3WeatherCondition = document.querySelector("h3#weatherCondition");
  h3WeatherCondition.innerText = weatherCondition;

  const currentWeatherIcon = document.querySelector("img#weatherIcon");
  currentWeatherIcon.src = weatherIcon;

  const currentDate = document.querySelector("div.date h4");
  currentDate.innerText = localTime;
}

function renderForecast(data) {
  const date = data.forecast.forecastday[0].date;
  const dateObject = new Date(date);
  const day = dateObject.getDate();

  const todayRainPercent =
    data.forecast.forecastday[0].day.daily_chance_of_rain;
  const tomorrowRainPercent =
    data.forecast.forecastday[1].day.daily_chance_of_rain;
  const nextTomorrowRainPercent =
    data.forecast.forecastday[2].day.daily_chance_of_rain;

  const todayWeatherIcon = `http:${data.forecast.forecastday[0].day.condition.icon}`;
  const tomorrowWeatherIcon = `http:${data.forecast.forecastday[1].day.condition.icon}`;
  const nextTomorrowWeatherIcon = `http:${data.forecast.forecastday[2].day.condition.icon}`;

  const todayMaxTempC = data.forecast.forecastday[0].day.maxtemp_c;
  const todayMinTempC = data.forecast.forecastday[0].day.mintemp_c;
  const tomorrowMaxTempC = data.forecast.forecastday[1].day.maxtemp_c;
  const tomorrowMinTempC = data.forecast.forecastday[1].day.mintemp_c;
  const nextTomorrowMaxTempC = data.forecast.forecastday[2].day.maxtemp_c;
  const nextTomorrowMinTempC = data.forecast.forecastday[2].day.mintemp_c;

  //   Today
  const h3TodayRainPercent = document.querySelector(
    "div#todayWeather h3.rainPercent"
  );
  h3TodayRainPercent.innerText = `${todayRainPercent}% rain`;
  const imgTodayWeatherIcon = document.querySelector("img#todayWeatherIcon");
  imgTodayWeatherIcon.src = todayWeatherIcon;
  const divTodayWeatherInfo = document.querySelector(
    "div#todayWeather div.weatherInfo"
  );
  updateWeatherInfoDiv(divTodayWeatherInfo, todayMaxTempC, todayMinTempC);

  //   Tomorrow
  const tomorrowForecastTitle = document.querySelector(
    "div#tomorrowWeather h3.forecastTitle"
  );
  tomorrowForecastTitle.innerText = `${day + 1}`;
  const h3TomorrowRainPercent = document.querySelector(
    "div#tomorrowWeather h3.rainPercent"
  );
  h3TomorrowRainPercent.innerText = `${tomorrowRainPercent}% rain`;
  const imgTomorrowWeatherIcon = document.querySelector(
    "img#tomorrowWeatherIcon"
  );
  imgTomorrowWeatherIcon.src = tomorrowWeatherIcon;
  const divTomorrowWeatherInfo = document.querySelector(
    "div#tomorrowWeather div.weatherInfo"
  );
  updateWeatherInfoDiv(
    divTomorrowWeatherInfo,
    tomorrowMaxTempC,
    tomorrowMinTempC
  );

  // Next Tomorrow
  const h3NextTomorrowForecastTitle = document.querySelector(
    "div#nextTomorrowWeather h3.forecastTitle"
  );
  h3NextTomorrowForecastTitle.innerText = `${day + 2}`;
  const h3NextTomorrowRainPercent = document.querySelector(
    "div#nextTomorrowWeather h3.rainPercent"
  );
  h3NextTomorrowRainPercent.innerText = `${nextTomorrowRainPercent}% rain`;
  const imgNextTomorrowWeatherIcon = document.querySelector(
    "img#nextTomorrowWeatherIcon"
  );
  imgNextTomorrowWeatherIcon.src = nextTomorrowWeatherIcon;
  const divNextTomorrowWeatherInfo = document.querySelector(
    "div#nextTomorrowWeather div.weatherInfo"
  );
  updateWeatherInfoDiv(
    divNextTomorrowWeatherInfo,
    nextTomorrowMaxTempC,
    nextTomorrowMinTempC
  );
}

function updateWeatherInfoDiv(div, high, low) {
  const HTML = `<p class="highestTemp">H:<span class="temp celsius">${high}&deg;C</span></p>
    <p class="lowestTemp"><span class="temp celsius">${low}&deg;C</span></p>`;
  div.innerHTML = HTML;
}

function changeTempUnit() {
  const tempSpans = document.querySelectorAll("span.temp");
  tempSpans.forEach((tempSpan) => {
    console.log(tempSpan);
    if (tempSpan.classList.contains("celsius")) {
      const tempC = parseFloat(tempSpan.innerText);
      const tempF = (tempC * 9) / 5 + 32;
      tempSpan.innerHTML = `${tempF.toFixed(1)}&deg;F`;
      tempSpan.classList.remove("celsius");
      tempSpan.classList.add("fahrenheit");
    } else if (tempSpan.classList.contains("fahrenheit")) {
      const tempF = parseFloat(tempSpan.innerText);
      const tempC = ((tempF - 32) * 5) / 9;
      tempSpan.innerHTML = `${tempC.toFixed(1)}&deg;C`;
      tempSpan.classList.remove("fahrenheit");
      tempSpan.classList.add("celsius");
    }
  });
}

weatherAPI.initialSearch();
