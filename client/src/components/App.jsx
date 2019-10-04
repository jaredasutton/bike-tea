import React, { useState, useEffect } from "react";
import MapBox from "./MapBox.jsx";
import MapList from "./MapList.jsx";
import CreateMap from "./CreateMap.jsx";
import PathMap from "../PathMap.js";

export default () => {
  const [view, setView] = useState("CREATE_MAP");
  const [mapList, setMapList] = useState([]);
  const [currMapId, setCurrMapId] = useState(0);
  const [currMap, setCurrMap] = useState({});
  const [polylines, setPolylines] = useState([]);
  const [editingRoute, setEditingRoute] = useState(null);
  const [snappedPoints, setSnappedPoints] = useState([]);
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
    body = (
      <CreateMap
        editingRoute={editingRoute}
        setEditingRoute={setEditingRoute}
        snappedPoints={snappedPoints}
        setSnappedPoints={setSnappedPoints}
      />
    );
  }
  useEffect(() => {
    setCurrMap(
      new PathMap({
        editingRoute,
        setEditingRoute,
        snappedPoints,
        setSnappedPoints
      })
    );
  }, [currMapId]);
  return (
    <React.Fragment>
      {body}
      <MapBox className={view === "HOME" ? "invisible" : "visible"} />
    </React.Fragment>
  );
};
