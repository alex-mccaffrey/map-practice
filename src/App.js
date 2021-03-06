import React from "react";
import "./App.css";
import DummyData from "./DummyData";
import MapStyles from "./mapStyles";
import SideBar from "./SideBar/SideBar";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { formatRelative } from "date-fns";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxList,
  ComboboxPopover,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

export default function App() {
  const libraries = ["places"];
  const mapContainerStyle = {
    width: "80vw",
    height: "100vh",
  };

  // function getCenter() {
  //   //const center = {};
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       panTo({
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude,
  //       }); /// this is the successful call
  //     },
  //     //() => null ///this is the error
  //     () => alert("There was an error getting your location")
  //   );
  //   //return (center = {lat,lng,});
  // }
  // const center = getCenter();

  const center = {
    lat: 39.7392,
    lng: -104.9903,
  };
  const options = {
    styles: MapStyles,
    disableDefaultUI: true,
    zoomControl: true,
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  // const [markers, setMarkers] = React.useState([]);
  const [markers, setMarkers] = React.useState(DummyData);
  const [selected, setSelected] = React.useState(null);
  const [tempMarker, setTempMarker] = React.useState({});


  // const onMapClick = React.useCallback((e) => {
  //   setMarkers((current) => [
  //     ...current,
  //     {
  //       lat: e.latLng.lat(),
  //       lng: e.latLng.lng(),
  //       time: new Date(),
  //     },
  //   ]);
  // }, []);
  const onMapClick = React.useCallback((e) => {
    setTempMarker({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
      time: new Date(),
    });
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    console.log("this is inside the panTo")
    console.log("this is the latlng in panto", lat, lng)
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(19);
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  /////Here is the temp marker, aka a single marker on each click, not multiple
  const renderTempMarker = () => {
    if (Object.keys(tempMarker).length > 0) {
      return (
        <Marker
          key={tempMarker.time}
          position={{ lat: parseFloat(tempMarker.lat), lng: parseFloat(tempMarker.lng) }}
          onClick={() => {
            setSelected(tempMarker);
          }}
          
        />
      );
    }
  };


  return (
    <div className="App">
      
      {/* <Search panTo={panTo} />   took out search bar, if added back in this needs to be uncommented*/} 
      <Locate panTo={panTo} setTempMarker={setTempMarker} />
      <SideBar markers={markers} panTo={panTo}/>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {/* {markers.map((marker) => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            // icon={{
            //   url: '/logo.png',
            //   scaledSize: new window.google.maps.Size(30, 30),
            //   origin: new window.google.maps.Point(0,0),
            //   anchor: new window.google.maps.Point(15, 15),
            // }}
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))} */}

        {DummyData.map((marker) => (
          
          <Marker
            key={marker.time}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))}

        {renderTempMarker()}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>I'm here</h2>
              {/* <p>I was here at: {formatRelative(selected.time, new Date())}</p> */}
              <p>I was here at: {selected.time}</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
      
    </div>
  );
}

///////// Current Location Feature //////////

function Locate({ panTo, setTempMarker }) {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setTempMarker({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              time: new Date(),
            })
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => alert("There was an error getting your location. Please check the location settings in your browser.")
        );
      }}
    >
      <img src="Compass-Symbol.svg" alt="compass - locate me" />
    </button>
  );
}

//////////// Search Bar /////////////////
// function Search({ panTo }) {
//   const {
//     ready,
//     value,
//     suggestions: { status, data },
//     setValue,
//     clearSuggestions,
//   } = usePlacesAutocomplete({
//     requestOptions: {
//       location: { lat: () => 39.7392, lng: () => -104.9903 },
//       radius: 2000,
//     },
//   });

//   return (
//     <div className="search">
//       <Combobox
//         onSelect={async (address) => {
//           setValue(address, false);
//           clearSuggestions();

//           try {
//             const results = await getGeocode({ address });
//             const { lat, lng } = await getLatLng(results[0]);
//             panTo({ lat, lng });
//           } catch (error) {
//             console.log("error!");
//           }
//         }}
//       >
//         <ComboboxInput
//           value={value}
//           onChange={(e) => {
//             setValue(e.target.value);
//           }}
//           disabled={!ready}
//           placeholder="Enter and Address"
//         />
//         <ComboboxPopover>
//           <ComboboxList>
//             {status === "OK" &&
//               data.map(({ id, description }) => (
//                 <ComboboxOption key={id} value={description} />
//               ))}
//           </ComboboxList>
//         </ComboboxPopover>
//       </Combobox>
//     </div>
//   );
// }




