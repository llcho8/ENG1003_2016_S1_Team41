// Code for the Add Location page.



//Create a map and set Monash uni as the centre of map
//credit to google developer tool-geocoding service from practise 6
var lat=0;
var long=0;
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15.75,
   center: {lat: -37.9120467, lng: 145.1343136}
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
        lat=results[0].geometry.location.lat();
        long=results[0].geometry.location.lng();
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

//store location in JSON form
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
}

//go back to the main page
function goBack() {
    window.location = "index.html"
}