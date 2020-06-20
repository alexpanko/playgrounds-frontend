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
    let result = await service.editPG(
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
    <div>
      <img src={photo} alt="Playground"></img>
      <form onSubmit={(e) => handleSubmit(e)}>
        <span>Coordinates:</span>
        <label>
          {" "}
          Lattitude
          <input
            type="text"
            value={lat}
            name=""
            onChange={(e) => setLat(e.target.value)}
          />
        </label>
        <label>
          {" "}
          Longitude
          <input
            type="text"
            value={lng}
            name=""
            onChange={(e) => setLng(e.target.value)}
          />
        </label>

        
        <label>
          {" "}
          Pitch
          <input type="checkbox" name="" onChange={(e) => setPitch(!pitch)} />
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
          Sander
          <input
            type="checkbox"
            checked={sander}
            name=""
            onChange={(e) => setSander(!sander)}
          />
        </label>

        <label>
          Toilet
          <input
            type="checkbox"
            checked={toilet}
            name=""
            onChange={(e) => setToilet(!toilet)}
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
        <label>
          Approve
          <input
            type="checkbox"
            checked={approved}
            name=""
            onChange={(e) => setApproved(!approved)}
          />
        </label>
        <button className="btn btn-warning" type="submit">
          {" "}
          Submit changes{" "}
        </button>
      </form>
    </div>
  );
}
