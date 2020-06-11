import React, {useState, useEffect} from "react";
import "./MainMap.css";
import UserService from "../../services/user-service";
import { Link } from "react-router-dom";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import {playgrounds} from "../Playground/PG"
import "../AddPG/AddPG.scss"

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

const service = new UserService();

export default function MainMap() {

    // useEffect(() => {
    //     // axios.get('http://localhost:4000/playground/approvedPlaygrounds')
    //     // .then(result => {
    //     //     this.setState({playgrounds:result.data.PG})
    //     // })
    //     // .catch((error) => console.log(error));
    //   });

    const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  const onMapClick = React.useCallback((e) => {
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(17);
  }, []);
  const [selectedPG, setSelectedPG] = useState(null);
  const [myLocation, setMyLocation] = useState({})
  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>

      <Locate panTo={panTo} />
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: parseFloat(marker.lat), lng: parseFloat(marker.lng) }}
            onClick={() => {
              setSelected(marker);
            }}
         
          />

        ))}
        {myLocation ?
         <Marker
           position={{ lat:parseFloat(myLocation.lat), lng:parseFloat(myLocation.lng) }}
           icon={{
            url: `/images/icons/target.svg`,
            scaledSize: new window.google.maps.Size(25, 25)
          }}
           /> : null}
        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>Playground</h2>
            </div>
          </InfoWindow>
        ) : null}
        {playgrounds.map((playground, index) => (
            <Marker key={index} 
            position={{lat:parseFloat(playground.coordinates.lat), lng:parseFloat(playground.coordinates.lng)}}
            onClick={() => {
                setSelectedPG(playground)
            }}  
            />
        ))}
        {selectedPG && (
            <InfoWindow
                onCloseClick={() => {
                    setSelectedPG(null);
                }}
                position={{
                    lat: selectedPG.coordinates.lat,
                    lng: selectedPG.coordinates.lng
                }}
                >
                <div className="card border-0" style={{width: "18rem"}}>
                    <img src={selectedPG.photo[0]} className="card-img-top" alt="PGPhoto"></img>
                    <div class="card-body">
                        <h5 className="card-title">{selectedPG.address}</h5>
                        <p className="card-text d-flex justify-content-between font-weight-bold">
                            {selectedPG.attributes.slide && <img className="icon icon-box" src="/images/icons/slide.svg" alt="Slide"/>}
                            {selectedPG.attributes.swing && <img className="icon icon-box" src="/images/icons/swing.svg" alt="Swing"/>}
                            {selectedPG.attributes.rollerBungge && <img className="icon icon-box" src="/images/icons/zipline.svg" alt="Zipline"/>}
                            {selectedPG.attributes.sander && <img className="icon icon-box" src="/images/icons/sand-box.svg" alt="Sander"/>}
                            {selectedPG.attributes.toilet && <img className="icon icon-box" src="/images/icons/wc.svg" alt="Toilet"/>}
                            {selectedPG.attributes.pitch && <img className="icon icon-box" src="/images/icons/pitch.svg" alt="Pitch"/>}
                        </p>
                    </div>
                </div>
            </InfoWindow>
        )}
      </GoogleMap>

      <Link to="/addPG"> Add new playground</Link>
      <Link to="/admin"> Check new playgrounds</Link>
      <Link to="/logout"> Logout</Link>
    </div>
  );
  function myPosition (position){
    setMyLocation({ lat:position.coords.latitude, lng:position.coords.longitude })
  }

  function Locate({ panTo }) {
    return (
      <button
        className="locate"
        onClick={() => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              panTo({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
             myPosition(position)
             
            },
            () => null
          );
        }}
      >
        <img src="/images/compass.svg" alt="compass" />
      </button>
    );
  
  }
}





