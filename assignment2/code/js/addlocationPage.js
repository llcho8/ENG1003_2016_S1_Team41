// Code for the Add Location page.

//Create a map and set Monash uni as the centre of map
//credit to google developer tool-geocoding service from practise 6
var latitude;
var longitude;
function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 14,
          center: {lat: -37.9120467, lng: 145.1343136}
        });
      var geocoder = new google.maps.Geocoder();

  document.getElementById('showLocation').addEventListener('click', function() {
    searchLocation(geocoder, map);
  });
}
      

function searchLocation(geocoder, resultsMap)
{    
     var address = document.getElementById('location').value;
    geocoder.geocode({'address': address}, function(results, status) {
    
      if (status === google.maps.GeocoderStatus.OK) {
      resultsMap.setCenter(results[0].geometry.location);
      
          var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
          }); 
        latitude = results[0].geometry.location.lat();
        longitude = results[0].geometry.location.lng();
    } 
      else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
function saveLocation(lat, long, nickname){
    var nickName = document.getElementById("nickName").value;
    LocationWeatherCache.addLocation(latitude, longitude, nickname);
    console.log('Location saved');
}



//current location

function current(){
if (navigator.geolocation) //Invoke navigator.geolocation.watchPosition to initialise geolocation. Note that this section is dependant on the jQuery library
{     
        positionOptions = {
            enableHighAccuracy: true,
            timeout: Infinity, 
            maximumAge: 0
        }; 

        //$('.gpsError').hide();
        navigator.geolocation.getCurrentPosition(showCurrentLocation, errorHandler, positionOptions); //Navigator watches GPS for change in location and calls showCurrentLocation when it changes
}
    else
{
        //$('.gpsValue').hide();
        
}
}
function errorHandler(error) //Error handling
{
        if(error.code == 0){
           alert("Unknown error");
        }
        if(error.code == 1){
           alert("Access denied by user");
        }

        if(error.code == 2){
           alert("Position unavailable");
        }

        if(error.code == 3){
           alert("Timed out");
        }
}            

function showCurrentLocation(position){ 
        
    currentLatitude = Number(position.coords.latitude);
    currentLongitude = Number(position.coords.longitude); 
    jsonpRequest(url, position.coords, apiKey, parameters)
    currentMap();
}
function currentMap() {
    if (lat1===0){
        current()
    }
  var myLatLng = {lat: currentLatitude, lng: currentLongitude}; //replace with current geometry from js file
    //console.log(myLatLng)
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: myLatLng
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Active location' //add a function to get active location's name
  });
}

function goBack() {
    window.location = "index.html"
}