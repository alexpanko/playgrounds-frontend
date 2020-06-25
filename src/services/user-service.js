import axios from 'axios'
import { toast } from 'react-toastify';




class UserService {
  constructor() {
    this.service = axios.create({

      // baseURL: 'http://localhost:4000/',
      baseURL: process.env.REACT_APP_BASE_URL,

      withCredentials: true
    })
    
  }



 admin = (data) => {
   return this.service.get('/playground/admin', data)
   .then(res => console.log(res.data))
   .catch(err => console.log(err))
 }

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


  admin = () => {
    return this.service.get('/playground/admin')
    .then(res => res.data)
    .catch(err => console.log(err))
  }

  filterPG = (filter) => {

    return this.service.get(`/playground/admin/filter?filterApproved=${filter}`)
    .then(res => res.data)
    .catch(err => console.log(err))
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