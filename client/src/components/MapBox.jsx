import React, { useState, useEffect } from 'react';

import axios from 'axios';

export default ({ visible }) => {
  return (
    <div className={'map-box-container ' + visible}>
      <div id="map"></div>
    </div>
  );
};
