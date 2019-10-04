import React, { useState, useEffect } from "react";

export default ({
  mapName,
  changeRouteDesc,
  changeRouteColor,
  visible,
  description,
  color
}) => {
  return (
    <div
      id="new-route-description"
      className={"route-description new-route-description " + visible}
    >
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
      <input
        value={description}
        onChange={changeRouteDesc}
        className="new-route-description-field"
      ></input>
    </div>
  );
};
