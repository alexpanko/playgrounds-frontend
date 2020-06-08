import React, { useState } from "react";
import UserService from "../../services/user-service";
import { maxSelectPhoto, checkPhotoSize } from "./handlePhotoUpload";
import { Progress } from "reactstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const service = new UserService();

export default function ShowPG(props) {
  const [photo, setPhoto] = useState();
  const [address, setAddress] = useState("");

  const [slide, setSlide] = useState(false);
  const [swing, setSwing] = useState(false);
  const [rollerBungge, setRollerBungge] = useState(false);
  const [loaded, setLoaded] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log("photo", photo);
    Array.from(photo).forEach((element) => {
      formData.append("photo", element);
    });
    formData.append("address", address);
    formData.append("slide", slide);
    formData.append("swing", swing);
    formData.append("rollerBungge", rollerBungge);

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

  return (
    <>
      <div>
        <div>
          <h1 className="text-brown text-center">
            <span className="highlight">Add a new playground</span>
          </h1>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              type="file"
              name="photo"
              multiple
              onChange={(e) => handleFileUpload(e)}
            />
            <div className="form-group">
              <Progress max="100" color="success" value={loaded}>
                {Math.round(loaded, 2)}%
              </Progress>
            </div>
            <label>
              {" "}
              Addres
              <input
                type="text"
                name=""
                onChange={(e) => setAddress(e.target.value)}
              />
            </label>

            <label>
              slide
              <input
                type="checkbox"
                checked={slide}
                name=""
                onChange={(e) => setSlide(!slide)}
              />
            </label>

            <label>
              swing
              <input
                type="checkbox"
                checked={swing}
                name=""
                onChange={(e) => setSwing(!swing)}
              />
            </label>

            <label>
              Roller Bungge
              <input
                type="checkbox"
                checked={rollerBungge}
                name=""
                onChange={(e) => setRollerBungge(!rollerBungge)}
              />
            </label>

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
