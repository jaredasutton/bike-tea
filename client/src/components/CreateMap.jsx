import React, { useState, useEffect } from "react";
import NewMapNameField from "./NewMapNameField.jsx";
import RouteDescription from "./RouteDescription.jsx";

export default ({
  editingRoute,
  setEditingRoute,
  snappedPoints,
  setSnappedPoints
}) => {
  const [mapName, setMapName] = useState("");
  const [routeDescLoc, setRouteDescLoc] = useState([0, 0]);
  const [routeDesc, setRouteDesc] = useState("");
  const [routeColor, setRouteColor] = useState("green");

  return (
    <div className="create-map-container">
      <NewMapNameField
        mapName={mapName}
        onChange={e => setMapName(e.target.value)}
      />

      <RouteDescription
        visible={editingRoute !== null ? "visible" : "invisible"}
        route={editingRoute}
        description={
          editingRoute
            ? snappedPoints[editingRoute.snappedPointIndex].description
            : ""
        }
        color={
          editingRoute
            ? snappedPoints[editingRoute.snappedPointIndex].color
            : "green"
        }
        changeRouteDesc={e => {
          setRouteDesc(e.target.value);
          let newSP = snappedPoints.slice();
          newSP[editingRoute.snappedPointIndex].description = e.target.value;
          setSnappedPoints(newSP);
        }}
        changeRouteColor={color => {
          setRouteColor(color);
          let newSP = snappedPoints.slice();
          newSP[editingRoute.snappedPointIndex].strokeColor = color;
          setSnappedPoints(newSP);
          editingRoute.polyline.setOptions({ strokeColor: color });
        }}
      />
    </div>
  );
};
