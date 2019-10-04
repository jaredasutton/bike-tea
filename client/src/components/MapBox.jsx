import React, { useState, useEffect } from "react";

import axios from "axios";

export default ({ visible }) => {
  return (
    <div className={"map-box-container " + visible}>
      <div id="map"></div>
    </div>
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
