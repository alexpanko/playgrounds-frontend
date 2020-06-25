import React, { useState, useEffect } from "react";
import "./MainMap.css";
import UserService from "../../services/user-service";
//mport { Link } from "react-router-dom";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  
} from "@react-google-maps/api";

import { playgrounds } from "../Playground/PG";
import "../AddPG/AddPG.scss";
import ReactStars from "react-rating-stars-component";


const libraries = ["places"];
const mapContainerStyle = {
  height: "93vh",
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
  
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [receivedPG, setReceivedPG] = useState([]);

  useEffect(() => {
    service.renderPG().then((data) => {
      console.log(data.data.PG);
      setReceivedPG(data.data.PG);
    });
  }, []);

  const [selected, setSelected] = React.useState(null);

  
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(17);
  }, []);

  const [selectedPG, setSelectedPG] = useState(null);
  const [myLocation, setMyLocation] = useState({});

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  console.log({ receivedPG });
  return (
    <div>
      <div className="height-10 container pb-3">
        {/* <Navigation /> */}
      </div>

      <div className="container-flex">
        <div className="row">
          <div className="col">
            <Locate className="pr-10" panTo={panTo} />
            <GoogleMap
              id="map"
              mapContainerStyle={mapContainerStyle}
              zoom={13}
              center={center}
              options={options}
              //onClick={onMapClick}
              onLoad={onMapLoad}
            >
              {myLocation ? (
                <Marker
                  position={{
                    lat: parseFloat(myLocation.lat),
                    lng: parseFloat(myLocation.lng),
                  }}
                  icon={{
                    url: `/images/icons/target.svg`,
                    scaledSize: new window.google.maps.Size(25, 25),
                  }}
                />
              ) : null}
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
                <Marker
                  key={index}
                  position={{
                    lat: parseFloat(playground.coordinates.lat),
                    lng: parseFloat(playground.coordinates.lng),
                  }}
                  onClick={() => {
                    setSelectedPG(playground);
                  }}
                />
              ))}
              {receivedPG.map((playground, index) => (
                <Marker
                  key={index}
                  position={{
                    lat: parseFloat(playground.coordinates.lat),
                    lng: parseFloat(playground.coordinates.lng),
                  }}
                  onClick={() => {
                    setSelectedPG(playground);
                  }}
                />
              ))}
              {selectedPG && (
                <InfoWindow
                style={{width: "300px !important"}}
                  onCloseClick={() => {
                    setSelectedPG(null);
                  }}
                  position={{
                    lat: selectedPG.coordinates.lat,
                    lng: selectedPG.coordinates.lng,
                  }}
                >

                <div className="card border-0" style={{width: "300px !important"}}>
                    {/* ONE IMAGE: START */}
                    {/* <img src= {selectedPG.photo[0]} className="card-img-top my-card-img" alt="PGPhoto"></img> */}
                    {/* ONE IMAGE: END */}

                    {/* CAROUSEL TEST: START */}
                    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                      <div class="carousel-inner">
                        <div class="carousel-item active">
                          <img class="d-block my-card-img" src={selectedPG.photo[0]} alt="slide" />
                        </div>
                        {selectedPG.photo.slice(1).map((img, index) => 
                          <div class="carousel-item" key={index}>
                            <img class="d-block my-card-img" src={img} alt="slide" />
                          </div>                        
                        )}
                        
                      </div>
                      <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                      </a>
                      <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                      </a>
                    </div>
                    {/* CAROUSEL TEST: END */}


                    

                    <div class="card-body">
                        
            <p className="card-text d-flex justify-content-around flex-wrap font-weight-bold">
                            {selectedPG.attributes.slide && <img className="icon icon-box" src="/images/icons/slide.svg" alt="Slide"/>}
                            {selectedPG.attributes.swing && <img className="icon icon-box" src="/images/icons/swing.svg" alt="Swing"/>}
                            {selectedPG.attributes.rollerBungge && <img className="icon icon-box" src="/images/icons/zipline.svg" alt="Zipline"/>}
                            {selectedPG.attributes.sander && <img className="icon icon-box" src="/images/icons/sand-box.svg" alt="Sander"/>}
                            {selectedPG.attributes.toilet && <img className="icon icon-box" src="/images/icons/wc.svg" alt="Toilet"/>}
                            {selectedPG.attributes.pitch && <img className="icon icon-box" src="/images/icons/pitch.svg" alt="Pitch"/>}
                        </p>

                    </div>
                    <ReactStars
    count={5}
    onChange={ratingChanged}
    size={24}
    color2={"#ffd700"}
  />
 
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </div>
        </div>
      </div>

    </div>
  );


  function myPosition(position) {
    setMyLocation({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
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
              myPosition(position);
            },
            () => null
          );
        }}
      >
        <img src="/images/icons/target.svg" alt="compass" />
      </button>
    );
  }
}
