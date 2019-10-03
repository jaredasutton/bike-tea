import React, { useState, useEffect } from "react";
import MapBox from "./MapBox.jsx";
import MapList from "./MapList.jsx";

export default () => {
  const [view, setView] = useState("CREATE_MAP");
  const [mapList, setMapList] = useState([]);
  const [currMapId, setCurrMapId] = useState(0);
  let body;
  if (view === "HOME") {
    body = (
      <MapList>
        {mapList.map(map => (
          <MapListItem key={"map-" + map.id} map={map} />
        ))}
      </MapList>
    );
  } else if (view === "SINGLE_MAP") {
    body = <MapBox mapId={currMapId} />;
  } else if (view === "CREATE_MAP") {
    body = <MapBox mapId={null} />;
  }
  return <React.Fragment>{body}</React.Fragment>;
};
