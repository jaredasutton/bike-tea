import React, { useState, useEffect } from "react";
import MapBox from "./MapBox.jsx";
import MapList from "./MapList.jsx";
import MapListItem from "./MapListItem.jsx";
import CreateMap from "./CreateMap.jsx";
import PathMap from "../PathMap.js";
import RouteDescription from "./RouteDescription.jsx";
import axios from "axios";

export default () => {
  const [view, setView] = useState("HOME");
  const [mapList, setMapList] = useState([]);
  const [currMapId, setCurrMapId] = useState(0);
  const [currMap, setCurrMap] = useState({});
  const [currMapData, setCurrMapData] = useState({ _id: null });
  const [editingRoute, setEditingRoute] = useState(null);
  const [snappedPoints, setSnappedPoints] = useState([]);
  const [newMapName, setNewMapName] = useState("");
  const [editingMap, setEditingMap] = useState(false);
  const [viewingDesc, setViewingDesc] = useState(null);
  const submitNewMap = () => {
    let postObj = { name: newMapName, paths: snappedPoints };
    axios
      .post("/pathmaps", postObj)
      .then(() => {
        setView("HOME");
        setEditingMap(false);
      })
      .catch(console.error);
  };
  let body;
  if (view === "HOME") {
    body = (
      <MapList>
        {mapList.map(map => (
          <MapListItem
            onClick={() => {
              setCurrMapId(map._id);
              setCurrMapData(map);
              setView("SINGLE_MAP");
              setSnappedPoints(map.paths);
            }}
            key={"map-" + map._id}
            map={map}
          />
        ))}
        <MapListItem
          onClick={() => {
            setView("CREATE_MAP");
            setCurrMapId(0);
            setCurrMapData({});
            setSnappedPoints([]);
            setEditingMap(true);
          }}
          map={{ name: "+" }}
        />
      </MapList>
    );
  } else if (view === "SINGLE_MAP") {
    body = <h2>Map Name: {currMapData.name}</h2>;
  } else if (view === "CREATE_MAP") {
    body = (
      <CreateMap
        editingRoute={editingRoute}
        setEditingRoute={setEditingRoute}
        snappedPoints={snappedPoints}
        setSnappedPoints={setSnappedPoints}
        newMapName={newMapName}
        setNewMapName={setNewMapName}
        submitNewMap={submitNewMap}
      />
    );
  }
  useEffect(() => {
    let newPM = new PathMap({
      editingRoute,
      setEditingRoute,
      snappedPoints,
      setSnappedPoints,
      editingMap,
      setViewingDesc,
      viewingDesc
    });

    setCurrMap(newPM);
    if (currMapData._id) {
      currMapData.paths.map((path, pI) => {
        newPM.drawSnappedPolyline(
          newPM.processSnapToRoadResponse(path.snappedPoints),
          path.strokeColor,
          path.strokeWeight,
          pI
        );
      });
    }
    axios.get(`/pathmaps?userId=${5}`).then(({ data }) => setMapList(data));
    //setView("HOME");
  }, [currMapData._id, view, editingMap]);
  return (
    <React.Fragment>
      <div className={"app-header"} onClick={() => setView("HOME")}>
        Bike <img src="/public/biketea1.png" height="30px" />
        Tea
      </div>
      {body}
      <MapBox visible={view === "HOME" ? "invisible" : "visible"} />
      <RouteDescription
        visible={
          viewingDesc === null || view !== "SINGLE_MAP"
            ? "invisible"
            : "visible"
        }
        description={
          viewingDesc &&
          snappedPoints[viewingDesc.snappedPointIndex].description
        }
      />
    </React.Fragment>
  );
};
