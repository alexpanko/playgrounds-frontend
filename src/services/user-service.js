import axios from 'axios'
import { toast } from 'react-toastify';



class UserService {
  constructor() {
    this.service = axios.create({
      baseURL: 'http://localhost:4000',
      withCredentials: true
    })
    //this.service = service
  }

 addPG = (data, setLoaded) => {
    return this.service.post('/playground/addPG',  data, {
      onUploadProgress:ProgressEvent => {
     setLoaded(ProgressEvent.loaded / ProgressEvent.total*100)}
      })
    .then(response => response.data)
    .then(res => { 
      console.log("11111")
      toast.success('upload success')
  })
    .catch(err => { 
      toast.error('upload fail')
  })
    
  }
 

}

export default UserService