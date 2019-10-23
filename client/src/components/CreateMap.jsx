import React, { useState, useEffect } from "react";
import NewMapNameField from "./NewMapNameField.jsx";
import NewRouteDescription from "./NewRouteDescription.jsx";
import NewMapSubmitButton from "./NewMapSubmitButton.jsx";

export default ({
  editingRoute,
  setEditingRoute,
  snappedPoints,
  setSnappedPoints,
  submitNewMap,
  newMapName,
  setNewMapName
}) => {
  //const [routeDescLoc, setRouteDescLoc] = useState([0, 0]);
  const [routeDesc, setRouteDesc] = useState("");
  const [routeColor, setRouteColor] = useState("green");

  return (
    <div className="create-map-container">
      <h2 className="new-map-panel">
        <span>New Map Name: </span>
        <NewMapNameField
          mapName={newMapName}
          onChange={e => setNewMapName(e.target.value)}
        />
        <NewMapSubmitButton submitAction={submitNewMap} />
      </h2>

      <NewRouteDescription
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
        confirmOrExit={() => setEditingRoute(null)}
      />
    </div>
  );
};
