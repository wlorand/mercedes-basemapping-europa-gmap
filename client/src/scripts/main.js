/** 
  * file: main.js
  */

function initMap(){

	// 1- set some key mapping vars (map options, map center, map styles)
	const mapDiv = document.getElementById('map-container');
	const germanyCenter = new google.maps.LatLng(51.165691, 10.451526); // centroid point de
	
	const tanEarthStyles = [
		{
		stylers: [
				{ hue: '#DCBE98' }, 
				{ invert_lightness: false},
            	{ saturation: -20 }
			]
		} 
	];

	const mapOptions = {
    	zoom: 6,
      	center: germanyCenter,
      	mapTypeId: google.maps.MapTypeId.TERRAIN, // ROADMAP  / TERRAIN / SATELLITE 
    	// controls
    	disableDefaultUI: true,
	  	panControl: false,
	  	zoomControl: true,
	  	zoomControlOptions: {
	    	style: google.maps.ZoomControlStyle.SMALL,
	     	position: google.maps.ControlPosition.LEFT_BOTTOM
	  	},
    	// styles
    	styles: tanEarthStyles
    };

    // 2- create the Map object 
    const map = new google.maps.Map(mapDiv, mapOptions);

}

// Event Listeners
document.addEventListener('DOMContentLoaded', initMap);
