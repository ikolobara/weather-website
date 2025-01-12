document.addEventListener("DOMContentLoaded", () => {
    initializePage();
});

function initializePage(){

    getAndDisplayWeather("new-york")
    getAndDisplayWeather("london")
    getAndDisplayWeather("delhi")
    getAndDisplayWeather("beijing")
}

function getAndDisplayWeather(city){
    let request = `https://api.weatherbit.io/v2.0/current?city=${city}&key=05b71b9ec1eb4bfba8f734447c4d727f`;
    fetch(request)
        .then(response => response.json())
        .then(data => {
            if (data && data.data && data.data.length > 0){
                document.querySelector(`.temperature.${city}`).textContent = `${data.data[0].temp}°C`;
                let weatherIcon = document.querySelector(`.weather-icon.${city}`);
                weatherIcon.src = `../images/${data.data[0].weather.icon}.png`;
            }
        }
        )
}