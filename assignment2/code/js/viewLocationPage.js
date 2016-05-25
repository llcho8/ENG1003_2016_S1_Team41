// Code for the View Location page.

//var STORAGE_KEY_LOCATIONS = "locations";
//var STORAGE_KEY_SELECTED_ITEM = "locations Index";

var selectedItemIndex;
var selectedItemObj;

var map;
var infoWindow;

// this function loads the weather from local storage.
function loadItemsFromStorage() {
    //get index from local storage 
    var locations = loadLocations()
    console.log(locations)
    selectedItemIndex = JSON.parse(localStorage.getItem(APP_PREFIX + "-selectedLocation"));
    console.log(selectedItemIndex)
        //    var locations = JSON.parse(localStorage.getItem(STORAGE_KEY_LOCATIONS));
        //get object from index in local storage
    selectedItemObj = locations[selectedItemIndex];

    //locationMarker and initMap is given lat, lng
    // map.setCenter(selectedItemObj.latitude, selectedItemObj.longitude);
    //  locationMarker(selectedItemObj.latitude, selectedItemObj.longitude);

    console.log(selectedItemObj.forecast);
    console.log(selectedItemObj.nickname);

    //callback 
    //ref=new LocationWeatherCache();

   // LocationWeatherCache.getWeatherAtIndexForDate(selectedItemObj, date, forecastHandler);

    //get nickname as title    
    // document.getElementById('HeaderBarTitle');

    function forecastHandler(forecast) {
        console.log('Forecast Handler' + forecast);
    }
};

function removeLocation() {
    locationWeatherCache.removeLocationAtIndex(selectedItemIndex);
    window.location.href = "index.html";
}


function updateDate() {
    var dateSlider = document.getElementById('dateSlider');
    var dateSliderText = document.getElementById('dateSliderText');
    console.log(dateSlider.value);
    
    var date = new Date();
    var actualDate = date.simpleDateString();
    
    if (dateSlider.value < 30) {
        var daysDifference = (dateSlider.value - 30);
        //var newDate = new Date(new Date().getTime() + (daysDifference * 24 * 60 * 60 * 1000));
        var msecDifference = daysDifference * (24 * 60 * 60 * 1000);
        var msecSince1970 = date.getTime();
        msecSince1970 += [msecDifference - date];
        date.setTime(msecSince1970);   
        
//return the date in the correct format
        
    } else {
        dateSliderText.textContent = actualDate;
        console.log(actualDate);
    }
}

function initMap() {
    // Display a map, centred on selected location.
    var centreLocation = {
        lat: -38,
        lng: 147.007 //should be latitude and longitude paremeter
    };
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: centreLocation
    });
    infowindow = new google.maps.InfoWindow;
    //locationMarker(latitude, longitude);
}

function locationMarker(latitude, longitude) {
    //Display a marker on selected location
    var locationPosition = {
        lat: latitude,
        lng: longitude
    };
    var marker = new google.maps.Marker({
        position: locationPosition,
        map: map
    });
    infowindow.setContent(selectedItemObj.nickname); //need to set to selected location nickname
    infowindow.open(map, marker);
    map.panTo(locationPosition);
    map.setZoom(16)
}
loadItemsFromStorage();

function loadTableInformation() {
    var minTemp = document.getElementById('minTemp');
    var maxTemp = document.getElementById('maxTemp');
    var humidity = document.getElementById('humidity');
    var windSpeed = document.getElementById('windSpeed');
    var summary = document.getElementById('weatherSummary');


}