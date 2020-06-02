import axios from 'axios'

class UserService {
  constructor() {
    this.service = axios.create({
      baseURL: 'http://localhost:4000',
      withCredentials: true
    })
    //this.service = service
  }

 addPG = (data) => {
    return this.service.post('/playground/addPG', data)
    .then(response => response.data)
    .catch(err => console.log(err))
    }
 

}

export default UserService