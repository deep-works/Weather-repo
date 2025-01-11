const apiKey = '392f79319f03c2480f235579fb89178c';
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
const iconUrl = 'https://openweathermap.org/img/wn/';
const hourlyApiUrl = "https://api.openweathermap.org/data/2.5/forecast?";

//get the selectd elements to changes..................
let tempDivInfo = document.getElementById('temp-div');
let weatherInfoDiv = document.getElementById('weather-info');
let weatherIcon = document.getElementById('weather-icon');
let humidityDiv = document.getElementById('humidity');
let windSpeedDiv = document.getElementById('wind-speed');
let airpressure = document.getElementById('pressure');
let hourlyForecastDiv = document.getElementById('hourly-forecast');


/* The main function for fetching API.................*/
async function getWeather() {
    // Get the city value inside the function ..//!everytime click on search..
    const city = document.getElementById('city').value;
    if (!city) {
        alert('Please enter a city'); //if input is empty..
        return;
    }

    const currentWeatherUrl = apiUrl + 'q=' + city + '&appid=' + apiKey;
    const hourlyWeatherUrl = `${hourlyApiUrl}q=${city}&appid=${apiKey}`; //?alternative format.. getting hourly

    try {
        let response = await fetch(currentWeatherUrl);
        if (!response.ok) {
            console.log("api fetching error", response.status);
            throw new Error(response.statusText);
        }
        // if response=ok, Call a function to display the weather data..
        let data = await response.json();
        displayWeather(data);

        //fetching hourly forecast...
        let response2 = await fetch(hourlyWeatherUrl);
        if (!response2.ok) { //response not ok : error
            console.log("api2 fetching error", response2.status);
            throw new Error(response2.statusText);
        }
        let hourlydata = await response2.json();
        displayHourlyWeather(hourlydata);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        alert("no city found");
    }
}


/* function for reflect the changes in ui.............*/
function displayWeather(data) {
    console.log("fetched data", data);
    city_name.innerHTML = `${data.name}, ${data.sys.country}`; //added location,city

    // Display the weather data in the UI..
    weatherInfoDiv.innerHTML = data.weather[0].description;
    document.body.style.backgroundImage = `
        url(${bgimageIndex[data.weather[0].main]})
    `; // update the background-img based on weather 

    tempDivInfo.innerHTML = (data.main.temp - 273).toPrecision(3) + '°C';
    humidityDiv.innerHTML = data.main.humidity;
    windSpeedDiv.innerHTML = data.wind.speed;
    // change the icon url-src to the update icon......
    weatherIcon.src = iconUrl + data.weather[0].icon + '@4x.png';
    weatherIcon.style.padding = "0px";//change the pading to no padding .
    // change airpressure in mbar
    airpressure.innerHTML = data.main.pressure;
}

/* function for displaying hourly data i ui............*/
function displayHourlyWeather(hourlydata) {
    hourlyForecastDiv.innerHTML = ``; // clears previous hourly forecast..
    console.log("feteched hourly hourlydata", hourlydata);
    const currentTime = new Date().toLocaleTimeString();
    console.log(currentTime);

    hourlydata.list = hourlydata.list.slice(1, 6);
    //get the list of data for different time amd loop through each of them..
    hourlydata.list.forEach((itm) => {
        //store the each items in veriables..
        const icon = iconUrl + itm.weather[0].icon + '.png';
        const temp = (itm.main.temp - 273).toPrecision(3) + '°C'; //show 3 places like {32.1}.
        const [date, time] = (itm.dt_txt).split(' '); //get in format {2024-12-28 09:00:00} so split on space.. also need to slice to {09:00}

        //ui for showing each hour details..
        const hourlyInnerHtml = `
            <div class="hourly-item">
                <span>${time.slice(0, 5)}</span> 
                <img src="${icon}">
                <span>${temp}</span>
            </div>
        `;
        hourlyForecastDiv.innerHTML += hourlyInnerHtml; //render innerhtml
    });
}