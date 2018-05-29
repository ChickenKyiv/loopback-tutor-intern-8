import axios from 'axios'
import { API_ROOT } from '../utils/api-config'

const getUserData = (accessToken) => {
  return new Promise((resolve, reject) => {
    axios.request({
      method: 'post',
      url: API_ROOT + `/api/userData/logout?access_token=${accessToken}`
    }).then((response) => {
      //  console.log(response)
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
    })
}
export default getUserData