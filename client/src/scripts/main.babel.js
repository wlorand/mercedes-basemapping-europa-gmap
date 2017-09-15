'use strict';

/** 
  * file: main.js
  */

function initMap() {

		// 1- set some key mapping vars (map options, map center, map styles)
		var mapDiv = document.getElementById('map-container');
		var germanyCenter = new google.maps.LatLng(51.165691, 10.451526); // centroid point de

		var tanEarthStyles = [{
				stylers: [{ hue: '#DCBE98' }, { invert_lightness: false }, { saturation: -20 }]
		}, {
				featureType: "administrative.locality",
				elementType: "labels",
				stylers: [{ visibility: "off" }]
		}];

		var mapOptions = {
				zoom: 5,
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
		var map = new google.maps.Map(mapDiv, mapOptions);

		// 3- fetch some data for map markers
		$.getJSON('../data/euroCountryCentroids.json', function (data) {
				console.log({ data: data });
		});
}

// Event Listeners
document.addEventListener('DOMContentLoaded', initMap);
