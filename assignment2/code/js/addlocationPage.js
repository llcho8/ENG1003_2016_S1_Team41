// Code for the Add Location page.



//Create a map and set Monash uni as the centre of map
//credit to google developer tool-geocoding service from practise 6
var lat=0;
var long=0;
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
   center: {lat: -37.9120467, lng: 145.1343136},
      zoom: 15.75
  });
    var geocoder = new google.maps.Geocoder();
document.getElementById('showLocation').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
  });
}

function geocodeAddress(geocoder, resultsMap) {
    
    var address = document.getElementById('location').value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      }); 
        lat = results[0].geometry.location.lat();
        long = results[0].geometry.location.lng();
    } 
      else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

var locationInUrl = document.getElementById('location')
var url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + locationInUrl + "&key=AIzaSyAaNEecSiI-c-k31YrIx4ygV5LXbFeP838";
function searchLocation()
{
    onclick = url;
    var results = document.onclick.results;
    var latitude = results.geometry.location.lat;
    var longitude = results.geometry.location.lng;
}

function addLocation(latitude, longitude, nickname){
    var nickName = new document.getElementById("nickName").value;
    LocationWeatherCache.addLocation(latitude, longitude, nickname);
}




/*
//store location in JSON form
//use JSON to stringify the object and store to the local storage : 
//information stored in local storage therefore can access by other file
var locationIndex=0;
function storelocation() {
    var nickName = document.getElementById("nickName").value;
    var location = new locationInformation(nickName,lat,long);
    if (JSON.parse(localStorage.getItem("numberOflocation")) !== null) {
    locationIndex = JSON.parse(localStorage.getItem("numberOflocation"));
    } else {
        locationIndex = 0;}
if (typeof(Storage) !== "undefined") {
    localStorage.setItem(locationIndex, JSON.stringify(location)); 
    locationIndex += 1;
    localStorage.setItem("numberOflocation", JSON.stringify(locationIndex));
} else {
    document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
}
    window.location="index.html";
}*/

//go back to the main page
function goBack() {
    window.location = "index.html"
}