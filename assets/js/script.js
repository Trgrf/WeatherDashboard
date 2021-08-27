var uviEl = $('<h3>');

function presentWeather(stats) {
    console.log(stats);
    var cityName = $('<h2>').addClass('card-title').text(stats.name);
    var tempEl = $('<h3>');
    var windEl = $('<h3>') ;
    var humidityEl = $('<h3>');
    var iconUrl = "http://openweathermap.org/img/w/" + stats.weather[0].icon + ".png"
    var iconEl = $('<img>').attr('src', iconUrl).addClass('weather-img')
    tempEl.text("Temp: " + Math.round(stats.main.temp) + "°F");
    windEl.text("Wind: " + (stats.wind.speed) + " MPH");
    humidityEl.text("Humidity: " + stats.main.humidity + " %");


    $('#current-weather').append(cityName.append(iconEl), tempEl, windEl, humidityEl, uviEl);
    getApi2(stats.coord.lat, stats.coord.lon);
}

function forecastWeather(stats) {
    console.log(stats.daily[0]);
for (var i= 1; i < 6; i++) {
    var day = moment.unix(stats.daily[i].dt).format('dddd ') ;
    var col = $('<div>').addClass('col-2')
    var card = $('<div>').addClass('card').attr('style', 'border: 1px solid black');
    var cardTitle = $("<h4>").addClass('card-title p-1').text(day);
    var minTemp = $('<h6>').addClass('card-text').text("Min-Temp: " + stats.daily[i].temp.min + "°F");
    var maxTemp = $('<h6>').addClass('card-text').text("Max-Temp: " + stats.daily[i].temp.max + "°F");
    var wind = $('<h6>').addClass('card-text').text("Wind: " + stats.daily[i].wind_speed + " MPH");
    var humidity = $('<h6>').addClass('card-text').text("Humidity: " + stats.daily[i].humidity + " %");
    var iconUrl = "http://openweathermap.org/img/w/" + stats.daily[0].weather[0].icon + ".png"
    var iconEl = $('<img>').attr('src', iconUrl)

    uviEl.text("UV Index: " + stats.daily[i].uvi);

    $('#forecast-bar').append(col.append(card.append(cardTitle.append(iconEl), minTemp, maxTemp, wind, humidity)));
}
}

function getApi(city) {
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID=61fa702c7ad2637a7e4e11d44c6c28a1"

    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        presentWeather(data);
    })

}

function getApi2(lat, lon) {
    var url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon +"&units=imperial&exclude=minutely&appid=61fa702c7ad2637a7e4e11d44c6c28a1"

    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        forecastWeather(data); 
    })

}

function FormSubmitHandler(event) {
    event.preventDefault();

    var userInput = $('#city-name').val().trim();

    if (userInput) {
        getApi(userInput);

        $('#user-input').val() = " ";
    }
}

$("#user-input").on('click', FormSubmitHandler);