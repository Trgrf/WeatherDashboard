function presentWeather(stats) {
for (var i = 0; stats.main.length; i++) {
    var stasList = $('<ul>') ;
    var tempEl = $('<li>');
    tempEl.text(stats.main[i].temp + "° F");
    // var windEl = ;
    // var humidityEl = ;

    stasList.append(tempEl);
    $('.container').append(stasList);
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

function FormSubmitHandler(event) {
    event.preventDefault();

    var userInput = $('#city-name').val().trim();

    if (userInput) {
        getApi(userInput);

        // $('#city-name').value = "";
    }
}

$("#user-input").on('click', FormSubmitHandler);