import React, {useState, useEffect} from 'react'
import UserService from "../../services/user-service";



const service = new UserService();

export default function Edit({id}) {
    const [address, setAddress] = useState("");
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0)
    const [slide, setSlide] = useState(false);
    const [swing, setSwing] = useState(false);
    const [rollerBungge, setRollerBungge] = useState(false);

    useEffect(() => {
        service.getEditPG(id)
        .then(data => {
            setAddress(data.address);
            setLat(data.lat)
            setLng(data.lng)
            setSlide(data.slide);
            setSwing(data.swing);
            setRollerBungge(data.rollerBungge);
            console.log({data})
        })
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault();
        /* const formData = new FormData();
        formData.append("lat",lat);
        formData.append("lng",lng);
        formData.append("address", address);
        formData.append("slide", slide);
        formData.append("swing", swing);
        formData.append("rollerBungge", rollerBungge); */
    
        let result = await service.editPG({
            lat,
            lng,
            address,
            slide,
            swing,
            rollerBungge
        }, id)
        
      };

    return (
        <div>
           <form onSubmit={(e) => handleSubmit(e)}>
           <span>Coordinates:</span>
           <label> Lattitude
          <input
            type="text"
            name=""
            onChange={(e) => setLat(e.target.value)}
          />
          </label>
          <label> Longitude
          <input
            type="text"
            name=""
            onChange={(e) => setLng(e.target.value)}
          />
          </label>

             <label> Addres 
          <input
            type="text"
            value={address}
            name=""
            onChange={(e) => setAddress(e.target.value)}
          />
          </label>

          <label>slide
          <input type="checkbox" checked={slide} name="" onChange={(e) => setSlide(!slide)} />
          </label>

          <label>swing
          <input type="checkbox" checked={swing}name="" onChange={(e) => setSwing(!swing)} />
          </label>

          <label>Roller Bungge

          
          <input
            type="checkbox"
            checked={rollerBungge}
            name=""
            onChange={(e) => setRollerBungge(!rollerBungge)}
          />
          </label>

          <button className="btn btn-warning" type="submit"> Submit changes </button>
        </form>

        </div>
    )
}
