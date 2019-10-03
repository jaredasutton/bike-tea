import axios from "axios";
import apiKey from "../../config.js";
let map;
let drawingManager;
let placeIdArray = [];
let polylines = [];
let snappedCoordinates = [];

export let initializeMap = function() {
  let google = window.google;
  let mapOptions = {
    zoom: 12,
    center: { lat: 40.7081, lng: -73.9571 },
    minZoom: 12
  };
  map = new google.maps.Map(document.getElementById("map"), mapOptions);

  // Adds a Places search box. Searching for a place will center the map on that
  // location.
  map.controls[google.maps.ControlPosition.RIGHT_TOP].push(
    document.getElementById("bar")
  );
  let autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("autoc")
  );
  autocomplete.bindTo("bounds", map);
  autocomplete.addListener("place_changed", function() {
    let place = autocomplete.getPlace();
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }
  });

  // Enables the polyline drawing control. Click on the map to start drawing a
  // polyline. Each click will add a new vertice. Double-click to stop drawing.
  drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.POLYLINE,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [google.maps.drawing.OverlayType.POLYLINE]
    },
    polylineOptions: {
      strokeColor: "#696969",
      strokeWeight: 2
    }
  });
  drawingManager.setMap(map);

  // Snap-to-road when the polyline is completed.
  drawingManager.addListener("polylinecomplete", function(poly) {
    let path = poly.getPath();
    polylines.push(poly);
    placeIdArray = [];
    runSnapToRoad(path);
  });

  // Clear button. Click to remove all polylines.
  document.getElementById("clear").addEventListener("click", function(ev) {
    for (let i = 0; i < polylines.length; ++i) {
      polylines[i].setMap(null);
    }
    polylines = [];
    ev.preventDefault();
    return false;
  });
};

// Snap a user-created polyline to roads and draw the snapped path
export let runSnapToRoad = function(path) {
  let pathValues = [];
  for (let i = 0; i < path.getLength(); i++) {
    pathValues.push(path.getAt(i).toUrlValue());
  }
  let params = {
    interpolate: true,
    key: apiKey,
    path: pathValues.join("|")
  };
  console.log(params);

  axios
    .get("https://roads.googleapis.com/v1/snapToRoads", {
      params
    })
    .then(function({ data }) {
      processSnapToRoadResponse(data);
      drawSnappedPolyline();
    });
};

// Store snapped polyline returned by the snap-to-road service.
export let processSnapToRoadResponse = function(data) {
  snappedCoordinates = [];
  placeIdArray = [];
  for (let i = 0; i < data.snappedPoints.length; i++) {
    let latlng = new google.maps.LatLng(
      data.snappedPoints[i].location.latitude,
      data.snappedPoints[i].location.longitude
    );
    snappedCoordinates.push(latlng);
    placeIdArray.push(data.snappedPoints[i].placeId);
  }
};

// Draws the snapped polyline (after processing snap-to-road response).
export let drawSnappedPolyline = function() {
  let snappedPolyline = new google.maps.Polyline({
    path: snappedCoordinates,
    strokeColor: "black",
    strokeWeight: 3
  });
  //snappedPolyline.click

  snappedPolyline.setMap(map);
  polylines.push(snappedPolyline);
};
