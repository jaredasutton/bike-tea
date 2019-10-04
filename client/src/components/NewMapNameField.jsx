import React, { useState, useEffect } from "react";

export default ({ mapName, onChange }) => {
  return (
    <input
      value={mapName}
      onChange={onChange}
      className="new-map-name-field"
    ></input>
  );
};
