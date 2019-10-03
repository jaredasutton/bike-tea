import React, { useState, useEffect } from "react";
import {
  initializeMap,
  drawSnappedPolyline,
  processSnapToRoadResponse,
  runSnapToRoad
} from "./initializeMap.js";

export default () => {
  useEffect(() => {
    initializeMap();
  }, []);
  return (
    <React.Fragment>
      <div id="map"></div>
      <div id="bar">
        <p className="auto">
          <input type="text" id="autoc" />
        </p>
        <p>
          <a id="clear" href="#">
            Click here
          </a>{" "}
          to clear map.
        </p>
      </div>
    </React.Fragment>
  );
};

{
  /*
<div id="map"></div>
<div id="bar">
  <p class="auto"><input type="text" id="autoc" /></p>
  <p><a id="clear" href="#">Click here</a> to clear map.</p>
</div>
*/
}
