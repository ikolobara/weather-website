function checkForEnter(){
    let input = document.getElementById("searchInput");
    input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault()
            document.getElementById("searchButton").click()
        }
    })
}

function getWeather(){
    let city = document.getElementById("searchInput").value
    let request = `https://api.weatherbit.io/v2.0/current?city=${city}&key=05b71b9ec1eb4bfba8f734447c4d727f`;
    const normalizeAndTrim = (str) => 
        str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+/g, '');

    fetch(request)
        .then(response => response.json())
        .then(data => {
            if (data && data.data && data.data.length > 0){
                if (normalizeAndTrim(city) === normalizeAndTrim(data.data[0].city_name)){
                    displayWeather(data.data[0].city_name, 
                                   `${data.data[0].temp}°C`, 
                                   data.data[0].weather.description, 
                                   `Feels like: ${data.data[0].app_temp}°C`, 
                                   `Humidity: ${data.data[0].rh}%`,
                                   `Wind: ${data.data[0].wind_spd}`,
                                   `images/${data.data[0].weather.icon}.png`
                                )
                } else {
                    displayWeather("Invalid city name",
                                   "N/A",
                                   "N/A",
                                   "N/A",
                                   "N/A",
                                   "N/A",
                                   "data:"
                    )
                }
            }
        }
        )
}

function displayWeather(city_name, temperature, description, feelsLike, humidity, wind, icon){
    document.getElementById("city").textContent = city_name
        document.getElementById("temperature").textContent = temperature;
        document.getElementById("description").textContent = description;
        document.getElementById("feelsLike").textContent = feelsLike;
        document.getElementById("humidity").textContent = humidity;
        document.getElementById("wind").textContent = wind;
    
        let weatherIcon = document.getElementById("weatherIcon");
        weatherIcon.src = icon;
}