import axios from 'axios'
import { API_ROOT } from '../utils/api-config'

const deletUserAccount = (userId, accessToken) => {
  return new Promise((resolve, reject) => {
      axios.request({
        method: 'delete',
        url: API_ROOT + `/api/userData/${userId}?access_token=${accessToken}`
      }).then((response) => {
      //  console.log(response)
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
    })
}
export default deletUserAccount