// Code for the main app page (locations list).

// This is sample code to demonstrate navigation.
// You need not use it for final app.
var locations=[];

function loadMyLocations(){
    // resetting locations for loading
    var locationsJSON=localStorage.getItem(APP_PREFIX);
    // setting retrieved data into a string
    locations=JSON.parse(locationsJSON);
    if (locations === null) {
        // checking if there is anything saved in the local storage
        // alert("There are no locations saved");
        locations = []
    }
    else{
        locations=JSON.parse(locationsJSON);
    }
    return locations;
}

function viewLocation(locationName)
{
    // Save the desired location to local storage
    localStorage.setItem(APP_PREFIX + "-selectedLocation", locationName); 
    // And load the view location page.
    location.href = 'viewlocation.html';
}

function loadMyTable(){
    // Creating a table
    var tableRef=document.getElementById('locationList');
    tableRef.innerHTML="";
    var myLocList='';
//    var lengthOfTableRef = tableRef.length;
    // creating a table
    for(var i=0;i<locations.length;i++){
    var rowRef='<li class="mdl-list__item mdl-list__item--two-line" onclick="viewLocation(' + i+');"><span class="mdl-list__item-primary-content"><img class="mdl-list__item-icon" id="icon" src="images/loading.png" class="list-avatar" /><span>Location'+ i+'</span><span id="weather" class="mdl-list__item-sub-title">Weather summary of '+ i+'</span></span></li>';
        myLocList+=rowRef;
    
    }    
    tableRef.innerHTML=myLocList;
}

function viewLocationIndex(){
    
}

loadMyLocations();
loadMyTable();
//var x = loadLocations();
//LocationWeatherCache();