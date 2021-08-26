function presentWeather(stats) {
    console.log(stats);
    var tempEl = $('<h3>');
    var cityName = $('<h2>').addClass('card-title').text(stats.name);
    var windEl = $('<h3>') ;
    var humidityEl = $('<h3>');
    var icon = "*"
    tempEl.text("Temp: " + Math.round(stats.main.temp) + "° F");
    windEl.text("Wind: " + (stats.wind.speed) + " MPH");
    humidityEl.text("Humidity: " + stats.main.humidity + " %");


    $('#current-weather').append(cityName.append(icon), tempEl, windEl, humidityEl);
    getApi2(stats.coord.lat, stats.coord.lon);
}

function forecastWeather(stats) {
    console.log(stats.daily[1]);
for (var i= 1; i < 6; i++) {
    var day = moment.unix(stats.daily[i].dt).format('dddd ') ;
    var col = $('<div>').addClass('col-2')
    var card = $('<div>').addClass('card').attr('style', 'border: 1px solid black');
    var cardTitle = $("<h4>").addClass('card-title p-1').text(day);

   

    $('#forecast-bar').append(col.append(card.append(cardTitle)));
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

        // $('#city-name').value = "";
    }
}

$("#user-input").on('click', FormSubmitHandler);