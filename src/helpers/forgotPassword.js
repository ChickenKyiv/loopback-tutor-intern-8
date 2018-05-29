import axios from 'axios'
import { API_ROOT } from '../utils/api-config'

const forgotPassword = (email) => {
  return new Promise((resolve, reject) => {
    axios.request({
      method: 'post',
      url: API_ROOT + '/api/userData/reset',//modify the reset method in userdata.js backend to send an email with
      data: { email: email }
    }).then(response => {
      //  console.log(response)
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
    })
}
export default forgotPassword