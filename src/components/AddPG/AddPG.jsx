
import React, { useState } from "react";
import UserService from "../../services/user-service";
import { maxSelectPhoto, checkPhotoSize } from "./handlePhotoUpload";
import { Progress } from "reactstrap";
import { ToastContainer} from "react-toastify";
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
    setTimeout( () => {
      props.history.push("/main-map");
    }, 2000)
    
  };

  const handleFileUpload = (e) => {
    if (maxSelectPhoto(e) && checkPhotoSize(e)) {
      // && checkPhotoSize(e)
      setPhoto(e.target.files);
      //console.log('files', e.target.files);
    }
  };

  return (
    <>
      <div>
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
          <input
            type="text"
            name=""
            onChange={(e) => setAddress(e.target.value)}
          />
          <input type="checkbox" name="" onChange={(e) => setSlide(!slide)} />
          <input type="checkbox" name="" onChange={(e) => setSwing(!swing)} />
          <input
            type="checkbox"
            name=""
            onChange={(e) => setRollerBungge(!rollerBungge)}
          />

          <button type="submit" />
        </form>
      </div>
      <div className="form-group">
        <ToastContainer />
      </div>
    </>
  );
}
