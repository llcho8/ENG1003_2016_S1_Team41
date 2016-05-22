var LocationWeatherCache = new LocationWeatherCache()
LocationWeatherCache.addLocation(37.8141,144.9633, "melbourne")
LocationWeatherCache.addLocation(40.7128,74.0059,"NYC") 
saveLocations();
// Code for the main app page (locations list).

// Setting a locations array
var locations=loadLocations();
// Storage keys for viewLocation
var STORAGE_KEY_LOCATIONS="Locations";
var STORAGE_KEY_SELECTED_ITEM="Location Index";

/*function loadMyLocations(){
    // resetting locations for loading
    var locationsJSON=localStorage.getItem(APP_PREFIX);
    // setting retrieved data into a string
    locations=JSON.parse(locationsJSON);
    if (locations === null) {
        // A test to see if there is anything saved in the local storage
        // alert("There are no locations saved");
        locations = []
    }
    else{
        locations=JSON.parse(locationsJSON);
    }
    return locations;
}*/

function viewLocation(locationName)
{
    // Save the desired location to local storage
    localStorage.setItem(APP_PREFIX + "-selectedLocation", locationName); 
    // And load the view location page.
    location.href = 'viewlocation.html';
}

function loadMyTable(){
    // Locating the content of the table
    var tableRef=document.getElementById('locationList');
    // Resetting the table
    tableRef.innerHTML="";
    // Creating the MDL table
    var myLocList='';
    // Creating the rows and content of the table
    for(var i=0;i<locations.length;i++){
    var rowRef='<li class="mdl-list__item mdl-list__item--two-line" onclick="viewLocation(' + i+');"><span class="mdl-list__item-primary-content"><img class="mdl-list__item-icon" id="icon" src="images/loading.png" class="list-avatar" /><span>Location'+ i+'</span><span id="weather" class="mdl-list__item-sub-title">Weather summary of '+ i+'</span></span></li>';
        myLocList+=rowRef;
      
    }   
    // Displaying the table
    tableRef.innerHTML=myLocList;
    
}

//loadMyLocations();
loadMyTable();
loadLocations();