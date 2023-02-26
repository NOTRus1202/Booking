let map, infoWindowPickUp, infoWindowDropOff, geocoder, pickUpAutoComplete, dropOffAutoComplete, pickUpMarker, dropOffMarker, bounds, inputPickUpAddress, inputDropOffAddress;

function initMap() {
  
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 14.659520, lng: 120.976360 },
    zoom: 14,
  });
infoWindowPickUp = new google.maps.InfoWindow();
infoWindowDropOff = new google.maps.InfoWindow();
geocoder = new google.maps.Geocoder();

inputPickUpAddress = document.getElementById("searchPickup");
inputDropOffAddress = document.getElementById("searchDropoff");

const options = {
    fields: ["formatted_address", "geometry", "name"],
    strictBounds: false,
  };

 pickUpAutoComplete = new google.maps.places.Autocomplete(
    inputPickUpAddress,
    options
  );

  pickUpAutoComplete.bindTo("bounds", map);

  pickUpMarker = new google.maps.Marker({
    map,
    anchorPoint: new google.maps.Point(0, -29),
    icon: pinSymbol("red")
  });

  pickUpAutoComplete.addListener("place_changed", () => {
        // infoWindow.close();
        pickUpMarker.setVisible(false);

        const place = pickUpAutoComplete.getPlace();

        if (!place.geometry || !place.geometry.location) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert(
            "No details available for input: '" + place.name + "'"
        );
        return;
        }

        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
          }
      
          pickUpMarker.setPosition(place.geometry.location);
          pickUpMarker.setVisible(true);
          linkDestinations();
          infoWindowPickUp.setPosition(pickUpMarker.getPosition());
          infoWindowPickUp.open(map);
          infoWindowPickUp.open(map,pickUpMarker);
          infoWindowPickUp.setContent(place.formatted_address);
    });

    dropOffAutoComplete = new google.maps.places.Autocomplete(
        inputDropOffAddress,
        options
      );
    
      dropOffAutoComplete.bindTo("bounds", map);
    
      dropOffMarker = new google.maps.Marker({
        map,
        anchorPoint: new google.maps.Point(0, -29),
        icon: pinSymbol("blue")
      });
    
      dropOffAutoComplete.addListener("place_changed", () => {

            dropOffMarker.setVisible(false);
    
            const place = dropOffAutoComplete.getPlace();
    
            if (!place.geometry || !place.geometry.location) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert(
                "No details available for input: '" + place.name + "'"
            );
            return;
            }
    
            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
              } else {
                map.setCenter(place.geometry.location);
                map.setZoom(17);
              }
          
              dropOffMarker.setPosition(place.geometry.location);
              dropOffMarker.setVisible(true);
              linkDestinations();        
              infoWindowDropOff.setPosition(dropOffMarker.getPosition());
              infoWindowDropOff.open(map);
              infoWindowDropOff.open(map,dropOffMarker);
              console.log(place);
              infoWindowDropOff.setContent(place.formatted_address);
        });


}
inputPickUpAddress = document.getElementById("searchPickup");

const observer = new MutationObserver((mutations) => {
  // Loop through the mutations that were observed
  mutations.forEach((mutation) => {
    // Check if the mutation was a change to the text content of the target element
    if (mutation.type === 'characterData' && mutation.target === inputPickUpAddress) {
      // Run the function when the element's text changes
      console.log("changed");
    }
  });
});

// Configure the MutationObserver to observe changes to the text content of the target element
observer.observe(inputPickUpAddress, { characterData: true, subtree: true });

function findMePickUp(){
    console.log("sdf");
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindowPickUp.setPosition(pos);
          infoWindowPickUp.open(map);
          map.setZoom(17);
          map.setCenter(pos);

        geocoder
          .geocode({ location: pos })
          .then((response) => {
            if (response.results[0]) {
                console.log(response.results[0].formatted_address);
                
            pickUpMarker.setPosition(pos);
            linkDestinations();
            infoWindowPickUp.open(map,pickUpMarker);
            infoWindowPickUp.setContent(response.results[0].formatted_address);
            inputPickUpAddress.value = response.results[0].formatted_address;

            } else {
              window.alert("No results found");
            }
          })
          .catch((e) => window.alert("Geocoder failed due to: " + e));
      
        },
        () => {
          handleLocationError(true, infoWindowPickUp, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindowPickUp, map.getCenter());
    }
  }

  function linkDestinations(){
    if(dropOffMarker.getPosition() != null && pickUpMarker.getPosition()!= null){
        bounds = new google.maps.LatLngBounds();
        bounds.extend(dropOffMarker.getPosition());
        bounds.extend(pickUpMarker.getPosition());
        map.fitBounds(bounds);
        map.setCenter(bounds.getCenter());
    }else {

    }
}
  
function findMeDropOff(){
    console.log("sdf");
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindowDropOff.setPosition(pos);
          infoWindowDropOff.open(map);
          map.setZoom(17);
          map.setCenter(pos);

        geocoder
          .geocode({ location: pos })
          .then((response) => {
            if (response.results[0]) {
                console.log(response.results[0].formatted_address);
                
            dropOffMarker.setPosition(pos);
            linkDestinations();
            infoWindowDropOff.open(map,dropOffMarker);
            infoWindowDropOff.setContent(response.results[0].formatted_address);
            inputDropOffAddress.value = response.results[0].formatted_address;

            } else {
              window.alert("No results found");
            }
          })
          .catch((e) => window.alert("Geocoder failed due to: " + e));
      
        },
        () => {
          handleLocationError(true, infoWindowDropOff, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindowDropOff, map.getCenter());
    }
  }

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

function pinSymbol(color) {
    return {
        path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
        fillColor: color,
        fillOpacity: 1,
        strokeColor: '#000',
        strokeWeight: 2,
        scale: 1
    };
}

window.initMap = initMap;


    


