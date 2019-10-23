import axios from "axios";
import apiKey from "../../config.js";

export default class PathMap {
  constructor({
    editingRoute,
    setEditingRoute,
    snappedPoints = [],
    setSnappedPoints = () => {},
    editingMap,
    viewingDesc,
    setViewingDesc
  }) {
    this.map;
    this.placeIdArray = [];
    this.polylines = [];
    this.snappedCoordinates = [];
    this.newPLSnappedPoints = [];
    this.newPLStrokeColor = "green";
    this.newPLEndpointX = null;
    this.newPLEndpointY = null;
    this.editingRoute = editingRoute;
    this.setEditingRoute = route => {
      this.editingRoute = route;
      setEditingRoute(route);
    };
    this.snappedPoints = snappedPoints;
    this.setSnappedPoints = snappedPoints => {
      this.snappedPoints = snappedPoints;
      setSnappedPoints(snappedPoints);
    };
    this.viewingDesc = viewingDesc;
    this.setViewingDesc = route => {
      this.viewingDesc = route;
      setViewingDesc(route);
    };
    this.editingMap = editingMap;

    let google = window.google;

    let mapOptions = {
      zoom: 12,
      center: { lat: 40.7081, lng: -73.9571 },
      minZoom: 12,
      draggableCursor: "move"
    };
    document.getElementById("map").innerHTML = "";

    this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    if (this.editingMap) {
      google.maps.event.addDomListener(this.map.getDiv(), "click", e => {
        if (this.editingRoute && this.lastClickedEditingRoute) {
          this.newPLEndpointX = e.clientX;
          this.newPLEndpointY = e.clientY;
          let newRouteDescription = document.getElementById(
            "new-route-description"
          );
          newRouteDescription.style.top = this.newPLEndpointY + "px";
          newRouteDescription.style.left = this.newPLEndpointX + "px";
          this.lastClickedEditingRoute = false;
        } else if (this.editingRoute && !this.lastClickedEditingRoute) {
          this.setEditingRoute(null);
        }
      });
    } else {
      google.maps.event.addDomListener(this.map.getDiv(), "mousemove", e => {
        let routeDescription = document.getElementById("route-description");
        routeDescription.style.top = e.clientY + "px";
        routeDescription.style.left = e.clientX + "px";
      });
    }
    if (this.editingMap) {
      // Adds a Places search box. Searching for a place will center the map on that
      // location.
      this.map.controls[google.maps.ControlPosition.RIGHT_TOP].push(
        document.getElementById("bar")
      );

      // Enables the polyline drawing control. Click on the map to start drawing a
      // polyline. Each click will add a new vertice. Double-click to stop drawing.
      let drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.POLYLINE,
        drawingControl: this.editingMap,
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
      this.clear = () => {
        for (let i = 0; i < this.polylines.length; ++i) {
          this.polylines[i].setMap(null);
        }
        this.polylines = [];
        ev.preventDefault();
        return false;
      };
    }
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

    axios
      .get("https://roads.googleapis.com/v1/snapToRoads", {
        params
      })
      .then(({ data: { snappedPoints } }) => {
        this.polylines[this.polylines.length - 1].setOptions({
          strokeWeight: 0
        });
        this.newPLSnappedPoints = snappedPoints;
        let newSnappedPointsIndex = this.snappedPoints.length;
        let newPath = {
          description: "",
          snappedPoints,
          strokeColor: this.newPLStrokeColor,
          strokeWeight: 5
        };
        this.setSnappedPoints(this.snappedPoints.concat(newPath));
        this.drawSnappedPolyline(
          this.processSnapToRoadResponse(newPath.snappedPoints),
          newPath.strokeColor,
          newPath.strokeWeight,
          newSnappedPointsIndex
        );
      });
  }
  // Store snapped polyline returned by the snap-to-road service.
  processSnapToRoadResponse(snappedPoints) {
    this.snappedCoordinates = [];
    // debugger;
    this.placeIdArray = [];
    for (let i = 0; i < snappedPoints.length; i++) {
      let latlng = new google.maps.LatLng(
        snappedPoints[i].location.latitude,
        snappedPoints[i].location.longitude
      );
      this.snappedCoordinates.push(latlng);
      this.placeIdArray.push(snappedPoints[i].placeId);
    }
    return this.snappedCoordinates;
  }
  // Draws the snapped polyline (after processing snap-to-road response).
  drawSnappedPolyline(
    path = [],
    strokeColor = this.newPLStrokeColor,
    strokeWeight = 5,
    snappedPointIndex
  ) {
    let snappedPolyline = new google.maps.Polyline({
      path,
      strokeColor,
      strokeWeight
    });
    //snappedPolyline.click

    snappedPolyline.setMap(this.map);
    snappedPolyline.addListener("click", e => {
      //snappedPolyline.setOptions({ strokeColor: "blue" });
      //this.newPLStrokeColor = "blue";
      snappedPolyline.setOptions({ strokeWeight: 7 });

      this.setEditingRoute({ polyline: snappedPolyline, snappedPointIndex });
      this.lastClickedEditingRoute = true;
    });

    snappedPolyline.addListener("mouseover", e => {
      this.setViewingDesc({ polyline: snappedPolyline, snappedPointIndex });
    });
    snappedPolyline.addListener("mouseout", e => {
      this.setViewingDesc(null);
    });

    this.polylines.push(snappedPolyline);
  }
}
