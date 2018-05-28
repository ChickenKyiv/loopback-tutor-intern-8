import axios from 'axios'
import { API_ROOT } from '../utils/api-config'

const inviteUser = (Email, User, accessToken) => {
  return new Promise((resolve, reject) => {
    axios.request({
       method: 'post',
       url: API_ROOT + `/api/userData/invite?access_token=${accessToken}`,
       data: {
         email: Email,
         user: User
       }
      }).then(response => {
        // console.log(response);
        resolve(response)
      }).catch(err => {
        reject(err)
      })
    });

}
export default inviteUser