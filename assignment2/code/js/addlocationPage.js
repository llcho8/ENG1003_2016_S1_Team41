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
          console.log(latitude,longitude);
    } 
      else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
function addLocation(lat, long, nickname){
    var nickName = new document.getElementById("nickName").value;
    LocationWeatherCache.addLocation(latitude, longitude, nickname);
}


function goBack() {
    window.location = "index.html"
}