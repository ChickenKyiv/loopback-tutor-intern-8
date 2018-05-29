import axios from 'axios'
import { API_ROOT } from '../utils/api-config'

const updateUserDetails = (userId, User, accessToken) => {
  return new Promise((resolve, reject) => {
    axios.request({
      method: 'patch',
      url: API_ROOT + `/api/userData/${userId}?access_token=${accessToken}`,//url called to update the data
      data: User
    }).then((response) => {
      //  console.log(response)
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
    })
}
export default updateUserDetails