import React, { useState } from "react";
import "../MainMap/MainMap.css";


import {
  GoogleMap,
  useLoadScript,
  Marker,

} from "@react-google-maps/api";
//import { playgrounds } from "../Playground/PG";
import "../AddPG/AddPG.scss";
import Modal from "../Modal/Modal";

const libraries = ["places"];
const mapContainerStyle = {
  height: "90vh",
  width: "100vw",
};
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
  lat: 52.370216,
  lng: 4.895168,
};



export default function SideMap(props) {



  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  //const [PGcoords, setPGcoords] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [marker, setMarker] = React.useState([]);
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const onMapClick = React.useCallback((e) => {
    setMarker({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
      time: new Date(),
    });
    setShowModal(true);
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  //const PGlocation = PGcoords;
  //console.log(PGlocation);

 

  const handleModal = (result) => {
    console.log({ result });
    setShowModal(false);
    result &&
      props.newPG(marker)
  };

  return (
    <div>
      {showModal && (
        <Modal
          title="Confirm your choice, please"
          positiveAnswer="Confirm"
          negativeAnswer="Change"
          handleModal={handleModal}
        />
      )}
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {marker && (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{
              lat: parseFloat(marker.lat),
              lng: parseFloat(marker.lng),
            }}
           
            // icon={{
            //   url: `/images/icons/marker.svg`,
            //   scaledSize: new window.google.maps.Size(25, 25),
            // }}
          />
        )}
      </GoogleMap>
    </div>
  );
}
