
// Returns a date in the format "YYYY-MM-DD".
Date.prototype.simpleDateString = function() {
    function pad(value)
    {
        return ("0" + value).slice(-2);
    }
var date = new Date();
	
    var dateString = date.getFullYear() + "-" + 
            pad(date.getMonth() + 1, 2) + '-' + 
            pad(date.getDate(), 2);
    
    return dateString;
}

// Date format required by forecast.io API.
// We always represent a date with a time of midday,
// so our choice of day isn't susceptible to time zone errors.
Date.prototype.forecastDateString = function() {
    return this.simpleDateString() + "T12:00:00";
}


// Code for LocationWeatherCache class and other shared code.

// Prefix to use for Local Storage.  You may change this.
var APP_PREFIX = "weatherApp";

function LocationWeatherCache()
{
    // Private attributes:

    var locations = [];
    var callbacks = {};// loaded c

    // Public methods:
    
    // Returns the number of locations stored in the cache.
    //
    this.length = function() {
       return locations.length 
    };
    
    // Returns the location object for a given index.
    // Indexes begin at zero.
    //
    this.locationAtIndex = function(index) {
        if (index<= this.length)
        {
            return locations[index]  
        }
		else 
        {
            console.log("location at index does not exist")
            return null
        }
    };

    // Given a latitude, longitude and nickname, this method saves a 
    // new location into the cache.  It will have an empty 'forecasts'
    // property.  Returns the index of the added location.
    //
    this.addLocation = function(latitude, longitude, nickname)
    {
        var addedLocation= {
			nickname: nickname,
			latitude: latitude,
			longitude: longitude,
			forecast: {"":""}};
		 
		 locations.push(addedLocation)
    }

    // Removes the saved location at the given index.
    // 
    this.removeLocationAtIndex = function(index)
    {
        locations.splice(index,1)
    }

    // This method is used by JSON.stringify() to serialise this class.
    // Note that the callbacks attribute is only meaningful while there 
    // are active web service requests and so doesn't need to be saved.
    //
    this.toJSON = function() {
        var locationsAsJSON = JSON.stringify(locations);
        return locationsAsJSON 
    };

    // Given a public-data-only version of the class (such as from
    // local storage), this method will initialise the current
    // instance to match that version.
    //
    this.initialiseFromPDO = function(locationWeatherCachePDO) {
         locations = loadLocations()
         return locations
    };

    // Request weather for the location at the given index for the
    // specified date.  'date' should be JavaScript Date instance.
    //
    // This method doesn't return anything, but rather calls the 
    // callback function when the weather object is available. This
    // might be immediately or after some indeterminate amount of time.
    // The callback function should have two parameters.  The first
    // will be the index of the location and the second will be the 
    // weather object for that location.
    // 
    this.getWeatherAtIndexForDate = function(index, date, callback) {
        var latitude = locations[index].latitude
        var longitude= locations[index].longitude
		var forecastName=(latitude+","+longitude +","+ date).toString()
       
    
       if (!(forecastName in locations[index].forecast)==0) 
            {
            callback(locations[index].forecast);
	           
            }
            else {
                // add data retrived to forecast
                 var exclusions = "?exclude=[currently,hourly,alerts,flags]"
                 var siUnits ="&units=ca"              /// why doesnt this work???
                 var callBackString= "&callback=weatherResponse"
                 var urlString = "https://api.forecast.io/forecast/d0abf988ba68e2decf75631fd39f81fb/"+ forecastName+exclusions+siunits+callBackString
                console.log(urlString)
                var script = document.createElement('script');
                script.src = urlString;
                document.body.appendChild(script);
                
            }
    };
    
    // This is a callback function passed to forecast.io API calls.
    // This will be called via JSONP when the API call is loaded.
    //
    // This should invoke the recorded callback function for that
    // weather request.
    //
    this.weatherResponse = function(response) {
        
        console.log(response);
    };

    // Private methods:
    
    // Given a latitude and longitude, this method looks through all
    // the stored locations and returns the index of the location with
    // matching latitude and longitude if one exists, otherwise it
    // returns -1.
    //
    function indexForLocation(latitude, longitude)
    {
		for (var i = 0; i < locations.length; i++)
		{
			if (locations[i].latitude === latitude && locations[i].longitude ===longitude)
			{
				return i
			}
		}
    	return -1
    };
  
}

// Restore the singleton locationWeatherCache from Local Storage.
//
function loadLocations()
{
    if (localStorage.getItem(APP_PREFIX) === null) {
        console.log("no saved locations")
        return null
        }
    else
    {
        var locationsFromStorageJSON = localStorage.getItem(APP_PREFIX)
        var locationsFromStorage= JSON.parse(locationsFromStorageJSON)
        return locationsFromStorage
    }
    
}

// Save the singleton locationWeatherCache to Local Storage.
//
function saveLocations()
{ 
    var locationsAsJSON=LocationWeatherCache.toJSON()    // used tester1 as the new class object but should change !! 
    localStorage.setItem(APP_PREFIX,locationsAsJSON )   
}

loadLocations()