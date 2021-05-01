import React from "react";
import "./SideBar.css";

function SideBar(props) {
  console.log("theses are the props", props);

  const markers = props.markers;
  const panTo = props.panTo;

  const onClickPanTo = (marker) => {
    return (
      console.log("this is inside the onclickpanto", marker),
      panTo(
        {
          lat: marker.lat,
          lng: marker.lng,
        },
        console.log("this is inside the panTO", marker)
      )
    );
  };

  const sideBarMarkers = () => {
    return (
      <div>
        {markers.map(
          (marker) => (
            console.log("this is at the start of the map", marker),
            (
              <li
                key={marker.id}
                className="sidebar-markers"
                onClick={() => {onClickPanTo(marker)}}
              >
                {console.log("this is the marker at the label", marker)}
                This is the marker id; {marker.id}
              </li>
            )
          )
        )}
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

      <>{sideBarMarkers()}</>
    </div>
  );
}

export default SideBar;
