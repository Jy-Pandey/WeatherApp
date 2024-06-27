let weather_city = document.querySelector(".weather_city");
let weather_datetime = document.querySelector(".weather_datetime");
let weather_forcast = document.querySelector(".weather_forcast");
let weather_icon = document.querySelector(".weather_icon");
let weather_temp = document.querySelector(".weather_temp");
let weather_min = document.querySelector(".weather_min");
let weather_max = document.querySelector(".weather_max");

//* weather info data
let feels_like = document.querySelector(".feels_like");
let humidity = document.querySelector(".humidity");
let w_wind = document.querySelector(".wind");
let pressure = document.querySelector(".pressure");

let city = "varanasi";

const getCountryName = (code) => {
  return new Intl.DisplayNames(["en"], { type: "region" }).of(code);
};

const getDateTime = (dt) => {
  let options = {
    // dateStyle : 'full',
    // timeStyle : 'short',
    // timeZone: 'India', // is not giving correct timeZone
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  let milliseconds = dt * 1000; //convert sec to miliseconds
  let date = new Date(milliseconds);

  return new Intl.DateTimeFormat("en-GB", options).format(date);
};

//* Search functionality
const weather_search = document.querySelector(".weather_search");

const SearchCity = (e) => {
  e.preventDefault();
  let inputField = weather_search.querySelector("input");

  //* Update city name
  city = inputField.value;

  getWeatherData();
  inputField.value = "";
};

weather_search.addEventListener("submit", () => {
  SearchCity(event);
});

const getWeatherData = async () => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=3e7ebcd096dd34d1e4edbce61ea0c0bf`;

  try {
    let res = await fetch(weatherUrl);
    let data = await res.json();
    console.log(data);

    //* Object destructuring
    const { name, main, dt, sys, weather, wind } = data;

    //*set city and country name
    let fullCountryName = getCountryName(sys.country);
    weather_city.innerHTML = `${name} , ${fullCountryName}`;

    //* set date & time
    weather_datetime.innerHTML = getDateTime(dt);

    //*set weather forcast
    weather_forcast.innerHTML = weather[0].main; //weather is a array

    //*set icon
    weather_icon.innerHTML = `<img src = "http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" </img>`;

    //* set temperature
    weather_temp.innerHTML = `${main.temp.toFixed(2)}&#176`; //fix decimal value upto 2 digit only

    //* set min max temperature
    weather_min.innerHTML = `Min: ${main.temp_min}&#176`;
    weather_max.innerHTML = `Max: ${main.temp_max}&#176`;

    //* set weather info
    feels_like.innerHTML = `${main.feels_like}&#176`;
    humidity.innerHTML = `${main.humidity}&#176`;
    w_wind.innerHTML = `${wind.speed} m/s`;
    pressure.innerHTML = `${main.pressure} hPa`;
  } catch (err) {
    // console.log(err);
    alert("City Name Does not Exist OR Network Error");
  }
};

document.body.addEventListener("load", getWeatherData());
