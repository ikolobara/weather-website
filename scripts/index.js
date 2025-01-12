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
    fetch(request)
        .then(response => response.json())
        .then(data => {
            if (data && data.data && data.data.length > 0){
                displayWeather(data.data[0])
            }
        }
        )
}

function displayWeather(data){
    document.getElementById("city").textContent = data.city_name
    document.getElementById("temperature").textContent = `${data.temp}°C`;
    document.getElementById("description").textContent = data.weather.description;
    document.getElementById("feelsLike").textContent = `Feels like: ${data.app_temp}°C`;
    document.getElementById("humidity").textContent = `Humidity: ${data.rh}%`;
    document.getElementById("wind").textContent = `Wind: ${data.wind_spd} m/s`;

    let weatherIcon = document.getElementById("weatherIcon");
    weatherIcon.src = `images/${data.weather.icon}.png`;
}