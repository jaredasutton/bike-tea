import axios from "axios";
import apiKey from "../../config.js";
let map;
let placeIdArray = [];
let polylines = [];
let snappedCoordinates = [];

export default class PathMap {
  constructor() {
    this.map;
    this.placeIdArray = [];
    this.polylines = [];
    this.snappedCoordinates = [];
    this.newPLSnappedPoints = [];
    this.newPLStrokeColor = "green";
    let google = window.google;
    let mapOptions = {
      zoom: 12,
      center: { lat: 40.7081, lng: -73.9571 },
      minZoom: 12
    };
    document.getElementById("map").innerHTML = "";
    this.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // Adds a Places search box. Searching for a place will center the map on that
    // location.
    this.map.controls[google.maps.ControlPosition.RIGHT_TOP].push(
      document.getElementById("bar")
    );

    // Enables the polyline drawing control. Click on the map to start drawing a
    // polyline. Each click will add a new vertice. Double-click to stop drawing.
    let drawingManager = new google.maps.drawing.DrawingManager({
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
    drawingManager.setMap(this.map);

    // Snap-to-road when the polyline is completed.
    drawingManager.addListener("polylinecomplete", poly => {
      let path = poly.getPath();
      this.polylines.push(poly);
      this.placeIdArray = [];
      this.runSnapToRoad(path);
    });

    // Clear button. Click to remove all polylines.
    document.getElementById("clear").addEventListener("click", ev => {
      for (let i = 0; i < this.polylines.length; ++i) {
        this.polylines[i].setMap(null);
      }
      this.polylines = [];
      ev.preventDefault();
      return false;
    });
  }
  // Snap a user-created polyline to roads and draw the snapped path
  runSnapToRoad(path) {
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
      .then(({ data: { snappedPoints } }) => {
        this.processSnapToRoadResponse(snappedPoints);
        this.polylines[this.polylines.length - 1].setOptions({
          strokeWeight: 0
        });
        this.drawSnappedPolyline();
        this.newPLSnappedPoints = snappedPoints;
      });
  }
  // Store snapped polyline returned by the snap-to-road service.
  processSnapToRoadResponse(snappedPoints) {
    this.snappedCoordinates = [];
    debugger;
    this.placeIdArray = [];
    for (let i = 0; i < snappedPoints.length; i++) {
      let latlng = new google.maps.LatLng(
        snappedPoints[i].location.latitude,
        snappedPoints[i].location.longitude
      );
      this.snappedCoordinates.push(latlng);
      this.placeIdArray.push(snappedPoints[i].placeId);
    }
  }
  // Draws the snapped polyline (after processing snap-to-road response).
  drawSnappedPolyline(
    path = this.snappedCoordinates,
    strokeColor = this.newPLStrokeColor,
    strokeWeight = 3
  ) {
    let snappedPolyline = new google.maps.Polyline({
      path,
      strokeColor,
      strokeWeight
    });
    //snappedPolyline.click

    snappedPolyline.setMap(this.map);
    snappedPolyline.addListener("click", () => {
      snappedPolyline.setOptions({ strokeColor: "blue" });
      this.newPLStrokeColor = "blue";
    });
    this.polylines.push(snappedPolyline);
  }
}
