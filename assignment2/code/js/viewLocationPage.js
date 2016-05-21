// Code for the View Location page.

var STORAGE_KEY_LOCATIONS = "location";
var STORAGE_KEY_SELECTED_ITEM = "locationIndex";

var selectedItemIndex;
var selectedItemObj;

var map;
var infoWindow;

function loadItemsFromStorage() {
    //get index
    selectedItemIndex = JSON.parse(localStorage.getItem(STORAGE_KEY_SELECTED_ITEM));
    var locations = JSON.parse(localStorage.getItem(STORAGE_KEY_LOCATIONS));
    //get item object
    selectedItemObj = locations[selectedItemIndex];
    //locationMarker is given lat, lng
    locationMarker(selectedItemObj.latitude, selectedItemObj.longitude);

    console.log(selectedItemObj.forecast);
    console.log(selectedItemObj.nickname);
    
var ref=new LocationWeatherCache();
ref.getWeatherAtIndexForDate(selectedItemObj,date,forecastHandler); 
}

function forecastHandler(forecastObj){
console.log('Forecast Handler'+forecastObj);    
}

function initMap() {
    // Display a map, centred on selected location.
    var centreLocation = {
        lat: latitude,
        lng: longitude
    };
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: centreLocation
    });
    infowindow = new google.maps.InfoWindow;
    locationMarker(latitude, longitude);
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

function updateDate() {
    document.getElementById('DateSlider');
        

    //get date
    var date = new Date();
    var msecSince1970 = date.getTime();

    msecSince1970 += [];
    date.setTime(msecSince1970);
}