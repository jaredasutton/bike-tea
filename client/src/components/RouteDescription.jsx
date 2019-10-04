import React, { useState, useEffect } from "react";

export default ({ visible, description, color }) => {
  return (
    <div className="view-description-container">
      <div id="route-description" className={"route-description " + visible}>
        <p>{description}</p>
      </div>
    </div>
  );
};
