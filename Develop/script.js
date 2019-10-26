function getData1(city) {
    var key = "b25072ef4942d1e91bd9a0cadd07c4df";
    var city = city; // My test case was "London"
    var url = "https://api.openweathermap.org/data/2.5/forecast";
    console.log("hi");
    $.ajax({
        url: url, //API Call
        dataType: "json",
        type: "GET",
        data: {
            q: city,
            appid: key,
            units: "metric",
            cnt: 400
        },
        success: function (data) {
            console.log('Received data:', data) // For testing
            var wf = "";
            var text1 = "";
            text1 += "<h2>" + data.city.name + " ("
            // City (displays once)
            var dateTemp = [];
            var count = 1;
            var date1 = "";
            $.each(data.list, function (index, val) {
                wf = "";

                console.log("val" + val);
                if (index === 0) {

                    var date = val.dt_txt.substring(0, 10);
                    date = date.split("-");
                    date1 = date[2] + "/" + date[1] + "/" + date[0];
                    text1 += date1 + ") "
                    text1 += "<img src='https://openweathermap.org/img/w/" + val.weather[0].icon + ".png'>" + "</h2>"

                    var f = val.main.temp * 9 / 5 + 32;
                    var temp = Math.round(f);
                    text1 += "Temperature: " + temp + " &degF"

                    text1 += "<br/>"

                    text1 += "<span> Humidity: " + val.main.humidity + "% </span>"; // Humidity
                    text1 += "<br/>"

                    text1 += "<span> Wind: " + val.wind.speed + " MPH </span>"; // Humidity
                    text1 += "<br/>"

                    var lat = data.city.coord.lat;
                    var lon = data.city.coord.lon;
                    //lat = lat.substring(4,lat.length);
                    console.log("lat " + lat + "long " + lon);

                    //console.log("local uvi"+uvI);
                    dateTemp.push(date1);
                    $("#weather0").html(text1);
                    getUvI(city, lat, lon);

                }
                var date = val.dt_txt.substring(0, 10);
                date = date.split("-");
                date1 = date[2] + "/" + date[1] + "/" + date[0];
                var n = !(dateTemp.includes(date1));

                if (index > 0 && count < 6 && n) {
                    wf += "<p>" // Opening paragraph tag

                    wf += "<b>" + date1 + "</b>: " // Day 
                    wf += "<br/>"
                    wf += "<img src='https://openweathermap.org/img/w/" + val.weather[0].icon + ".png'>" // Icon
                    wf += "<br/>"
                    var f = val.main.temp * 9 / 5 + 32;
                    var temp = Math.round(f);
                    wf += "Temp: " + temp + " &degF" // Temperature
                    wf += "<br/>"
                    wf += "<span> Humidity: " + val.main.humidity + "% </span>"; // Humidity
                    wf += "</p>" // Closing paragraph tag
                    console.log("wf" + wf)
                    $("#showWeatherForecast" + (count)).html(wf);

                    dateTemp.push(date1);

                    console.log("date temp " + dateTemp);
                    count++;
                }

            });
            console.log(wf);
            //$("#showWeatherForecast").html(wf);
        }
    });
}
var cities = [];
$("#button1").on("click", function () {
    var city = $(".inp1").val();
    getData1(city);
    if (!cities.includes(city)) {
        $('#cities .list-group').append('<li class="list-group-item">' + city + '</li>');

        cities.push(city);
        localStorage.setItem("cities", JSON.stringify(cities));
    }

});

$(document).on('click', '.list-group-item', function () {
    console.log("hi");

    var city = $(this).text();
    console.log(city);
    getData1(city);
});
function getUvI(city, lat, lon) {
    var key = "b25072ef4942d1e91bd9a0cadd07c4df";
    var city = city;
    var url = "http://api.openweathermap.org/data/2.5/uvi"
    $.ajax({
        url: url, //API Call
        dataType: "json",
        type: "GET",
        data: {
            lat: lat,
            lon: lon,
            appid: key,
            units: "metric",
            cnt: "100"
        },
        success: function (data) {
            console.log(data);
            console.log("uv " + data.value);
            var text1 = "UV Index: " + "<span id ='uvI'>  " + data.value + " </span>"; // Humidity
            $("#weather0").append(text1);
        }
    });
}

var localCities = JSON.parse(localStorage.getItem("cities"));

for (var i = 0; i < localCities.length; i++) {
    $('#cities .list-group').append('<li class="list-group-item">' + localCities[i] + '</li>');
    if (!cities.includes(localCities[i])) {
        cities.push(localCities[i]);
    }
}
