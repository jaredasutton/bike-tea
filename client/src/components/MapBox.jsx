import React, { useState, useEffect } from "react";

import axios from "axios";

export default () => {
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
