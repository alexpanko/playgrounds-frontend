import axios from 'axios'
import { toast } from 'react-toastify';
import { compareAsc } from 'date-fns';



class UserService {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      //'http://localhost:4000'
      withCredentials: true
    })
    //this.service = service
  }

//  , { onUploadProgress:ProgressEvent => {
//     setLoaded(ProgressEvent.loaded / ProgressEvent.total*100)}
//      }

 addPG = (data) => {
    return this.service.post('/playground/addPG',  data)
    .then(response => response.data)
    .then(res => { 
      console.log("11111")
      toast.success('upload success')
  })
    .catch(err => { 
      toast.error('upload fail')
  })
    
  }

  renderPG = () => {
    return this.service.get('/playground/approvedPlaygrounds')
    .then(res => res)
    .catch(err => console.log(err))
  }

  getEditPG = (id) => {
    return this.service.get(`/playground/admin/edit/${id}`)
    .then(res => res.data)
    .catch(err => console.log(err))
  }
  
  editPG = (data, id) => {
    return this.service.post(`/playground/admin/edit/${id}`, data)
    .then(res => res.data)
    .catch(err => console.log(err))
  }

 deletePG = (id) => {
   return this.service.get(`/playground/deletePG/${id}`)
   .then(res => res)
   .catch(err => console.log(err))
 }

}

export default UserService