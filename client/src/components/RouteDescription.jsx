import React, { useState, useEffect } from "react";

export default ({ mapName, onChange }) => {
  return (
    <div id="new-route-description" className="new-route-description">
      <button
        className="new-route-description-color new-route-description-red"
        value="red"
      >
        RED
      </button>
      <button
        className="new-route-description-color new-route-description-yellow"
        value="red"
      >
        YELLOW
      </button>
      <button
        className="new-route-description-color new-route-description-green"
        value="red"
      >
        GREEN
      </button>
      <input
        value={mapName}
        onChange={onChange}
        className="new-route-description-field"
      ></input>
    </div>
  );
};
