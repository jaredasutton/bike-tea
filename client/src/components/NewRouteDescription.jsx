import React, { useState, useEffect } from "react";

export default ({
  mapName,
  changeRouteDesc,
  changeRouteColor,
  visible,
  description,
  color,
  confirmOrExit
}) => {
  return (
    <div
      id="new-route-description"
      className={"route-description new-route-description " + visible}
    >
      {" "}
      <div className="rd-heading">Safety Rating</div>
      <div className="new-route-description-colors">
        <button
          className=" new-route-description-red"
          onClick={() => changeRouteColor("red")}
        />
        <button
          className=" new-route-description-yellow"
          onClick={() => changeRouteColor("yellow")}
        />
        <button
          className=" new-route-description-green"
          onClick={() => changeRouteColor("green")}
        />
      </div>
      <br />
      <div>Description</div>
      <br />
      <textarea
        value={description}
        onChange={changeRouteDesc}
        className="new-route-description-field"
      ></textarea>
      <br />
      <button onClick={confirmOrExit}>Confirm</button>
    </div>
  );
};
