// Code for the main app page (locations list).

// This is sample code to demonstrate navigation.
// You need not use it for final app.

function viewLocation(locationName)
{
    // Save the desired location to local storage
    localStorage.setItem(APP_PREFIX + "-selectedLocation", locationName); 
    // And load the view location page.
    location.href = 'viewlocation.html';
}

function loadMyTable(){
var tableRef=document.getElementById('locationList');
    var myLocList='';
    for(var i=0;i<10;i++){
    var rowRef='<li class="mdl-list__item mdl-list__item--two-line" onclick="viewLocation(1);"><span class="mdl-list__item-primary-content"><img class="mdl-list__item-icon" id="icon0" src="images/loading.png" class="list-avatar" /><span>Location'+ i+'</span><span id="weather" class="mdl-list__item-sub-title">Weather summary of '+i+'</span></span></li>';
        myLocList+=rowRef;
    
    }
    
    tableRef.innerHTML=myLocList;
}

loadMyTable();