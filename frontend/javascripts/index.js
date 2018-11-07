$(function() {
  google.maps.event.addDomListener(window, "load", function() {
    var from_places = new google.maps.places.Autocomplete(
      document.getElementById("from_places")
    );
    var to_places = new google.maps.places.Autocomplete(
      document.getElementById("to_places")
    );

    google.maps.event.addListener(from_places, "place_changed", function() {
      var from_place = from_places.getPlace();
      var from_address = from_place.formatted_address;
      $("#origin").val(from_address);
    });

    google.maps.event.addListener(to_places, "place_changed", function() {
      var to_place = to_places.getPlace();
      var to_address = to_place.formatted_address;
      $("#destination").val(to_address);
    });
  });
  function calculateDistance() {
    var origin = $("#origin").val();
    var destination = $("#destination").val();
    console.log("origin and destination ", origin, destination);
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        avoidHighways: false,
        avoidTolls: false
      },
      callback
    );
  }

  function callback(response, status) {
    if (status != google.maps.DistanceMatrixStatus.OK) {
      $("#result").html(err);
    } else {
      var origin = response.originAddresses[0];
      var destination = response.destinationAddresses[0];
      console.log("origin, destination", origin, destination);
      if (response.rows[0].elements[0].status === "ZERO_RESULTS") {
        $("#result").html("Better get on a plane, there are no roads ");
      } else {
        var distance = response.rows[0].elements[0].distance;
        var duration = response.rows[0].elements[0].duration;

        var distance_in_kilo = distance.value / 1000;
        var distance_in_mile = distance.value / 1609.34;
        var duration_text = duration.text;
        var duration_value = duration.value;
        $("#in-mile").val(distance_in_mile.toFixed(2));
        $("#in-kilo").text(distance_in_kilo.toFixed(2));
        $("#duration_text").val(duration_text);
        $("#duration_value").text(duration_value);
      }
    }
  }

  $("#distance_form").submit(function(e) {
    e.preventDefault();
    calculateDistance();
  });
});
