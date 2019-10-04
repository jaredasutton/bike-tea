import React, { useState, useEffect } from "react";

export default ({ map, onClick }) => {
  return (
    <div className="map-list-item" onClick={onClick}>
      {map.name}
    </div>
  );
};
