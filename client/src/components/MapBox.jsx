import React, { useState, useEffect } from "react";
import PathMap from "../PathMap.js";
import axios from "axios";

export default ({ mapId }) => {
  let [polylines, setPolylines] = useState([]);
  let [currMap, setCurrMap] = useState({});
  useEffect(() => {
    setCurrMap(new PathMap());
  }, []);
  return (
    <React.Fragment>
      <div id="map"></div>
      <div id="bar">
        <p>
          <a id="clear" href="#">
            Click here
          </a>{" "}
          to clear the map.
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
