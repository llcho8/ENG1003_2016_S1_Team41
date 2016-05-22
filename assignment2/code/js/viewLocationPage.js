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
    //get object from index
    selectedItemObj = locations[selectedItemIndex];
    
    //locationMarker and initMap is given lat, lng
    initMap(selectedItemObj.latitude, selectedItemObj.longitude);
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
        lat: -38,
        lng: 147.007
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
    document.getElementById('DateSliderText');
    //get date
    var date = new Date();
    var msecSince1970 = date.getTime();
    msecSince1970 += [];
    date.setTime(msecSince1970);
}