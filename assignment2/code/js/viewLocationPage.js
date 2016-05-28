// Code for the View Location page.

var selectedItemIndex;
var selectedItemObj;


var map;
var infoWindow;

// This function loads the weather from local storage. Get index from local storage. 
// Call to the cache for locations. Get object from index in local storage
function loadItemsFromStorage() {
    var locations = loadLocations();
    console.log(locations);
    selectedItemIndex = JSON.parse(localStorage.getItem(APP_PREFIX + "-selectedLocation"));
    console.log(selectedItemIndex);

    selectedItemObj = locations[selectedItemIndex];

    console.log(selectedItemObj.forecast);
    console.log(selectedItemObj.nickname);

    //callback 
    //ref=new LocationWeatherCache();
    // LocationWeatherCache.getWeatherAtIndexForDate(selectedItemObj, date, forecastHandler);

    function forecastHandler(forecast) {
        console.log('Forecast Handler' + forecast);
    }
};

//This function removes locations from local storage.
function removeLocation() {
    locationWeatherCache.removeLocationAtIndex(selectedItemIndex);
    window.location.href = "index.html";
}

//This function using date.simpleDateString() doesn't work. 
/*function updateDate() {
    var dateSlider = document.getElementById('dateSlider');
    var dateSliderText = document.getElementById('dateSliderText');
    console.log(dateSlider.value);
    var date = new Date();
    var actualDate = date.simpleDateString();

    if (dateSlider.value < 30) {
        var daysDifference = (dateSlider.value - 30);
        var msecDifference = daysDifference * (24 * 60 * 60 * 1000);
        var msecSince1970 = date.getTime();
        msecSince1970 += [msecDifference + date];
        date.setTime(msecSince1970);
        dateSliderText.value = msecSince1970;
        //return the date in the correct format

    } else {
        dateSliderText.textContent = actualDate;
        console.log(actualDate);
    }

    loadTableInformation(selectedItemIndex);
}
*/
function getDateInSimpleFormat(dateInput) {
    return dateInput.getDay() + "-" + dateInput.getMonth() + "-" + dateInput.getFullYear();
    loadTableInformation();
}

//This function loads the map and the marker.
function initMap() {
    // Display a map, centred on selected location.
    loadItemsFromStorage(selectedItemObj);
    var latitude = loadItemsFromStorage(selectedItemObj.latitude);
    var longitude = loadItemsFromStorage(selectedItemObj.longitude);

    var centreLocation = {
        lat: latitude,
        lng: longitude //should be latitude and longitude paremeter
    };
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: centreLocation
    });
    infowindow = new google.maps.InfoWindow;
    //load a marker
    var marker = new google.maps.Marker({
        position: centreLocation,
        map: map,
        title: ''
    });
    infowindow.setContent("Monash"); //need to set to selected location nickname
    infowindow.open(map, marker);
    map.panTo(centreLocation);
    map.setZoom(16)
}

//This function loads the weather summary table.
function loadTableInformation() {
    loadItemsFromStorage(selectedItemIndex);
    
    var minTemp = document.getElementById('minTemp');
    var maxTemp = document.getElementById('maxTemp');
    var humidity = document.getElementById('humidity');
    var windSpeed = document.getElementById('windSpeed');
    var summary = document.getElementById('weatherSummary');

    var getForecast = locationWeatherCache.getWeatherAtIndexForDate().forecast;
    minTemp.innerHTML = getForecast.temeratureMin;
    maxTemp.innerHTML = getForecast.temeratureMax;
    humidity.innerHTML = getForecast.humidity;
    windspeed.innerHTML = getForecast.windSpeed;
    summary.innerHTML = getForecast.summary;

    // minTemp.value ="This is a test";
    // check innerHTML or textContent
}