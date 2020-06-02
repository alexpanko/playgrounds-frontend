import React, {useState} from 'react'
import UserService from '../../services/user-service';
//import AddPhoto from '../AddPhoto/AddPhoto'
const service = new UserService()

export default function ShowPG(props) {
    const [photo, setPhoto] = useState();
    const [address, setAddress ] = useState('');
    const [slide, setSlide ] = useState(false);
    const [swing, setSwing ] = useState(false);
    const [rollerBungge, setRollerBungge] = useState(false);


    const handleSubmit = async(e) => {
        e.preventDefault();
       const formData = new FormData();
       console.log('photo', photo);
       Array.from(photo).forEach(element => {
        formData.append('photo', element);
       });
       formData.append('address', address);
       formData.append('slide', slide);
       formData.append('swing', swing);
       formData.append('rollerBungge', rollerBungge);

       let result = await service.addPG(formData)
       props.history.push('/main-map')

      };

      const handleFileUpload = async(e) => {
        setPhoto(e.target.files);
        console.log('files', e.target.files);
        }
 
  
    return (
        <>
        <div>
            <form  onSubmit={(e =>handleSubmit(e))}>
                <input type="file" name="photo" multiple onChange={(e => handleFileUpload(e))}/>

                <input type="text" name=""  onChange={(e => setAddress(e.target.value))}/>
                <input type="checkbox" name="" onChange={(e => setSlide(!slide))}/>   
                <input type="checkbox" name="" onChange={(e => setSwing(!swing))}/>
                <input type="checkbox" name=""  onChange={(e => setRollerBungge(!rollerBungge))}/>
                
                <button type="submit" />
                
            </form>
            
            
        </div>
        </>
    )
}
