import React, { useState, useEffect } from "react";
import UserService from "../../services/user-service";

const service = new UserService();

export default function Edit({ id, ...props }) {
  const [photo, setPhoto] = useState();
  
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [slide, setSlide] = useState(false);
  const [swing, setSwing] = useState(false);
  const [rollerBungge, setRollerBungge] = useState(false);
  const [toilet, setToilet] = useState(false);
  const [sander, setSander] = useState(false);
  const [pitch, setPitch] = useState(false);
  const [approved, setApproved] = useState(false)

  useEffect(() => {
    service.getEditPG(id).then((data) => {
      setPhoto(data.photo)
      
      setLat(data.coordinates.lat);
      setLng(data.coordinates.lng);
      setSlide(data.attributes.slide);
      setSwing(data.attributes.swing);
      setRollerBungge(data.attributes.rollerBungge);
      setSander(data.attributes.sander);
      setToilet(data.attributes.toilet);
      setPitch(data.attributes.pitch);
      setApproved(data.approved)
      console.log({ data });
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
   await service.editPG(
      {
        coordinates: { lat, lng },
         
        attributes: { swing, slide, rollerBungge, sander, toilet, pitch },
        approved
      },
      id
    );
    setTimeout(() => {
      props.history.push("/admin");
    }, 2000);
  };
 
  return (
    <div className="container">
      <div className="row">
        <div className="col">

        <div className="py-3">
      <img className="img-fluid pt-3" src={photo} alt="Playground"></img>

      <form onSubmit={(e) => handleSubmit(e)}>
        <h3 className="mt-3">Coordinates:</h3>
        
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>
              {" "}
              Lattitude
              <input
                className="form-control"
                type="text"
                value={lat}
                name=""
                onChange={(e) => setLat(e.target.value)}
              />
            </label>
            </div>
          <div className="form-group col-md-6">
            <label>
              {" "}
              Longitude
              <input
                className="form-control"
                type="text"
                value={lng}
                name=""
                onChange={(e) => setLng(e.target.value)}
              />
            </label>
        </div>
        </div>
        
        <br />

        <div className="form-group">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" name="" onChange={(e) => setPitch(!pitch)} />
            <label className="form-check-label">
              {" "}
              Pitch  
            </label>
            
            <br />
            <input
                className="form-check-input"
                type="checkbox"
                checked={slide}
                name=""
                onChange={(e) => setSlide(!slide)}
              />
            <label className="form-check-label">
              slide
              
            </label>
            <br />
            <input
                className="form-check-input"
                type="checkbox"
                checked={swing}
                name=""
                onChange={(e) => setSwing(!swing)}
              />
            <label className="form-check-label">
              swing
              
            </label>
            <br />
            <input
                className="form-check-input"
                type="checkbox"
                checked={sander}
                name=""
                onChange={(e) => setSander(!sander)}
              />
            <label className="form-check-label">
              Sander
              
            </label>
            <br />
            <input
                className="form-check-input"
                type="checkbox"
                checked={toilet}
                name=""
                onChange={(e) => setToilet(!toilet)}
              />
            <label className="form-check-label">
              Toilet
              
            </label>
            <br />
            <input
                className="form-check-input"
                type="checkbox"
                checked={rollerBungge}
                name=""
                onChange={(e) => setRollerBungge(!rollerBungge)}
              />
            <label className="form-check-label">
              Roller Bungge
            </label>
            <br />
            <hr />
            <input
            className="form-check-input"
                type="checkbox"
                checked={approved}
                name=""
                onChange={(e) => setApproved(!approved)}
              />
            <label className="form-check-label">
              Approve
              
            </label>

          </div>
        </div>

        <br />
        <button className="btn btn-warning" type="submit">
          {" "}
          Submit changes{" "}
        </button>
      </form>
    </div>

        </div>
      </div>
    </div>


  );
}
