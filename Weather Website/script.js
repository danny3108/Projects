const apiKey = "2ffc346a8f397332dc24506df532c754";
const cityInput = document.getElementById("location_input");

async function weather() {
    const fetchurl = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityInput.value}&appid=${apiKey}`);
    var data = await fetchurl.json();

    console.log(data)

    if(cityInput.value === "") {
        alert ("No input!");
    }
    else if(data.name === undefined) {
        alert (`${cityInput.value} is not a city`);
        cityInput.value=""
    }
    else {
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = parseInt(data.main.temp) + "°C";
        document.querySelector(".wind").innerHTML = data.wind.speed+ "km/h Wind Speed";
        document.querySelector(".humidity").innerHTML = parseInt(data.main.humidity)+ "% Humidity";
        document.querySelector(".description").innerHTML = data.weather[0].description;

    }

    if(data.weather[0].main == "Clouds") {
        document.querySelector(".icon").src = "./img/cloudy.png"
    }
    else if(data.weather[0].main == "Rain") {
        document.querySelector(".icon").src = "./img/rain.png"
    }
    else if(data.weather[0].main == "Clear") {
        document.querySelector(".icon").src = "./img/clear.jpg"
    }    
    else if(data.weather[0].main == "Drizzle") {
        document.querySelector(".icon").src = "./img/drizzle.png"
    }
    else if(data.weather[0].main == "Thunderstorm") {
        document.querySelector(".icon").src = "./img/thunderstorm.png"
    }
    else if(data.weather[0].main == "Snow") {
        document.querySelector(".icon").src = "./img/snow.png"
    }
    else if(data.weather[0].main == "Mist") {
        document.querySelector(".icon").src = "./img/mist.png"
    }

    cityInput.value=""

}

cityInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        weather();
    }
});