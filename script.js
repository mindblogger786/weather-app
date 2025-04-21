const inputBox = document.getElementById('inputBox');
const searchBtn = document.getElementById('searchBtn');
const weatherImg = document.getElementById('weatherImg');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const locationNotFound = document.getElementById('locationNotFound');
const weatherBody = document.getElementById('weatherBody');

async function checkWeather(city) {
    const api_key = "46d99cc235a6d26be5df8165a452de39";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());

    if(weather_data.cod == `404`){
        locationNotFound.style.display = 'flex';
        weatherBody.style.display = 'none';
        return;
    }
    locationNotFound.style.display = 'none';
    weatherBody.style.display = 'block';
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)} <sup>°C</sup>`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind.innerHTML = `${weather_data.wind.speed}Km/H`;
    
    switch(weather_data.weather[0].main){
        case 'Clear':
            weatherImg.src = "images/clear.png";
            break;
            case 'Clouds':
            weatherImg.src = "images/cloud.png";
            break;
        case 'Mist':
            weatherImg.src = "images/mist.png";
            break;
        case 'Rain':
            weatherImg.src = "images/rain.png";
            break;
        case 'Snow':
            weatherImg.src = "images/snow.png";
            break;
        case 'Haze':
            weatherImg.src = "images/cloud.png";
        default:
            weatherImg.innerHTML = "Sorry, can't load image..."
    }
    
    console.log(weather_data);
}

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    checkWeather(inputBox.value);
});
