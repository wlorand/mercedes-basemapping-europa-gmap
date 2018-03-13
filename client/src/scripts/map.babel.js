'use strict';

/** 
 * file: map.js -- inside an IIFE
 *
 */

var map = function () {

	function initMap() {

		// 1- set some key mapping vars (map options, map center, map styles)
		var mapDiv = document.getElementById('map-container');
		var germanyCenter = new google.maps.LatLng(51.165691, 10.451526); // centroid point de
		var infoWin = new google.maps.InfoWindow({ maxWidth: 200 }); // do i need content obj prop here?

		// gmap style as an array of objects
		var tanEarthStyles = [{
			stylers: [{ hue: '#DCBE98' }, { invert_lightness: false }, { saturation: -20 }]
		}, {
			featureType: "administrative.locality",
			elementType: "labels",
			stylers: [{ visibility: "off" }]
		}, {
			featureType: "water",
			elementType: "labels",
			stylers: [{ visibility: "off" }]
		}];

		// gmap options js object
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

		// 2- create the main Map object -- takes a dom node to render and an options object 
		var map = new google.maps.Map(mapDiv, mapOptions);

		// 3- fetch some data and make map markers -- callback function that has data
		$.getJSON('../data/euroCountryCentroids.json', function (data) {

			data.forEach(function (elem, i) {
				console.log(elem.lat.toFixed(3)); // number

				// 3a - create markers for each data element
				var lat3 = elem.lat.toFixed(3);
				var lng3 = elem.lng.toFixed(3);

				var countryMarker = new google.maps.Marker({
					position: new google.maps.LatLng(lat3, lng3),
					map: map,
					icon: '../assets/images/favicon-24x24.ico',
					title: elem.country,
					html: '<div class="info-window-text"> ' + elem.country + ' <br /> Center Lat: ' + lat3 + ', Center Long: ' + lng3 + '</div>'
				});

				// native JS Events
				// 3b - wire up info windows to marker clicks (uses google maop events)
				google.maps.event.addListener(countryMarker, 'click', function () {
					infoWin.close();
					infoWin.setContent(this.html);
					//map.setCenter(this.position);
					infoWin.open(map, this);
				});
			}); // forEach
		}); // $.getJSON
	}

	// Event Listener to Fire the JS when the DOM is ready
	document.addEventListener('DOMContentLoaded', initMap);
}();

module.exports = map;
