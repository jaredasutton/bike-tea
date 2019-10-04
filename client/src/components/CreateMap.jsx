import React, { useState, useEffect } from "react";
import NewMapNameField from "./NewMapNameField.jsx";
import RouteDescription from "./RouteDescription.jsx";

export default ({ children }) => {
  const [mapName, setMapName] = useState("");
  return (
    <div className="create-map-container">
      <NewMapNameField
        mapName={mapName}
        onChange={e => setMapName(e.target.value)}
      />
      <RouteDescription />
      {children}
    </div>
  );
};
