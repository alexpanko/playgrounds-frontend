import React, { useState, useEffect } from "react";
import UserService from "../../services/user-service";
import { maxSelectPhoto, checkPhotoSize } from "./handlePhotoUpload";
import { Progress } from "reactstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddPG.scss"
import Modal from "../Modal/Modal"

const service = new UserService();

export default function ShowPG(props) {
  const [photo, setPhoto] = useState();
  const [address, setAddress] = useState("");
  const [slide, setSlide] = useState(false);
  const [swing, setSwing] = useState(false);
  const [rollerBungge, setRollerBungge] = useState(false);
  const [toilet, setToilet] = useState(false);
  const [sander, setSander] = useState(false);
  const [pitch, setPitch] =useState(false);
  const [loaded, setLoaded] = useState(0);
  const [PGlocation, setPGlocation] = useState({})
  const [showModal, setShowModal] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log("photo", photo);
    Array.from(photo).forEach((element) => {
      formData.append("photo", element);
    });
    formData.append("address", address);
    formData.append("attributes", {
      slide,
      swing,
      rollerBungge,
      sander,
      toilet,
      pitch
    });

    let result = await service.addPG(formData, setLoaded);
    setTimeout(() => {
      props.history.push("/main-map");
    }, 2000);
  };

  const handleFileUpload = (e) => {
    if (maxSelectPhoto(e) && checkPhotoSize(e)) {
      setPhoto(e.target.files);
      //console.log('files', e.target.files);
    }
  };
  const handleModal = (result) => {
    console.log({result})
    result && 
      navigator.geolocation.getCurrentPosition(
          (position) => {
            setPGlocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
    setShowModal(false);
  }
  
  console.log({PGlocation})
  return (
    <>
     {showModal && <Modal handleModal={handleModal}/>}
     <div className="progress-bar">
              <Progress max="100" color="success" value={loaded}>
                {Math.round(loaded, 2)}%
              </Progress>
            </div>
      <div className="adding-form">
      
        <div>
          <h1 className="text-brown text-center">
            <span className="highlight">Add a new playground</span>
          </h1>
          <form className="from-container" onSubmit={(e) => handleSubmit(e)}>
            <input
              type="file"
              name="photo"
              multiple
              onChange={(e) => handleFileUpload(e)}
            />
           
            <label>
              {" "}
              Addres
              <input
                type="text"
                name=""
                onChange={(e) => setAddress(e.target.value)}
              />
            </label>

            <ul>
              <li>
                <label>
                  <input
                    type="checkbox"
                    name=""
                    onChange={(e) => setToilet(!toilet)}
                  />
                  <div className="icon-box">
                    <img
                      className="icon"
                      src="/images/icons/wc.svg"
                      alt="WC"
                    />
                  </div>
                </label>
              </li>

              <li>
                <label>
                  <input
                    type="checkbox"
                    name=""
                    onChange={(e) => setSlide(!slide)}
                  />
                  <div className="icon-box">
                    <img
                      className="icon"
                      src="/images/icons/slide.svg"
                      alt="slide"
                    />
                  </div>
                </label>
              </li>

              <li>
                <label>
                  <input
                    type="checkbox"
                    name=""
                    onChange={(e) => setSwing(!swing)}
                  />
                  <div className="icon-box">
                    <img
                      className="icon"
                      src="/images/icons/swing.svg"
                      alt="swing"
                    />
                  </div>
                </label>
              </li>

              <li>
                <label>
                  <input
                    type="checkbox"
                    name=""
                    onChange={(e) => setSander(!sander)}
                  />
                  <div className="icon-box">
                    <img
                      className="icon"
                      src="/images/icons/sand-box.svg"
                      alt="sand box"
                    />
                  </div>
                </label>
              </li>

              <li>
                <label>
                  <input
                    type="checkbox"
                    name=""
                    onChange={(e) => setRollerBungge(!rollerBungge)}
                  />
                  <div className="icon-box">
                    <img
                      className="icon"
                      src="/images/icons/zipline.svg"
                      alt="bungee"
                    />
                  </div>
                </label>
              </li>

              <li>
                <label>
                  <input
                    type="checkbox"
                    name=""
                    onChange={(e) => setPitch(!pitch)}
                  />
                  <div className="icon-box">
                    <img
                      className="icon"
                      src="/images/icons/pitch.svg"
                      alt="pitch"
                    />
                  </div>
                </label>
              </li>
            </ul>

            <button className="btn btn-warning" type="submit">
              {" "}
              Add playground{" "}
            </button>
          </form>
        </div>
        <div className="form-group">
          <ToastContainer />
        </div>
      </div>
    </>
  );
}
