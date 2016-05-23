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
    var locations = loadLocations();
    selectedItemIndex = JSON.parse(localStorage.getItem(APP_PREFIX + "-selectedLocation"));
    console.log(selectedItemIndex)
//    var locations = JSON.parse(localStorage.getItem(STORAGE_KEY_LOCATIONS));
    //get object from index in local storage
    selectedItemObj = locations[selectedItemIndex];
    
    //locationMarker and initMap is given lat, lng
    initMap(selectedItemObj.latitude, selectedItemObj.longitude);
    locationMarker(selectedItemObj.latitude, selectedItemObj.longitude);
    
    console.log(selectedItemObj.forecast);
    console.log(selectedItemObj.nickname);

//callback 
// ref=new LocationWeatherCache();
LocationWeatherCache.getWeatherAtIndexForDate(selectedItemObj,date,forecastHandler); 
    
function forecastHandler(forecast){
console.log('Forecast Handler'+forecast); 
}
};

function updateDate() {
   //alert(this.simpleDateString() + "T12:00:00"); 
    
    LocationWeatherCache.getWeatherAtIndexForDate(forecastName.date); 
    LocationWeatherCache.simpleDateString(forecastDateString); 
    
    var currentDate = new Date();
	var day = currentDate.getDate();
	var month = currentDate.getMonth() + 1;
	var year = currentDate.getFullYear();
	
    var today = document.write("<b>" + day + "/" + month + "/" + year + "</b>");
    document.getElementById('dateSliderText').value = today;
}

function initMap() {
    // Display a map, centred on selected location.
    var centreLocation = {
        lat: -38,
        lng: 147.007        //should be latitude and longitude paremeter
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