$(function() {
  $("#updateMap").click(function(event) {
    event.preventDefault();
    var origin = document.getElementById("from_places").value;
    var destination = document.getElementById("to_places").value;
    geoCode(origin);
    geoCode(destination);
  });
});
let map;
function initMap() {
  const options = {
    center: { lat: 6.4698, lng: 3.5852 },
    zoom: 8
  };
  map = new google.maps.Map(document.getElementById("map"), options);
  // addMarker({ lat: 6.4698, lng: 3.58di52 });
  //addMarker({ lat: 9.0765, lng: 7.3986 });
}
function addMarker(coords) {
  var marker = new google.maps.Marker({
    position: coords,
    map: map
  });
}
// geoCode();
function geoCode(address) {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address }, function(results, status) {
    if (status == "OK") {
      var location_lat = results[0].geometry.location.lat();
      var location_lng = results[0].geometry.location.lng();
      addMarker({ lat: location_lat, lng: location_lng });
    }
  });
}
