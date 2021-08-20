userFormEl = $('#user-input');

function presentWeather() {

}

function getApi() {
    var url = ""

    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        presentWeather(data);
    })

}

function FormSubmitHandler() {
    var userInput = $('city-name');

    if (userInput) {
        getApi(userInput);

        $('city-name').val = "";
    }
}

userFormEl.on('click', FormSubmitHandler);