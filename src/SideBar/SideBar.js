import React from "react";
import "./SideBar.css";

function SideBar(props) {
  //console.log("these are the markers in sidebar", markers);
  console.log("theses are the props", props);

  const markers = props.markers;
  const setTempMarker = props.setTempMarker;
  const panTo = props.panTo;


  const sideBarMarkers = () => {
    return (
      <div>
        <ul>
          {markers.map((marker) => (
              console.log("this is setting temp marker on click", marker),
            <li
              className="sidebar-markers"
              key={marker.id}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={(marker) => {
                setTempMarker({
                    lat: parseFloat(marker.lat),
                    lng: parseFloat(marker.lng),
                  //time: new Date(),
                });
                panTo({
                  lat: parseFloat(marker.lat),
                  lng: parseFloat(marker.lng),
                });
              }}
            >
              This is the marker id; {marker.id}
            </li>
          ))}
          ;
        </ul>
      </div>
    );
  };

  return (
    <div className="sidebar">
      <h1>
        Wanderer{" "}
        <span role="img" aria-label="current location">
          📍
        </span>
      </h1>
      
      <ul>
      {sideBarMarkers()}
        <li>This is marker one with it's stuff.</li>
        <li>This is marker two with it's stuff.</li>
        <li>This is marker three with it's stuff.</li>
      </ul>
    </div>
  );
}

export default SideBar;
