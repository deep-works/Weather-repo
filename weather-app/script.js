const apiKey = '392f79319f03c2480f235579fb89178c';
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
const iconUrl = 'https://openweathermap.org/img/wn/';

//get the selectd elements to changes..................
let tempDivInfo = document.getElementById('temp-div');
let weatherInfoDiv = document.getElementById('weather-info');
let weatherIcon = document.getElementById('weather-icon');
let humidityDiv = document.getElementById('humidity');
let windSpeedDiv = document.getElementById('wind-speed');
// let hourlyForecastDiv = document.getElementById('hourly-forecast');


/* The main function for fetching API.................*/
async function getWeather() {
    // Get the city value inside the function ..//!everytime click on search..
    const city = document.getElementById('city').value;
    if (!city) {
        alert('Please enter a city'); //if input is empty..
        return;
    }

    const currentWeatherUrl = apiUrl + 'q=' + city + '&appid=' + apiKey;
    // const currentWeatherUrl = `${apiUrl}q=${city}&appid=${apiKey}`; //?another alternative..
    console.log("URL is:", currentWeatherUrl);
    try {
        let response = await fetch(currentWeatherUrl);
        if (!response.ok) {
            console.log("api fetching error", response.status);
            throw new Error(response.statusText);
        }
        // if response=ok, Call a function to display the weather data..
        let data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}


/* function for reflect the changes in ui.............*/
function displayWeather(data) {
    console.log("fetched data", data);
    // Display the weather data in the UI..
    weatherInfoDiv.innerHTML = data.weather[0].main;
    tempDivInfo.innerHTML = (data.main.temp - 273).toPrecision(3) + '°C';
    humidityDiv.innerHTML = 'Humidity ' + data.main.humidity + '%';
    windSpeedDiv.innerHTML = 'Wind-Speed ' + data.wind.speed + 'm/s';
    // change the icon url-src to the update icon......
    weatherIcon.src = iconUrl + data.weather[0].icon + '@4x.png';
}
